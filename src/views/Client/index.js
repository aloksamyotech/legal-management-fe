/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
import AddClient from './AddClient';

// ----------------------------------------------------------------------
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const clientData = [
  {
    id: 1,
    Name: 'petter',
    Email:"john@gmail.com",
    phonenum: '9981923587',
    city:"stamford",
    state:"newyork",
    country:"America",
    action: 'Edit'
  }
];

const Client = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const breadcrumbs = [
    <Link underline="hover" key="1" color="secondary" href="/" >
      <HomeIcon sx={{marginTop:"2px"}} fontSize='small' />
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/dashboard/default"
    >
      Dashboard
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Client
    </Typography>,
  ];

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'Name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'Email',
      headerName: 'Email Address',
      flex: 1
    },
    {
      field: 'phonenum',
      headerName: 'Phone Number',
      flex: 1
    },
    {
      field: 'city',
      headerName: 'City',
      flex: 1
    },
    {
      field: 'state',
      headerName: 'State',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'country',
      headerName: 'Country',
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
    
      <AddClient open={openAdd} handleClose={handleCloseAdd} />
      <Container>
      <Stack direction="column" alignItems="center" mb={3}>
  <Card style={{ width: '100%', }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}  padding={2}>
      <Typography variant="h4">Client Details</Typography>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd} sx={{marginRight:"10px"}}>
        Create Client
      </Button> */}
    </Stack>
  </Card>
</Stack>

        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
              
                rows={clientData}
                columns={columns}
                getRowId={(row) => row.id}
                //  slots={{ toolbar: GridToolbar }}
                // slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default Client;
