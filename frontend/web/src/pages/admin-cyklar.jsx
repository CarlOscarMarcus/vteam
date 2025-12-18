import { useEffect, useState } from "react"
// Cykelöversikt

// min dator, hemma
// const backendURL = "192.168.32.7"

// min dator, hos mamma och pappa
const backendURL = "192.168.1.103"

export default function AdminBikes() {
const [bikes, setBikes] = useState([])
  useEffect(() => {
    async function getBikes() {
  try {
    const result = await fetch(`http://${backendURL}:3000/api/scooters`, {
    method: "GET",
    headers: {"content-type": "application/json"}
    })

    const data = await result.json()
    // console.log(data)
    setBikes(data)

  } catch (err) {
    console.error(err)
  }

  }
  getBikes()
  })


  return (
    <>
      <div>
        <h1> Cykelöversikt</h1>
        <h3> Alla cyklar i systemet</h3>
        
          {bikes.map((bike) => (
            <div className="bikeList" key={bike.id}>
            <p><strong>
              Cykel-ID: {bike.id}
            </strong></p>
            <p>Batteri: {bike.battery}%<br></br>
            Position:  {bike.position_lat}, {bike.position_long}<br></br>
            Status: {bike.status}<br></br>
            AnvändarID: {bike.user_id}</p>
            <br></br>
            </div>
            
          ))}
          
      </div>
    </>
  )
}
