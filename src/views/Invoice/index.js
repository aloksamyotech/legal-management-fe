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
import TableStyle from '../../ui-component/TableStyle';
import InvoiceData from './InvoiceData';
import { IconButton,} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

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
    Invoice
  </Typography>,
];


const Invoice= () => {
  const [openAdd, setOpenAdd] = useState(false);
  const columns = [
   
    {
      field: 'id',
      headerName: 'S.No',
      flex: .5,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Case',
      headerName: 'Case',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Client',
      headerName: 'Client',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Advocate',
      headerName: 'Advocate',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'Date',
      headerName: 'Date',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
  
    {
      field: 'Status',
      headerName: 'Status',
      flex: 1,
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
      renderCell: (params) => (
        <Button
          variant="inherit"
          size="small"
          sx={{ fontSize: "40px",   "&:hover":{background: "none"}}}
        
        ><Link fontSize={0} color="inherit" component={RouterLink}
        to="/dashboard/invoice/invoiceview">
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
    <Container>
      <Stack direction="column" alignItems="center" mb={3}>
        <Card style={{ width: '100%', }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
            <Typography variant="h4">Invoice</Typography>
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

export default Invoice;
