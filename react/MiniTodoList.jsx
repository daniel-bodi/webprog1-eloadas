import React, { useState } from 'react';

export default function MiniTodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const toggleTask = (index) => {
        const updated = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updated);
    };

    const deleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div className="card p-4 shadow-sm mini-todo">
            <h2 className="card-title mb-3">Mini To-Do Lista</h2>
            <div className="d-flex mb-3 todo-input">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="form-control me-2"
                    placeholder="Új feladat..."
                />
                <button onClick={addTask} className="btn btn-primary">Hozzáadás</button>
            </div>
            <ul className="list-unstyled">
                {tasks.map((task, index) => (
                    <li key={index}>
                        <span onClick={() => toggleTask(index)} style={{ cursor: 'pointer' }}>
                            {task.text}
                        </span>
                        <button onClick={() => deleteTask(index)} className="btn btn-sm btn-outline-danger ms-2">Törlés</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
