/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment, Link, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
import AddCase from './CreateCase';
import { getApi } from 'core/APIs/ApiDocuments';
import { useEffect } from 'react';
import { urls } from 'core/Constant/Urls';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';

// ----------------------------------------------------------------------
const breadcrumbsData = [
  { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
  { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
  { label: 'Case', path: null } 
];
const caseData = [
  {
    id: 1,
    Client: 'petter',
    Advocate: 'John doe',
    Matter: 'Criminal Offense',
    Date: '20/11/2024',
    Court: 'District Court',
    PoliceStation: 'Downtown Police Station',
    Judge: 'Chief Justice',
    Title: 'Court Case',
    action: 'Edit'
  }
];

const Cases = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [Cases, setCases] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const handleViewClick = (row) => {
    navigate(`/dashboard/cases/casesview/${row._id}`, { state: row });
  };

  const fetchCaseData = async () => {
    try {
      const response = await getApi(urls?.Case?.getallcase);
      const formattedData = response.data.map((cases, index) => ({
        SerialNo: index + 1,
        _id: cases?._id,
        Title: cases?.Title,
        Matter: cases?.Matter.Title,
        Client: cases?.Client.Name,
        Advocate: cases?.Advocate.name,
        Fir: cases?.Fir,
        Judge: cases.Judge.Title,
        Court: cases.Court?.Title,
        description: cases?.description,
        internalNote: cases?.internalNote,
        PoliceStation: cases?.PoliceStation.Title,
        Date: new Date(cases?.Date).toLocaleDateString('en-GB')
      }));
      setCases(formattedData);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  useEffect(() => {
    fetchCaseData();
  }, []);

  const filteredCase = Cases.filter((item) => item.Title.toLowerCase().includes(searchQuery.toLowerCase()));
  const columns = [
    {
      field: 'SerialNo',
      headerName: 'S.NO',
      flex: 0.7,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Title',
      headerName: 'Title',
      flex: 1,
      headerAlign: 'center',
      cellClassName: ' name-column--cell--capitalize',
      renderCell: (params) => (
        <Typography
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
            textDecoration: 'underline',
            '&:hover': {
              textDecoration: 'underline',
              color: 'secondary.main'
            }
          }}
          onClick={() => handleViewClick(params.row)}
        >
          {params.value}
        </Typography>
      )
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
      field: 'Client',
      headerName: 'Client',
      flex: 1,
      headerAlign: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Matter',
      headerName: 'Matter',
      flex: 1,
      headerAlign: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Advocate',
      headerName: 'Advocate',
      flex: 1,
      headerAlign: 'center',
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
          sx={{ fontSize: '40px', '&:hover': { background: 'none' } }}
          onClick={() => handleViewClick(params.row)}
        >
          <VisibilityIcon
            color="secondary"
            sx={{
              '&:hover': {
                color: 'green'
              }
            }}
          />
        </Button>
      )
    }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <AddCase open={openAdd} handleClose={handleCloseAdd} fetchCaseData={fetchCaseData} />
      <Container>
        <Stack direction="column" alignItems="center" mb={3}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">Case</Typography>
              <UniversalBreadcrumbs items={breadcrumbsData}/>
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
                  inputProps={{ maxLength: 30 }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                rows={filteredCase}
                columns={columns}
                getRowId={(row) => row._id}
                sx={{
                  padding: '17px',
                  border: '2px solid lightgray',
                  '& .MuiDataGrid-columnHeaders': {},
                  '& .MuiDataGrid-columnHeader': {
                    border: '1px solid lightgray'
                  },
                  '& .MuiDataGrid-cell': {
                    border: '1px solid lightgray'
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

export default Cases;
