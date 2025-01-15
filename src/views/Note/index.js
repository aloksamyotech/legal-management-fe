import { useState } from 'react';
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment, Link, TextField } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import TableStyle from '../../ui-component/TableStyle';
import AddIcon from '@mui/icons-material/Add';
import AddNote from './CreateNote';
import NoteData from './NoteData';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useEffect } from 'react';


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
    Note
  </Typography>,
];


const Note = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [noteData, setNoteData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const handleViewClick = (row) => {
    navigate(`/dashboard/note/notesview/${row._id}`, { state: row });
  };


  const fetchNoteData = async () => {

    const response = await getApi(urls?.Note?.getallnote);
    console.log(response);
    const formattedData = response.data.map((note, index) => ({
      _id: note._id,
      Serial: index + 1,
      Title: note.Title,
      Description: note.Description,
      CreatedAt: new Date(note.CreatedAt).toLocaleDateString("en-GB"),

    }));
    setNoteData(formattedData || []);


  };

  useEffect(() => {
    fetchNoteData();
  }, []);

  const filterednote = noteData.filter((note) =>
    note.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const columns = [

    {
      field: 'Title',
      headerName: 'Title',
   
      cellClassName: ' name-column--cell--capitalize',
      headerAlign: 'center',
      align: 'center',
      flex:1,
      renderCell: (params) => (
        <Typography
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
            textDecoration:"underline",
            '&:hover': {
              textDecoration: 'underline',
              color: 'secondary.main',
            },
          }}
          onClick={() => handleViewClick(params.row)}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'Description',
      headerName: 'Description',
      width: 500,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },

    {
      field: 'CreatedAt',
      headerName: 'CreatedAt',
      flex:1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'action',
      headerName: 'Action',
      flex:1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button
          variant="inherit"
          size="small"
          sx={{ fontSize: "40px", "&:hover": { background: "none" } }}
          onClick={() => handleViewClick(params.row)}
        ><Link fontSize={0} color="inherit"
           >
            <VisibilityIcon color='secondary' sx={{
              "&:hover": {
                color: 'green'
              }
            }} /></Link>
        </Button>)
    }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <AddNote open={openAdd} handleClose={handleCloseAdd} fetchNoteData={fetchNoteData} />
      <Container>
        <Stack direction="column" alignItems="center" mb={3}>
          <Card style={{ width: '100%', }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">Note</Typography>
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
                  placeholder='Search'
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
              <div style={{ height: 400, width: '100%', overflowX: 'auto' }}>
                <DataGrid
                  rowHeight={42}
                  rows={filterednote}
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
              </div>
            </Card>
          </Box>
        </TableStyle>

      </Container>
    </>
  );
};

export default Note;
