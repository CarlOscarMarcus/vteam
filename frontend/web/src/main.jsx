import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style/main.scss'
import 'leaflet/dist/leaflet.css';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
