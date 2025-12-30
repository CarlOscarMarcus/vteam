import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
// flytta cykel till valfri parkering.

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


    // hämta parkeringsplatser och spara i variabel/objekt. Gör sedan scroll-lista av dessa att välja
    // hämta cykelinformation?
    // spara ny position (parkering) i cykeln


    // hämta information om cykeln som ska flyttas
    useEffect(() => {
        async function getScooter() {
            try {
                const res = await fetch(`${API_URL}/api/scooters/${id}`);
                if (!res.ok) throw new Error ("Kunde inte hämta cykeln.")
                const scooter = await res.json()
                setBattery(scooter.battery)
                setPositionLat(scooter.position_lat)
                setPositionLong(scooter.position_long)
                setStatus(scooter.status)
                setUser(scooter.user_id)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
    getScooter()
    }, [id])

  return (
    <>
      <div>
        <h1> Flytta cykel till parkering.</h1>
      </div>
    </>
  )
}

