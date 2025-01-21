import { useState } from 'react';
import { Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputAdornment, Link, TextField, Tooltip } from '@mui/material';
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
import imagesrc from "./judgeimage.png"
import AddJudge from './AddJudge';
import { urls } from 'core/Constant/Urls';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import { useEffect } from 'react';
import { margin } from '@mui/system';
import { useTranslation } from 'react-i18next';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';


// ----------------------------------------------------------------------

const Judge = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [judgeData, setJudgeData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [judgeToDelete, setJudgeToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const {t}= useTranslation();
  
  const breadcrumbsData = [
    { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Judge', path: null } 
  ];
  const fetchJudgeData = async () => {
    const response = await getApi(urls?.Judge?.gettalljudge);
    const formattedData = response.data.map((judge, index) => ({
      _id: judge._id,
      Serial: index + 1,
      Title: judge.Title,
      mobile: judge.mobile,
      description: judge.description,
      CreatedAt: new Date(judge.CreatedAt).toLocaleDateString('en-GB')
    }));
    setJudgeData(formattedData || []);
  };

  useEffect(() => {
    fetchJudgeData();
  }, []);

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
      }
    } catch (error) {
      console.error(t('Error deleting the judge'), error);
      alert(t('An error occurred while deleting the judge.'));
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
              <UniversalBreadcrumbs items={breadcrumbsData}/>
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
              <Grid container spacing={3} padding={'17px'}>
                {filteredjudge.map((judge) => (
                  <Grid item xs={12} sm={6} md={4} key={judge?.id}>
                    <Card sx={{ background: '#f2f3f5', height: '21.5rem', padding: '16px' }}>
                      <Box display="flex" flexDirection="column" alignItems="flex-start" textAlign="left" padding={1}>
                        <Avatar
                          alt={judge?.Title}
                          src={imagesrc}
                          sx={{ width: 80, height: 80, mb: 2 }}
                        />
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                          {judge?.Title}
                        </Typography>
                        <Stack mt={2} display="flex" alignItems="flex-end" flexDirection="row">
                          <Typography variant="body2" color="text.secondary">
                            {t('Mobile No')}:
                            <Typography color={'black'}>{judge?.mobile || t('N/A')}</Typography>
                          </Typography>
                          <Typography marginLeft={'12px'} variant="body2" color="text.secondary">
                            {t('CreatedAt')}:
                            <Typography color={'black'}>{judge?.CreatedAt}</Typography>
                          </Typography>
                        </Stack>
                        <Typography mt={2} variant="body2" color="text.secondary">
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
                              {judge?.description?.length > 40 ? `${judge?.description.substring(0, 40)}...` : judge?.description || t('N/A')}
                            </Typography>
                          </Tooltip>
                        </Box>
                      </Box>
                      <Stack mt={2} direction="row" alignItems="center" justifyContent={'flex-end'}>
                        <Button
                          color="secondary"
                          variant="outlined"
                          size="large"
                          sx={{
                            marginBottom: '15px',
                            fontSize: '.8rem',
                            boxShadow: 'none',
                            borderRadius: '15px',
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
                          variant="outlined"
                          size="large"
                          sx={{
                            marginBottom: '15px',
                            fontSize: '.8rem',
                            boxShadow: 'none',
                            borderRadius: '15px',
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
            </Card>
          </Box>
        </TableStyle>
      </Container>
      <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t('Are you sure you want to delete?')}</DialogTitle>
        <DialogContent>
          <Typography variant="body3" color="text.secondary">
            {t('This action cannot be undone.')}
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
