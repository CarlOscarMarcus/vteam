import React, { Component }  from 'react';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
// flytta cykel till service

const API_URL = import.meta.env.VITE_API_URL;


export default function Service() {
    // const navigate = useNavigate()
    const { id } = useParams()
    const [battery, setBattery] = useState("")
    const [position_lat, setPositionLat] = useState("")
    const [position_long, setPositionLong] = useState("")
    const [status, setStatus] = useState("")
    const [user, setUser] = useState("")
    // const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")
    const [repairs, setRepairs] = useState([])


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


    async function startrepair() {
        // starta repair med scooter_id
        try {
            const repair = await fetch(`${API_URL}/api/scooters/${id}/repairs/add`,
                { 
                    method: "POST",
                }
                )
                if (!repair.ok) throw new Error ("kunda inte starta serviceärende.")
                setMessage(`Serviceärende för cykel med id: ${id} startat.`)
                // ändra status till "service"
                const status = "service"
                const res = await fetch(`${API_URL}/api/scooters/${id}/status`,
                {
                    method: "PUT",
                    headers: { "content-type": "application/json"},
                    body: JSON.stringify({ status })
                })
                console.log(res)
                if (!res.ok) throw new Error ("kunde inte sätta cykel i service-läge")
                setStatus("service")
                repairstatus()
            
        } catch (err) {
            console.error(err)
        }

    }

    async function endrepair() {
        try {
            const repair = await fetch(`${API_URL}/api/scooters/${id}/repairs/end`,
                { 
                    method: "POST",
                }
                )
                if (!repair.ok) throw new Error ("kunda inte avsluta serviceärende.")
                setMessage(`Serviceärende för cykel med id: ${id} avslutat.`)

                // ändra status till "ok"
                const status = "ok"
                const res = await fetch(`${API_URL}/api/scooters/${id}/status`,
                {
                    method: "PUT",
                    headers: { "content-type": "application/json"},
                    body: JSON.stringify({ status })
                }
                )
                if (!res.ok) throw new Error ("kunde inte ta cykel ur service")
                setStatus("ok")
                repairstatus()
        } catch (err) {
            console.error(err)
        }
        console.log(`Ended repair for scooter with id: ${id}`)
    }

    async function repairstatus() {
    try {
        const status = await fetch(`${API_URL}/api/scooters/${id}/repairs`,
            {
                method: "GET"
            }
        )
        // console.log(status)
        if (!status.ok) throw new Error ("Kunde inte hämta servicestatus.")
        const data = await status.json()
        setRepairs(data)
        
    } catch(err) {
        console.error(err)
    }
}

    useEffect(() => {
        repairstatus()
    }, [id])


  return (
    <>
      <div>
        <h1> Cykelservice</h1>
            <p>Scooter-id: {id}<br></br>
            Batteri: {battery}%<br></br>
            Status: {status}<br></br>
            Position: {position_lat}, {position_long}<br></br>
            Användar-id: {user}</p>
            <br></br>
            {status !== "service" && (
            <button onClick={startrepair}>
                Starta serviceärende
            </button>
            )}

            {status === "service" && (
            <button onClick={endrepair}>
                Avsluta serviceärende
            </button>
            )}
            <br></br>
            <p>{message}</p>
            {repairs.length === 0 ? (
                <p>Ingen pågående service</p>
            ) : (
                repairs.map((repair) => ( 
                    <div key={repair.id}> 
                    <p>
                        Service-id: {repair.id} <br />
                        Påbörjad: {new Date(repair.start_day).toLocaleString()} <br />
                        Beräknad klar: {new Date(repair.estimated_repair).toLocaleString()} <br />
                        Status: {repair.status === 0 ? "Pågående" : "Avslutad"}
                    </p>
                    </div>
                ))
                
            )}


            <br></br>
      </div>
    </>
  )
}

