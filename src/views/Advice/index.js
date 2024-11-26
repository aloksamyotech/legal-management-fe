/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
import Client from 'views/Client';
import AddAdvice from './AddAdvice';

// ----------------------------------------------------------------------

const clientData = [
  {
    id: 1,
    Client: 'petter',
    Advocate: 'John doe',
    Matter:"Criminal Offense",
    Date: '20/11/2024',
    Fee:"500",
    Status:"Approved",
    Payment:"unpaid",
    action: 'Edit'
  }
];

const Advice = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Client',
      headerName: 'Client',
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
      field: 'Date',
      headerName: 'Date',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'Matter',
      headerName: 'Matter',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Fee',
      headerName: 'Fee',
      flex: 1
    },
    
    
    {
      field: 'Status',
      headerName: 'Status',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'Payment',
      headerName: 'Payment',
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
      <AddAdvice open={openAdd} handleClose={handleCloseAdd} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Advice Details</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Create Advice
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={clientData}
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

export default Advice;
