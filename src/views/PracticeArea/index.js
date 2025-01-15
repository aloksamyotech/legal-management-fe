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

import AddPracticeArea from './AddPracticeArea';
import PracticeAreaData from './PracticeAreaData';
import { urls } from 'core/Constant/Urls';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import UpdatePracticearea from './UpdatePracticearea';
// ----------------------------------------------------------------------
const breadcrumbs = [
  <Link underline="hover" key="1" color="secondary" href="/" >
    <HomeIcon sx={{ marginTop: "2px" }} fontSize='small' />
  </Link>,
  <Link
    underline="hover"
    key="2"
    color="inherit"
    href="/dashboard/default"
  >
    Dashboard
  </Link>,
  <Typography key="3" sx={{ color: 'text.primary' }}>
    PracticeArea
  </Typography>,
];


const PracticeArea = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [PracticeareaData, setPracticeareaData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false); 
  const [editData, setEditData] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const fetchPracticeareaData = async () => {
    const response = await getApi(urls?.PracticeArea?.getllpracticearea);
    const formattedData = response.data.map((practicearea, index) => ({
      _id: practicearea._id,
      Serial: index + 1,
      Title: practicearea.Title,
      address: practicearea.address,
      description: practicearea.description,
      CreatedAt: new Date(practicearea.CreatedAt).toLocaleDateString("en-GB"),


    }));
    setPracticeareaData(formattedData || []);


  };

  useEffect(() => {
    fetchPracticeareaData();
  }, []);
  const handleEdit = (id) => {
    const selectedData = PracticeareaData.find((item) => item._id === id);
    setEditData(selectedData); 
    setOpenEdit(true); 
  };
  const handleDelete = async(id) => {
    try {
             const response = await deleteApi(urls?.PracticeArea.deletepracticearea.replace(':id',id));
             if (response.status === 200) {
               toast.success("Item deleted successfully!");
               fetchPracticeareaData();
             }
           } catch (error) {
             toast.error(error.response?.data?.message || "Failed to delete item");
           }
         };
         const filteredpractice = PracticeareaData.filter((practicearea) =>
          practicearea.Title.toLowerCase().includes(searchQuery.toLowerCase())
        );
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
      field: 'address',
      headerName: 'Location',
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
        <Stack  direction="row" spacing={0} justifyContent="center">
          <Button
           
            variant="inherit"
            size="small"
            onClick={() => handleEdit(params.row._id)}
            sx={ {padding:"2px", minWidth:"30px", "&:hover": { background: "none" } }}
          >
            <EditIcon color="secondary" sx={{"&:hover": { color: 'green' } }} />
          </Button>
          <Button
            variant="inherit"
          
            size="small"
            onClick={() => handleDelete(params.row._id)}
            sx={{ padding: "2px", minWidth:"30px","&:hover": { background: "none" } }}
          >
            <DeleteIcon color="error" sx={{ "&:hover": { color: 'red' } }} />
          </Button>
        </Stack>
      ),
    },
  ];


  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleCloseEdit = () => setOpenEdit(false);
  return (
    <>
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
          <Card style={{ width: '100%', }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">Practice Area</Typography>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>

            </Stack>
          </Card>
        </Stack>

        <TableStyle>

          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <Stack sx={{ paddingRight: "1rem", }} direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>


                <TextField
                  variant="outlined"
                  color='secondary'
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  inputProps={{ maxLength: 30 }}
                  sx={{ width: '20%', }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color='secondary' />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button color="secondary" variant="contained" size='large' onClick={handleOpenAdd} sx={{ marginBottom: "15px", fontSize: "40px", marginRight: "2rem", backgroundColor: "#673ab7", boxShadow: "none", borderRadius: "15px" }}>
                  <AddIcon color='white'
                    fontSize="medium" />

                </Button>
              </Stack>
              <DataGrid
                rowHeight={40}
                rows={filteredpractice}
                columns={columns}
                getRowId={(row) => row._id}
                columnHeaderHeight={45}
                sx={{
                  padding: "17px",
                  border: "2px solid lightgray",
                  "& .MuiDataGrid-columnHeader": {
                    textAlign: "center",
                    border: "1px solid lightgray",
                  },
                  "& .MuiDataGrid-cell": {
                    border: "1px solid lightgray",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                }}
              />
            </Card>
          </Box>
        </TableStyle>

      </Container>
    </>
  );
};

export default PracticeArea;
