import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";
// Hantera användare

// min dator, hemma
// const backendURL = "192.168.32.7"

// min dator, hos mamma och pappa
// const backendURL = "192.168.1.103"

const backendURL = "localhost"

export default function AdminEdit() {
    const { id } = useParams()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    

    useEffect(() => {
      async function getUser() {
        try {

          const res = await fetch(`http://${backendURL}:3000/api/users/${id}` 
          );

          if (!res.ok) throw new Error("kunde inte hämta användaren.")

          const user = await res.json();

          setName(user.name)
          setEmail(user.email)
          setStatus(user.status)
        } catch (err) {
          console.error(err)
        } finally {
          setLoading(false)
        }
      }

      getUser()
    }, [id])

    

    async function handleSubmit(e) {
      e.preventDefault();

      try {
        const res = await fetch(`http://${backendURL}:3000/api/users/update/${id}`,
          {
            method: "PUT",
            headers: { "content-type": "application/json"},
            body: JSON.stringify({ name, email, status})
          }
        )
        if (!res.ok) throw new Error ("kunda inte uppdatera användare.")
        navigate("/admin-kunder")
      } catch (err) {
        console.error(err)
      }
    }


  return (
    <>
    
      <div>
        <h1> Hantera användare</h1>
            <form onSubmit={handleSubmit}>
            {/* <label>Användar-ID:</label>
            <input value={id}>{{id}}</input> */}

            <label>Namn:</label><br></br>
            <input 
            value={name} onChange={(e) => setName(e.target.value)}/>
            <br></br>

            <label>E-post:</label><br></br>
            <input 
            value={email} onChange={(e) => setEmail(e.target.value)}/><br></br>

            <label>Status:</label><br></br>
            <input 
            value={status} onChange={(e) => setStatus(e.target.value)}/><br></br>

            <button type="submit">Spara</button>
            </form><br></br>
            <br></br>

      </div>
    </>
  )
}