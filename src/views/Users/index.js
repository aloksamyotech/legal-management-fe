/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment, Link, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import TableStyle from '../../ui-component/TableStyle';
import AddUser from './AddUser';
import userData from './userData';

// ----------------------------------------------------------------------
const breadcrumbs = [
  <Link underline="hover" key="1" color="secondary" href="/">
    <HomeIcon sx={{ marginTop: '2px' }} fontSize="small" />
  </Link>,
  <Link underline="hover" key="2" color="inherit" href="/dashboard/default">
    Dashboard
  </Link>,
  <Typography key="3" sx={{ color: 'text.primary' }}>
    Users
  </Typography>
];

const Users = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const columns = [
    {
      field: 'Name',
      headerName: 'User',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'mobileNumber',
      headerName: 'Phone Number',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'AsignRole',
      headerName: 'Role',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button variant="inherit" size="small" sx={{ fontSize: '40px', '&:hover': { background: 'none' } }}>
          <Link fontSize={0} color="inherit" href="/dashboard/client/clientview">
            <VisibilityIcon
              color="secondary"
              sx={{
                '&:hover': {
                  color: 'green'
                }
              }}
            />
          </Link>
        </Button>
      )
    }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <AddUser open={openAdd} handleClose={handleCloseAdd} />
      <Container>
        <Stack direction="column" alignItems="center" mb={3}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">Users</Typography>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Stack>
          </Card>
        </Stack>

        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <Stack sx={{ paddingRight: '1rem' }} direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
                <TextField
                  variant="outlined"
                  color="secondary"
                  size="small"
                  inputProps={{ maxLength: 30 }}
                  sx={{ width: '20%' }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="secondary" />
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  onClick={handleOpenAdd}
                  sx={{
                    marginBottom: '15px',
                    fontSize: '40px',
                    marginRight: '2rem',
                    backgroundColor: '#673ab7',
                    boxShadow: 'none',
                    borderRadius: '15px'
                  }}
                >
                  <AddIcon color="white" fontSize="medium" />
                </Button>
              </Stack>
              <DataGrid
                rowHeight={40}
                rows={userData}
                columns={columns}
                getRowId={(row) => row.id}
                sx={{
                  padding: '17px',
                  border: '2px solid lightgray',
                  '& .MuiDataGrid-columnHeaders': {},
                  '& .MuiDataGrid-columnHeader': {
                    border: '1px solid lightgray'
                  },
                  '& .MuiDataGrid-cell': {
                    border: '1px solid lightgray'
                  }
                }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default Users;
