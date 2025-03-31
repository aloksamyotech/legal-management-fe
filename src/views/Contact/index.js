import { useState } from 'react';
import { Stack, Button, Container, Typography, Box, Card, Avatar, TextField, InputAdornment, Pagination, Grid } from '@mui/material';
import { DataGrid, GridDeleteForeverIcon, GridToolbar } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import GridDeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import AddContact from './AddContact';
import EditContact from './editContact';
import { useTranslation } from 'react-i18next';
import DeleteConfirmationDialog from 'core/deleteDialog';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';
import { toast } from 'react-toastify';
import { Messages } from 'core/comman/comman';
import Loader from 'core/comman/loader';

const Contact = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [contactData, setContactData] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [totalContact, setTotalcontact] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);

  const breadcrumbsData = [
    { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Contact', path: null }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenEdit = (contact) => {
    setSelectedContact(contact);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setSelectedContact(null);
    setOpenEdit(false);
  };

  const fetchContactData = async () => {
    try {
      setLoading(true);
      const response = await getApi(urls?.Contact?.getcontactforpage, {
        page,
        limit: pageSize,
        search: searchQuery
      });
      const formattedData = response?.data?.contacts?.map((contact, index) => ({
        id: contact._id,
        Serial: 'CON-' + (index + 1),
        Name: contact.Name,
        emailAddress: contact.emailAddress,
        phoneNumber: contact.phoneNumber,
        gender: contact.gender,
        avatar: contact.avatar,
        Message: contact.Message,
        subject: contact.subject
      }));
      setContactData(formattedData || []);
      setTotalcontact(response?.data?.totalContacts);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching contact data:', error);
      setLoading(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchContactData();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [page, pageSize, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      setPage(1);
    }
  }, [searchQuery]);

  const handleDelete = async () => {
    try {
      await deleteApi(urls.Contact.deletecontact.replace(':id', contactToDelete));

      setContactData((prevData) => prevData.filter((contact) => contact.id !== contactToDelete));
      const newPage = Math.ceil((totalContact - 1) / pageSize);
      if (newPage < page && newPage > 0) {
        setPage(newPage);
      }
      setDeleteDialogOpen(false);
      toast.success(t(Messages?.contact?.deletesuccess));
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error(t(Messages?.contact?.deleteFailed));
    }
  };

  const openDeleteDialog = (contactId) => {
    setContactToDelete(contactId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => setDeleteDialogOpen(false);

  const columns = [
    { field: 'Serial', headerName: '#', flex: 1 },
    {
      field: 'avatar',
      headerName: t('Avatar'),
      flex: 0.7,
      renderCell: (params) => <Avatar alt={params?.row?.Name} src={params.value ? urls.initialbase + params?.value : ''} />
    },
    { field: 'Name', headerName: t('Name'), flex: 1 },
    { field: 'emailAddress', headerName: t('Email Address'), flex: 1.5 },
    { field: 'phoneNumber', headerName: t('Phone Number'), flex: 1 },
    { field: 'gender', headerName: t('Gender'), flex: 0.8 },
    {
      field: 'action',
      headerName: t('Action'),
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={0} justifyContent="center">
          <Button
            variant="inherit"
            size="small"
            onClick={() => handleOpenEdit(params.row)}
            sx={{ padding: '2px', minWidth: '30px', '&:hover': { background: 'none' } }}
          >
            <EditIcon color="secondary" sx={{ '&:hover': { color: 'green' } }} />
          </Button>
          <Button
            variant="inherit"
            size="small"
            onClick={() => openDeleteDialog(params.row.id)}
            sx={{ padding: '2px', minWidth: '30px', '&:hover': { background: 'none' } }}
          >
            <GridDeleteIcon color="error" sx={{ '&:hover': { color: 'red' } }} />
          </Button>
        </Stack>
      )
    }
  ];

  return (
    <>
      <EditContact open={openEdit} handleClose={handleCloseEdit} contact={selectedContact} fetchContactData={fetchContactData} />
      <AddContact open={openAdd} handleClose={handleCloseAdd} fetchContactData={fetchContactData} />
      <Container>
        <Stack direction="column" alignItems="center" mb={3}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">{t('Contacts')}</Typography>
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

            <Box style={{ padding: '15px' }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                  <Loader isVisible={loading}></Loader>
                </Box>
              ) : contactData?.length !== 0 ? (
                <>
                  <DataGrid
                    rows={contactData}
                    columns={columns}
                    getRowId={(row) => row.id}
                    rowHeight={43}
                    columnHeaderHeight={43}
                    hideFooterPagination
                  />
                  <Box width="100%" mt={0} display="flex" justifyContent="end" alignItems="center" padding={2}>
                    <Pagination count={Math.ceil(totalContact / pageSize)} page={page} onChange={handlePageChange} color="primary" />
                  </Box>
                </>
              ) : (
                <Grid item xs={12}>
                  <Typography variant="h6" color="textSecondary" align="center" sx={{ width: '100%', padding: '20px' }}>
                    {t('No data available')}
                  </Typography>
                </Grid>
              )}
            </Box>
          </Card>
        </Box>
      </Container>

      <DeleteConfirmationDialog open={deleteDialogOpen} onClose={closeDeleteDialog} onDelete={handleDelete} />
    </>
  );
};

export default Contact;
