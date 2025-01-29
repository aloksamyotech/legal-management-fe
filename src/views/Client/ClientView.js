import React from 'react';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import Link from '@mui/material/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import { useLocation, useNavigate, useParams } from 'react-router';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Divider,
  Breadcrumbs,
  Container,
  Stack,
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Typography,
  Button,
  Tooltip
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import UpdateClient from './updateClient';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { urls } from 'core/Constant/Urls';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import { useState, useEffect } from 'react';
import DeleteConfirmationDialog from 'core/deleteDialog';
import { toast } from 'react-toastify';
import { Messages } from 'core/comman/comman';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';

const Profile = () => {
  const { t } = useTranslation(); // Initialize translation
  const { id } = useParams();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [Cases, setCases] = useState([]);
  const [tabValue, setTabValue] = React.useState(0);
  const navigate = useNavigate();
  const [rowData, setrowdata] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewClick = (row) => {
    navigate(`/dashboard/cases/casesview/${row._id}`, { state: row });
  };

  const fetchClientData = async () => {
    const response = await getApi(urls?.client?.getClientbyId.replace(':id', id));
    const client = response.data;
    const formattedData = {
      _id: client._id,
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
    };
    setrowdata(formattedData);
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteApi(urls.client.deleteclient.replace(':id', clientToDelete));
      if (response.status === 200) {
        setrowdata({});
        setDeleteDialogOpen(false);
        toast.success(t(Messages.client.Client_delete_success));
        navigate(`/dashboard/client`);
      }
    } catch (error) {
      console.error('Error deleting the client:', error);
      toast.error(t(Messages.client.Client_delete_Failed));
    }
  };

  const openDeleteDialog = (clientId) => {
    setClientToDelete(clientId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => setDeleteDialogOpen(false);

  const fetchCaseDatabyClient = async () => {
    try {
      const response = await getApi(urls?.client?.getcasebyclient.replace(':clientId', id));
      if (response.data.status === 404) {
        console.log('No cases available');
        setCases([]);
        return;
      }
      const formattedData = response?.data?.map((cases, index) => ({
        SerialNo: index + 1,
        _id: cases?._id,
        Title: cases?.Title,
        Matter: cases?.Matter.Title,
        Advocate: cases?.Advocate.name,
        Fir: cases?.Fir,
        Judge: cases.Judge.Title,
        Court: cases.Court?.Title,
        description: cases?.description,
        internalNote: cases?.internalNote,
        PoliceStation: cases?.PoliceStation.Title,
        Date: new Date(cases?.Date).toLocaleDateString('en-GB')
      }));
      setCases(formattedData);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  useEffect(() => {
    fetchCaseDatabyClient();
  }, []);

  const filteredCase = Cases?.filter((item) => item.Title.toLowerCase().includes(searchQuery.toLowerCase()));

  const column = [
    {
      field: 'SerialNo',
      headerName: '#',
      flex: 0.5,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'Title',
      headerName: t('Case'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => (
        <Typography
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
            textDecoration: 'underline',
            '&:hover': {
              textDecoration: 'underline',
              color: 'secondary.main'
            }
          }}
          onClick={() => handleViewClick(params.row)}
        >
          {params.value}
        </Typography>
      )
    },
    {
      field: 'Date',
      headerName: t('Date'),
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'action',
      headerName: t('Action'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button
          variant="inherit"
          size="small"
          onClick={() => handleViewClick(params.row)}
          sx={{ fontSize: '40px', '&:hover': { background: 'none' } }}
        >
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

  const breadcrumbsData = [
    { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Client', path: '/dashboard/client', color: 'inherit' },
    { label: 'Client View', path: null }
  ];

  return (
    <Container>
      <DeleteConfirmationDialog open={deleteDialogOpen} onClose={closeDeleteDialog} onDelete={handleDelete} />
      <Stack direction="column" alignItems="center" mb={3}>
        <Card style={{ width: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={3}>
            <Typography variant="h4">{t('Profile')}</Typography>
            <UniversalBreadcrumbs items={breadcrumbsData} />
          </Stack>
        </Card>
      </Stack>

      <Box width="100%">
        <Card style={{ height: 'auto', paddingTop: '5px' }}>
          <Box sx={{ padding: 1 }}>
            <Tabs variant="scrollable" value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
              <Tab
                value={0}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography mr={1} fontSize="1.5rem">
                      <AccountCircleIcon />
                    </Typography>
                    <Typography mb={0.7}>{t('Profile')}</Typography>
                  </Box>
                }
              />
              <Tab
                value={1}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography mr={1} fontSize="1.5rem">
                      <ArticleIcon />
                    </Typography>
                    <Typography mb={0.7}>{t('Cases')}</Typography>
                  </Box>
                }
              />
              <Tab
                value={2}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography mr={1} fontSize="1.5rem">
                      <SettingsIcon />
                    </Typography>
                    <Typography mb={0.7}>{t('Setting')}</Typography>
                  </Box>
                }
              />
            </Tabs>
            <Divider sx={{ borderColor: 'grey.300' }} />

            {tabValue === 0 && (
              <Grid container padding={2} spacing={3}>
                <Grid item xs={12} md={3.5}>
                  <Card
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal',
                      wordWrap: 'break-word'
                    }}
                  >
                    <CardContent>
                      <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Avatar
                          src={urls?.initialbase + rowData?.image}
                          alt="Profile Picture"
                          sx={{ width: 80, height: 80, margin: '0 auto' }}
                        />
                        <Typography
                          variant="h4"
                          sx={{
                            mt: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                            maxHeight: '4.5em',
                            lineHeight: '1.5em'
                          }}
                        >
                          {rowData.Name}
                        </Typography>
                        <Divider sx={{ mt: '10px', borderColor: 'grey.300' }} />
                      </Box>
                      <Grid container spacing={1} sx={{ mt: 1 }}>
                        <Grid item xs={4}>
                          <Typography sx={{ fontWeight: 'bold' }}>{t('Email')}:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>{rowData?.Email}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography sx={{ fontWeight: 'bold' }}>{t('Mobile')}:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>{rowData?.phonenum}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography sx={{ fontWeight: 'bold' }}>{t('City')}:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>{rowData?.city}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={8.5}>
                  <Card
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal',
                      wordWrap: 'break-word'
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h4">{t('About')}</Typography>
                      </Box>
                      <Typography color="text.secondary" sx={{ mt: 1 }}>
                        {rowData.About}
                      </Typography>

                      <Typography variant="h4" sx={{ mt: 2 }}>
                        {t('Personal Details')}
                      </Typography>
                      <Grid container spacing={1} sx={{ mt: 1 }}>
                        <Grid item xs={3}>
                          <Typography sx={{ fontWeight: 'bold' }}>{t('Full Name')}:</Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Typography>{rowData.Name}</Typography>
                        </Grid>

                        <Grid item xs={3}>
                          <Typography sx={{ fontWeight: 'bold' }}>{t('State')}:</Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Typography>{rowData.state}</Typography>
                        </Grid>

                        <Grid item xs={3}>
                          <Typography sx={{ fontWeight: 'bold' }}>{t('Country')}:</Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Typography>{rowData.country}</Typography>
                        </Grid>

                        <Grid item xs={3}>
                          <Typography sx={{ fontWeight: 'bold' }}>{t('Zip Code')}:</Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Typography>{rowData.zipcode}</Typography>
                        </Grid>

                        <Grid item xs={3}>
                          <Typography sx={{ fontWeight: 'bold' }}>{t('Address')}:</Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Typography>{rowData.address || 'N/A'}</Typography>
                        </Grid>
                      </Grid>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 2,
                          mt: 4
                        }}
                      >
                        <Tooltip title={t('Delete')}>
                          <Button variant="contained" color="error">
                            <DeleteOutlineIcon onClick={() => openDeleteDialog(rowData._id)}></DeleteOutlineIcon>
                          </Button>
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {tabValue === 1 && (
              <Box padding={2} border={'none'}>
                <Typography variant="h5">{t('Cases')}</Typography>
                <Typography sx={{ mt: 2 }}>
                  {filteredCase.length === 0 ? (
                    <Typography variant="body1" color="text.secondary">
                      {t('No cases available')}
                    </Typography>
                  ) : (
                    <DataGrid
                      rowHeight={40}
                      checkboxSelection
                      rows={filteredCase}
                      columns={column}
                      getRowId={(row) => row._id}
                      columnHeaderHeight={45}
                      sx={{
                        overflow: 'auto',
                        border: 'none'
                      }}
                    />
                  )}
                </Typography>
              </Box>
            )}

            {tabValue === 2 && (
              <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} padding={2}>
                <Box width="80%" mt={4}>
                  <UpdateClient rowData={rowData} Email={rowData.Email} fetchClientData={fetchClientData}></UpdateClient>
                </Box>
              </Stack>
            )}
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default Profile;
