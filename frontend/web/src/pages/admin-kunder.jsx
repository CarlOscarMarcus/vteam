import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

// kundöversikt

// min dator, hemma
// const backendURL = "192.168.32.7"

// min dator, hos mamma och pappa
const backendURL = "192.168.1.103"



export default function CustomerList() {
const [customers, setCustomers] = useState([])
const [visibleCount, setVisibleCount] = useState(5)
const navigate = useNavigate()



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
  }, [])

  // Om det finns många användare så kommer bara några i taget visas.
  const visibleCustomers = customers.slice(0, visibleCount)

  const loadMore = () => {
    setVisibleCount((prev) => prev + 5)
  }

function editUser(id) {
  // navigate("/edit")
  console.log(`uppdatera ${id}`)
}

async function deleteUser(id) {
    const ok = window.confirm("Säkert? Borttagning är permanent.");
    if (!ok) return;

    try {
    await fetch(`http://${backendURL}:3000/api/users/delete/${id}`, {
    method: "DELETE",
    headers: {"content-type": "application/json"}
    })

    setCustomers((prev) => prev.filter((c) => c.id !== id));
  } catch (err) {
    console.error(err)
  }
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
            <button onClick={() => editUser(customer.id)}>Hantera</button><br></br>
            <button onClick={() => deleteUser(customer.id)}>Ta bort</button>

          </div>
        )) }
        {visibleCount < customers.length && (
          <button onClick={loadMore}>Ladda fler...</button>
        )}

        
      </div>
    </>
  )
}
