import React, { Component }  from 'react';
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
// flytta cykel till valfri laddare.

const API_URL = import.meta.env.VITE_API_URL;


export default function ChargeScooter() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [battery, setBattery] = useState("")
    const [position_lat, setPositionLat] = useState("")
    const [position_long, setPositionLong] = useState("")
    const [status, setStatus] = useState("")
    const [user, setUser] = useState("")
    const [_loading, setLoading] = useState(true)
    const [chargers, setChargers] = useState([])
    const [chargingspot, setChargingspot] = useState(null)

    const currentCharger = chargers.find(
    c => c.scooter_id === Number(id)
    )

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
    },[] )

    async function moveBike(e) {
      e.preventDefault();
      const body = {
        position_lat: chargingspot.position_lat,
        position_long: chargingspot.position_long
      }

        // skicka till backend, uppdatera position på cykeln
        // ladda batteriet
        try {
            // uppdatera cykelns position
            const move = await fetch(`${API_URL}/api/scooters/update/${id}`,
                { 
                    method: "PUT",
                    headers: { "content-type": "application/json"},
                    body: JSON.stringify( body )
                }
                )
                if (!move.ok) throw new Error ("kunda inte flytta cykeln.")

                // uppdatera batteri
                const value = 100
                const charge = await fetch(`${API_URL}/api/scooters/${id}/battery/${value}`,
                    {
                        method: "PUT",
                    }
                )
                if (!charge.ok) throw new Error ("kunda inte ladda cykeln.")

                // koppla till specifik laddare
                const result = await fetch(`${API_URL}/api/charging/update/${chargingspot.id}/${id}`,
                    {
                        method: "PUT",
                    }
                )
                if (!result.ok) throw new Error ("kunda inte uppdatera laddare med scooter_id.")
                // uppdatera status till charging
                const res = await fetch(`${API_URL}/api/scooters/${id}/status`,
                    {
                        method: "PUT",
                        headers: { "content-type": "application/json"},
                        body: JSON.stringify({status: "charging"})
                    }
                )
                if (!res.ok) throw new Error ("kunda inte uppdatera status.")
                setStatus("charging")

                navigate("/admin-cyklar")

            
        } catch (err) {
            console.error(err)
        }

    }

    async function stopCharging() {
        try {
            await fetch(`${API_URL}/api/charging/free/${currentCharger.id}`,
                {method: "PUT"}
            )

            await fetch(`${API_URL}/api/scooters/${id}/status`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ status: "ok" })
            })
            setStatus("ok")
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
      <h1>Flytta cykel till laddare</h1>

      <p>
        Scooter-id: {id}<br />
        Batteri: {battery}%<br />
        Status: {status}<br />
        Position: {position_lat}, {position_long}<br />
        Användar-id: {user}
      </p>

      {status !== "charging" && (
        <form onSubmit={moveBike}>
          <label>Välj laddare:</label><br />
          <select onChange={handleChange} required>
            <option value="">Välj...</option>
            {chargers
              .filter(c => c.scooter_id === null)
              .map(c => (
                <option key={c.id} value={c.id}>
                  Laddare #{c.id}
                </option>
              ))}
          </select>
          <br /><br />
          <button type="submit">Starta laddning</button>
        </form>
      )}

      {status === "charging" && currentCharger && (
        <>
          <p>Laddar vid laddare #{currentCharger.id}</p>
          <button
            onClick={stopCharging}
            style={{ background: "darkred", color: "white" }}
          >avsluta laddning
          </button>
        </>
      )}
    </div>
    </>
  )
}

