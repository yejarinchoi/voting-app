import React from "react";

import {
    Paper,
    Grid,
    Typography,
    Button
} from '@mui/material'

import AppButtonBar from "./shared/AppBar.jsx"

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
