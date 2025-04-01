import React, { useState, useEffect } from 'react';
import {
  Typography,
  Container,
  Card,
  Grid,
  Stack,
  Avatar,
  Box,
  Button,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Link,
  Pagination
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import AddCourt from './AddCourt';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import { urls } from 'core/Constant/Urls';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import imageSrc from './vecteezy_law-firm-lawyer-justice-court_23477442.png';
import imageSrc1 from './pexels-sora-shimazaki-5668473.jpg';
import DeleteConfirmationDialog from 'core/deleteDialog';
import { useTranslation } from 'react-i18next';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';
import { toast } from 'react-toastify';
import { Messages } from 'core/comman/comman';
import Loader from 'core/comman/loader';

const Court = () => {
  const { t } = useTranslation();
  const [openAdd, setOpenAdd] = useState(false);
  const [editData, setEditData] = useState(null);
  const [courtData, setCourtData] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courtToDelete, setCourtToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalCourt, setTotalCourt] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const selectStyles = {
    padding: '10px 15px',
    border: `1px solid ${isFocused || isHovered ? '#007bff' : '#ccc'}`,
    borderRadius: '5px',
    fontSize: '14px',
    backgroundColor: isFocused || isHovered ? '#e9f1fb' : '#fff',
    transition: 'border-color 0.3s ease, background-color 0.3s ease'
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1); // Reset to first page when page size changes
  };

  const breadcrumbsData = [
    { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Court', path: null }
  ];

  const fetchCourtData = async () => {
    setLoading(true);
    try {
      const response = await getApi(urls?.Court?.gettallcourtpage, {
        page,
        limit: pageSize,
        search: searchQuery
      });
      const formattedData = response?.data?.courts?.map((court, index) => ({
        _id: court._id,
        Serial: index + 1,
        Title: court.Title,
        address: court.address,
        description: court.description,
        CreatedAt: new Date(court.CreatedAt).toLocaleDateString('en-GB')
      }));
      setCourtData(formattedData || []);
      setTotalCourt(response?.data?.totalCourts);
      setLoading(false);
    } catch (error) {
      console.error('failed to fetch court', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCourtData();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [page, pageSize, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      setPage(1);
    }
  }, [searchQuery]);

  const handleOpenEdit = (court) => {
    setEditData(court);
    setOpenAdd(true);
  };

  const handleOpenAdd = () => {
    setEditData(null);
    setOpenAdd(true);
  };

  const handleCloseAdd = () => setOpenAdd(false);

  const handleDelete = async () => {
    try {
      const response = await deleteApi(urls.Court.deletecourt.replace(':id', courtToDelete));

      if (response.status === 200) {
        setCourtData((prevData) => prevData.filter((court) => court._id !== courtToDelete));
        setDeleteDialogOpen(false);
        toast.success(t(Messages?.Court?.Court_delete_Success));
      }
    } catch (error) {
      console.error('Error deleting the court:', error);
      toast.error(t(Messages?.Court?.Court_delete_Failed));
    }
  };

  const openDeleteDialog = (courtId) => {
    setCourtToDelete(courtId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => setDeleteDialogOpen(false);

  return (
    <>
      <AddCourt open={openAdd} handleClose={handleCloseAdd} fetchCourtData={fetchCourtData} editData={editData} />
      <Container>
        <Stack direction="column" alignItems="center" mb={2.5}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">{t('Court')}</Typography>
              <UniversalBreadcrumbs items={breadcrumbsData} />
            </Stack>
          </Card>
        </Stack>

        <Box width="100%">
          <Card style={{ paddingTop: '15px' }}>
            <Stack sx={{ paddingRight: '1rem' }} direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
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
            </Stack>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <Loader isVisible={loading}></Loader>
              </Box>
            ) : courtData?.length !== 0 ? (
              <Grid container spacing={3} padding={'17px'}>
                {courtData?.map((court) => (
                  <Grid item xs={12} sm={6} md={3} key={court._id}>
                    <Card
                      sx={{
                        height: '270px',
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: 3,
                        textAlign: 'center',
                        p: 2,
                        backgroundColor: '#f5f5f5',
                        position: 'relative'
                      }}
                    >
                      <Box
                        component="img"
                        src={imageSrc1}
                        alt={court.Title}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '40%',
                          objectFit: 'cover'
                        }}
                      />

                      <Avatar
                        alt={court.Title}
                        src={imageSrc}
                        sx={{
                          width: 50,
                          height: 50,
                          border: '3px solid #673ab7',
                          position: 'absolute',
                          top: '40%',
                          left: '50%',
                          background: 'white',
                          transform: 'translate(-50%, -50%)'
                        }}
                      />

                      <Stack direction="column" alignItems="center" spacing={0.5} sx={{ pt: 16 }}>
                        <Typography variant="h4" fontSize={'15px'} sx={{ fontWeight: 'bold' }}>
                          {court.Title}
                        </Typography>
                        <Typography variant="body2" fontSize={'13px'} color="text.secondary" sx={{ textAlign: 'center' }}>
                          <Box>
                            <Tooltip title={court?.description || t('No description available')} arrow>
                              <Typography
                                variant="body2"
                                component="span"
                                sx={{
                                  display: 'block',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  maxWidth: '50ch'
                                }}
                              >
                                {court?.description?.length > 25
                                  ? `${court?.description.substring(0, 25)}...`
                                  : court?.description || t('N/A')}
                              </Typography>
                            </Tooltip>
                          </Box>
                        </Typography>
                        <Typography variant="body2" fontSize={'13px'} sx={{ color: court.address ? 'green' : 'gray' }}>
                          {court.address || t('No Address Provided')}
                        </Typography>
                        <Stack direction="row" spacing={1} mt={1}>
                          <Tooltip title={t('Edit')}>
                            <IconButton
                              color="primary"
                              sx={{
                                fontSize: '17px',
                                borderRadius: '50%',
                                backgroundColor: '#e8f5e9',
                                padding: '8px'
                              }}
                              onClick={() => handleOpenEdit(court)}
                            >
                              <Edit fontSize="" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title={t('Delete')}>
                            <IconButton
                              color="error"
                              sx={{
                                fontSize: '17px',
                                borderRadius: '50%',
                                backgroundColor: '#ffebee',
                                padding: '8px'
                              }}
                              onClick={() => openDeleteDialog(court._id)}
                            >
                              <Delete fontSize="" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Stack>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary" align="center" sx={{ width: '100%', padding: '20px' }}>
                  {t('No data available')}
                </Typography>
              </Grid>
            )}
            <Box width="100%" mt={2} display="flex" justifyContent="end" alignItems="center" padding={2}>
              <Pagination count={Math.ceil(totalCourt / pageSize)} page={page} onChange={handlePageChange} color="primary" />
              <select
                id="page-size"
                value={pageSize}
                onChange={handlePageSizeChange}
                style={selectStyles}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </Box>
          </Card>
        </Box>
      </Container>

      <DeleteConfirmationDialog open={deleteDialogOpen} onClose={closeDeleteDialog} onDelete={handleDelete} />
    </>
  );
};

export default Court;
