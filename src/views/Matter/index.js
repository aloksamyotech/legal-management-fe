import { useState } from 'react';
import { InputAdornment, Link, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import TableStyle from '../../ui-component/TableStyle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MatterData from './MatterData';
import AddMatter from './AddMatter';
import { urls } from 'core/Constant/Urls';
import { Description } from '@mui/icons-material';
import { useEffect } from 'react';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import UpdateMatter from './UpdateMatter';
import { useTranslation } from 'react-i18next'; // Import translation hook
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';

// ----------------------------------------------------------------------

const Matter = () => {
  const { t } = useTranslation();
  const [openAdd, setOpenAdd] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [matterData, setMatterData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const breadcrumbsData = [
    { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Matter', path: null }
  ];
  const fetchMatterData = async () => {
    const response = await getApi(urls?.Matter?.getallmatter);
    const formattedData = response.data.map((matter, index) => ({
      _id: matter._id,
      Serial: 'MAT-' + (index + 1),
      Title: matter.Title,
      description: matter.description,
      CreatedAt: new Date(matter.CreatedAt).toLocaleDateString('en-GB')
    }));
    setMatterData(formattedData || []);
  };

  useEffect(() => {
    fetchMatterData();
  }, []);

  const handleEdit = (id) => {
    const selectedData = matterData.find((item) => item._id === id);
    setEditData(selectedData);
    setOpenEdit(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteApi(urls?.Matter.deletematter.replace(':id', id));
      if (response.status === 200) {
        toast.success(t('Item deleted successfully!'));
        fetchMatterData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t('Failed to delete item'));
    }
  };
  const filteredmatter = matterData.filter((matter) => matter.Title.toLowerCase().includes(searchQuery.toLowerCase()));
  const columns = [
    {
      field: 'Serial',
      headerName: t('Serial No'),
      flex: 0.7,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Title',
      headerName: t('Title'),
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
      headerName: t('Created At'),
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
            onClick={() => handleDelete(params.row._id)}
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
      <AddMatter open={openAdd} handleClose={handleCloseAdd} fetchMatterData={fetchMatterData} />
      {editData && <UpdateMatter open={openEdit} handleClose={handleCloseEdit} fetchMatterData={fetchMatterData} editData={editData} />}
      <Container>
        <Stack direction="column" alignItems="center" mb={2.5}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">{t('Matter')}</Typography>
              <UniversalBreadcrumbs items={breadcrumbsData} />
            </Stack>
          </Card>
        </Stack>

        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
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
              <DataGrid
                rowHeight={35}
                rows={filteredmatter}
                columns={columns}
                getRowId={(row) => row._id}
                columnHeaderHeight={37}
                sx={{
                  padding: '17px',
                  border: '2px solid lightgray',
                  '& .MuiDataGrid-columnHeader': {
                    textAlign: 'center'
                  },
                  '& .MuiDataGrid-cell': {}
                }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default Matter;
