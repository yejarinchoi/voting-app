import React, { useState } from 'react';
import AppButtonBar from "./shared/AppBar";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

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

const SignIn = () => {

    const [formData, setFormData] = useState({ email: '', password: '', zip_code: ''});
    const [message, setMessage] = useState('');

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async event => {
        event.preventDefault(); // Prevent default form submission behavior

        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

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
                setMessage(`Error: ${ Array.isArray(data.errors) ? data.errors.join(', ') : data.errors }`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage('Something went wrong.');
        }
    };

    // Basic validation
    return (
        <Paper sx={{flexGrow: 1, margin: 2, width: '80%'}}>
            <AppButtonBar></AppButtonBar>
            <form onSubmit={handleSubmit} className="login-form">
                <Grid container
                      spacing={2}
                      margin={2}
                      sx={{
                          justifyContent: "center",
                          alignItems: "center",
                          justifyItems: "center"
                      }}
                >
                    <Grid size={12} container sx={{ justifyContent: "center", alignItems: "center" }} >
                        <Grid>
                            <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required></TextField>
                        </Grid>
                    </Grid>
                    <Grid size={12} container sx={{ justifyContent: "center", alignItems: "center" }} >
                        <Grid>
                            <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required></TextField>
                        </Grid>
                    </Grid>
                    <Grid size={12} container sx={{ justifyContent: "center", alignItems: "center" }} >
                        <Grid>
                            <TextField label="Zip Code" name="zip_code" type="zip_code" value={formData.zip_code} onChange={handleChange} required></TextField>
                        </Grid>
                    </Grid>
                    <Button type="submit">Log In</Button>
                    <div>{message}</div>
                </Grid>
            </form>
        </Paper>
    );
};

export default SignIn;



