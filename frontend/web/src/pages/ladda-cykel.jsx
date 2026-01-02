import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
// flytta cykel till valfri laddare.

const API_URL = import.meta.env.VITE_API_URL;


export default function parkScooter() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [battery, setBattery] = useState("")
    const [position_lat, setPositionLat] = useState("")
    const [position_long, setPositionLong] = useState("")
    const [status, setStatus] = useState("")
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(true)
    const [chargers, setChargers] = useState([])
    const [chargingspot, setChargingspot] = useState(null)

    // spara ny position (parkering) i cykeln

    // hämta information om cykeln som ska flyttas
    useEffect(() => {
        async function getScooter() {
            try {
                const res = await fetch(`${API_URL}/api/scooters/${id}`);
                if (!res.ok) throw new Error ("Kunde inte hämta cykeln.")
                const scooter = await res.json()
                setBattery(scooter[0].battery)
                setPositionLat(scooter[0].position_lat)
                setPositionLong(scooter[0].position_long)
                setStatus(scooter[0].status)
                setUser(scooter[0].user_id)
                // console.log(scooter[0].battery)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
    getScooter()
    }, [id])

    // hämta alla parkeringsplatser
      
    useEffect(() => {
        async function getChargers() {
            try {
                const result = await fetch(`${API_URL}/api/charging`, {
                method: "GET",
                headers: {"content-type": "application/json"}
            })

            const data = await result.json()
            // console.log(data)
            setChargers(data)

            } catch (err) {
                console.error(err)
            }

        }
    getChargers()
    })

    async function moveBike(e) {
      e.preventDefault();
      const body = {
        position_lat: chargingspot.position_lat,
        position_long: chargingspot.position_long
      }

        // skicka till backend, uppdatera position på cykeln
        // ladda batteriet
        try {
            const move = await fetch(`${API_URL}/api/scooters/update/${id}`,
                { 
                    method: "PUT",
                    headers: { "content-type": "application/json"},
                    body: JSON.stringify( body )
                }
                )
                if (!move.ok) throw new Error ("kunda inte flytta cykeln.")

                const value = 100
                const charge = await fetch(`${API_URL}/api/scooters/${id}/battery/${value}`,
                    {
                        method: "PUT",
                    }
                )
                if (!charge.ok) throw new Error ("kunda inte ladda cykeln.")

                const result = await fetch(`${API_URL}/api/charging/update/${chargingspot.id}/${id}`,
                    {
                        method: "PUT",
                    }
                )
                if (!result.ok) throw new Error ("kunda inte uppdatera laddare med scooter_id.")

                navigate("/admin-cyklar")

            
        } catch (err) {
            console.error(err)
        }

    }

    function handleChange(e) {
        const parkingId = e.target.value
        const chosenCharger = chargers.find(p => p.id.toString() === parkingId)
        setChargingspot(chosenCharger)
    }

  return (
    <>
      <div>
        <h1> Flytta cykel till laddare.</h1>
        <form onSubmit={moveBike}>
            <p>Scooter-id: {id}<br></br>
            Batteri: {battery}%<br></br>
            Status: {status}<br></br>
            Position: {position_lat}, {position_long}<br></br>
            Användar-id: {user}</p>
            <br></br>
            <label>Välj laddare:</label><br></br>
            <select name="laddare" onChange={handleChange}>
                <option>Välj...</option>
                {chargers
                .filter(charger => charger.scooter_id === null)
                .map((charger) => (
                    <option value={charger.id} key={charger.id}>Ladd-ID: {charger.id} Position: {charger.position_lat}, {charger.position_long} </option>
                ))}
            </select><br></br>
            <br></br>
            <button type="submit">Spara</button>
            </form><br></br>
            <br></br>
      </div>
    </>
  )
}

