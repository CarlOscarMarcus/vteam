import fetch from "node-fetch";

const backend_url = process.env.BACKEND_URL || "http://localhost:3000"
let users = []

console.log("bike simulator successfully started!")

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

// slumpa användare
function getUser() {
    return users[Math.floor(Math.random() * users.length)]
}

// simulera cykelrörelse
async function simulateBikes() {
    try {
        const res = await fetch(`${backend_url}/api/scooters`)
        const scooters = await res.json()

        for (const scooter of scooters) {
            if (!scooter.position_lat || !scooter.position_long) continue;

            let newLat = parseFloat(scooter.position_lat)
            let newLong = parseFloat(scooter.position_long)

            
                // lägg till en koll om is_available = true?
                if (scooter.is_available) {
                    switch (scooter.status) {
                        case "ok":
                        //om ok, flytta cykel
                        newLat = parseFloat(scooter.position_lat) + ((Math.random() - 0.5) * 0.005)
                        newLong = parseFloat(scooter.position_long) + ((Math.random() - 0.5) * 0.005)
                        await updateValues(scooter.id, newLat, newLong, -2)
                        startRental(scooter)
                        // någonting med hyran ....
                        break;
            
                        case "charging":
                        // bara uppdatera batteriet
                        // await updateBattery(scooter.id, +2)
                        break;
                
                        case "service":
                            // gör inget
                            break;
                
                    default:
                        break;
                    }
                }
     
                if (!scooter.is_available && scooter.current) {
                    await endRental(scooter)
                }
                // varning om lågt batteri
                if (scooter.battery <= 10 && scooter.status !== "charging") {
                    console.log(`Scooter ${scooter.id} behöver laddas! Batterienivå: ${scooter.battery} `)
                }
            
            await fetch(`${backend_url}/api/scooters/update/${scooter.id}`, {
                method: "PUT",
                headers: { "content-type": "application/json"},
                body: JSON.stringify({
                    position_lat: newLat,
                    position_long: newLong
                })
            })

            await fetch(`${backend_url}/api/scooters/${scooter.id}/battery/-2`, {
                method: "PUT"
            })

            console.log(`Scooter: ${scooter.id} flyttades till ${newLat}, ${newLong}.`)
        }
    } catch (err) {
        console.error("Simulator error:", err.message)
    }
}

async function updateValues(id, lat, long, battery) {
    // uppdatera scooter med ny position
    // uppdatera batteri med nytt värde
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
        await fetch(`${backend_url}/api/scooters/${id}/battery/${battery}`)
    } catch (err) {
        console.error("Kunde inte uppdatera batteri:", err.message)
    }
}

function startRental(scooter) {
    // starta hyra av cykel
    if (Math.random() < 0.05 && scooter.is_available && scooter.status === "ok" ) {
        const user = getUser()
        scooter.is_available = false
        scooter.current = {
            start_time: new Date(),
            start_lat: parseFloat(scooter.position_lat),
            start_long: parseFloat(scooter.position_long),
            user_id: user.id
        }
        console.log(`Scooter ${scooter.id} hyrs nu av användare ${user.id}`)
    }
}

async function endRental(scooter) {
    if (Math.random() < 0.05 && !scooter.is_available && scooter.current) {
        const trip = scooter.current
        scooter.is_available = true
        scooter.current = null

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
            console.log(`Scooter ${scooter.id} tillbakalämnad av användare ${trip.user_id}`)
        } catch (err) {
            console.error("Kunde inte avsluta resa.", err.message)
        }
    } 
}

(async () => {
    await getUsers()
    setInterval(simulateBikes, 5000)
})
