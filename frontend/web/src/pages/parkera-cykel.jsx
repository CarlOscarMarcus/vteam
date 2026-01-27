import React, { Component }  from 'react';
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
// flytta cykel till valfri parkering.

const API_URL = import.meta.env.VITE_API_URL;


export default function ParkScooter() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [battery, setBattery] = useState("")
    const [position_lat, setPositionLat] = useState("")
    const [position_long, setPositionLong] = useState("")
    const [status, setStatus] = useState("")
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(true)
    const [parkings, setParkings] = useState([])
    const [parkingspace, setParkingspace] = useState(null)

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
        async function getParkings() {
            try {
                const result = await fetch(`${API_URL}/api/parking`, {
                method: "GET",
                headers: {"content-type": "application/json"}
            })

            const data = await result.json()
            // console.log(data)
            setParkings(data)

            } catch (err) {
                console.error(err)
            }

        }
    getParkings()
    })

    async function moveBike(e) {
      e.preventDefault();
      const body = {
        position_lat: parkingspace.position_lat,
        position_long: parkingspace.position_long
      }
      console.log(body)
      console.log(id)
        // skicka till backend, uppdatera position på cykeln
        try {
            const res = await fetch(`${API_URL}/api/scooters/update/${id}`,
                { 
                    method: "PUT",
                    headers: { "content-type": "application/json"},
                    body: JSON.stringify( body )
                }
                )
                if (!res.ok) throw new Error ("kunda inte flytta cykeln.")
                 navigate("/admin-cyklar")
            
        } catch (err) {
            console.error(err)
        }

    }

    function handleChange(e) {
        const parkingId = e.target.value
        const chosenparking = parkings.find(p => p.id.toString() === parkingId)
        setParkingspace(chosenparking)
    }

  return (
    <>
      <div>
        <h1> Flytta cykel till parkering.</h1>
        <form onSubmit={moveBike}>
            <p>Scooter-id: {id}<br></br>
            Batteri: {battery}%<br></br>
            Status: {status}<br></br>
            Position: {position_lat}, {position_long}<br></br>
            Användar-id: {user}</p>
            <br></br>
            <label>Välj parkering:</label><br></br>
            <select name="parkering" onChange={handleChange}>
                <option>Välj...</option>
                {parkings.map((parking) => (
                    <option value={parking.id} key={parking.id}>Parkerings-ID: {parking.id} Position: {parking.position_lat}, {parking.position_long} </option>
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

