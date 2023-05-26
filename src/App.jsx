import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./Components/Header"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { Toaster } from "react-hot-toast"
import { useContext, useEffect } from "react"
import axios from "axios"
import { context, serverURL } from "./main"

function App() {

  const { user, setUserData, setIsAuthenticated, setLoading } = useContext(context)

  useEffect(() => {
    setLoading(true)
    axios.get(`${serverURL}/users/me`, { withCredentials: true }).then((res) => {
      setUserData(res.data.user)
      setIsAuthenticated(true)
      setLoading(false)
    })
      .catch((err) => {
        setUserData(null)
        setIsAuthenticated(false)
        setLoading(false)
      })
  }, [])


  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
