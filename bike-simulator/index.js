import fetch from "node-fetch";
import { WebSocketServer } from "ws";

const backend_url = process.env.BACKEND_URL || (process.env.IS_DOCKER ? "http://api:3000" : "http://localhost:3000");
let users = []
const rented = new Map()

console.log("bike simulator successfully started!")

// starta websocket
const wss = new WebSocketServer({ port: 8080 })
wss.on("connection", (ws) => {
    console.log("Websocket is connected!")

    ws.on("close", () => {
        console.log("Websocket is disconnected")
    })
})


// hämta användare
async function getUsers() {
    try {
        const res = await fetch(`${backend_url}/api/users`)
        users = await res.json()
        console.log(`Hämtning av användare: ${users.length} st.`)
    } catch (err) {
        console.error("Lyckades ej hämta användare:", err.message)
    }
}

// skapa mockanvändare. Ändra om du vill testa med fler!
function createUsers(count = 20) {
    const mockUsers = [];

    for (let i = 0; i < count; i++) {
        mockUsers.push({
            id: 1000 + i,
            name: `MockUser_${i}`
        })
    }
    users = [...users, ...mockUsers]
    console.log(`Totalt antal användare (mock + db): ${users.length}`)
}


// slumpa användare
function getUser() {
    return users[Math.floor(Math.random() * users.length)]
}

// simulera cykelrörelse
async function simulateBikes() {
    try {
        const res = await fetch(`${backend_url}/api/scooters`)
        const scooters = await res.json()
        // console.log(scooters)
        for (const scooter of scooters) {
            // if (!scooter.position_lat || !scooter.position_long || scooter.position_lat == null || scooter.position_long == null) continue;

            const lat = Number(scooter.position_lat);
            const long = Number(scooter.position_long);

            if (
                scooter.position_lat == null ||
                scooter.position_long == null ||
                Number.isNaN(lat) ||
                Number.isNaN(long)
            ) {
                continue;
            }

            let newLat = lat;
            let newLong = long;

            // if (isNaN(newLat) || isNaN(newLong)) {
            //     continue
            // }

            if (rented.has(scooter.id)) {
                const trip = rented.get(scooter.id)
                //om ok, flytta cykel

                const previous_lat = trip.last_lat
                const previous_long = trip.last_long
                const previous_time = trip.last_time
                const current_time = Date.now()

                newLat = parseFloat(scooter.position_lat) + ((Math.random() - 0.5) * 0.001)
                newLong = parseFloat(scooter.position_long) + ((Math.random() - 0.5) * 0.001)
                
                if (isNaN(newLat) || isNaN(newLong)) {
                    continue
                }

                if (newLat < 30 && newLong > 30) {
                    [newLat, newLong] = [newLong, newLat]
                }
                
                scooter.position_lat = parseFloat(newLat.toFixed(6));
                scooter.position_long = parseFloat(newLong.toFixed(6));
                scooter.battery -= 2;
                scooter.is_available = false;

                if (!scooter.position_lat || !scooter.position_long) {
                    console.warn(`Scooter ${scooter.id} saknar position, hoppar update.`);
                    continue;
                }
                // uppdatera scooterns position och batteri
                if (Number.isNaN(newLat) || Number.isNaN(newLong)) continue;
                await updateValues(scooter.id, newLat, newLong)

                // beräkna distans den åkt plus hastighet
                const distance = calculateDistance(previous_lat, previous_long, newLat, newLong)
                const seconds = (current_time - previous_time) / 1000
                let speed = seconds > 0 ? (distance/seconds) * 3.6 : 0
                const bikeStatus = speed < 1 ? "stillastående" : "i rörelse"

                trip.last_lat = newLat
                trip.last_long = newLong
                trip.last_time = current_time

                // maxhastighet 25 km/h
                if (speed > 25) {
                    speed = 25
                }
                
                console.log(`Scooter med id: ${scooter.id}, status: ${bikeStatus}
Reste till ${scooter.position_lat}, ${scooter.position_long}.
Batteri: ${scooter.battery}%.
Hastighet: ${speed.toFixed(1)} km/h`)
                // console.log(trip)
                // kolla längden på resan
                // console.log(scooter.current)
                const tripTime = Date.now() - trip.start_time
                if (tripTime >= 60_000 || scooter.battery <= 5) {
                    await endRental(scooter, trip)
                }
                // await endRental(scooter)
                
            // någonting med hyran ....
            } else {
                await startRental(scooter)
            }


            // varning om lågt batteri
            if (scooter.battery <= 10 && scooter.status === "ok" && scooter.is_available) {
                console.log(`Scooter ${scooter.id} behöver laddas! Batterienivå: ${scooter.battery} `)
            }

            // om batteriet är kritiskt, ta scooter ur bruk
            if (scooter.battery <= 5 && scooter.status === "ok") {
                console.log(`Scooter ${scooter.id} tas ur bruk för laddning, batteriet är under 5%.`)
                
                // avsluta resa först om den har pågående resa
                if (!scooter.is_available) {
                    const trip = rented.get(scooter.id)
                    if (trip) {
                        await endRental(scooter, trip)
                    } 
                }

                scooter.is_available = false
                scooter.status = "charging"
                await chargeScooter(scooter)
                continue
                
                
            }   
        }

        // spara data, förbered för websocket
        const payload = scooters.map((s) => ({
            id: s.id,
            position_lat: Number(s.position_lat),
            position_long: Number(s.position_long),
            battery: s.battery,
            status: s.status,
            is_available: !!s.is_available
        }))

        // skicka
        wss.clients.forEach(client => {
            if (client.readyState === 1) {
                client.send(JSON.stringify({
                    type: "scooter_update",
                    data: payload
                }))
            }
        })
     } catch (err) {
        console.error("Simulator error:", err.message)
    }
}

