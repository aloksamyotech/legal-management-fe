import { useState } from 'react';
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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';

// ----------------------------------------------------------------------

const Invoice = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useTranslation();
  const breadcrumbsData = [
    { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Invoice', path: null } 
  ];

  const handleViewClick = (row) => {
    navigate(`/dashboard/invoice/invoiceview`, { state: row });
  };

  const fetchInvoiceData = async () => {
    try {
      const response = await getApi(urls?.Invoice?.getallinvoice);
      if (response.data.status === 404) {
        setInvoices([]);
        return;
      }
      const formattedData = response.data?.map((invoice, index) => ({
        SerialNo: index + 1,
        _id: invoice?._id,
        InvoiceNo: invoice.InvoiceNo,
        Case: invoice?.Case?.Title,
        Client: invoice?.Client?.Name,
        TotalPrice: invoice?.TotalPrice,
        Advocate: invoice?.Advocate?.name,
        PaymentStatus: invoice?.PaymentStatus,
        hearings: invoice?.hearings,
        date: new Date(invoice?.date).toLocaleDateString('en-GB')
      }));
      setInvoices(formattedData);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  useEffect(() => {
    fetchInvoiceData();
  }, []);

  const filteredInvoice = invoices?.filter((item) => item.Case.toLowerCase().includes(searchQuery.toLowerCase()));
  
  const columns = [
    {
      field: 'InvoiceNo',
      headerName: t('InvoiceNo'),
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
      field: 'Client',
      headerName: t('Client'),
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Advocate',
      headerName: t('Advocate'),
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'date',
      headerName: t('Date'),
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'TotalPrice',
      headerName: t('Amount'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => <Typography>${params.value}</Typography>
    },
    {
      field: 'PaymentStatus',
      headerName: t('Status'),
      flex: 0.8,
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
    <>
      <Container>
        <Stack direction="column" alignItems="center" mb={3}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">{t('Invoice')}</Typography>
              <UniversalBreadcrumbs items={breadcrumbsData}/>
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
                rows={filteredInvoice}
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
    </>
  );
};

export default Invoice;
