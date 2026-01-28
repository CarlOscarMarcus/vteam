import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/styles/main.scss'
import 'leaflet/dist/leaflet.css';
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context';
import { useAuth } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <UserProvider>
    <BrowserRouter>
    
      <App />
      
    </BrowserRouter>
    </UserProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
