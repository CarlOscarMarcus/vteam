import fetch from "node-fetch";

const backend_url = "http://localhost:3000" || process.env.PORT

console.log("bike simulator successfully started!")

// simulera cykelrörelse
async function simulateBikes() {
    try {
        const res = await fetch(`${backend_url}/api/scooters`)
        const scooters = await res.json()

        for (const scooter of scooters) {
            if (!scooter.position_lat || !scooter.position_long) continue;

            const newLat = parseFloat(scooter.position_lat) + ((Math.random() - 0.5) * 0.005)
            const newLong = parseFloat(scooter.position_long) + ((Math.random() - 0.5) * 0.005)

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

setInterval(simulateBikes, 5000)