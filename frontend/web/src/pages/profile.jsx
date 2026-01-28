// användarprofil med information om kundens konto
import React, { Component }  from 'react';
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from '../context';


export default function Profile() {
  const navigate = useNavigate()
  const { user, loggedIn, loadingUser } = useAuth()

  useEffect(() => {
    if (!loadingUser && !loggedIn) {
      navigate("/login")
    }
  }, [loggedIn, loadingUser, navigate])

  if (loadingUser) {
    return <p>Laddar användare...</p>
  }

  if (!user) {
    return <p>Kunde inte ladda användare</p>
  }

  return (
    <div>
      <h1>Användarprofil</h1>

      <p><strong>Namn:</strong> {user.name}</p>
      <p><strong>E-post:</strong> {user.email}</p>

      <hr />

      {/* <p>🛴 Resor</p>
      <p>💰 Saldo</p>
      <p>💸 Betala</p> */}
    </div>
  )
}
