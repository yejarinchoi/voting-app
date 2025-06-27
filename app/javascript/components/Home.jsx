import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppButtonBar from "./shared/AppBar.jsx"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {Typography} from "@mui/material";

const theme = createTheme(); // You can customize this later

const Home = ({ message, userEmail }) => {
  return (
      <Paper sx={{ flexGrow: 1, margin: 2, width: '80%' }}>
          <AppButtonBar userEmail={ userEmail }></AppButtonBar>
          <Grid container
                spacing={2}
                margin={2}
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    justifyItems: "center"
                }}
          >
              <Grid size={12}>
                  <Typography variant="h3" sx={{ margin: 2 }}>{ message }</Typography>
              </Grid>

              <Grid size={6}>
              <Button href="/sign_in">Sign In to Vote</Button>
              </Grid>
              <Grid size={6}>
                  <Button sx={{ cursor:'pointer' }} href="/results">View Results</Button>
              </Grid>
          </Grid>
      </Paper>
  );
};

export default Home;
