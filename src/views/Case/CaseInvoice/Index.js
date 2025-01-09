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
import InvoiceData from 'views/Invoice/InvoiceData';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------



const AddInvoice= (props) => {
const{caseData, id}=props;
  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);
  const handleViewClick = (id) => {
    navigate(`/dashboard/cases/casesview/invoice/${id}`);
};
  const columns = [
   
    {
      field: 'id',
      headerName: 'S.No',
      flex: .5,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    
    {
      field: 'Client',
      headerName: 'Client',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Advocate',
      headerName: 'Advocate',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'Date',
      headerName: 'Date',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize'
    },
  
    {
      field: 'Status',
      headerName: 'Status',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => {
        if (params.value === "Paid") {
          return <Button  variant="contained"
          sx={{backgroundColor:"#89eb8c33",
            color:"green",
            boxShadow:"none",
            padding:"3px 3px",
            fontSize:".7rem",
            "&:hover":{
              color:"white",
              backgroundColor:"#00e676"
            }
          }}
          >{params.value}</Button>;
        }else{
          return <Button variant="contained"
          sx={{backgroundColor:"#ef978e4d",
            color:"#f02410",
            boxShadow:"none",
            padding:"3px 3px",
            fontSize:".7rem",
            "&:hover":{
              color:"white",
              backgroundColor:"#f02410"
            }
          }}>{params.value}</Button>;
        }
         
      }
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
          sx={{ fontSize: "40px",   "&:hover":{background: "none"}}}
        >
        
          <VisibilityIcon  color='secondary' sx={{
          "&:hover": {
            color: 'green'
          }
        }} />
        </Button>)
    }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
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
                                <Typography variant="h4">Invoices</Typography>


                                <Stack width={"100%"} direction="row" alignItems="center" justifyContent={"flex-end"} spacing={2}>
                                    <TextField
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                        placeholder="Search"
                                        inputProps={{ maxLength: 30 }}
                                        sx={{ width: "20%" }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon color="secondary" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        size="large"
                                        onClick={()=>{handleViewClick(id)}}
                                        sx={{
                                            marginBottom: "15px",
                                            fontSize: "40px",
                                            marginRight: "2rem",
                                            backgroundColor: "#673ab7",
                                            boxShadow: "none",
                                            borderRadius: "15px",
                                        }}
                                    >
                                        <AddIcon
                                            fontSize="medium"
                                            sx={{ color: "white" }}
                                        />
                                    </Button>
                                </Stack>
                            </Stack>

            <DataGrid
              rowHeight={42}
              rows={InvoiceData}
              columns={columns}
              getRowId={(row) => row.id}
              sx={{padding:"17px",
                border: "2px solid lightgray", 
                "& .MuiDataGrid-columnHeaders": {
                  
                },
                "& .MuiDataGrid-columnHeader": {
                  border: "1px solid lightgray", 
                },
                "& .MuiDataGrid-cell": {
                  border: "1px solid lightgray",

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

export default AddInvoice;
