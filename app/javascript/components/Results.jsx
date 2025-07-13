import React, { useMemo } from 'react';

import { Paper, Grid } from '@mui/material'
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

import AppButtonBar from "./shared/AppBar";

const Results = ({ tally, userEmail }) => {
    const columns = useMemo(
        () => [
            {
                accessorKey: 'name', //access nested data with dot notation
                header: 'Performer Name',
                size: 150,
            },
            {
                accessorKey: 'count',
                header: 'Number of Votes',
                size: 150,
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: tally
    });

    return (
        <Paper sx={{flexGrow: 1, margin: 2, width: '80%'}}>
            <AppButtonBar userEmail={userEmail}></AppButtonBar>
            <Grid container
                  spacing={2}
                  margin={2}
            >
                <Grid size={12}>
                    <MaterialReactTable table={table} />
                </Grid>
            </Grid>
        </Paper>
    )
};

export default Results;



