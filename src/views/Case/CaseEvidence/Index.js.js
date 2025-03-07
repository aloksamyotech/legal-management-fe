import { useState } from 'react';
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment, Link, TextField } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import TableStyle from '../../../ui-component/TableStyle';
import EvidenceData from 'views/Evidence/EvidenceData';
import { IconButton } from '@mui/material';
import EvidenceForm from './AddEvidence';
import { urls } from 'core/Constant/Urls';
import { getApi } from 'core/APIs/ApiDocuments';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const AddEvidence = (props) => {
  const { caseData, caseId } = props;
  const [openAdd, setOpenAdd] = useState(false);
  const [Evidenses, setEvidence] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleViewClick = (row) => {
    navigate(`/dashboard/evidence/evidenceview/${row._id}`, { state: row });
  };
  const fetchEvidenceData = async () => {
    try {
      const response = await getApi(urls?.Evidence?.getcaseEvidense.replace(':caseId', caseId));
      if (response.data.status === 404) {
        setEvidence([]);
        return;
      }
      const formattedData = response?.data?.map((evidence, index) => ({
        SerialNo: index + 1,
        _id: evidence?._id,
        Title: evidence?.Title,
        Hearing: evidence?.Hearing?.Title,
        Favor: evidence?.Favor,
        Attachment: evidence?.Attachment,
        Description: evidence?.Description,
        CreatedAt: new Date(evidence?.CreatedAt).toLocaleDateString('en-GB')
      }));
      setEvidence(formattedData);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  useEffect(() => {
    fetchEvidenceData();
  }, []);
  const filteredEvidence = Evidenses?.filter((item) => item.Title.toLowerCase().includes(searchQuery.toLowerCase()));

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
                  onClick={() => window.open(urls?.initialbase + file?.url, '_blank')}
                  sx={{ color: 'blue' }}
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
      )
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
      <EvidenceForm caseData={caseData} id={caseId} open={openAdd} handleClose={handleCloseAdd} fetchEvidenceData={fetchEvidenceData} />
      <Container>
        <TableStyle>
          <Box width="100%" mt={3}>
            <Card style={{ paddingTop: '15px' }}>
              <Stack sx={{ paddingRight: '1rem', paddingLeft: '1rem' }} direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">{t('Evidences')}</Typography>
                <Stack sx={{ width: '100%' }} direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
                  <TextField
                    variant="outlined"
                    color="secondary"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    size="small"
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
                    sx={{ marginBottom: '15px', fontSize: '40px', backgroundColor: '#673ab7', boxShadow: 'none', borderRadius: '15px' }}
                  >
                    <AddIcon color="white" fontSize="medium" />
                  </Button>
                </Stack>
              </Stack>
              {filteredEvidence.length === 0 ? (
                <Box padding={3}>
                  <Typography variant="body1" color="text.secondary">
                    {t('No evidences available')}
                  </Typography>
                </Box>
              ) : (
                <DataGrid
                  rowHeight={42}
                  rows={filteredEvidence}
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
              )}
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default AddEvidence;
