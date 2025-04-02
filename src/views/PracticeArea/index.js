import { useState } from 'react';
import { Grid, InputAdornment, Link, Pagination, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import TableStyle from '../../ui-component/TableStyle';
import VisibilityIcon from '@mui/icons-material/Visibility';

import AddPracticeArea from './AddPracticeArea';
import { urls } from 'core/Constant/Urls';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import UpdatePracticearea from './UpdatePracticearea';
import { useTranslation } from 'react-i18next';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';
import DeleteConfirmationDialog from 'core/deleteDialog';
import Loader from 'core/comman/loader';
// ----------------------------------------------------------------------

const PracticeArea = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [PracticeareaData, setPracticeareaData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [PRareaToDelete, setPrareaToDelete] = useState(null);
  const [totalPracticearea, setTotalPracticearea] = useState(0);
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
    setPage(1);
  };

  const breadcrumbsData = [
    { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Practice Area', path: null }
  ];
  const fetchPracticeareaData = async () => {
    try {
      setLoading(true);
      const response = await getApi(urls?.PracticeArea?.getllpracticeareapage, { page, limit: pageSize, search: searchQuery });
      const formattedData = response?.data?.practices?.map((practicearea, index) => ({
        _id: practicearea._id,
        Serial: index + 1,
        Title: practicearea.Title,
        address: practicearea.address,
        description: practicearea.description,
        CreatedAt: new Date(practicearea.CreatedAt).toLocaleDateString('en-GB')
      }));
      setPracticeareaData(formattedData || []);
      setTotalPracticearea(response?.data?.totalPractices);
      setLoading(false);
    } catch (error) {
      console.error('failed to fetch practice area', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPracticeareaData();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [page, pageSize, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      setPage(1);
    }
  }, [searchQuery]);

  const handleEdit = (id) => {
    const selectedData = PracticeareaData.find((item) => item._id === id);
    setEditData(selectedData);
    setOpenEdit(true);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteApi(urls?.PracticeArea.deletepracticearea.replace(':id', PRareaToDelete));
      if (response.status === 200) {
        setDeleteDialogOpen(false);
        toast.success(t('Item deleted successfully!'));
        fetchPracticeareaData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t('Failed to delete item'));
    }
  };
  const openDeleteDialog = (PracticeId) => {
    setPrareaToDelete(PracticeId);
    setDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => setDeleteDialogOpen(false);

  const filteredpractice = PracticeareaData.filter((practicearea) => practicearea.Title.toLowerCase().includes(searchQuery.toLowerCase()));

  const columns = [
    {
      field: 'Title',
      headerName: t('Title'),
      flex: 1,

      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'address',
      headerName: t('Location'),
      flex: 1,

      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'description',
      headerName: t('Description'),
      flex: 1,

      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'CreatedAt',
      headerName: t('CreatedAt'),
      flex: 0.5,

      cellClassName: ' name-column--cell--capitalize'
    },

    {
      field: 'action',
      headerName: t('Action'),
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Stack direction="row" spacing={0} justifyContent="center">
          <Button
            variant="inherit"
            size="small"
            onClick={() => handleEdit(params.row._id)}
            sx={{ padding: '2px', minWidth: '30px', '&:hover': { background: 'none' } }}
          >
            <EditIcon color="secondary" sx={{ '&:hover': { color: 'green' } }} />
          </Button>
          <Button
            variant="inherit"
            size="small"
            onClick={() => openDeleteDialog(params?.row?._id)}
            sx={{ padding: '2px', minWidth: '30px', '&:hover': { background: 'none' } }}
          >
            <DeleteIcon color="error" sx={{ '&:hover': { color: 'red' } }} />
          </Button>
        </Stack>
      )
    }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleCloseEdit = () => setOpenEdit(false);
  return (
    <>
      <DeleteConfirmationDialog open={deleteDialogOpen} onClose={closeDeleteDialog} onDelete={handleDelete} />
      {editData && (
        <UpdatePracticearea
          open={openEdit}
          handleClose={handleCloseEdit}
          fetchPracticeareaData={fetchPracticeareaData}
          editData={editData}
        />
      )}
      <AddPracticeArea open={openAdd} handleClose={handleCloseAdd} fetchPracticeareaData={fetchPracticeareaData} />
      <Container>
        <Stack direction="column" alignItems="center" mb={2.5}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">{t('Practice Area')}</Typography>
              <UniversalBreadcrumbs items={breadcrumbsData} />
            </Stack>
          </Card>
        </Stack>

        <TableStyle>
          <Box width="100%">
            <Card style={{ height: 'auto', paddingTop: '15px' }}>
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
              ) : PracticeareaData?.length !== 0 ? (
                <>
                  <DataGrid
                    rowHeight={35}
                    rows={PracticeareaData}
                    columns={columns}
                    getRowId={(row) => row._id}
                    columnHeaderHeight={37}
                    hideFooterPagination
                    sx={{
                      padding: '17px',
                      border: '2px solid lightgray',
                      '& .MuiDataGrid-columnHeader': {
                        textAlign: 'center'
                      },
                      '& .MuiDataGrid-cell': {}
                    }}
                  />
                  <Box width="100%" mt={0} display="flex" justifyContent="end" alignItems="center" padding={2}>
                    <Pagination count={Math.ceil(totalPracticearea / pageSize)} page={page} onChange={handlePageChange} color="primary" />
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
                </>
              ) : (
                <Grid item xs={12}>
                  <Typography variant="h6" color="textSecondary" align="center" sx={{ width: '100%', padding: '20px' }}>
                    {t('No data available')}
                  </Typography>
                </Grid>
              )}
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default PracticeArea;
