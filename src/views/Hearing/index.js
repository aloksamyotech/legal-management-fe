/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment, Link, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import TableStyle from '../../ui-component/TableStyle';
import { useNavigate } from 'react-router';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useTranslation } from 'react-i18next'; 
const breadcrumbs = (t) => [
  <Link underline="hover" key="1" color="secondary" href="/">
    <HomeIcon sx={{ marginTop: '2px' }} fontSize="small" />
  </Link>,
  <Link underline="hover" key="2" color="inherit" href="/dashboard/default">
    {t('Dashboard')}
  </Link>,
  <Typography key="3" sx={{ color: 'text.primary' }}>
    {t('Hearing')}
  </Typography>
];

const Hearing = () => {
  const { t } = useTranslation(); 
  const navigate = useNavigate();
  const [Hearings, setHearings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchHearingData = async () => {
    try {
      const response = await getApi(urls?.Hearing?.getallhearing);
      const formattedData = response.data.map((hearing, index) => ({
        SerialNo: index + 1,
        _id: hearing?._id,
        Title: hearing?.Title,
        Case: hearing?.Case?.Title,
        Fee: hearing?.Fee,
        Witness: hearing?.Witness,
        JudgementStatus: hearing?.JudgementStatus,
        JudgementReason: hearing?.JudgementReason,
        Description: hearing?.Description,
        Date: new Date(hearing?.Date).toLocaleDateString('en-GB')
      }));
      setHearings(formattedData);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  useEffect(() => {
    fetchHearingData();
  }, []);

  const filteredHearing = Hearings.filter((item) => item.Title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleViewClick = (row) => {
    navigate(`/dashboard/hearing/hearingview/${row._id}`, { state: row });
  };

  const columns = [
    {
      field: 'SerialNo',
      headerName: t('S.NO'),
      flex: 0.8,
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
      field: 'Case',
      headerName: t('Case'),
      flex: 1,
      headerAlign: 'center',
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'Fee',
      headerName: t('Fees'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => <Typography>${params.row.Fee}</Typography>
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
      field: 'JudgementStatus',
      headerName: t('Judgement Status'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => {
        if (params.value === 'Delivered') {
          return (
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#89eb8c33',
                color: 'green',
                boxShadow: 'none',
                padding: '3px 3px',
                fontSize: '.7rem',
                '&:hover': {
                  color: 'white',
                  backgroundColor: '#00e676'
                }
              }}
            >
              {t(params.value)}
            </Button>
          );
        } else if (params.value === 'In Progress') {
          return (
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#ef978e38',
                color: '#f1c40f',
                boxShadow: 'none',
                padding: '3px 3px',
                fontSize: '.7rem',
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
                fontSize: '.7rem',
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

  return (
    <Container>
      <Stack direction="column" alignItems="center" mb={3}>
        <Card style={{ width: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
            <Typography variant="h4">{t('Hearing')}</Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              {breadcrumbs(t)}
            </Breadcrumbs>
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
            </Stack>
            <DataGrid
              rowHeight={42}
              rows={filteredHearing}
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
  );
};

export default Hearing;
