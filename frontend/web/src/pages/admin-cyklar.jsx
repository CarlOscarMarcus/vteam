import { useEffect, useState } from "react"
// Cykelöversikt

// min dator, hemma
// const backendURL = "192.168.32.7"

// min dator, hos mamma och pappa
// const backendURL = "192.168.1.103"

const backendURL = "localhost"

export default function AdminBikes() {
  const [visibleCount, setVisibleCount] = useState(5)
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

  // Om det finns många cyklar så kommer bara några i taget visas.
  const visibleBikes = bikes.slice(0, visibleCount)

  const loadMore = () => {
    setVisibleCount((prev) => prev + 5)
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
            AnvändarID: {bike.user_id}</p>
            <br></br>
            </div>
            
          ))}
          {visibleCount < bikes.length && (
          <button onClick={loadMore}>Ladda fler...</button>
        )}
      </div>
    </>
  )
}
