import React, { useState } from 'react';
import GuessNumberApp from './GuessNumberApp';
import MiniTodoList from './MiniTodoList';

export default function App() {
    const [activePage, setActivePage] = useState('todo');

    return (
        <div className="container py-5">
            <nav className="mb-4">
                <div className="btn-group">
                    <button onClick={() => setActivePage('todo')} className={`btn ${activePage === 'todo' ? 'btn-primary' : 'btn-outline-primary'}`}>
                        Mini To-Do App
                    </button>
                    <button onClick={() => setActivePage('guess')} className={`btn ${activePage === 'guess' ? 'btn-success' : 'btn-outline-success'}`}>
                        Számkitaláló App
                    </button>
                </div>
            </nav>

            {activePage === 'todo' ? <MiniTodoList /> : <GuessNumberApp />}
        </div>
    );
}
