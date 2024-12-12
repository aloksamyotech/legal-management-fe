import { useState } from 'react';
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment, Link, TextField } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import TableStyle from '../../../ui-component/TableStyle';
import { IconButton,} from "@mui/material";
import { DocumentData } from 'views/Documents/constant';
import { Height } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import AddDocuments from './AddDocuments';
// ----------------------------------------------------------------------


const AddDocument= () => {
  const [openAdd, setOpenAdd] = useState(false);
  const columns = [
   
    {
      field: 'Title',
      headerName: 'Title',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize',
      headerAlign: 'center',
      align: 'center',  
    },
    
    {
      field: 'Document',
      headerName: 'Document',
      flex: 1,
      headerAlign: 'center',
      align: 'center', 
      cellClassName: ' name-column--cell--capitalize',
      renderCell: (params) => (
        
        <Box display="flex" alignItems="center">
          {params?.value.map((file, index) => (
            
              <IconButton key={index}  size="small">
                <DescriptionIcon sx={{color:"blue"}} fontSize="small" />
              </IconButton>
      
          ))}
        </Box>
      ),
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
        <Button
          variant="inherit"
          size="small"
          sx={{ fontSize: "40px",  "&:hover":{background: "none"}}}
        
        ><Link fontSize={0} color="inherit"
        href="/dashboard/client/clientview">
          <VisibilityIcon  color='secondary' sx={{
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
    <AddDocuments open={openAdd} handleClose={handleCloseAdd} />
    <Container>

      <TableStyle>

        <Box width="100%" mt={3}>
          <Card style={{  paddingTop: '15px' }}>
          <Stack
                sx={{ paddingRight: "1rem", paddingLeft: "1rem" }}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h4">Documents</Typography>
                <Stack sx={{  width:"100%" }} direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
                  <TextField
                    variant="outlined"
                    color='secondary'
                    placeholder='Search'
                    size="small"
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
                  <Button color="secondary" variant="contained" size='large' onClick={handleOpenAdd} sx={{ marginBottom: "15px", fontSize: "40px", backgroundColor: "#673ab7", boxShadow: "none", borderRadius: "15px" }}>
                    <AddIcon color='white'
                      fontSize="medium" />

                  </Button>
                </Stack>
              </Stack>
            <DataGrid
              rowHeight={42}
              rows={DocumentData}
              columns={columns}
              getRowId={(row) => row.id}
              columnHeaderHeight={45} 
              sx={{padding:"17px",
                border: "2px solid lightgray", 
                "& .MuiDataGrid-columnHeader": {
                  textAlign:"center",
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

export default AddDocument;
