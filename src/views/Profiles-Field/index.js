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
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import MailLockIcon from '@mui/icons-material/MailLock';
import LockResetIcon from '@mui/icons-material/LockReset';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { urls } from 'core/Constant/Urls';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import { useState, useEffect } from 'react';
import DeleteConfirmationDialog from 'core/deleteDialog';
import { toast } from 'react-toastify';
import { Messages } from 'core/comman/comman';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';

import AddUser from 'views/Users/AddUser';
import ImageUploadComponent from './Logo';
import PasswordChangeComponent from './Forgetpass';
import EmailPermissions from './emialcontrol';
import WhatsappPermissions from './whatsappcontrol';

const Profile = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const { t } = useTranslation();
  const [tabValue, setTabValue] = React.useState(0);
  const navigate = useNavigate();
  const [rowData, setrowdata] = useState({});

  const fetchuserData = async () => {
    const id = localStorage.getItem('$2b$10$ehdPSDmr6P2');
    const response = await getApi(urls?.user?.getuserbyId.replace(':id', id));
    const user = response.data;
    const formattedData = {
      _id: user._id,
      Name: user.Name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      AsignRole: user.AsignRole,
      gender: user.Gender,
      address: user.address,
      permission: user.permission,
      image: user.image,
      currency: user.currency || 'Na'
    };
    setrowdata(formattedData);
  };

  useEffect(() => {
    fetchuserData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const breadcrumbsData = [
    { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Company-profile', path: 'null' }
  ];
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  console.log(rowData);
  return (
    <Container>
      <AddUser open={openAdd} handleClose={handleCloseAdd} fetchUserdata={fetchuserData} editData={rowData} />
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
                      <DriveFolderUploadIcon />
                    </Typography>
                    <Typography mb={0.7}>{t('Update Logo')}</Typography>
                  </Box>
                }
              />
              <Tab
                value={2}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography mr={1} fontSize="1.5rem">
                      <LockResetIcon />
                    </Typography>
                    <Typography mb={0.7}>{t('Update Password')}</Typography>
                  </Box>
                }
              />
              <Tab
                value={3}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography mr={1} fontSize="1.5rem">
                      <MailLockIcon />
                    </Typography>
                    <Typography mb={0.7}>{t('Email Configuration')}</Typography>
                  </Box>
                }
              />
              {/* commented for later implementation */}
              {/* <Tab
                value={4}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography mr={1} fontSize="1.5rem">
                      <SettingsIcon />
                    </Typography>
                    <Typography mb={0.7}>{t('Whatsapp Configuration')}</Typography>
                  </Box>
                }
              /> */}
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
                          alt={rowData.Name}
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
                          <Typography>{rowData?.email}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography sx={{ fontWeight: 'bold' }}>{t('Mobile')}:</Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography>{rowData?.mobileNumber}</Typography>
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
                      <Typography variant="h4" sx={{ mt: 0 }}>
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
                          <Typography sx={{ fontWeight: 'bold' }}>{t('Role')}:</Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Typography>{rowData.AsignRole}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography sx={{ fontWeight: 'bold' }}>{t('Gender')}:</Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Typography>{rowData?.gender || 'N/A'}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography sx={{ fontWeight: 'bold' }}>{t('Company-Currency')}:</Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Typography>{rowData?.currency || 'N/A'}</Typography>
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
                        <Tooltip title={t('Edit')}>
                          <Button variant="outlined" color="secondary" onClick={handleOpenAdd}>
                            <AppRegistrationIcon></AppRegistrationIcon> <Typography ml={1}>{t('Edit')}</Typography>
                          </Button>
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}

            {tabValue === 1 && (
              <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} padding={1}>
                <Box width="90%">
                  <ImageUploadComponent></ImageUploadComponent>
                </Box>
              </Stack>
            )}
            {tabValue === 2 && (
              <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} padding={1}>
                <Box width="90%">
                  <PasswordChangeComponent></PasswordChangeComponent>
                </Box>
              </Stack>
            )}
            {tabValue === 3 && (
              <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} padding={1}>
                <Box width="90%">
                  <EmailPermissions></EmailPermissions>
                </Box>
              </Stack>
            )}
            {tabValue === 4 && (
              <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} padding={1}>
                <Box width="90%">
                  <WhatsappPermissions />
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
