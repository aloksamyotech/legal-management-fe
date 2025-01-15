import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Link from '@mui/material/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
import UpdateAdvocate from './updateAdvocate';
import { useNavigate, useParams } from 'react-router';
import { urls } from 'core/Constant/Urls';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import DeleteConfirmationDialog from 'core/deleteDialog';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Messages } from 'core/comman/comman';
import { useState } from 'react';

const Profile = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const { id } = useParams();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [advocateToDelete, setAdvocateToDelete] = useState(null);
  const [Cases, setCases] = useState([]);
  const navigate = useNavigate();
  const [rowData, setrowdata] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleViewClick = (row) => {
    navigate(`/dashboard/cases/casesview/${row._id}`, { state: row });
  };

  const fetchAdvocateData = async () => {
    const response = await getApi(urls?.Advocate?.getadvocatebyid.replace(':id', id));

    const advocate = response.data;
    const formattedData = {
      _id: advocate._id,
      name: advocate?.name || 'N/A',
      email: advocate?.email || 'N/A',
      phone: advocate?.phone || 'N/A',
      gender: advocate?.gender || 'N/A',
      city: advocate?.city || 'N/A',
      state: advocate?.state || 'N/A',
      zipCode: advocate?.zipCode || 'N/A',
      country: advocate?.country || 'N/A',
      address: advocate?.address || 'N/A',
      certificate: advocate?.certificate || 'N/A',
      barNumber: advocate?.barNumber || 'N/A',
      lawUniversity: advocate?.lawUniversity || 'N/A',
      graduationYear: advocate?.graduationYear || 'N/A',
      practiceArea: advocate?.practiceArea || 'N/A',
      languages: advocate?.languages || 'N/A',
      skill: advocate?.skill || 'N/A',
      degree: advocate?.degree || 'N/A',
      notes: advocate?.notes || 'N/A',
      firms: advocate?.firms || 'N/A',
      position: advocate?.position || 'N/A',
      duration: advocate?.duration || 'N/A',
      image: advocate?.image || 'N/A',
      About: advocate?.About || 'N/A'
    };
    setrowdata(formattedData);
  };

  useEffect(() => {
    fetchAdvocateData();
  }, []);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleDelete = async () => {
    try {
      const response = await deleteApi(urls?.Advocate?.deleteadvocate?.replace(':id', advocateToDelete));

      if (response.status === 200) {
        setrowdata({});
        setDeleteDialogOpen(false);
        toast.success(Messages?.advocate?.Advocate_delete_success);
        navigate(`/dashboard/advocate`);
      }
    } catch (error) {
      console.error('Error deleting the advocate:', error);
      toast.error(Messages?.advocate?.Advocate_delete_Failed);
    }
  };

  const openDeleteDialog = (advocateId) => {
    setAdvocateToDelete(advocateId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => setDeleteDialogOpen(false);

  const fetchCaseDatabyAdvocate = async () => {
    try {
      const response = await getApi(urls?.Advocate?.getcasebyadvocateid.replace(':advocateId', id));
      if (response?.data?.status === 404) {
        console.log('No cases available');
        setCases([]);
        return;
      }
      const formattedData = response?.data?.map((cases, index) => ({
        SerialNo: index + 1,
        _id: cases?._id,
        Title: cases?.Title,
        Matter: cases?.Matter.Title,
        Advocate: cases?.Advocate.Name,
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
    fetchCaseDatabyAdvocate();
  }, []);

  const filteredCase = Cases.filter((item) => item.Title.toLowerCase().includes(searchQuery.toLowerCase()));

  const column = [
    {
      field: 'SerialNo',
      headerName: '#',
      flex: 0.5,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'Title',
      headerName: 'Case',
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
      headerName: 'Date',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button
          variant="inherit"
          size="small"
          sx={{ fontSize: '40px', '&:hover': { background: 'none' } }}
          onClick={() => handleViewClick(params.row)}
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

  const breadcrumbs = [
    <Link underline="hover" key="1" color="secondary" href="/">
      <HomeIcon sx={{ marginTop: '2px' }} fontSize="small" />
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/dashboard/default">
      Dashboard
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Advocate
    </Typography>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      View
    </Typography>
  ];

  return (
    <Container>
      <DeleteConfirmationDialog open={deleteDialogOpen} onClose={closeDeleteDialog} onDelete={handleDelete} />
      <Stack direction="column" alignItems="center" mb={3}>
        <Card style={{ width: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={3}>
            <Typography variant="h4">Profile</Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
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
                      <AccountCircleIcon></AccountCircleIcon>
                    </Typography>
                    <Typography mb={0.7}>Profile</Typography>
                  </Box>
                }
              />

              <Tab
                value={1}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography mr={1} fontSize="1.5rem">
                      <ArticleIcon></ArticleIcon>
                    </Typography>
                    <Typography mb={0.7}>Cases</Typography>
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
                    <Typography mb={0.7}>Setting</Typography>
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
                        <Typography variant="h4" sx={{ mt: 2 }}>
                          {rowData.name}
                        </Typography>
                        <Divider sx={{ mt: '10px', borderColor: 'grey.300' }} />
                      </Box>
                      <Typography variant="body1">
                        <strong>Email:</strong> {rowData.email}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>Phone:</strong> {rowData.phone}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>Location:</strong> {rowData.city}
                      </Typography>
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
                      <Box sx={{ border: '1px solid #D3D3D3', padding: 2, borderRadius: 1 }}>
                        <Typography variant="h4">About Me</Typography>
                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                          {rowData.About}
                        </Typography>
                      </Box>

                      <Grid container spacing={1} sx={{ mt: 1 }}>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ border: '1px solid #D3D3D3', padding: 2, borderRadius: 1, height: '267px' }}>
                            <Typography variant="h4">Personal Details</Typography>
                            <Typography sx={{ mt: 1 }}>
                              <strong>Full Name:</strong> {rowData?.name}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                              <strong>Gender:</strong> {rowData?.gender}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                              <strong>State:</strong> {rowData?.state}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                              <strong>Zipcode:</strong> {rowData?.zipCode}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                              <strong>Country:</strong> {rowData?.country}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                              <strong>Certificate:</strong> No certificate found
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                              <strong>Address:</strong> {rowData.address}
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <Box sx={{ border: '1px solid #D3D3D3', padding: 2, borderRadius: 1 }}>
                            <Typography variant="h4">Professional Details</Typography>
                            <Typography sx={{ mt: 1 }}>
                              <strong>Bar Number:</strong> {rowData?.barNumber}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                              <strong>Law University:</strong> {rowData?.lawUniversity}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                              <strong>Graduation Year:</strong> {rowData?.graduationYear}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                              <strong>Practice Area:</strong> {rowData?.practiceArea}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                              <strong>Languages:</strong> {rowData?.languages}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                              <strong>Skills:</strong> {rowData?.skill}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                              <strong>Degree:</strong> {rowData?.degree}
                            </Typography>
                            <Typography sx={{ mt: 1 }}>
                              <strong>Notes:</strong> {rowData?.notes}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      <Box sx={{ border: '1px solid #D3D3D3', padding: 2, borderRadius: 1, mt: 1 }}>
                        <Typography variant="h4">Work History</Typography>
                        <Typography sx={{ mt: 1 }}>
                          <strong>Firm:</strong> {rowData?.firms}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                          <strong>Position:</strong> {rowData?.position}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                          <strong>Duration:</strong> {rowData?.duration}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 2,
                          mt: 4
                        }}
                      >
                        <Tooltip title="Delete">
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
                <Typography variant="h5">Cases</Typography>
                <Typography sx={{ mt: 2 }}>
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
                </Typography>
              </Box>
            )}

            {tabValue === 2 && (
              <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} padding={2}>
                <Box width="80%" mt={4}>
                  <UpdateAdvocate rowData={rowData} email={rowData.email} fetchAdvocateData={fetchAdvocateData}></UpdateAdvocate>
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
