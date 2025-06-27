import React, { useState } from 'react';

const Vote = ({ voterId, performers }) => {

    const [newPerformerName, setName] = useState('');
    const [message, setMessage] = useState('');
    const [existingPerformerId, setSelected] = useState('');

    const setPerformerName = (e) => {
        setName(e.target.value);
    }

    const handleChange = (e) => {
        setSelected(e.target.value);
    };

    const chooseExistingPerformer = async event => {
        event.preventDefault(); // Prevent default form submission behavior

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        debugger
        try {
            const response = await fetch(`/performers/cast_vote`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify({ performer: { performer_id: existingPerformerId } }),
            });

            const data = await response.json();
            if (response.ok) {
                window.location.href = '/';
            } else {
                setMessage(`Error: ${data.errors.join(', ')}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage('Something went wrong.');
        }
    };

    const createNewPerformer = async event => {
        event.preventDefault(); // Prevent default form submission behavior

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        debugger
        try {
            const response = await fetch(`/performers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify({ performer: { name: newPerformerName } }),
            });

            const data = await response.json();
            if (response.ok) {
                window.location.href = '/';
            } else {
                setMessage(`Error: ${data.errors.join(', ')}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage('Something went wrong.');
        }
    };

    return (
        <div className="login-container">
            <h2>Cast your vote today!</h2>
            <form onSubmit={chooseExistingPerformer} className="existing-performer-form">
                {performers.map((performer) => (
                    <label key={performer.name}>
                        <input
                            type="radio"
                            name="performer-${performer.id}"
                            value={performer.id}
                            checked={existingPerformerId === String(performer.id)}
                            onChange={handleChange}
                        />
                        {performer.name}
                    </label>
                ))}
                <button type="submit">Vote</button>
            </form>
            <form onSubmit={createNewPerformer} className="new-performer-form">
                <label>
                    <input
                        type="text"
                        name="performer-name"
                        value={newPerformerName}
                        onChange={setPerformerName}
                    />
                    Or, add a new candidate:
                </label>
                <button type="submit">Vote</button>
                <div>{message}</div>
            </form>
        </div>
    );
};

export default Vote;



