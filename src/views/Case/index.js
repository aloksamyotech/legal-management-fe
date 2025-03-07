import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment, Link, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import TableStyle from '../../ui-component/TableStyle';
import AddCase from './CreateCase';
import { getApi } from 'core/APIs/ApiDocuments';
import { useEffect } from 'react';
import { urls } from 'core/Constant/Urls';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';
import { enums } from 'core/Statuscode/constant';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------
const breadcrumbsData = [
  { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
  { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
  { label: 'Case', path: null }
];

const Cases = () => {
  const { t } = useTranslation();
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
        CaseStatus: cases?.CaseStatus,
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
      headerName: t('S.NO'),
      flex: 0.7,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'Title',
      headerName: t('Title'),
      flex: 1,
      headerAlign: 'center',
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => (
        <Typography
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
            textDecoration: 'underline',
            fontSize: '.8rem',
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
      headerName: t('Date'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'Client',
      headerName: t('Client'),
      flex: 1,
      headerAlign: 'center',
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'Matter',
      headerName: t('Matter'),
      flex: 1,
      headerAlign: 'center',
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'Advocate',
      headerName: t('Advocate'),
      flex: 1,
      headerAlign: 'center',
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'CaseStatus',
      headerName: t('Case Status'),
      flex: 1,
      headerAlign: 'center',
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: params.value === enums.Open ? '#89eb8c33' : '#ef978e4d',
            color: params.value === enums.Open ? 'green' : '#f02410',
            boxShadow: 'none',
            padding: '3px 3px',
            fontSize: '.6rem',
            '&:hover': {
              color: 'white',
              backgroundColor: params.value === enums.Open ? '#00e676' : '#f02410'
            }
          }}
        >
          {t(params.value)}
        </Button>
      )
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
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'secondary' }}>
                {t('Case')}
              </Typography>
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
                    borderRadius: '15px',
                    '&:hover': {
                      backgroundColor: '#5e35b1'
                    }
                  }}
                >
                  <AddIcon color="white" fontSize="medium" />
                </Button>
              </Stack>
              <DataGrid
                rowHeight={35}
                rows={filteredCase}
                columns={columns}
                getRowId={(row) => row._id}
                sx={{
                  padding: '17px',
                  border: '2px solid lightgray',
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f4f6f8'
                  },
                  '& .MuiDataGrid-columnHeader': {
                    fontWeight: 'bold',
                    backgroundColor: '#e3f2fd'
                  },
                  '& .MuiDataGrid-cell': {
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '13px',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }
                }}
                pagination
                pageSize={10}
                rowsPerPageOptions={[5, 10, 15]}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default Cases;
