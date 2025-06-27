import React, { useState } from 'react';
import AppButtonBar from "./shared/AppBar";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

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
        <Box sx={{flexGrow: 1, margin: 2}}>
            <AppButtonBar></AppButtonBar>
            <form onSubmit={handleSubmit} className="login-form">
                <Stack spacing={2}>
                    <Item>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input name="email" type="email" value={formData.email} onChange={handleChange} required/>
                        </div>
                    </Item>
                    <Item>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input name="password" type="password" value={formData.password} onChange={handleChange}
                                   required/>
                        </div>
                    </Item>
                    <Item>
                        <div className="form-group">
                            <label htmlFor="zip_code">Zip Code:</label>
                            <input name="zip_code" type="text" value={formData.zip_code} onChange={handleChange}
                                   required/>
                        </div>
                    </Item>

                </Stack>
                <Grid container
                      spacing={2}
                      sx={{
                          justifyContent: "center",
                          alignItems: "center",
                      }}
                >
                    <Button type="submit">Log In</Button>
                    <div>{message}</div>
                </Grid>
            </form>
        </Box>
    );
};

export default SignIn;



