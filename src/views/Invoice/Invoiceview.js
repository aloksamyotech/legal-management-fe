import React from 'react';
import {
  Box,
  Typography,
  Table,
  Tooltip,
  TableBody,
  TableCell,
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Divider
} from '@mui/material';
import { Stack, Container, Card } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useState } from 'react';
import { useEffect } from 'react';
import DeleteConfirmationDialog from 'core/deleteDialog';
import { Messages } from 'core/comman/comman';
import { toast } from 'react-toastify';
import css from './PrintInvoice.css';
import { useTranslation } from 'react-i18next';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';



const StatusButton = ({ status ,t }) => {
  if (status === 'Paid') {
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
        {t(status)}
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
        {t(status)}
      </Button>
    );
  }
};

const InvoicePage = () => {
  const {t}=useTranslation();
  const location = useLocation();
  const invoice = location?.state;
  const [invoices, setInvoices] = useState({});
  var invoiceId = invoice?._id;
  const printRef = useRef();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/dashboard/invoice/edit`, { state: invoice });
  };
  
  const breadcrumbsData = [
    { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Invoice', path: '/dashboard/invoice', color: 'inherit' },
    { label: 'Invoice View', path: null } 
  ];
  const fetchInvoiceData = async () => {
    if (!invoiceId) return;
    try {
      const response = await getApi(urls?.Invoice?.getinvoiceByid.replace(':id', invoiceId));
      console.log(response, '=========================================>');
      if (response?.data?.status === 404) {
        setInvoices({});
        return;
      }
      const invoice = response?.data;
      const formattedData = {
        _id: invoice?._id,
        InvoiceNo: invoice.InvoiceNo,
        Case: invoice?.Case?.Title,
        Client: invoice?.Client,
        TotalPrice: invoice?.TotalPrice,
        Advocate: invoice?.Advocate,
        PaymentStatus: invoice?.PaymentStatus,
        hearings: invoice?.hearings,
        extraExpenses: invoice?.extraExpenses,

        date: new Date(invoice?.date).toLocaleDateString('en-GB')
      };
      setInvoices(formattedData);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  useEffect(() => {
    fetchInvoiceData();
  }, [invoiceId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDelete = async () => {
    try {
      const response = await deleteApi(urls?.Invoice?.deleteinvoice.replace(':id', invoiceToDelete));

      if (response.status === 200) {
        setDeleteDialogOpen(false);
        toast.success(t(Messages.Invoice?.delete_success));
        navigate(`/dashboard/invoice`);
      }
    } catch (error) {
      console.error('Error deleting the invoice:', error);
      toast.error(t(Messages.Invoice?.delete_failed));
    }
  };

  const openDeleteDialog = (InvoiceId) => {
    setInvoiceToDelete(InvoiceId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => setDeleteDialogOpen(false);
  return (
    <Container>
      <DeleteConfirmationDialog open={deleteDialogOpen} onClose={closeDeleteDialog} onDelete={handleDelete} />
      <Stack direction="column" alignItems="center" mb={3}>
        <Card style={{ width: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
            <Typography variant="h4">{t('Invoice')}</Typography>
            <UniversalBreadcrumbs items={breadcrumbsData}/>
          </Stack>
        </Card>
      </Stack>
      <Card>
        <Box p={3} className="print-container" id="invoice-print">
          <Grid container spacing={2} mt={0.5} alignItems="center" bgcolor="lightblue" borderRadius={2} ml={-1}>
            <Grid item xs={6} padding={2}>
              <Typography variant="h2" fontWeight="bold">
                {t('Law Management')}
              </Typography>
            </Grid>

            <Grid item xs={6} padding={2} textAlign="right">
              <Stack spacing={1} alignItems="flex-end">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PersonIcon style={{ fontSize: '1rem' }} />
                  <Typography>{t('Smartweb Infotech')}</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <PhoneIcon style={{ fontSize: '1rem' }} />
                  <Typography>{t('07878787878')}</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <EmailIcon style={{ fontSize: '1rem' }} />
                  <Typography>{t('smartweb@gmail.com')}</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Box mt={3}>
                <Typography variant="h4" gutterBottom>
                  {t('INVOICE TO:')}
                </Typography>
                <Stack spacing={0.5}>
                  <Typography>
                    <PersonIcon style={{ fontSize: '1rem', marginRight: '8px', verticalAlign: 'middle' }} />
                    {invoices?.Client?.Name}
                  </Typography>
                  <Typography>
                    <PhoneIcon style={{ fontSize: '1rem', marginRight: '8px', verticalAlign: 'middle' }} />
                    {invoices?.Client?.phonenum}
                  </Typography>
                  <Typography>
                    <LocationOnIcon style={{ fontSize: '1rem', marginRight: '8px', verticalAlign: 'middle' }} />
                    {invoices?.Client?.address}
                  </Typography>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={6} textAlign="right">
              <Box mt={3}>
                <Typography>
                  {t('Status')}: <StatusButton status={invoices?.PaymentStatus} t={t}/>
                </Typography>
                <Typography>
                  {t('Invoice No:')} <strong>{invoices?.InvoiceNo}</strong>
                </Typography>
                <Typography>
                  {t('Invoice Date')}: <strong>{invoices?.date}</strong>
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box mt={3} padding={3}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>{t('Item')}</strong>
                    </TableCell>
                    <TableCell>
                      <strong>{t('Description')}</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>{t('Amount')}</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices?.hearings?.map((hearing, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{hearing?.title?.Title}</TableCell>
                      <TableCell>{hearing?.notes}</TableCell>
                      <TableCell align="right">${hearing?.amount}</TableCell>
                    </TableRow>
                  ))}
                  {invoices?.extraExpenses?.map((expense, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{expense?.title}</TableCell>
                      <TableCell>{expense?.notes}</TableCell>
                      <TableCell align="right">${expense?.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Box textAlign="right" width="300px">
                <TableContainer component={Paper} mt={3}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <strong>{t('Total')}</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>${invoices?.TotalPrice}</strong>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <strong>{t('Due Amount')}</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>{invoices?.PaymentStatus === 'Paid' ? '$00.00' : `$${invoices?.TotalPrice}`}</strong>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={3} sx={{ gap: 2, mt: 4 }}>
            <Tooltip title={t('Print')}>
              <Button variant="contained" color="primary" onClick={handlePrint}>
                <PrintIcon color="black"></PrintIcon>
              </Button>
            </Tooltip>
            <Tooltip title={t('Edit')}>
              <Button variant="outlined" color="secondary" onClick={handleEdit}>
                <AppRegistrationIcon></AppRegistrationIcon> <Typography ml={1}>{t('Edit')}</Typography>
              </Button>
            </Tooltip>
            <Tooltip title={t('Delete')}>
              <Button variant="contained" color="error" onClick={() => openDeleteDialog(invoiceId)}>
                <DeleteOutlineIcon></DeleteOutlineIcon>
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default InvoicePage;
