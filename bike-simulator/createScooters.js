import fetch from "node-fetch";

const backend_url = process.env.BACKEND_URL || (process.env.IS_DOCKER ? "http://api:3000" : "http://localhost:3000");

// ####################################################### //
// ########## // JUSTERA SIMULERINGEN // ################# //

// CYKLAR, bäst om det är delbart med 3.
const COUNT = 90;

// PARKERINGAR
const parkings = 30

// LADDSTATIONER
const chargers = 21

// ####################################################### //
// ####################################################### //

const cities = [
    {
        name: "Stockholm",
        lat: 59.3293,
        long: 18.0686,
    },
    {
        name: "Göteborg",
        lat: 57.7089,
        long: 11.9746,
    },
    {
        name: "Malmö",
        lat: 55.6050,
        long: 13.0038,
    }
];

function randomPosition(city) {
    const lat  = city.lat  + (Math.random() - 0.5) * 0.05;
    const long = city.long + (Math.random() - 0.5) * 0.05;
    return { lat: Number(lat.toFixed(6)), long: Number(long.toFixed(6)) };
}

async function generateScooters() {
    for (let i = 0; i < COUNT; i++) {
        const city = cities[i % cities.length];
        const pos = randomPosition(city);

        await fetch(`${backend_url}/api/scooters/add`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                battery: Math.floor(50 + Math.random() * 51),
                position_lat: pos.lat,
                position_long: pos.long,
                status: "ok",
                is_available: true
            })
        });
    }
    console.log(`${COUNT} scooters skapade, fördelade jämnt över göteborg, stockholm och malmö.`);
}

async function newParkings() {
    for (let i = 0; i < parkings; i++) {
        const city = cities[i % cities.length]
        const lat = city.lat + (Math.random() - 0.5) * 0.05
        const long = city.long + (Math.random() - 0.5) * 0.05

        await fetch (`${backend_url}/api/parking/add`, {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                battery: Math.floor(50 + Math.random() * 51),
                position_lat: Number(lat.toFixed(6)),
                position_long: Number(long.toFixed(6))
            })
        })
        console.log(`Parking -> ${city.name}`)

    }
}

async function newChargers() {
    for (let i = 0; i < chargers; i++) {
        const city = cities[i % cities.length]
        const lat = city.lat + (Math.random() - 0.5) * 0.05.toFixed(6)
        const long = city.long + (Math.random() - 0.5) * 0.05.toFixed(6)

        await fetch (`${backend_url}/api/charging/add`, {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                battery: Math.floor(50 + Math.random() * 51),
                position_lat: Number(lat),
                position_long: Number(long)
            })
        })
        console.log(`Chargers -> ${city.name}`)

    }
}

await generateScooters()
await newParkings()
await newChargers()
