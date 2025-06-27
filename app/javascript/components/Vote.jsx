import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import AppButtonBar from "./shared/AppBar";
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const Vote = ({ performers, userEmail }) => {

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
        <Paper sx={{flexGrow: 1, margin: 2, width: '80%'}}>
            <AppButtonBar userEmail={ userEmail }></AppButtonBar>
            <Typography variant="h3" sx={{ margin: 2 }}>Cast your vote today!</Typography>
            <form onSubmit={chooseExistingPerformer} className="existing-performer-form">
                <FormControl sx={{ margin: 2 }}>
                    <FormLabel id="existing-performers">List of Performers</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="existing-performers-radio-buttons-group"
                        value={existingPerformerId}
                        onChange={handleChange}
                    >
                        {performers.map((performer) => (
                            <label key={performer.name}>
                                <FormControlLabel value={String(performer.id)} control={<Radio />} label={performer.name} />
                            </label>
                        ))}
                    </RadioGroup>
                    <Button type="submit" variant="contained">Vote</Button>
                </FormControl>
            </form>

            <Divider></Divider>

            <form onSubmit={createNewPerformer} className="new-performer-form">
                <label>
                    Or, add a new candidate:
                    <input
                        type="text"
                        name="performer-name"
                        value={newPerformerName}
                        onChange={setPerformerName}
                    />
                </label>
                <Button type="submit" variant="contained">Vote</Button>
                <div>{message}</div>
            </form>
        </Paper>
    );
};

export default Vote;



