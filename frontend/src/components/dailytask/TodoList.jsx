import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const TrashIcon = () => ( <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> );

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const { token } = useContext(AuthContext);

    const authAxios = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/api/tasks`, headers: { Authorization: `Bearer ${token}` } });

    useEffect(() => {
        const fetchTasks = async () => {
            if (!token) {
                console.log("No token available for fetching tasks");
                return;
            }
            try {
                console.log("Fetching tasks with token:", token.substring(0, 20) + "...");
                const res = await authAxios.get('/');
                console.log("Tasks fetched successfully:", res.data);
                setTasks(res.data.data || []);
            } catch (error) { 
                console.error("Error fetching tasks:", error.response?.data || error.message);
                setTasks([]); // Set empty array on error
            }
        };
        fetchTasks();
    }, [token]);

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (newTask.trim() === '') return;
        try {
            const res = await authAxios.post('/', { text: newTask });
            setTasks([...tasks, res.data.data]);
            setNewTask('');
        } catch (error) { console.error("Error adding task:", error); }
    };

    const handleToggleTask = async (id, currentStatus) => {
        try {
            const res = await authAxios.put(`/${id}`, { completed: !currentStatus });
            setTasks(tasks.map(task => task._id === id ? res.data.data : task));
        } catch (error) { console.error("Error updating task:", error); }
    };

    const handleDeleteTask = async (id) => {
        try {
            await authAxios.delete(`/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) { console.error("Error deleting task:", error); }
    };

    return (
        <div className="todo-list-widget">
            <header className="widget-header">
                <h3 className="widget-title">Today's Checklist</h3>
            </header>
            <div className="widget-body">
                 <form onSubmit={handleAddTask} className="add-task-form">
                    <input type="text" className="add-task-input" placeholder="Add a new task..." value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                    <button type="submit" className="add-task-btn">Add Task</button>
                </form>
                <ul className="task-list">
                    {tasks.map(task => (
                        <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                            <div className="task-content" onClick={() => handleToggleTask(task._id, task.completed)}>
                                <span className="custom-checkbox"></span>
                                <span className="task-text">{task.text}</span>
                            </div>
                            <button onClick={() => handleDeleteTask(task._id)} className="delete-task-btn"><TrashIcon /></button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;
