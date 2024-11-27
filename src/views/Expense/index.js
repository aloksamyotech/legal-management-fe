/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
import AddExpense from './AddExpense';

// ----------------------------------------------------------------------

const caseData = [
  {
    id: 1,
    Client: 'petter',
    Advocate: 'John doe',
    Matter:"Criminal Offense",
    Date: '20/11/2024',
    Court:"District Court",
    PoliceStation:"Downtown Police Station",
    Judge:"Chief Justice",
    Title:"Court Case",
    action: 'Edit'
  }
];

const Expenses= () => {
  const [openAdd, setOpenAdd] = useState(false);
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Title',
      headerName: 'Title',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Date',
      headerName: 'Date',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'Client',
      headerName: 'Client',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Matter',
      headerName: 'Matter',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Advocate',
      headerName: 'Advocate',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Court',
      headerName: 'Court',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    
    {
      field: 'Judge',
      headerName: 'Judge',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'PoliceStation',
      headerName: 'Police Station',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1
      // eslint-disable-next-line arrow-body-style
    }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <AddExpense open={openAdd} handleClose={handleCloseAdd} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Case Details</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Create Expense
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={caseData}
                columns={columns}
                getRowId={(row) => row.id}
                 slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default Expenses;
