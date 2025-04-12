import React, { useState } from 'react';

export default function GuessNumberApp() {
    const [target, setTarget] = useState(() => Math.floor(Math.random() * 10) + 1);
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleGuess = () => {
        const num = parseInt(guess);
        if (isNaN(num)) return;
        if (num === target) {
            setFeedback('🎉 Talált!');
        } else if (num < target) {
            setFeedback('🔻 Túl alacsony');
        } else {
            setFeedback('🔺 Túl magas');
        }
    };

    const resetGame = () => {
        setTarget(Math.floor(Math.random() * 10) + 1);
        setGuess('');
        setFeedback('');
    };

    return (
        <div className="card p-4 shadow-sm">
            <h2 className="card-title mb-3">Számkitaláló (1-10)</h2>
            <div className="input-group mb-3">
                <input
                    type="number"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    className="form-control"
                />
                <button onClick={handleGuess} className="btn btn-success">Tipp</button>
                <button onClick={resetGame} className="btn btn-secondary ms-2">Újrakezd</button>
            </div>
            {feedback && <div className="alert alert-info mt-3">{feedback}</div>}
        </div>
    );
}
