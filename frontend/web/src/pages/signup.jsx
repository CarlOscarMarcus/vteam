// Skapa formulär för att skapa konto. Namn, e-post och lösenord.
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/UserContext';
// min dator, hemma
// const backendURL = "192.168.32.7"

// min dator, hos mamma och pappa
// const backendURL = "192.168.1.103"

const backendURL = "localhost"


async function SignupBackend(name, email, password) {
      const result = await fetch(`http://${backendURL}:3000/api/auth/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, email, password}),
    })

    const data = await result.json()

    if (result.ok) {
        // console.log(`${data} = data`)
        console.log(`${email} har skapat ett nytt konto`)
        
        return data.token
    } else {
        throw new Error(data.error)
    }
}

export default function Signup() {
    const navigate = useNavigate();
    const { SignUp } = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const SignupUser = async () => {
        try {
            const token = await SignupBackend(name, email, password)
            // sessionStorage.setItem("token", token);
            // SignUp(token) // behövs detta?
            navigate("/login")
        } catch (err) {
            console.error(err)
        }
    }

  return (
    <>
    <div>
        <h1>Skapa konto</h1>
        <form onSubmit={(e) => { e.preventDefault(); SignupUser(); }} className="signup-form">

        <label>Namn: </label>
        <br></br>
        <input 
        placeholder="Namn"
        value={name} 
        type="text" 
        onChange={(e) => setName(e.target.value)} required></input><br></br>

        <label>E-post: </label>
        <br></br>
        <input 
        placeholder="E-post" 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} required></input>

        <br></br>
        <label>Lösenord: </label>
        <br></br>
        <input 
        placeholder="Lösenord" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} required></input>
        
        <br></br>
        <input type="submit" value="Skapa konto"></input>
       
        </form>
        <br></br>
        <br></br>

      </div>
    </>
  )
}
