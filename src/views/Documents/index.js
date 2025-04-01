import { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Box, Card, Grid, Pagination } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment, Link, TextField } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import TableStyle from '../../ui-component/TableStyle';
import { IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useTranslation } from 'react-i18next';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';
import Loader from 'core/comman/loader';

const Document = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [totalDocument, setTotalDocument] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const handleViewClick = (row) => {
    navigate(`/dashboard/document/documentview/${row._id}`, { state: row });
  };
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const selectStyles = {
    padding: '10px 15px',
    border: `1px solid ${isFocused || isHovered ? '#007bff' : '#ccc'}`,
    borderRadius: '5px',
    fontSize: '14px',
    backgroundColor: isFocused || isHovered ? '#e9f1fb' : '#fff',
    transition: 'border-color 0.3s ease, background-color 0.3s ease'
  };
  const breadcrumbsData = [
    { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Document', path: null }
  ];
  const fetchDocumentData = async (page, pageSize) => {
    try {
      setLoading(true);
      const response = await getApi(urls?.Document?.getalldocforpage, {
        page,
        limit: pageSize,
        search: searchQuery
      });
      const formattedData = response?.data?.documents?.map((document, index) => ({
        SerialNo: 'DOC-' + (page - 1) * pageSize + (index + 1),
        _id: document?._id,
        Title: document?.Title,
        Case: document?.Case?.Title,
        Attachment: document?.Attachment,
        Note: document?.Note,
        CreatedAt: new Date(document?.createdAt).toLocaleDateString('en-GB')
      }));
      setDocuments(formattedData || []);
      setTotalDocument(response?.data?.totalDocuments);
      setLoading(false);
    } catch (error) {
      console.error(t('Error fetching documents'), error);
      setLoading(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchDocumentData(page, pageSize);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [page, pageSize, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      setPage(1);
    }
  }, [searchQuery]);

  const filteredDocuments = documents.filter((document) => document.Title.toLowerCase().includes(searchQuery.toLowerCase()));
  const columns = [
    {
      field: 'SerialNo',
      headerName: t('Serial No'),
      flex: 1
    },
    {
      field: 'Title',
      headerName: t('Title'),
      flex: 1,
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
      field: 'Case',
      headerName: t('Case'),
      flex: 1,

      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Attachment',
      headerName: t('Document'),
      flex: 1,

      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          {params?.value?.length > 0 ? (
            <>
              {params?.value?.slice(0, 2).map((file, index) => (
                <IconButton key={index} size="small">
                  <DescriptionIcon
                    onClick={() => window.open(urls?.initialbase + file?.url, '_blank')}
                    sx={{ color: 'blue' }}
                    fontSize="small"
                  />
                </IconButton>
              ))}
              {params?.value?.length > 2 && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ cursor: 'pointer', marginLeft: 1 }}
                  onClick={() => alert(t('More documents available!'))}
                >
                  ...
                </Typography>
              )}
            </>
          ) : (
            <Typography variant="body2" color="textSecondary">
              -
            </Typography>
          )}
        </Box>
      )
    },
    {
      field: 'CreatedAt',
      headerName: t('CreatedAt'),
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'action',
      headerAlign: 'center',
      align: 'center',
      headerName: t('Action'),
      flex: 0.5,
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
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  return (
    <Container>
      <Stack direction="column" alignItems="center" mb={3}>
        <Card style={{ width: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
            <Typography variant="h4">{t('Document')}</Typography>
            <UniversalBreadcrumbs items={breadcrumbsData} />
          </Stack>
        </Card>
      </Stack>

      <TableStyle>
        <Box width="100%">
          <Card style={{ height: 'auto', paddingTop: '15px' }}>
            <Stack sx={{ paddingRight: '1rem' }} direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
              <TextField
                variant="outlined"
                color="secondary"
                placeholder={t('Search')}
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
            ) : documents?.length !== 0 ? (
              <>
                <DataGrid
                  rowHeight={35}
                  rows={documents}
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
                    '& .MuiDataGrid-columnHeader': {
                      textAlign: 'center'
                    }
                  }}
                />
                <Box width="100%" mt={0} display="flex" justifyContent="end" alignItems="center" padding={2}>
                  <Pagination count={Math.ceil(totalDocument / pageSize)} page={page} onChange={handlePageChange} color="primary" />
                  <select
                    id="page-size"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    style={selectStyles}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
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

export default Document;
