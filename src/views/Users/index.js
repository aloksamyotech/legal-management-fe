
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
import { urls } from 'core/Constant/Urls';
import { getApi } from 'core/APIs/ApiDocuments';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next'; 

// ----------------------------------------------------------------------



const Users = () => {
  const { t } = useTranslation(); 
  const [openAdd, setOpenAdd] = useState(false);
  const [userData, setuserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleViewClick = (row) => {
    navigate(`/dashboard/user/userview/${row._id}`, { state: row });
  };
  const breadcrumbs = [
    <Link underline="hover" key="1" color="secondary" href="/">
      <HomeIcon sx={{ marginTop: '2px' }} fontSize="small" />
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/dashboard/default">
      {t("Dashboard")}
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {t("Users")}
    </Typography>
  ];
  const fetchUserdata = async () => {
    const token = localStorage.getItem('$2b$10$ehdPSDmr6P');
    if (!token) throw new Error('No token found');
    const response = await getApi(urls.user.getAlluser, {}, { 'authorization': token.toString() });
    const formattedData = response.data.map((user, index) => ({
      _id: user._id,
      Serial: index + 1,
      Name: user.Name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      AsignRole: user.AsignRole,
      gender: user.Gender,
      address: user.address,
    }));
    setuserData(formattedData || []);
  };

  useEffect(() => {
    fetchUserdata();
  }, []);

  const filteredUser = userData.filter((user) => user.Name.toLowerCase().includes(searchQuery.toLowerCase()));

  const columns = [
    {
      field: 'Name',
      headerName: t('User'),
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'email',
      headerName: t('Email'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'mobileNumber',
      headerName: t('Phone Number'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'AsignRole',
      headerName: t('Role'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'action',
      headerName: t('Action'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button variant="inherit" size="small" sx={{ fontSize: '40px', '&:hover': { background: 'none' } }} onClick={() => handleViewClick(params.row)}>
          <VisibilityIcon
            color="secondary"
            sx={{
              '&:hover': {
                color: 'green'
              }
            }}
          />
        </Button>
      )
    }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  return (
    <>
      <AddUser open={openAdd} handleClose={handleCloseAdd} fetchUserdata={fetchUserdata} />
      <Container>
        <Stack direction="column" alignItems="center" mb={3}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">{t('Users')}</Typography>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                rows={filteredUser}
                columns={columns}
                getRowId={(row) => row._id}
                sx={{
                  padding: '17px',
                  border: '2px solid lightgray',
                  '& .MuiDataGrid-columnHeader': {
                    textAlign: 'center',
                    fontSize: '12px'
                  },
                  '& .MuiDataGrid-cell': {
                    justifyContent: 'center',
                    fontSize: '12px',
                    alignItems: 'center'
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
