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
import EvidenceData from './EvidenceData';
import { IconButton,} from "@mui/material";
import {Link as RouterLink, useNavigate}from "react-router-dom";
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
    Evidence
  </Typography>,
];


const Evidence= () => {
   const [evidences, setEvidence] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate= useNavigate();
    const handleViewClick = (row) => {
      navigate(`/dashboard/evidence/evidenceview/${row._id}`, { state: row });
    };
   
    const fetchEvidenceData = async () => {
      try {
        const response = await getApi(urls?.Evidence?.getallevidence);
           console.log(response)
        const formattedData = response.data.map((evidence, index) => ({
        SerialNo: index + 1,
        _id: evidence?._id,
        Title: evidence?.Title,
        Case:evidence?.Case?.Title,
        Hearing:evidence?.Hearing?.Title,
        Favor:evidence?.Favor,
        Attachment:evidence?.Attachment,
        Description:evidence?.Description,
        CreatedAt: new Date(evidence?.CreatedAt).toLocaleDateString("en-GB"),
        }));
        setEvidence(formattedData);
      } catch (error) {
        console.error('Error fetching evidences:', error);
      }
    };
  
    useEffect(() => {
      fetchEvidenceData();
    }, []);
    
    const filteredEvidences = evidences.filter((evidence) =>
      evidence.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  const columns = [
   
    {
      field: 'Title',
      headerName: 'Title',
      flex: 1,
      headerAlign: 'center',
      align: 'center', 
      cellClassName: ' name-column--cell--capitalize',
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
      field: 'Case',
      headerName: 'Case',
      flex: 1,
      headerAlign: 'center',
      align: 'center', 
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Hearing',
      headerName: 'Hearing',
      flex: 1,
      headerAlign: 'center',
      align: 'center', 
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Favor',
      headerName: 'Favor',
      flex: 1,
      headerAlign: 'center',
      align: 'center', 
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'Attachment',
      headerName: 'Attachment',
      flex: 1,
      headerAlign: 'center',
      align: 'center', 
      cellClassName: ' name-column--cell--capitalize',
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          {params?.value?.length > 0 ? (
            params?.value?.slice(0, 2).map((file, index) => (
              <IconButton key={index} size="small">
                <DescriptionIcon
                  onClick={() => window.open(urls?.initialbase + file?.url, "_blank")}
                  sx={{ color: "blue" }}
                  fontSize="small"
                />
              </IconButton>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              -
            </Typography>
          )}
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
          sx={{ fontSize: "40px",   "&:hover":{background: "none"}}}
          onClick={() => handleViewClick(params.row)}
        >
          <VisibilityIcon  color='secondary' sx={{
          "&:hover": {
            color: 'green'
          }
        }} />
        </Button>)
    }
  ];

  return (
    <>
    <Container>
      <Stack direction="column" alignItems="center" mb={3}>
        <Card style={{ width: '100%', }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
            <Typography variant="h4">Evidence</Typography>
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
            </Stack>
            <DataGrid
              rowHeight={39}
              rows={filteredEvidences}
              columns={columns}
              getRowId={(row) => row._id}
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

export default Evidence;
