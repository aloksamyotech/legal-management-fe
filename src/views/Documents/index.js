import { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
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


const Document = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleViewClick = (row) => {
    navigate(`/dashboard/document/documentview/${row._id}`, { state: row });
  };
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const breadcrumbs = [
    <Link underline="hover" key="1" color="secondary" href="/">
      <HomeIcon sx={{ marginTop: '2px' }} fontSize="small" />
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/dashboard/default">
      {t('Dashboard')}
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {t('Document')}
    </Typography>
  ];
  const fetchDocumentData = async () => {
    try {
      const response = await getApi(urls?.Document?.getalldocument);
      console.log(response);
      const formattedData = response.data.map((document, index) => ({
        SerialNo: index + 1,
        _id: document?._id,
        Title: document?.Title,
        Case: document?.Case?.Title,
        Attachment: document?.Attachment,
        Note: document?.Note,
        CreatedAt: new Date(document?.createdAt).toLocaleDateString('en-GB')
      }));
      setDocuments(formattedData);
    } catch (error) {
      console.error(t('Error fetching documents'), error);
    }
  };

  useEffect(() => {
    fetchDocumentData();
  }, []);

  const filteredDocuments = documents.filter((document) => document.Title.toLowerCase().includes(searchQuery.toLowerCase()));
  const columns = [
    {
      field: 'Title',
      headerName: t('Title'),
      flex: 1,
      cellClassName: ' name-column--cell--capitalize',
      headerAlign: 'center',
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
      ),
      align: 'center'
    },
    {
      field: 'Case',
      headerName: t('Case'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Attachment',
      headerName: t('Document'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
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
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'action',
      headerAlign: 'center',
      align: 'center',
      headerName: t('Action'),
      flex: 1,
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

  return (
    <Container>
      <Stack direction="column" alignItems="center" mb={3}>
        <Card style={{ width: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
            <Typography variant="h4">{t('Document')}</Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
        </Card>
      </Stack>

      <TableStyle>
        <Box width="100%">
          <Card style={{ height: '600px', paddingTop: '15px' }}>
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
            <DataGrid
              rowHeight={42}
              rows={filteredDocuments}
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
          </Card>
        </Box>
      </TableStyle>
    </Container>
  );
};

export default Document;
