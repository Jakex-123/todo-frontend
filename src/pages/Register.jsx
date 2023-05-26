import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { context, serverURL } from '../main'
import { toast } from 'react-hot-toast';
import axios from 'axios';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(context)

    const SubmitHandler = async (e) => {
        setLoading(true)
        try {
            e.preventDefault();
            const data = await axios.post(`${serverURL}/users/new`, { name, email, password }, {
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
            toast.error('some error')
            setIsAuthenticated(false)
            setLoading(false)
        }
    }

    if (isAuthenticated) return <Navigate to={'/'} />

    return (
        <div className='login'>
            <section>
                <form onSubmit={SubmitHandler}>
                    <input type="text" required placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" required placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" required placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" setLoading={loading}>Sign Up</button>
                    <h4>OR</h4>
                    <Link to='/register'>Login</Link>
                </form>
            </section>
        </div>
    )
}

export default Register