import { useState } from 'react';
import { InputAdornment, Link, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
import AddAdvice from './AddAdvice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getApi } from 'core/APIs/ApiDocuments';
import { useEffect } from 'react';
import { urls } from 'core/Constant/Urls';
import { useTranslation } from 'react-i18next';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';

// ----------------------------------------------------------------------
const breadcrumbsData = [
  { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
  { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
  { label: 'Advice', path: null }
];

const Advice = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const handleViewClick = (row) => {
    navigate(`/dashboard/advice/adviceview/${row._id}`, { state: row });
  };
  const [openAdd, setOpenAdd] = useState(false);
  const [adviceData, setAdviceData] = useState([]);

  const fetchAdviceData = async () => {
    const response = await getApi(urls?.Advice?.getalladvice);
    const formattedData = response.data.map((advice, index) => ({
      _id: advice._id,
      Serial: index + 1,
      Client: advice.Client?.Name || 'N/A',
      Matter: advice.Matter?.Title || 'N/A',
      Advocate: advice.Advocate?.name || 'N/A',
      Date: new Date(advice.Date).toLocaleDateString('en-GB'),
      Fee: advice.Fee,
      Status: advice.Status,
      Payment: advice.Payment,
      internalNote: advice.internalNote,
      description: advice.description
    }));
    setAdviceData(formattedData || []);
  };

  useEffect(() => {
    fetchAdviceData();
  }, []);
  const filteredadvice = adviceData.filter((advice) => advice.Client.toLowerCase().includes(searchQuery.toLowerCase()));
  const columns = [
    {
      field: 'Serial',
      headerName: t('S.No'),
      flex: 1,
      headerAlign: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Client',
      headerName: t('Client'),
      flex: 1,
      headerAlign: 'center',
      cellClassName: ' name-column--cell--capitalize',
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
      field: 'Advocate',
      headerName: t('Advocate'),
      flex: 1,
      headerAlign: 'center',
      cellClassName: ' name-column--cell--capitalize'
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
      field: 'Matter',
      headerName: t('Matter'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Fee',
      headerName: t('Fee'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => <Typography fontSize={'12px'}>$ {params.value}</Typography>
    },

    {
      field: 'Status',
      headerName: t('Status'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => {
        if (params.value === 'Approved') {
          return (
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#89eb8c33',
                color: 'green',
                boxShadow: 'none',
                padding: '3px 3px',
                fontSize: '.6rem',
                '&:hover': {
                  color: 'white',
                  backgroundColor: '#00e676'
                }
              }}
            >
              {t(params.value)}
            </Button>
          );
        } else if (params.value === 'On-hold') {
          return (
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#ef978e38',
                color: '#f1c40f',
                boxShadow: 'none',
                padding: '3px 3px',
                fontSize: '.6rem',
                '&:hover': {
                  color: 'white',
                  backgroundColor: '#f1c40f '
                }
              }}
            >
              {t(params.value)}
            </Button>
          );
        } else {
          return (
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#ef978e4d',
                color: '#f02410',
                boxShadow: 'none',
                padding: '3px 3px',
                fontSize: '.6rem',
                '&:hover': {
                  color: 'white',
                  backgroundColor: '#f02410'
                }
              }}
            >
              {t(params.value)}
            </Button>
          );
        }
      }
    },
    {
      field: 'Payment',
      headerName: t('Payment'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => {
        if (params.value === 'Paid') {
          return (
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#89eb8c33',
                color: 'green',
                boxShadow: 'none',
                padding: '3px 3px',
                fontSize: '.6rem',
                '&:hover': {
                  color: 'white',
                  backgroundColor: '#00e676'
                }
              }}
            >
              {t(params.value)}
            </Button>
          );
        } else {
          return (
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#ef978e4d',
                color: '#f02410',
                boxShadow: 'none',
                padding: '3px 3px',
                fontSize: '.6rem',
                '&:hover': {
                  color: 'white',
                  backgroundColor: '#f02410'
                }
              }}
            >
              {t(params.value)}
            </Button>
          );
        }
      }
    },
    {
      field: 'action',
      headerName: t('Action'),
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
          <Link fontSize={0} color="inherit">
            <VisibilityIcon
              color="secondary"
              sx={{
                '&:hover': {
                  color: 'green'
                }
              }}
            />
          </Link>
        </Button>
      )
    }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <AddAdvice open={openAdd} handleClose={handleCloseAdd} fetchAdviceData={fetchAdviceData} />
      <Container>
        <Stack direction="column" alignItems="center" mb={2.5}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">{t('Client Advices')}</Typography>
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
                rows={filteredadvice}
                columns={columns}
                getRowId={(row) => row._id}
                columnHeaderHeight={45}
                sx={{
                  padding: '17px',
                  border: '2px solid lightgray',
                  '& .MuiDataGrid-columnHeader': {
                    textAlign: 'center',
                    fontSize: '12px'
                  },
                  '& .MuiDataGrid-cell': {
                    justifyContent: 'center',
                    fontSize: '12px',
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

export default Advice;
