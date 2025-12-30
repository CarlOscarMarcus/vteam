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

  function parking(id) {
      navigate(`/parkera-cykel/${id}`)
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
            <button onClick={() => parking(bike.id)}>Parkera</button><br></br>

            </div>
            
          ))}
          {visibleCount < bikes.length && (
          <button onClick={loadMore}>Ladda fler...</button>
        )}
      </div>
    </>
  )
}
