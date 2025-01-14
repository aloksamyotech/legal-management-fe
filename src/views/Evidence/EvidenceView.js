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
import { useTranslation } from 'react-i18next';
import evedenceviewData from './Evidenceviewdata';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import {
  Divider,
  Breadcrumbs,
  Container,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Typography,
  Button,
  Tooltip,
  CardMedia
} from '@mui/material';
import EvidenceEdit from './EvidenceEdit';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { urls } from 'core/Constant/Urls';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import DeleteConfirmationDialog from 'core/deleteDialog';
import { useEffect } from 'react';
const breadcrumbs = [
  <Link underline="hover" key="1" color="secondary" href="/">
    <HomeIcon sx={{ marginTop: '2px' }} fontSize="small" />
  </Link>,
  <Link underline="hover" key="2" color="inherit" href="/dashboard/default">
    Dashboard
  </Link>,
  <Typography key="3" sx={{ color: 'text.primary' }}>
    Evidence
  </Typography>,
  <Typography key="3" sx={{ color: 'text.primary' }}>
    Evidence View
  </Typography>
];

const EvidenceView = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = React.useState(0);
  const [openAdd, setOpenAdd] = useState(false);
  const [rowData, setrowdata] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [evidenceToDelete, setEvidenceToDelete] = useState(null);
  const fetchEvidenceData = async () => {
    const response = await getApi(urls?.Evidence?.getevidence.replace(':id', id));
    const evidence = response.data;
    console.log(response.data);
    const formattedData = {
      _id: evidence?._id,
      Title: evidence?.Title,
      CaseId: evidence?.Case?._id,
      Case: evidence?.Case?.Title,
      HearingId: evidence?.Hearing?._id,
      Hearing: evidence?.Hearing?.Title,
      Favor: evidence?.Favor,
      Attachment: evidence?.Attachment,
      Description: evidence?.Description,
      CreatedAt: new Date(evidence?.CreatedAt).toLocaleDateString('en-GB')
    };

    setrowdata(formattedData);
  };

  useEffect(() => {
    fetchEvidenceData();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await deleteApi(urls?.Evidence?.deleteevidence?.replace(':id', evidenceToDelete));

      if (response.status === 200) {
        setrowdata({});
        setDeleteDialogOpen(false);
        navigate(`/dashboard/evidence`);
      }
    } catch (error) {
      console.error('Error deleting the evidence:', error);
      alert('An error occurred while deleting the evidence.');
    }
  };

  const openDeleteDialog = (evidenceId) => {
    setEvidenceToDelete(evidenceId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => setDeleteDialogOpen(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <Container>
      <EvidenceEdit open={openAdd} handleClose={handleCloseAdd} id={id} rowData={rowData} fetchEvidenceData={fetchEvidenceData} />
      <DeleteConfirmationDialog open={deleteDialogOpen} onClose={closeDeleteDialog} onDelete={handleDelete} />
      <Stack direction="column" alignItems="center" mb={3}>
        <Card style={{ width: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={3}>
            <Typography variant="h4">Evidence</Typography>
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
                    <Typography mb={0.7}>Evidence Details</Typography>
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
                    <Typography mb={0.7}>Documents</Typography>
                  </Box>
                }
              />
            </Tabs>
            <Divider sx={{ borderColor: 'grey.300' }} />

            {tabValue === 0 && (
              <Grid item xs={12} md={12}>
                <Card
                  sx={{
                    margin: '15px',
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <CardContent>
                    <Box sx={{ textAlign: 'left', mb: 2 }}>
                      <Typography variant="h4" sx={{ mt: 2 }}>
                        {rowData?.Title}
                      </Typography>
                      <Divider sx={{ mt: '10px', borderColor: 'grey.300' }} />
                    </Box>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>{t('Case')}:</strong> {rowData?.Case}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>{t('Hearing')}:</strong> {rowData?.Hearing}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>{t('Favor')}:</strong>
                      {rowData?.Favor}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>{t('CreatedAt')}:</strong> {rowData?.CreatedAt}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>{t('Description')}:</strong> {rowData?.Description}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 2,
                        mt: 4
                      }}
                    >
                      <Tooltip title="Edit">
                        <Button onClick={handleOpenAdd} variant="outlined" color="secondary">
                          <AppRegistrationIcon></AppRegistrationIcon> <Typography ml={1}>Edit</Typography>
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Button variant="contained" color="error" onClick={() => openDeleteDialog(rowData._id)}>
                          <DeleteOutlineIcon></DeleteOutlineIcon>
                        </Button>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {tabValue === 1 && (
              <Box padding={2} border={'none'}>
                <Grid item xs={12} md={8.5}>
                  <Card
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <CardContent>
                      <List>
                        {rowData?.Attachment?.map((item, index) => (
                          <>
                            <ListItem
                              key={index}
                              button
                              onClick={() => window.open(urls?.initialbase + item.url, '_blank')}
                              sx={{
                                borderBottom: '1px solid',
                                borderColor: 'divider'
                              }}
                            >
                              <ListItemIcon>
                                <DescriptionIcon color="primary" />
                              </ListItemIcon>
                              <ListItemText primary={item.name} />
                              <ListItemText secondary={item.type} />
                            </ListItem>
                          </>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Box>
            )}
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default EvidenceView;
