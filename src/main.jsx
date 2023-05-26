import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.scss'
import { createContext } from 'react'

export const serverURL = 'https://todo-backend-mzah.onrender.com/api/v1'

export const context = createContext({ isAuthenticated: false, loading: false, userData: null });

const AppWrapper = () => {
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState({})
  return (
    <context.Provider value={{ isAuthenticated, setIsAuthenticated, loading, setLoading, userData, setUserData }}>
      <App />
    </context.Provider>)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
