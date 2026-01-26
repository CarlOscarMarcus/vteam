// Parkeringsöversikt
import { useEffect, useState } from "react"
// Cykelöversikt
const API_URL = import.meta.env.VITE_API_URL;

export default function AdminParkings() {
  const [visibleCount, setVisibleCount] = useState(5)
  const [parkings, setParkings] = useState([])
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

  // Om det finns många cyklar så kommer bara några i taget visas.
  const visibleParkings = parkings.slice(0, visibleCount)

  const loadMore = () => {
    setVisibleCount((prev) => prev + 5)
  }

  return (
    <>
      <div>
        <h1>Alla parkeringar</h1>
            {visibleParkings.map((parking) => (
            <div className="parkingList" key={parking.id}>
            <p><strong>
              Parkerings-ID: {parking.id}
            </strong></p>
            <p>Position:  {parking.position_lat}, {parking.position_long}<br></br>
            Status: {parking.status}<br></br>
            Parkerade cyklar: {parking.scooter_id}</p>
            <br></br>
            </div>
            
          ))}
          {visibleCount < parkings.length && (
          <button onClick={loadMore}>Ladda fler...</button>
        )}
      </div>
    </>
  )
}
