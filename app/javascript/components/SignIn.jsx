import React, { useState } from 'react';

const SignIn = ({ title }) => {

    const [formData, setFormData] = useState({ email: '', password: '', zip_code: ''});
    const [message, setMessage] = useState('');

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async event => {
        event.preventDefault(); // Prevent default form submission behavior

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

        debugger
        try {
            const response = await fetch('/voters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify({ voter: formData }),
            });

            const data = await response.json();
            if (response.ok) {
                window.location.href = '/vote';
                setMessage(`Success: ${data.message}`);
            } else {
                setMessage(`Error: ${data.errors.join(', ')}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage('Something went wrong.');
        }
    };

    // Basic validation
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>{title}</h2>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input name="password" type="password" value={formData.password} onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="zip_code">Zip Code:</label>
                    <input name="zip_code" type="zipcode" value={formData.zip_code} onChange={handleChange} required/>
                </div>
                <button type="submit">Log In</button>
                <div>{message}</div>
            </form>
        </div>
    );
};

export default SignIn;



