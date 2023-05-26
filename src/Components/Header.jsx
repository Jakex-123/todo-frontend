import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { context, serverURL } from '../main'
import axios from 'axios'
import { toast } from 'react-hot-toast'

function Header() {

    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(context)

    const SubmitHandler = async () => {
        setLoading(true)
        try {
            await axios.get(`${serverURL}/users/logout`, {
                withCredentials: true
            })
            toast.success('Logged Out Successfully')
            setIsAuthenticated(false)
            setLoading(false)
        }
        catch (err) {
            toast.error(err.response.data.message)
            console.log(err)
            setIsAuthenticated(true)
            setLoading(false)
        }
    }


    return (
        <nav className="header">
            <div><h2>Todo App.</h2></div>
            <article>
                <Link to={'/'}>Home</Link>
                {isAuthenticated && <Link to={'/profile'}>Profile</Link>}
                {isAuthenticated ? (<Link disabled={loading} onClick={SubmitHandler}>Logout</Link>) :
                    (<Link to={'/login'}>Login</Link>)}
            </article>
        </nav>
    )
}

export default Header