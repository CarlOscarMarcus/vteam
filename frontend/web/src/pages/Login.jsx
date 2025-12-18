import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/UserContext';

// min dator, hemma
// const backendURL = "192.168.32.7"

// min dator, hos mamma och pappa
const backendURL = "192.168.1.103"


async function LoginBackend(email, password) {
    const result = await fetch(`http://${backendURL}:3000/api/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
    })

    const data = await result.json()

    if (result.ok) {
        // console.log(`${data} = data`)
        console.log(`${email} is logged in`)
        
        return data.token
    } else {
        throw new Error(data.error)
    }

}

export default function Login() {
    const navigate = useNavigate();
    const { LogIn, isAdmin, loggedIn, loadingUser } = useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const LoginUser = async () => {
        try {
            const token = await LoginBackend(email, password)
            // sessionStorage.setItem("token", token);
            LogIn(token)
            
        } catch (err) {
            console.error(err)
        }
    }
  useEffect(() => {
    if (!loggedIn || loadingUser) return;

    if (isAdmin) {
      navigate("/admin-kunder");
    } else {
      navigate("/profile");
    }
  }, [loggedIn, loadingUser, isAdmin, navigate]);

  return (
    <>
      <div>
        <h1> Logga in</h1>
        <form onSubmit={(e) => { e.preventDefault(); LoginUser(); }} className="login-form">

        <label>E-post: </label>
        <br></br>
        <input 
        placeholder="E-post" 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}></input>

        <br></br>
        <label>Lösenord: </label>
        <br></br>
        <input 
        placeholder="Lösenord" 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}></input>
        
        <br></br>
        <input type="submit" value="Logga in"></input>
        </form>
        <br></br>
        <br></br>

      </div>
    </>
  )
}
