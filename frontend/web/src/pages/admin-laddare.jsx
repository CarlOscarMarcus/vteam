// Översikt laddare
import { useEffect, useState } from "react"
// Cykelöversikt

// min dator, hemma
// const backendURL = "192.168.32.7"

// min dator, hos mamma och pappa
const backendURL = "192.168.1.103"

export default function AdminChargers() {
  const [visibleCount, setVisibleCount] = useState(5)
  const [chargers, setChargers] = useState([])
  useEffect(() => {
    async function getChargers() {
  try {
    const result = await fetch(`http://${backendURL}:3000/api/charging`, {
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

  // Om det finns många cyklar så kommer bara några i taget visas.
  const visibleChargers = chargers.slice(0, visibleCount)

  const loadMore = () => {
    setVisibleCount((prev) => prev + 5)
  }

  return (
    <>
      <div>
        <h1>Alla laddstationer</h1>
            {visibleChargers.map((charger) => (
            <div className="chargingList" key={charger.id}>
            <p><strong>
              Ladd-ID: {charger.id}
            </strong></p>
            <p>Position:  {charger.position_lat}, {charger.position_long}<br></br>
            Status: {charger.status}<br></br></p>
            <br></br>
            </div>
            
          ))}
          {visibleCount < chargers.length && (
          <button onClick={loadMore}>Ladda fler...</button>
        )}
      </div>
    </>
  )
}
