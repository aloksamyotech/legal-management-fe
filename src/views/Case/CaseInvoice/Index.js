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
import TableStyle from '../../../ui-component/TableStyle';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import { getApi } from 'core/APIs/ApiDocuments';
import { useEffect } from 'react';
import { urls } from 'core/Constant/Urls';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const AddInvoice = (props) => {
  const { caseData, id } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const currency = localStorage?.getItem("$2b$10$ehdPSDmr6P3");
  const handleAddInvoice = (id) => {
    navigate(`/dashboard/cases/casesview/invoice/${id}`);
  };
  const handleViewClick = (row) => {
    navigate(`/dashboard/invoice/invoiceview`, { state: row });
  };
  const fetchInvoiceData = async () => {
    try {
      const response = await getApi(urls?.Invoice?.getinvoicebycase?.replace(':caseId', id));
      if (response.data.status === 404) {
        setInvoices([]);
        return;
      }
      const formattedData = response.data?.map((invoice, index) => ({
        SerialNo: index + 1,
        _id: invoice?._id,
        InvoiceNo: invoice.InvoiceNo,
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
  const filteredInvoice = invoices?.filter((item) => item.Client.toLowerCase().includes(searchQuery.toLowerCase()));

  const columns = [
    {
      field: 'InvoiceNo',
      headerName: t('InvoiceNo'),
      flex: 1,
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
      ),
      cellClassName: ' name-column--cell--capitalize'
    },

    {
      field: 'Client',
      headerName: t('Client'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Advocate',
      headerName: t('Advocate'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'date',
      headerName: t('Date'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'TotalPrice',
      headerName: t('Amount'),
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => <Typography>{currency||"$"} {params.value}</Typography>
    },

    {
      field: 'PaymentStatus',
      headerName: t('Status'),
      flex: 0.8,
      headerAlign: 'center',
      align: 'center',
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
              {params.value}
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
              {params.value}
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

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <Container>
        <TableStyle>
          <Box width="100%" mt={3}>
            <Card style={{ paddingTop: '15px' }}>
              <Stack sx={{ paddingRight: '1rem', paddingLeft: '1rem' }} direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">{t('Invoices')}</Typography>

                <Stack width={'100%'} direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
                  <TextField
                    variant="outlined"
                    color="secondary"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('Search')}
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
                    onClick={() => {
                      handleAddInvoice(id);
                    }}
                    sx={{
                      marginBottom: '15px',
                      fontSize: '40px',
                      marginRight: '2rem',
                      backgroundColor: '#673ab7',
                      boxShadow: 'none',
                      borderRadius: '15px'
                    }}
                  >
                    <AddIcon fontSize="medium" sx={{ color: 'white' }} />
                  </Button>
                </Stack>
              </Stack>
              {filteredInvoice.length === 0 ? (
                <Box padding={3}>
                  <Typography variant="body1" color="text.secondary">
                    {t('No invoices available')}
                  </Typography>{' '}
                </Box>
              ) : (
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
              )}
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default AddInvoice;
