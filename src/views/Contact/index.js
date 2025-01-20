/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card, Avatar, Grid, Divider } from '@mui/material';
import { DataGrid, GridDeleteIcon, GridToolbar } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment, Link, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
import EditIcon from '@mui/icons-material/Edit';
import AddContact from './AddContact';
import EditContact from './editContact';
import { urls } from 'core/Constant/Urls';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import { useEffect } from 'react';
import DeleteConfirmationDialog from 'core/deleteDialog';
import { useTranslation } from 'react-i18next';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';

// ----------------------------------------------------------------------

const Contact = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [contactData, setContactData] = useState([]);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const breadcrumbsData = [
    { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Contact', path: null } 
  ];

  const handleOpenEdit = (contact) => {
    setSelectedContact(contact);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setSelectedContact(null);
    setOpenEdit(false);
  };

  const fetchContactData = async () => {
    const response = await getApi(urls?.Contact?.getcontact);
    const formattedData = response.data.map((contact, index) => ({
      _id: contact._id,
      Serial: index + 1,
      Name: contact.Name,
      emailAddress: contact.emailAddress,
      phoneNumber: contact.phoneNumber,
      gender: contact.gender,
      avatar: contact.avatar,
      Message: contact.Message,
      subject: contact.subject
    }));
    setContactData(formattedData || []);
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await deleteApi(urls.Contact.deletecontact.replace(':id', contactToDelete));

      if (response.status === 200) {
        setContactData((prevData) => prevData.filter((contact) => contact._id !== contactToDelete));
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      console.error('Error deleting the contact:', error);
      alert(t('An error occurred while deleting the contact.'));
    }
  };

  const openDeleteDialog = (contactId) => {
    setContactToDelete(contactId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => setDeleteDialogOpen(false);
  const filteredcontact = contactData.filter((contact) => contact.Name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <EditContact open={openEdit} handleClose={handleCloseEdit} contact={selectedContact} fetchContactData={fetchContactData} />
      <AddContact open={openAdd} handleClose={handleCloseAdd} fetchContactData={fetchContactData} />
      <Container>
        <Stack direction="column" alignItems="center" mb={3}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">{t('Contacts')}</Typography>
              <UniversalBreadcrumbs items={breadcrumbsData}/>
            </Stack>
          </Card>
        </Stack>

        <TableStyle>
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
              <Grid container spacing={3} padding={'17px'}>
                {filteredcontact.length === 0 ? (
                  <Grid item xs={12}>
                    <Typography variant="h6" color="text.secondary" align="center">
                      No contact available
                    </Typography>
                  </Grid>
                ) : (
                  filteredcontact.map((contact) => (
                    <Grid item xs={12} sm={6} md={4} key={contact?.id}>
                      <Card sx={{ background: '#f2f3f5', height: '21.5rem', padding: '16px' }}>
                        <Box display="flex" flexDirection="column" alignItems="flex-start" textAlign="left" padding={1}>
                          <Avatar alt={contact?.firstName} src={urls.initialbase + contact.avatar} sx={{ width: 80, height: 80, mb: 2 }} />
                          <Typography variant="h3" fontWeight="bold" gutterBottom>
                            {contact?.Name}
                          </Typography>
                          <Stack mt={2} display="flex" alignItems="flex-end" flexDirection="row">
                            <Typography variant="body2" color="text.secondary">
                              {t('Email')}:
                              <Typography color={'black'}>{contact?.emailAddress}</Typography>
                            </Typography>
                            <Typography marginLeft={'12px'} variant="body2" color="text.secondary">
                              {t('Gender')}
                              <Typography color={'black'}>{contact?.gender}</Typography>
                            </Typography>
                          </Stack>
                          <Typography mt={2} variant="body2" color="text.secondary">
                            {t('Mobile No')}:
                            <Typography color={'black'}>{contact?.phoneNumber}</Typography>
                          </Typography>
                        </Box>
                        <Stack mt={2} direction="row" alignItems="center" justifyContent={'flex-end'}>
                          <Button
                            color="secondary"
                            variant="outlined"
                            size="large"
                            sx={{
                              marginBottom: '15px',
                              fontSize: '.8rem',
                              boxShadow: 'none',
                              borderRadius: '15px',
                              padding: '5px',
                              marginRight: '10px'
                            }}
                            onClick={() => handleOpenEdit(contact)}
                          >
                            <EditIcon fontSize=".8rem" />
                            {t('Edit')}
                          </Button>

                          <Button
                            color="error"
                            variant="outlined"
                            size="large"
                            sx={{
                              marginBottom: '15px',
                              fontSize: '.8rem',
                              boxShadow: 'none',
                              borderRadius: '15px',
                              padding: '5px'
                            }}
                            onClick={() => openDeleteDialog(contact._id)}
                          >
                            <GridDeleteIcon fontSize=".8rem" />
                            {t('Delete')}
                          </Button>
                        </Stack>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid>
            </Card>
          </Box>
        </TableStyle>
      </Container>
      <DeleteConfirmationDialog open={deleteDialogOpen} onClose={closeDeleteDialog} onDelete={handleDelete} />
    </>
  );
};

export default Contact;
