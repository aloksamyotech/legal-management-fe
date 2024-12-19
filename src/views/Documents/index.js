import { useState, useEffect } from 'react';
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
import { IconButton } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';

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
    Document
  </Typography>,
];

const Document = () => {
    const navigate = useNavigate();
  const handleViewClick = (row) => {
   
    navigate(`/dashboard/document/documentview/${row._id}`, { state: row });
  };
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchDocuments = async () => {
   
      const response = await getApi(urls?.document?.getalldocument);
      setDocuments(response?.data); 
   
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

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
      field: 'Case',
      headerName: 'Case',
      flex: 1,
      headerAlign: 'center',
      align: 'center', 
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Attachment',
      headerName: 'Document',
      flex: 1,
      headerAlign: 'center',
      align: 'center', 
      cellClassName: ' name-column--cell--capitalize',
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          {params?.value?.map((file, index) => (
            console.log(file),
            <IconButton key={index} size="small">
              <DescriptionIcon  onClick={() => window.open(`http://localhost:7200${file.url}`, "_blank")} sx={{ color: "blue" }} fontSize="small" />
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
      headerAlign: 'center',
      align: 'center', 
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="inherit"
          size="small"
          sx={{ fontSize: "40px", "&:hover":{background: "none"}}}
          onClick={() => handleViewClick(params.row)}
        ><Link fontSize={0} color="inherit"
      
        >
          <VisibilityIcon  color='secondary' sx={{
          "&:hover": {
            color: 'green'
          }
        }} /></Link>
        </Button>)
    }
  ];

  return (
    <Container>
      <Stack direction="column" alignItems="center" mb={3}>
        <Card style={{ width: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
            <Typography variant="h4">Document</Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
        </Card>
      </Stack>

      <TableStyle>
        <Box width="100%">
          <Card style={{ height: '600px', paddingTop: '15px' }}>
            <Stack sx={{ paddingRight: "1rem" }} direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
              <TextField
                variant="outlined"
                color='secondary'
                placeholder='Search'
                size="small"
                inputProps={{ maxLength: 30 }}
                sx={{ width: '20%' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="secondary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <DataGrid
              rowHeight={42}
              rows={documents}
              columns={columns}
              getRowId={(row) => row._id}
              columnHeaderHeight={45} 
              loading={loading}
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
  );
};

export default Document;
