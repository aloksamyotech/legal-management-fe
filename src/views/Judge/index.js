import { useState } from 'react';
import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  Link,
  Pagination,
  TextField,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridDeleteIcon, GridToolbar } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import TableStyle from '../../ui-component/TableStyle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import JudgeData from './JudgeData';
import EditIcon from '@mui/icons-material/Edit';
import imagesrc from './judgeimage.png';
import AddJudge from './AddJudge';
import { urls } from 'core/Constant/Urls';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import { useEffect } from 'react';
import { margin } from '@mui/system';
import { useTranslation } from 'react-i18next';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';
import { Message } from 'core/Statuscode/constant';
import { Messages } from 'core/comman/comman';
import { toast } from 'react-toastify';
import Loader from 'core/comman/loader';

// ----------------------------------------------------------------------

const Judge = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [judgeData, setJudgeData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [judgeToDelete, setJudgeToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const [totalJudges, setTotalJudges] = useState(0);
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

  const breadcrumbsData = [
    { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Judge', path: null }
  ];
  const fetchJudgeData = async () => {
    try {
      setLoading(true);
      const response = await getApi(urls?.Judge?.gettalljudgepage, { page, limit: pageSize, search: searchQuery });
      const formattedData = response?.data?.judges?.map((judge, index) => ({
        _id: judge._id,
        Serial: index + 1,
        Title: judge.Title,
        mobile: judge.mobile,
        description: judge.description,
        CreatedAt: new Date(judge.CreatedAt).toLocaleDateString('en-GB')
      }));
      setJudgeData(formattedData || []);
      setTotalJudges(response?.data?.totalJudges);
      setLoading(false);
    } catch (error) {
      console.error('failed to fetch judges', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchJudgeData();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [page, pageSize, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      setPage(1);
    }
  }, [searchQuery]);

  const handleOpenAdd = () => {
    setEditData(null);
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setEditData(null);
  };

  const handleOpenEdit = (judge) => {
    setEditData(judge);
    setOpenAdd(true);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteApi(urls.Judge.deltejudges.replace(':id', judgeToDelete));

      if (response.status === 200) {
        setJudgeData((prevData) => prevData.filter((judge) => judge._id !== judgeToDelete));
        setOpenDeleteDialog(false);
        toast.success(t(Messages?.Judge?.Judge_delete_success));
      }
    } catch (error) {
      console.error(t('Error deleting the judge'), error);
      toast.success(t(Messages?.Judge?.Judge_delete_failed));
    }
  };

  const openDeleteConfirmation = (judgeId) => {
    setJudgeToDelete(judgeId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDialog = () => setOpenDeleteDialog(false);

  const filteredjudge = judgeData.filter((judge) => judge.Title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <AddJudge open={openAdd} handleClose={handleCloseAdd} fetchJudgeData={fetchJudgeData} editData={editData} />

      <Container>
        <Stack direction="column" alignItems="center" mb={2.5}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">{t('Judge')}</Typography>
              <UniversalBreadcrumbs items={breadcrumbsData} />
            </Stack>
          </Card>
        </Stack>

        <TableStyle>
          <Box width="100%">
            <Card style={{ paddingTop: '15px' }}>
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
                  placeholder={t('Search')}
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
              ) : judgeData?.length !== 0 ? (
                <Grid container spacing={3} padding={'17px'}>
                  {judgeData?.map((judge) => (
                    <Grid item xs={12} sm={6} md={4} key={judge?.id}>
                      <Card
                        sx={{
                          background: 'linear-gradient(270deg,rgb(136, 67, 254),rgb(166, 191, 241))',
                          height: 'auto',
                          padding: '12px'
                        }}
                      >
                        <Box display="flex" flexDirection="row" alignItems="center" textAlign="left" padding={1}>
                          <Avatar alt={judge?.Title} src={imagesrc} sx={{ width: 60, height: 60, marginRight: 2 }} />
                          <Box>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                              {judge?.Title}
                            </Typography>
                            <Stack mt={0} display="flex" alignItems="flex-start" flexDirection="row">
                              <Typography variant="body2" color="text.secondary">
                                {t('Mobile No')}:<Typography color={'black'}>{judge?.mobile || t('N/A')}</Typography>
                              </Typography>
                              <Typography marginLeft={'12px'} variant="body2" color="text.secondary">
                                {t('CreatedAt')}:<Typography color={'black'}>{judge?.CreatedAt}</Typography>
                              </Typography>
                            </Stack>
                          </Box>
                        </Box>

                        <Typography mt={1} variant="body1" color="text.secondary">
                          {t('Description')}:
                        </Typography>
                        <Box>
                          <Tooltip title={judge?.description || t('No description available')} arrow>
                            <Typography
                              color={'black'}
                              component="span"
                              sx={{
                                display: 'block',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '50ch'
                              }}
                            >
                              {judge?.description?.length > 38
                                ? `${judge?.description.substring(0, 38)}...`
                                : judge?.description || t('N/A')}
                            </Typography>
                          </Tooltip>
                        </Box>

                        <Stack mt={1.5} direction="row" alignItems="center" justifyContent={'flex-end'}>
                          <Button
                            color="secondary"
                            variant="contained"
                            size="large"
                            sx={{
                              marginBottom: '15px',
                              fontSize: '.8rem',
                              boxShadow: 'none',
                              borderRadius: '10px',
                              padding: '5px',
                              marginRight: '10px'
                            }}
                            onClick={() => handleOpenEdit(judge)}
                          >
                            <EditIcon fontSize=".8rem" />
                            {t('Edit')}
                          </Button>

                          <Button
                            color="error"
                            variant="contained"
                            size="large"
                            sx={{
                              marginBottom: '15px',
                              fontSize: '.8rem',
                              boxShadow: 'none',
                              borderRadius: '10px',
                              padding: '5px'
                            }}
                            onClick={() => openDeleteConfirmation(judge._id)}
                          >
                            <GridDeleteIcon fontSize=".8rem" />
                            {t('Delete')}
                          </Button>
                        </Stack>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Typography variant="h6" color="textSecondary" align="center" sx={{ width: '100%', padding: '20px' }}>
                    {t('No data available')}
                  </Typography>
                </Grid>
              )}
              <Box width="100%" mt={2} display="flex" justifyContent="end" alignItems="center" padding={2}>
                <Pagination count={Math.ceil(totalJudges / pageSize)} page={page} onChange={handlePageChange} color="primary" />
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
            </Card>
          </Box>
        </TableStyle>
      </Container>
      <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t(Messages?.deleteDialog.Conferm_delete)}</DialogTitle>
        <DialogContent>
          <Typography variant="body3" color="text.secondary">
            {t(Messages?.deleteDialog?.this_action_Not_undone)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            {t('Cancel')}
          </Button>
          <Button onClick={handleDelete} color="error">
            {t('Delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Judge;
