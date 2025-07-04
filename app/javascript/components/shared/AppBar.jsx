import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const ButtonAppBar = ({ showSignIn, userEmail }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        href="/"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Music Fest Voting App
                    </Typography>
                    {showSignIn && <Button color="inherit" href="/sign_in">Sign In</Button>}
                    {!showSignIn && userEmail && <p>You're signed in as {userEmail}!</p>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default ButtonAppBar