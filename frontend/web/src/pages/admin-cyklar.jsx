import React, { Component }  from 'react';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

// Cykelöversikt

const API_URL = import.meta.env.VITE_API_URL;


export default function AdminBikes() {
  const [visibleCount, setVisibleCount] = useState(5)
  const [bikes, setBikes] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    async function getBikes() {
  try {
    const result = await fetch(`${API_URL}/api/scooters`, {
    method: "GET",
    headers: {"content-type": "application/json"}
    })

    const data = await result.json()
    // console.log(data[0])
    setBikes(data)

  } catch (err) {
    console.error(err)
  }

  }
  getBikes()
  }, [])

  // Om det finns många cyklar så kommer bara några i taget visas.
  const visibleBikes = bikes.slice(0, visibleCount)

  const loadMore = () => {
    setVisibleCount((prev) => prev + 5)
  }

  // flytta cykel till parkeringsplats
  function parking(id) {
      navigate(`/parkera-cykel/${id}`)
  }

  //flytta cykel till laddare
  function charge(id) {
    navigate(`/ladda-cykel/${id}`)
  }

  //cykel på service
  function service(id) {
    navigate(`/service-cykel/${id}`)
  }

  return (
    <>
      <div>
        <h1> Cykelöversikt</h1>
        <h3> Alla cyklar i systemet</h3>
        
          {visibleBikes.map((bike) => (
            <div className="bikeList" key={bike.id}>
            <p><strong>
              Cykel-ID: {bike.id}
            </strong></p>
            <p>Batteri: {bike.battery}%<br></br>
            Position:  {bike.position_lat}, {bike.position_long}<br></br>
            Status: {bike.status}<br></br>
            AnvändarID: {bike.user_id}<br/>
            Ledig: {bike.is_available ? "Ja" : "Nej" }</p>
            {!bike.user_id
            ? (
              <>
              <button onClick={() => parking(bike.id)} style={{color: "green"}}>Parkera</button><br></br>
              <button onClick={() => charge(bike.id)} style={{color: "green"}}>Ladda</button><br></br>
              <button onClick={() => service(bike.id)} style={{color: "green"}}>Service</button><br></br>


              </>
            ) : (
              <p style={{color: "red"}}>Cykeln är i användning.</p>
            )}
            

            </div>
            
          ))}
          {visibleCount < bikes.length && (
          <button onClick={loadMore}>Ladda fler...</button>
        )}
      </div>
    </>
  )
}
