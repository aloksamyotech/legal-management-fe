import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Button, Container, Typography, Box, Card, TextField, InputAdornment, Link, Grid, Pagination } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import TableStyle from '../../ui-component/TableStyle';
import AddIcon from '@mui/icons-material/Add';
import AddNote from './CreateNote';
import { useNavigate } from 'react-router-dom';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';
import Loader from 'core/comman/loader';

const Note = () => {
  const { t } = useTranslation();
  const [openAdd, setOpenAdd] = useState(false);
  const [noteData, setNoteData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [totalNotes, setTotalNotes] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
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
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const handleViewClick = (row) => {
    navigate(`/dashboard/note/notesview/${row._id}`, { state: row });
  };
  const breadcrumbsData = [
    { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Note', path: null }
  ];
  const fetchNoteData = async () => {
    try {
      setLoading(true);
      const response = await getApi(urls?.Note?.getallnoteforpage, { page, limit: pageSize, search: searchQuery });
      const formattedData = response?.data?.notes?.map((note, index) => ({
        _id: note._id,
        Serial: 'NOT-' + (index + 1),
        Title: note.Title,
        Description: note.Description,
        CreatedAt: new Date(note.CreatedAt).toLocaleDateString('en-GB')
      }));
      setNoteData(formattedData || []);
      setTotalNotes(response?.data?.totalNotes);
      setLoading(false);
    } catch (error) {
      console.error(t('Error fetching notes data:'), error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchNoteData();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [page, pageSize, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      setPage(1);
    }
  }, [searchQuery]);

  const columns = [
    {
      field: 'Serial',
      headerName: t('Serial No'),
      flex: 1,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'Title',
      headerName: t('Title'),
      flex: 1,
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
      field: 'Description',
      headerName: t('Description'),
      width: 500,
      headerAlign: 'center',
      align: 'center'
    },
    {
      field: 'CreatedAt',
      headerName: t('CreatedAt'),
      flex: 1
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
      <AddNote open={openAdd} handleClose={handleCloseAdd} fetchNoteData={fetchNoteData} />
      <Container>
        <Stack direction="column" alignItems="center" mb={3}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">{t('Note')}</Typography>
              <UniversalBreadcrumbs items={breadcrumbsData} />
            </Stack>
          </Card>
        </Stack>

        <TableStyle>
          <Box width="100%">
            <Card style={{ height: 'auto', paddingTop: '15px' }}>
              <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2} sx={{ paddingRight: '1rem' }}>
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
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                  <Loader isVisible={loading}></Loader>
                </Box>
              ) : noteData?.length !== 0 ? (
                <>
                  <DataGrid
                    rowHeight={35}
                    rows={noteData}
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
                    <Pagination count={Math.ceil(totalNotes / pageSize)} page={page} onChange={handlePageChange} color="primary" />
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
    </>
  );
};

export default Note;
