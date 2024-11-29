import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack, Button, Container, Typography, Box, Card, Avatar } from '@mui/material';
import { DataGrid, } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
import AddClient from './AddClient';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import clientData from './ClientData';
// ----------------------------------------------------------------------
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';



const Client = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const breadcrumbs = [
    <Link underline="hover" key="1" color="secondary" href="/" >
      <HomeIcon sx={{ marginTop: "2px" }} fontSize='small' />
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
      headerName: '#',
      flex: 0.5,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'profile',
      headerName: 'Client Profile',
      flex: 1.5,

      renderCell: (params) => <>
        <Avatar sx={{ marginLeft: "-10px" }} src={params.value.avatar} alt={params.value.Name}></Avatar>
        <Typography sx={{ marginLeft: "20px" }} spacing={2} >
          <Typography variant="h5">{params.value.Name}
            <CheckCircleIcon fontSize='10px' sx={{
              marginLeft: "5px", padding: 0, marginBottom: "-3px", color: "green"
            }} /> </Typography>
          <Typography variant="inherit">{params.value.Email}</Typography>
        </Typography>
      </>

    },

    {
      field: 'phonenum',
      headerName: 'Phone',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'city',
      headerName: 'City',
      flex: 1,
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
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="inherit"
          size="small"
          sx={{ fontSize: "40px", marginLeft: "-10px", "&:hover":{background: "none"}}}
        
        ><Link fontSize={0} color="inherit"
        href="/dashboard/client/clientview">
          <VisibilityIcon  color='secondary' sx={{
          "&:hover": {
            color: 'green'
          }
        }} /></Link>
        </Button>)
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
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">Client Details</Typography>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>

            </Stack>
          </Card>
        </Stack>

        <TableStyle>

          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <Stack sx={{ paddingBottom: "1rem", paddingRight: "1rem", }} direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>


                <TextField
                  variant="outlined"
                  color='secondary'
                  size="small"
                  inputProps={{ maxLength: 30 }}
                  sx={{ width: '20%', }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color='secondary' />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button color="secondary" variant="contained" size='large' onClick={handleOpenAdd} sx={{ marginBottom: "15px", fontSize: "40px", marginRight: "2rem", backgroundColor: "#673ab7", boxShadow: "none", borderRadius: "15px" }}>
                  <AddIcon color='white'
                    fontSize="medium" />

                </Button>
              </Stack>
              <DataGrid
                rowHeight={80}
                rows={clientData}
                columns={columns}
                getRowId={(row) => row.id}

              />
            </Card>
          </Box>
        </TableStyle>

      </Container>
    </>
  );
};

export default Client;
