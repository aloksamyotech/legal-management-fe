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
import TagData from './TagData';
import AddTag from './AddTag';
import { useEffect } from 'react';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import UpdateTag from './UpdateTag';
// ----------------------------------------------------------------------
const breadcrumbs = [
  <Link underline="hover" key="1" color="secondary" href="/">
    <HomeIcon sx={{ marginTop: '2px' }} fontSize="small" />
  </Link>,
  <Link underline="hover" key="2" color="inherit" href="/dashboard/default">
    Dashboard
  </Link>,
  <Typography key="3" sx={{ color: 'text.primary' }}>
    Tag
  </Typography>
];

const Tag = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [tagData, setTagData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchTagData = async () => {
    const response = await getApi(urls?.Tag?.getalltag);
    const formattedData = response.data.map((tag, index) => ({
      _id: tag._id,
      Serial: index + 1,
      Title: tag.Title,
      description: tag.description,
      CreatedAt: new Date(tag.CreatedAt).toLocaleDateString('en-GB')
    }));
    setTagData(formattedData || []);
  };

  useEffect(() => {
    fetchTagData();
  }, []);

  const handleEdit = (id) => {
    const selectedData = tagData.find((item) => item._id === id);
    setEditData(selectedData);
    setOpenEdit(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteApi(urls?.Tag.deletetag.replace(':id', id));
      if (response.status === 200) {
        toast.success('Item deleted successfully!');
        fetchTagData();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete item');
    }
  };
  const filteredtag = tagData.filter((tag) => tag.Title.toLowerCase().includes(searchQuery.toLowerCase()));

  const columns = [
    {
      field: 'Title',
      headerName: 'Title',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'CreatedAt',
      headerName: 'CreatedAt',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },

    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
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
      <AddTag open={openAdd} handleClose={handleCloseAdd} fetchTagData={fetchTagData} />
      {editData && <UpdateTag open={openEdit} handleClose={handleCloseEdit} fetchTagData={fetchTagData} editData={editData} />}
      <Container>
        <Stack direction="column" alignItems="center" mb={2.5}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">Tag</Typography>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
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
                rowHeight={40}
                rows={filteredtag}
                columns={columns}
                getRowId={(row) => row._id}
                columnHeaderHeight={45}
                sx={{
                  padding: '17px',
                  border: '2px solid lightgray',
                  '& .MuiDataGrid-columnHeader': {
                    textAlign: 'center',
                    border: '1px solid lightgray'
                  },
                  '& .MuiDataGrid-cell': {
                    border: '1px solid lightgray',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }
                }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default Tag;
