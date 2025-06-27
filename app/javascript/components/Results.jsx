import React, { useMemo } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';


const Results = ({ tally }) => {
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

    return <MaterialReactTable table={table} />;
};

export default Results;



