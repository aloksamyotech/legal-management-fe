/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card, Pagination, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment, Link, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import TableStyle from '../../ui-component/TableStyle';
import { useNavigate } from 'react-router';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useTranslation } from 'react-i18next';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';
import Loader from 'core/comman/loader';
const breadcrumbsData = [
  { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
  { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
  { label: 'Hearing', path: null }
];

const Hearing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [Hearings, setHearings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const currency = localStorage?.getItem('$2b$10$ehdPSDmr6P3');
  const [totalHearinig, setTotalHearing] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const fetchHearingData = async (page, pageSize) => {
    try {
      setLoading(true);
      const response = await getApi(urls?.Hearing?.getallhearingforpage, {
        page,
        limit: pageSize,
        search: searchQuery
      });
      const formattedData = response?.data?.hearings?.map((hearing, index) => ({
        SerialNo: (page - 1) * pageSize + (index + 1),
        _id: hearing?._id,
        Title: hearing?.Title,
        ClientId: hearing?.Client?._id,
        Client: hearing?.Client?.Name,
        CaseId: hearing?.Case?._id,
        Case: hearing?.Case?.Title,
        Fee: hearing?.Fee,
        Witness: hearing?.Witness,
        JudgementStatus: hearing?.JudgementStatus,
        JudgementReason: hearing?.JudgementReason,
        Description: hearing?.Description,
        Date: new Date(hearing?.Date).toLocaleDateString('en-GB')
      }));
      setHearings(formattedData || []);
      setTotalHearing(response?.data?.totalHearings);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching cases:', error);
      setLoading(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchHearingData(page, pageSize);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [page, pageSize, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      setPage(1);
    }
  }, [searchQuery]);

  const filteredHearing = Hearings.filter((item) => item.Title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleViewClick = (row) => {
    navigate(`/dashboard/hearing/hearingview/${row._id}`, { state: row });
  };
  const handleCaseView = (row) => {
    navigate(`/dashboard/cases/casesview/${row?.CaseId}`, { state: row });
  };
  const handleClient = (row) => {
    navigate(`/dashboard/client/view/${row?.ClientId}`, { state: row });
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
            //textDecoration: 'underline',
            fontSize: '.80rem',
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
      field: 'Client',
      headerName: t('Client Name'),
      flex: 1,
      headerAlign: 'center',
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => (
        <Typography
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
            fontSize: '.83rem',
            //  textDecoration: 'underline',
            '&:hover': {
              textDecoration: 'underline',
              color: 'secondary.main'
            }
          }}
          onClick={() => handleClient(params.row)}
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
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => (
        <Typography
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
            // textDecoration: 'underline',
            fontSize: '.80rem',
            '&:hover': {
              textDecoration: 'underline',
              color: 'secondary.main'
            }
          }}
          onClick={() => handleCaseView(params.row)}
        >
          {params.value}
        </Typography>
      )
    },
    {
      field: 'Fee',
      headerName: t('Fees'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => (
        <Typography fontSize={'.80rem'}>
          {currency || '$'} {params.row.Fee}
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
            <UniversalBreadcrumbs items={breadcrumbsData} />
          </Stack>
        </Card>
      </Stack>

      <TableStyle>
        <Box width="100%">
          <Card style={{ height: 'auto', paddingTop: '15px' }}>
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
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <Loader isVisible={loading}></Loader>
              </Box>
            ) : Hearings?.length !== 0 ? (
              <>
                <DataGrid
                  rowHeight={35}
                  rows={Hearings}
                  columns={columns}
                  getRowId={(row) => row._id}
                  columnHeaderHeight={37}
                  loading={loading}
                  hideFooter={true}
                  components={{
                    Pagination: () => null
                  }}
                  sx={{
                    padding: '17px',
                    border: '2px solid lightgray',
                    '& .MuiDataGrid-columnHeaders': {},
                    '& .MuiDataGrid-columnHeader': {
                      // border: '1px solid lightgray'
                    },
                    '& .MuiDataGrid-cell': {
                      justifyContent: 'center',
                      fontSize: '13px'

                      //   border: '1px solid lightgray'
                    }
                  }}
                />
                <Box width="100%" mt={0} display="flex" justifyContent="end" alignItems="center" padding={2}>
                  <Pagination count={Math.ceil(totalHearinig / pageSize)} page={page} onChange={handlePageChange} color="primary" />
                </Box>
              </>
            ) : (
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary" align="center" sx={{ width: '100%', padding: '20px' }}>
                  {t('No data available')}
                </Typography>
              </Grid>
            )}
          </Card>
        </Box>
      </TableStyle>
    </Container>
  );
};

export default Hearing;
