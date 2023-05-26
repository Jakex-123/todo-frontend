import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { context, serverURL } from '../main'
import { toast } from 'react-hot-toast';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(context)

    const SubmitHandler = async (e) => {
        setLoading(true)
        try {
            e.preventDefault();
            const data = await axios.post(`${serverURL}/users/login`, { email, password }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            })
            toast.success(data.data.message)
            setIsAuthenticated(true)
            setLoading(false)
        }
        catch (err) {
            toast.error(err.response.data.message)
            console.log(err)
            setIsAuthenticated(false)
            setLoading(false)
        }
    }

    if (isAuthenticated) return <Navigate to={'/'} />


    return (
        <div className='login'>
            <section>
                <form onSubmit={SubmitHandler}>
                    <input type="Email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="Password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" disabled={loading}>Login</button>
                    <h4>OR</h4>
                    <Link to='/register'>Sign Up</Link>
                </form>
            </section>
        </div>
    )
}

export default Login