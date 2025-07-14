import * as React from 'react';

import {
    Typography,
    AppBar,
    Box,
    Toolbar,
    Button,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const ButtonAppBar = ({ userEmail }) => {
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
                    { !userEmail && <Button color="inherit" href="/sign_in">Sign In</Button>}
                    { userEmail && <p>You're signed in as {userEmail}!</p>}
                    { userEmail && <Button color="inherit" href="/sign_out">Sign Out</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default ButtonAppBar