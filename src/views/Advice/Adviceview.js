import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Link from '@mui/material/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArticleIcon from '@mui/icons-material/Article';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LoopIcon from '@mui/icons-material/Loop';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
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
import { useLocation, useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import UpdateAdvicedata from './updateadvice';
import { useState } from 'react';
import { useEffect } from 'react';
import { Messages } from 'core/comman/comman';
import AdviceInvoicePage from './AdviceInvoice';
import { useTranslation } from 'react-i18next';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';
import { enums } from 'core/Statuscode/constant';
const StatusButton = (status) => {
  if (status === enums.Paid) {
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
        {status}
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
        {status}
      </Button>
    );
  }
};

const Statusbtn = (caseStatus) => {

  if (caseStatus === enums.Approved) {
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
        {(caseStatus)}
      </Button>
    );
  } else if (caseStatus === enums.On_hold) {
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
            backgroundColor: '#f1c40f '
          }
        }}
      >
        {(caseStatus)}
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
        {(caseStatus)}
      </Button>
    );
  }
}


const AdviceView = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [rowData, setrowdata] = useState({});
  const { t } = useTranslation();
  const fetchAdviceData = async () => {
    const response = await getApi(urls?.Advice?.getaadvice.replace(':id', id));
    const advice = response.data;
    const formattedData = {
      _id: advice._id,
      InvoiceNo: `ADV-${String(advice._id).slice(-4)}`,
      ClientId: advice.Client._id,
      Client: advice.Client?.Name || 'N/A',
      ClientAdd: advice.Client?.address || 'N/A',
      ClientPhone: advice.Client?.phonenum || 'N/A',
      AdvocateId: advice.Advocate._id,
      Advocate: advice.Advocate?.name || 'N/A',
      Date: new Date(advice.Date).toLocaleDateString(),
      MatterId: advice.Matter._id,
      Matter: advice.Matter?.Title,
      Fee: advice.Fee,
      Status: advice.Status,
      Payment: advice.Payment,
      internalNote: advice.internalNote,
      description: advice.description
    };

    setrowdata(formattedData);
  };

  useEffect(() => {
    fetchAdviceData();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await deleteApi(urls?.Advice.deleteadvice.replace(':id', id));
      if (response.status === 200) {
        toast.success(t(Messages.Advice.delete_success));
        navigate(`/dashboard/advice`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t(Messages.Advice.delete_failed));
    }
  };
  const [tabValue, setTabValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const breadcrumbsData = [
    { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Advice', path: '/dashboard/advice', color: 'inherit' },
    { label: 'Advice View', path: null }
  ];
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <UpdateAdvicedata
        open={openAdd}
        handleClose={handleCloseAdd}
        id={id}
        rowData={rowData}
        fetchAdviceData={fetchAdviceData}
      ></UpdateAdvicedata>
      <Container>
        <Stack direction="column" alignItems="center" mb={3}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={3}>
              <Typography variant="h4">{t("Advice")}</Typography>
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
                        <AccountCircleIcon></AccountCircleIcon>
                      </Typography>
                      <Typography mb={0.7}>{t("Advice Details")}</Typography>
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
                      <Typography mb={0.7}>{t("Invoice")}</Typography>
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
                        borderColor: 'divider'
                      }}
                    >
                      <CardContent>
                        <Box sx={{ textAlign: 'left', mb: 2 }}>
                          <Typography variant="h4" sx={{ mt: 2 }}>
                            {rowData.Client}
                          </Typography>
                          <Divider sx={{ mt: '10px', borderColor: 'grey.300' }} />
                        </Box>

                        <Grid container spacing={1}>                          <Grid item xs={4}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                              {t('Date')}:
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant="body1">{rowData.Date}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                              {t('Matter')}:
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant="body1">{rowData.Matter}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                              {t('Fee')}:
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant="body1">${rowData.Fee}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                              {t('Status')}:
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant="body1">{Statusbtn(rowData.Status)}</Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                              {t('Payment')}:
                            </Typography>
                          </Grid>
                          <Grid item xs={8}>
                            <Typography variant="body1">{StatusButton(rowData.Payment)}</Typography>
                          </Grid>
                        </Grid>
                      </CardContent>

                    </Card>
                  </Grid>
                  <Grid item xs={12} md={8.5}>
                    <Card
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="h4">{t("Description")}</Typography>
                        </Box>
                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                          {rowData.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography mt={2} variant="h4">
                            {t("Internal Note")}
                          </Typography>
                        </Box>
                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                          {rowData.internalNote}
                        </Typography>

                        <Typography variant="h4" sx={{ mt: 3 }}>
                          {t("Adviser/Advocate")}:
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                          <strong>{rowData.Advocate}</strong>
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 2,
                            mt: 4
                          }}
                        >
                          {' '}
                          <Tooltip title={t("Convert To Case")}>
                            <Button variant="contained" color="primary">
                              <LoopIcon color="black"></LoopIcon>
                            </Button>
                          </Tooltip>
                          <Tooltip title={t("Edit")}>
                            <Button variant="outlined" color="secondary" onClick={handleOpenAdd}>
                              <AppRegistrationIcon></AppRegistrationIcon> <Typography ml={1}>{t("Edit")}</Typography>
                            </Button>
                          </Tooltip>
                          <Tooltip title={t("Delete")}>
                            <Button variant="contained" color="error" onClick={handleDelete}>
                              <DeleteOutlineIcon></DeleteOutlineIcon>
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
                  <Typography variant="h5">{t("Invoice")}</Typography>
                  <Typography sx={{ mt: 2 }}>
                    <AdviceInvoicePage AdviceData={rowData} fetchAdviceData={fetchAdviceData}></AdviceInvoicePage>
                  </Typography>
                </Box>
              )}
            </Box>
          </Card>
        </Box>
      </Container>
    </>
  );
};

export default AdviceView;
