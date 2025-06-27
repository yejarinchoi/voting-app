import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppButtonBar from "./shared/AppBar.jsx"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';


const theme = createTheme(); // You can customize this later

const Home = ({ message }) => {
  return (
      <Box sx={{ flexGrow: 1, margin: 2 }}>
          <AppButtonBar showSignIn></AppButtonBar>
          <Grid container
                spacing={2}
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    justifyItems: "center"
                }}
          >
              <h1>{message}</h1>

              <Grid size={6}>
                  <Button href="/sign_in">Sign In to Vote</Button>
              </Grid>
              <Grid size={6}>
                  <Button href="/results">View Results</Button>
              </Grid>
          </Grid>
      </Box>
  );
};

export default Home;
