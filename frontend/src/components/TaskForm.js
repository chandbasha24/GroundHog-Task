import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ taskEdit, TaskAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (taskEdit) {
            setTitle(taskEdit.title);
            setDescription(taskEdit.descripSStion);
            setStatus(taskEdit.status);
            setPriority(taskEdit.priority);
            setDueDate(taskEdit.dueDate ? new Date(taskEdit.dueDate).toISOString().substring(0, 10) : '');
        }
    }, [taskEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const task = {
            title,
            description,
            status,
            priority,
            dueDate
        };

        try {
            if (taskEdit) {

                await axios.put(`http://localhost:5000/tasks/${taskEdit._id}`, task);
            } else {

                await axios.post('http://localhost:5000/tasks', task);
            }
            TaskAdd();
            setTitle('');
            setDescription('');
            setStatus('Pending');
            setPriority('Medium');
            setDueDate('');
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <div>
            <h2>{taskEdit ? 'Edit Task' : 'Add New Task'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <button type="submit">{taskEdit ? 'Update' : 'Add'} Task</button>
            </form>
        </div>
    );
};

export default TaskForm;