async function updateValues(id, lat, long) {
    // uppdatera scooter med ny position
    // uppdatera batteri med nytt värde
    // console.log(id, lat, long)
    if (lat == null || long == null || Number.isNaN(lat) || Number.isNaN(long)) return;
    try {
        await fetch(`${backend_url}/api/scooters/update/${id}`, {
            method: "PUT",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({position_lat: lat, position_long: long })
        })
        
    } catch (err) {
        console.error("Kunde inte uppdatera scooter:", err.message)
    }
    try {
        // -30 endast för testning, -2 ska det vara sen!
        await fetch(`${backend_url}/api/scooters/${id}/battery/-2`,
            {
                method: "PUT"
            }
        )
    } catch (err) {
        console.error("Kunde inte uppdatera batteri:", err.message)
    }
}

async function startRental(scooter) {
    // starta hyra av cykel
    if (!scooter.is_available || scooter.status !== "ok") return
    if (Math.random() > 0.5) return
    // if (rented.size >= max_users) return
    
    const user = getUser()
    if ([...rented.values()].some(r => r.user_id === user.id)) return;

    const trip = {
        start_time: Date.now(),
        last_time: Date.now(),
        start_lat: parseFloat(scooter.position_lat),
        start_long: parseFloat(scooter.position_long),
        last_lat: parseFloat(scooter.position_lat),
        last_long: parseFloat(scooter.position_long),
        user_id: user.id
    }
    rented.set(scooter.id, trip)
    scooter.is_available = false

        wss.clients.forEach(client => {
        if (client.readyState === 1) {
            client.send(JSON.stringify({
                type: "scooter_update",
                data: [{
                    id: scooter.id,
                    position_lat: Number(scooter.position_lat),
                    position_long: Number(scooter.position_long),
                    battery: scooter.battery,
                    status: scooter.status,
                    is_available: scooter.is_available
                }]
            }))
        }
    })

    await fetch(`${backend_url}/api/scooters/update/${scooter.id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
        is_available: false
    })
});
    // currentUsers.add(user.id)
    console.log(`Scooter ${scooter.id} hyrs nu av användare ${user.id}`)
    
}

function calculateDistance(lat1, long1, lat2, long2) {
    const radius = 6371000
    const toRad = deg => deg * Math.PI / 180

    const dlat = toRad (lat2-lat1)
    const dlong = toRad(long2 - long1)

    const a =
        Math.sin(dlat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dlong / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radius * c;
}

async function endRental(scooter, trip) {
    if (!trip) {
        console.log(`Kan inte avsluta resa om pågående resa inte finns.`)
        return
    }

    rented.delete(scooter.id)

    // const trip = rented.get(scooter.id)
    scooter.is_available = true
    // scooter.current = null
    // currentUsers.delete(trip.user_id)

        // spara i historik!!
        try {
            await fetch(`${backend_url}/api/history`, {
                method: "POST",
                headers: {"content-type":"application/json"},
                body: JSON.stringify({
                    user_id: trip.user_id,
                    start_location: `${trip.start_lat}, ${trip.start_long}`,
                    end_location: `${scooter.position_lat}, ${scooter.position_long}`
                })
            })

            if (scooter.battery < 6) {
                await chargeScooter(scooter)

            }
                wss.clients.forEach(client => {
            if (client.readyState === 1) {
                client.send(JSON.stringify({
                    type: "scooter_update",
                    data: [{
                        id: scooter.id,
                        position_lat: Number(scooter.position_lat),
                        position_long: Number(scooter.position_long),
                        battery: scooter.battery,
                        status: scooter.status,
                        is_available: scooter.is_available
                    }]
                }));
            }
        });
            console.log(`Scooter ${scooter.id} tillbakalämnad av användare ${trip.user_id}`)
        } catch (err) {
            console.error("Kunde inte avsluta resa.", err.message)
        }
        console.log(
        "END RENTAL",
        scooter.id,
        "memory:",
        scooter.is_available
        )
        await fetch(`${backend_url}/api/scooters/update/${scooter.id}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                is_available: true
            })
            });
    // }
}

async function chargeScooter(scooter) {
    // flytta scooter till laddstation
    // ladda scooter
    // spara scooter-id till specifik laddstation
    try {
        // hämta alla laddstationer
        const res = await fetch(`${backend_url}/api/charging`)
        const chargers = await res.json()

        for (const charger of chargers) {
            // om laddstationen är ledig, ta första bästa
            if (charger.status === 0) {
                    const body = {
                        position_lat: charger.position_lat,
                        position_long: charger.position_long,
                        status: "charging"
                    }

                // uppdatera scooter med ny position (laddarens position)
                // flytta scooter till laddstation
                await fetch(`${backend_url}/api/scooters/update/${scooter.id}`,
                    {
                        method: "PUT",
                        headers: { "content-type": "application/json"},
                        body: JSON.stringify( body )
                    }
                )

                // återställ batteri till 100%
                await fetch(`${backend_url}/api/scooters/${scooter.id}/battery/100`,
                    {
                        method: "PUT"
                    }
                )
                // lägg till cykelns id på laddstationen
                await fetch(`${backend_url}/api/charging/update/${charger.id}/${scooter.id}`,
                    {
                        method: "PUT"
                    }
                )



            }
        }
        console.log(`Scooter ${scooter.id} är satt på laddning.`)
    } catch (err) {
        console.error(`Kunde inte sätta scooter: ${scooter.id} på laddning.`, err.message)
    }
}

(async () => {
    await getUsers()
    createUsers()
    setInterval(simulateBikes, 5000)
})()
