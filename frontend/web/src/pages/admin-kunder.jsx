import { useEffect, useState } from "react"
// kundöversikt

// min dator, hemma
// const backendURL = "192.168.32.7"

// min dator, hos mamma och pappa
const backendURL = "192.168.1.103"

export default function CustomerList() {
const [customers, setCustomers] = useState([])
const [visibleCount, setVisibleCount] = useState(5)

  useEffect(() => {
    async function getCustomers() {
  try {
    const result = await fetch(`http://${backendURL}:3000/api/users`, {
    method: "GET",
    headers: {"content-type": "application/json"}
    })

    const data = await result.json()
    // console.log(data)
    setCustomers(data)

  } catch (err) {
    console.error(err)
  }

  }
  getCustomers()
  })

  // Om det finns många användare så kommer bara några i taget visas.
  const visibleCustomers = customers.slice(0, visibleCount)

  const loadMore = () => {
    setVisibleCount((prev) => prev + 5)
  }

  return (
    <>
      <div>
        <h1> Kundöversikt</h1>
        {visibleCustomers.map((customer)=>(
          <div className="customer-list" key={customer.id}>
            <p><strong>
              Användar-ID: {customer.id}
            </strong></p>
            <p>Namn: {customer.name}<br></br>
            E-post:  {customer.email}<br></br>
            Status: {customer.status}<br></br>
            Registrerad: {" "}
            {new Date(customer.created_at).toLocaleString("sv-SE")}</p>
            <br></br>

          </div>
        )) }
        {visibleCount < customers.length && (
          <button onClick={loadMore}>Ladda fler...</button>
        )}
      </div>
    </>
  )
}
