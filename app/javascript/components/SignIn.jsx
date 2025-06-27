import React, { useState } from 'react';

const SignIn = ({ message }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        if (!email || !password || !zipcode) {
            setError('Please enter email, password, and zip code.');
            return;
        }

    };

    // Basic validation
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="zipcode">Password:</label>
                    <input
                        type="zipcode"
                        id="zipcode"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    );

};

export default SignIn;



