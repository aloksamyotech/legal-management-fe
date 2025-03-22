import { useState } from 'react';
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment, Link, TextField } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import TableStyle from '../../../ui-component/TableStyle';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddDocuments from './AddDocuments';
import { urls } from 'core/Constant/Urls';
import { getApi } from 'core/APIs/ApiDocuments';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
// ----------------------------------------------------------------------

const AddDocument = (props) => {
  const { caseData, caseId } = props;
  const [openAdd, setOpenAdd] = useState(false);
  const [Documents, setDocument] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleViewClick = (row) => {
    navigate(`/dashboard/document/documentview/${row._id}`, { state: row });
  };
  const fetchDocumentData = async () => {
    try {
      const response = await getApi(urls?.Document?.getdocumentBycase.replace(':caseId', caseId));
      if (response.data.status === 404) {
        setDocument([]);
        return;
      }
      const formattedData = response?.data?.map((document, index) => ({
        SerialNo: index + 1,
        _id: document?._id,
        Title: document?.Title,
        Attachment: document?.Attachment,
        Note: document?.Note,
        CreatedAt: new Date(document?.CreatedAt).toLocaleDateString('en-GB')
      }));
      setDocument(formattedData);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  useEffect(() => {
    fetchDocumentData();
  }, []);
  const filteredDocument = Documents?.filter((item) => item.Title.toLowerCase().includes(searchQuery.toLowerCase()));

  const columns = [
    {
      field: 'Title',
      headerName: t('Title'),
      flex: 1,
      cellClassName: ' name-column--cell--capitalize',
      headerAlign: 'center',
      align: 'center',
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
      field: 'Attachment',
      headerName: t('Document'),
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
      headerName: t('CreatedAt'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
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
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  return (
    <>
      <AddDocuments caseData={caseData} caseId={caseId} open={openAdd} handleClose={handleCloseAdd} fetchDocumentData={fetchDocumentData} />
      <Container>
        <TableStyle>
          <Box width="100%" mt={3}>
            <Card style={{ paddingTop: '15px' }}>
              <Stack sx={{ paddingRight: '1rem', paddingLeft: '1rem' }} direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">{t('Documents')}</Typography>
                <Stack sx={{ width: '100%' }} direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
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
                    sx={{ marginBottom: '15px', fontSize: '40px', backgroundColor: '#673ab7', boxShadow: 'none', borderRadius: '15px' }}
                  >
                    <AddIcon color="white" fontSize="medium" />
                  </Button>
                </Stack>
              </Stack>
              {filteredDocument.length === 0 ? (
                <Box padding={3}>
                  <Typography variant="body1" color="text.secondary">
                    {t('No documents available')}
                  </Typography>
                </Box>
              ) : (
                <DataGrid
                  rowHeight={42}
                  rows={filteredDocument}
                  columns={columns}
                  getRowId={(row) => row._id}
                  columnHeaderHeight={45}
                  sx={{
                    padding: '17px',
                    border: '2px solid lightgray',
                    '& .MuiDataGrid-columnHeader': {
                      textAlign: 'center',
                      border: '1px solid lightgray'
                    },
                    '& .MuiDataGrid-cell': {
                      border: '1px solid lightgray',
                      justifyContent: 'center',
                      alignItems: 'center'
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

export default AddDocument;
