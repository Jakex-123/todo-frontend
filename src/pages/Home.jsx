import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { context, serverURL } from '../main'
import axios from 'axios'
import { useEffect } from 'react'
import TodoItem from '../Components/TodoItem'
import { Navigate } from 'react-router-dom'


function Home() {
    const [title, setTitle] = useState('')
    const [description, setdesc] = useState('')
    const [loading, setLoading] = useState(false)
    const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(false)

    const { isAuthenticated } = useContext(context);

    const updateHandler = async (id) => {
        try {
            const { data } = await axios.put(
                `${serverURL}/task/${id}`, {},
                {
                    withCredentials: true,
                }
            );

            toast.success(data.message);
            setRefresh((prev) => !prev);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    const deleteHandler = async (id) => {
        try {
            const { data } = await axios.delete(`${serverURL}/task/${id}`, {
                withCredentials: true,
            });

            toast.success(data.message);
            setRefresh((prev) => !prev);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        axios.get(`${serverURL}/task/my`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        }).then((res) => {
            setTasks(res.data.tasks);
        })
            .catch((e) => {
                toast.error(e.response.data.message);
            })
    }, [refresh])

    if (!isAuthenticated) { return <Navigate to={'/login'} /> }

    const SubmitHandler = async (e) => {
        setLoading(true)
        try {
            e.preventDefault();
            const { data } = await axios.post(`${serverURL}/task/new`, { title, description }, {
                withCredentials: true
            })
            console.log(data)
            toast.success(data.message)
            setTitle('')
            setdesc('')
            setLoading(false)
            setRefresh((prev) => !prev)
        }
        catch (err) {
            toast.error(err.response.data.message)
            setLoading(false)
        }
    }

    return (
        <div className='container'>
            <section className="todosContainer">
                <div className='login'>
                    <section>
                        <form onSubmit={SubmitHandler}>
                            <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                            <input type="text" placeholder='Description' value={description} onChange={(e) => setdesc(e.target.value)} />
                            <button type="submit" disabled={loading}>Add Task</button>
                        </form>
                    </section>
                </div>
            </section>
            <section className="todosContainer">
                {tasks.map((i) => (
                    <TodoItem
                        title={i.title}
                        description={i.description}
                        isCompleted={i.isCompleted}
                        updateHandler={updateHandler}
                        deleteHandler={deleteHandler}
                        id={i._id}
                        key={i._id}
                    />
                ))}
            </section>
        </div>
    )
}

export default Home