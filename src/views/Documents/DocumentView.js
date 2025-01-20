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

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import { useLocation, useNavigate, useParams } from 'react-router';
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
import { useState } from 'react';
import DocumentEdit from './DocumentEdit';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useEffect } from 'react';
import DeleteConfirmationDialog from 'core/deleteDialog';
import { Messages } from 'core/comman/comman';

const DocumentView = () => {
  const { id } = useParams();
  const [rowData, setrowdata] = useState({});
  const { t } = useTranslation();
  const [tabValue, setTabValue] = React.useState(0);
  const [openAdd, setOpenAdd] = useState(false);
  
  const breadcrumbs = [
    <Link underline="hover" key="1" color="secondary" href="/">
      <HomeIcon sx={{ marginTop: '2px' }} fontSize="small" />
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/dashboard/default">
      {t('Dashboard')}
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {t('Document')}
    </Typography>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {t('Document View')}
    </Typography>
  ];
  
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const fetchDocumentData = async () => {
    const response = await getApi(urls?.Document?.getdocumentbyid.replace(':id', id));
    const document = response.data;
    console.log(response.data);
    const formattedData = {
      _id: document?._id,
      Title: document?.Title,
      CaseId: document?.Case?._id,
      Case: document?.Case?.Title,
      Attachment: document?.Attachment,
      Note: document?.Note,
      CreatedAt: new Date(document?.createdAt).toLocaleDateString('en-GB')
    };

    setrowdata(formattedData);
  };

  useEffect(() => {
    fetchDocumentData();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await deleteApi(urls.Document.deletedocument.replace(':id', documentToDelete));

      if (response.status === 200) {
        setrowdata({});
        setDeleteDialogOpen(false);
        navigate(`/dashboard/document`);
      }
    } catch (error) {
      console.error('Error deleting the document:', error);
      alert(t('An error occurred while deleting the document.'));
    }
  };

  const openDeleteDialog = (documentId) => {
    setDocumentToDelete(documentId);
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
      <DocumentEdit open={openAdd} handleClose={handleCloseAdd} id={id} rowData={rowData} fetchDocumentData={fetchDocumentData} />
      <DeleteConfirmationDialog open={deleteDialogOpen} onClose={closeDeleteDialog} onDelete={handleDelete} />
      <Stack direction="column" alignItems="center" mb={3}>
        <Card style={{ width: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={3}>
            <Typography variant="h4">{t('Document')}</Typography>
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
                    <Typography mb={0.7}>{t('Document Details')}</Typography>
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
                    <Typography mb={0.7}>{t('Documents')}</Typography>
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
                      <strong>{t('CreatedAt')}:</strong> {rowData?.CreatedAt}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>{t('Description')}:</strong> {rowData?.Note}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 2,
                        mt: 4
                      }}
                    >
                      <Tooltip title={t('Edit')}>
                        <Button onClick={handleOpenAdd} variant="outlined" color="secondary">
                          <AppRegistrationIcon></AppRegistrationIcon> <Typography ml={1}>{t('Edit')}</Typography>
                        </Button>
                      </Tooltip>
                      <Tooltip title={t('Delete')}>
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
                      {rowData?.Attachment?.length > 0 ? (
                        <List>
                          {rowData.Attachment.map((item, index) => (
                            <ListItem
                              key={index}
                              button
                              onClick={() => window.open(urls.initialbase + item.url, '_blank')}
                              sx={{
                                borderBottom: '1px solid',
                                borderColor: 'divider'
                              }}
                            >
                              <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                                <Grid display={'flex'} item xs={12} sm={8} md={8}>
                                  <ListItemIcon>
                                    <DescriptionIcon color="primary" />
                                  </ListItemIcon>
                                  <ListItemText primary={item.name} />
                                </Grid>
                                <Grid item xs={12} sm={4} md={4}>
                                  <ListItemText secondary={item.type} />
                                </Grid>
                              </Grid>
                            </ListItem>
                          ))}
                        </List>
                      ) : (
                        <Typography variant="body2" color="red" align="center">
                          {t(Messages?.NoContent)}
                        </Typography>
                      )}
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

export default DocumentView;
