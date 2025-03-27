import { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Stack,
  Button,
  Container,
  Typography,
  Box,
  Card,
  Avatar,
  TextField,
  InputAdornment,
  Pagination,
  Grid,
  CircularProgress
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTranslation } from 'react-i18next';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useNavigate } from 'react-router';
import AddClient from './AddClient';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';
import BulkUploadComponent from './clientbulk';
import Loader from 'core/comman/loader';

const Client = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleViewClick = (row) => {
    navigate(`/dashboard/client/view/${row._id}`, { state: row });
  };
  const [openAdd, setOpenAdd] = useState(false);
  const [openbulkAdd, setbulkOpenAdd] = useState(false);
  const [clients, setClients] = useState([]);
  const [totalClients, setTotalClients] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  const breadcrumbsData = [
    { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Client', path: null }
  ];

  const columns = [
    {
      field: 'Serial',
      headerName: '#',
      flex: 0.5,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'profile',
      headerName: t('Client Profile'),
      flex: 2,
      renderCell: (params) => (
        <Box
          onClick={() => handleViewClick(params.row)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              color: 'secondary.main',
              textDecoration: 'underline'
            }
          }}
        >
          <Avatar sx={{ marginLeft: '-10px' }} src={urls.initialbase + params.row.image} alt={params.row.Name} />
          <Typography sx={{ marginLeft: '20px' }}>
            <Typography variant="h5">
              {params.row.Name}
              <CheckCircleIcon
                fontSize="10px"
                sx={{
                  marginLeft: '5px',
                  padding: 0,
                  marginBottom: '-3px',
                  color: 'green'
                }}
              />
            </Typography>
            <Typography variant="inherit">{params.row.Email}</Typography>
          </Typography>
        </Box>
      )
    },
    {
      field: 'phonenum',
      headerName: t('Phone'),
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'city',
      headerName: t('City'),
      flex: 1
    },
    {
      field: 'state',
      headerName: t('State'),
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'country',
      headerName: t('Country'),
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'action',
      headerName: t('Action'),
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="inherit"
          size="small"
          sx={{ fontSize: '40px', marginLeft: '-10px', '&:hover': { background: 'none' } }}
          onClick={() => handleViewClick(params.row)}
        >
          <Link fontSize={0} color="inherit">
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
  const handleBulkOpenAdd = () => setbulkOpenAdd(true);
  const handleBulkCloseAdd = () => setbulkOpenAdd(false);

  const fetchClients = async (page, pageSize) => {
    try {
      setLoading(true); // Start loading immediately
      const token = localStorage.getItem('$2b$10$ehdPSDmr6P');
      if (!token) throw new Error('No token found');
      const response = await getApi(
        urls?.client?.getallclientindex,
        {
          page,
          limit: pageSize,
          search: searchQuery
        },
        { authorization: token.toString() }
      );
      const formattedData = response?.data?.clients?.map((client, index) => ({
        _id: client._id,
        Serial: (page - 1) * pageSize + (index + 1),
        Name: client?.Name || 'N/A',
        city: client?.city || 'N/A',
        state: client?.state,
        zipcode: client?.zipcode,
        phonenum: client?.phonenum,
        address: client?.address,
        Email: client?.Email,
        country: client?.country,
        image: client?.image,
        About: client?.About
      }));
      setClients(formattedData || []);
      setTotalClients(response?.data?.totalClients);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error(t('Error fetching client data:'), error);
      setLoading(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchClients(page, pageSize);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [page, pageSize, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      setPage(1);
    }
  }, [searchQuery]);

  return (
    <>
      <AddClient open={openAdd} handleClose={handleCloseAdd} fetchClient={fetchClients} />
      <BulkUploadComponent open={openbulkAdd} handleClose={handleBulkCloseAdd} fetchClient={fetchClients} />
      <Container>
        <Stack direction="column" alignItems="center" mb={3}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">{t('Client Details')}</Typography>
              <UniversalBreadcrumbs items={breadcrumbsData} />
            </Stack>
          </Card>
        </Stack>

        <Box width="100%">
          <Card style={{ height: 'auto', paddingTop: '15px' }}>
            <Stack
              sx={{ paddingBottom: '1rem', paddingRight: '1rem' }}
              direction="row"
              alignItems="center"
              justifyContent={'flex-end'}
              spacing={2}
            >
              <TextField
                variant="outlined"
                color="secondary"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              <Button
                color="secondary"
                variant="contained"
                size="large"
                onClick={handleBulkOpenAdd}
                sx={{
                  marginBottom: '15px',
                  fontSize: '15px',
                  marginRight: '2rem',
                  backgroundColor: '#673ab7',
                  boxShadow: 'none',
                  borderRadius: '15px'
                }}
              >
                Bulk uplaod
              </Button>
            </Stack>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <Loader isVisible={loading}></Loader>
              </Box>
            ) : clients?.length !== 0 ? (
              <>
                <DataGrid
                  rowHeight={60}
                  rows={clients}
                  columns={columns}
                  getRowId={(row) => row._id}
                  loading={loading}
                  sx={{ padding: '10px' }}
                  components={{
                    Pagination: () => null
                  }}
                />
                <Box width="100%" mt={0} display="flex" justifyContent="end" alignItems="center" padding={2}>
                  <Pagination count={Math.ceil(totalClients / pageSize)} page={page} onChange={handlePageChange} color="primary" />
                </Box>
              </>
            ) : (
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary" align="center" sx={{ width: '100%', padding: '20px' }}>
                  {t('No data available')}
                </Typography>
              </Grid>
            )}
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default Client;
