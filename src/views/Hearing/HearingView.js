import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card, Grid, CardContent, Tooltip, Divider } from '@mui/material';
import { Link } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useLocation, useNavigate, useParams } from 'react-router';
import DeleteConfirmationDialog from 'core/deleteDialog';
import ArticleIcon from '@mui/icons-material/Article';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useEffect } from 'react';
import { Messages } from 'core/comman/comman';
import { toast } from 'react-toastify';
import EditHearing from './EditHearing';
import { useTranslation } from 'react-i18next';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';

const breadcrumbsData = [
  { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
  { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
  { label: 'Hearing', path: '/dashboard/hearing', color: 'inherit' },
  { label: 'Hearing View', path: null }
];

const HearingView = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [rowData, setrowdata] = useState({});
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hearingToDelete, setHearingToDelete] = useState(null);
  const navigate = useNavigate();
  const fetchHearingData = async () => {
    const response = await getApi(urls?.Hearing?.gethearing.replace(':id', id));
    const hearing = response.data;

    const formattedData = {
      id: hearing._id,
      Title: hearing?.Title,
      CaseId: hearing?.Case?._id,
      Case: hearing.Case?.Title || 'N/A',
      Date: new Date(hearing.Date).toLocaleDateString(),
      JudgementStatus: hearing.JudgementStatus,
      Fee: hearing.Fee,
      JudgementReason: hearing.JudgementReason,
      CreatedAt: new Date(hearing.createdAt).toLocaleDateString(),
      Description: hearing.Description,
      Witness: hearing.Witness
    };

    setrowdata(formattedData);
  };

  useEffect(() => {
    fetchHearingData();
  }, []);

  const renderStatusButton = (value) => {
    if (value === 'Delivered') {
      return (
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#89eb8c33',
            color: 'green',
            boxShadow: 'none',
            padding: '3px 3px',
            fontSize: '.7rem',
            '&:hover': {
              color: 'white',
              backgroundColor: '#00e676'
            }
          }}
        >
          {t(value)}
        </Button>
      );
    } else if (value === 'In Progress') {
      return (
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ef978e38',
            color: '#f1c40f',
            boxShadow: 'none',
            padding: '3px 3px',
            fontSize: '.7rem',
            '&:hover': {
              color: 'white',
              backgroundColor: '#f1c40f'
            }
          }}
        >
          {t(value)}
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ef978e4d',
            color: '#f02410',
            boxShadow: 'none',
            padding: '3px 3px',
            fontSize: '.7rem',
            '&:hover': {
              color: 'white',
              backgroundColor: '#f02410'
            }
          }}
        >
          {t(value)}
        </Button>
      );
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteApi(urls.Hearing.deletehearing.replace(':id', hearingToDelete));

      if (response.status === 200) {
        setrowdata({});
        setDeleteDialogOpen(false);
        toast.success(t(Messages.Hearing?.delete_success));
        navigate(`/dashboard/hearing`);
      }
    } catch (error) {
      console.error('Error deleting the hearing:', error);
      toast.error(t(Messages.Hearing?.delete_failed));
    }
  };

  const openDeleteDialog = (hearingId) => {
    setHearingToDelete(hearingId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => setDeleteDialogOpen(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  return (
    <Container>
      <EditHearing open={openAdd} handleClose={handleCloseAdd} id={id} hearingData={rowData} fetchHearingData={fetchHearingData} />
      <DeleteConfirmationDialog open={deleteDialogOpen} onClose={closeDeleteDialog} onDelete={handleDelete} />
      <Stack direction="column" alignItems="center" mb={3}>
        <Card style={{ width: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={3}>
            <Typography variant="h4">{t('Case Details')}</Typography>
            <UniversalBreadcrumbs items={breadcrumbsData} />
          </Stack>
        </Card>
      </Stack>

      <Box width="100%">
        <Card style={{ height: 'auto', paddingTop: '5px' }}>
          <Grid container padding={2} spacing={3}>
            <Grid item xs={12}>
              <Card
                sx={{
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography mr={1} fontSize="1.5rem" sx={{ color: ' rgb(33, 150, 243)' }}>
                      <ArticleIcon />
                    </Typography>
                    <Typography variant="h4" mb={0.7} sx={{ color: 'rgb(33, 150, 243) ' }}>
                      {t('Details')}
                    </Typography>
                  </Box>

                  <Divider sx={{ borderColor: 'grey.300' }} />
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="body1" fontWeight="bold">
                        {t('Hearing Title')}:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {rowData?.Title}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="body1" fontWeight="bold">
                        {t('Case')}:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {rowData?.Case}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="body1" fontWeight="bold">
                        {t('Hearing Date')}:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {rowData?.Date}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="body1" fontWeight="bold">
                        {t('Fees')}:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {rowData?.Fee}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="body1" fontWeight="bold">
                        {t('Created At')}:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {rowData?.CreatedAt}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="body1" fontWeight="bold">
                        {t('Judgement Status')}:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {renderStatusButton(rowData.JudgementStatus)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="body1" fontWeight="bold">
                        {t('Witness')}:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {rowData?.Witness}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ mt: '10px', mb: '10px', borderColor: 'grey.300' }} />
                  <Grid item xs={12}>
                    <Box sx={{ overflow: 'hidden', display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1" fontWeight="bold">
                        {t('Judgement Reason')}{' '}
                      </Typography>
                    </Box>
                    <Typography color="body2" sx={{ mt: 1 }}>
                      {rowData?.JudgementReason}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ overflow: 'hidden', display: 'flex', justifyContent: 'space-between' }}>
                      <Typography mt={2} variant="body1" fontWeight="bold">
                        {t('Description')}
                      </Typography>
                    </Box>
                    <Typography color="body2" sx={{ mt: 1 }}>
                      {rowData?.Description}
                    </Typography>
                  </Grid>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: 2,
                      mt: 4
                    }}
                  >
                    <Tooltip title={t('Edit')}>
                      <Button variant="outlined" color="secondary" onClick={handleOpenAdd}>
                        <AppRegistrationIcon></AppRegistrationIcon> <Typography ml={1}>{t('Edit')}</Typography>
                      </Button>
                    </Tooltip>
                    <Tooltip title={t('Delete')}>
                      <Button variant="contained" color="error" onClick={() => openDeleteDialog(rowData.id)}>
                        <DeleteOutlineIcon></DeleteOutlineIcon>
                      </Button>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Container>
  );
};

export default HearingView;
