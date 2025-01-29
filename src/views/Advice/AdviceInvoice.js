import React, { useState } from 'react';
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
  Divider,
  Switch
} from '@mui/material';
import { Stack, Container, Card } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import css from './PrintInvoice.css';
import { updateApi, updatepaymentApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { enums, statusCodes } from 'core/Statuscode/constant';

const StatusButton = ({ status }) => {
  if (status === enums?.Paid) {
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
        {status}
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
        {status}
      </Button>
    );
  }
};

const AdviceInvoicePage = (props) => {
  const { AdviceData, fetchAdviceData } = props;
  const [paymentStatus, setPaymentStatus] = useState(AdviceData?.Payment || enums.Unpaid);
  const [isDisabled, setIsDisabled] = useState(false);
  const { t } = useTranslation();

  const updatePaymentStatus = async (newStatus) => {
    try {
      const response = await updatepaymentApi(urls?.Advice?.paymnetupdate, {
        id: AdviceData?._id,
        paymentStatus: newStatus
      });
      if (response.status === statusCodes.ok) {
        return true;
      } else {
        console.error('Unexpected API response:', response);
        return false;
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      return false;
    }
  };

  const handlePaymentToggle = async () => {
    const newStatus = paymentStatus === enums?.Paid ? enums?.Unpaid : enums?.Paid;
    const success = await updatePaymentStatus(newStatus);

    if (success) {
      setPaymentStatus(newStatus);
      setIsDisabled(true);
      fetchAdviceData();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Container>
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
                    {AdviceData?.Client}
                  </Typography>
                  <Typography>
                    <PhoneIcon style={{ fontSize: '1rem', marginRight: '8px', verticalAlign: 'middle' }} />
                    {AdviceData?.ClientPhone}
                  </Typography>
                  <Typography>
                    <LocationOnIcon style={{ fontSize: '1rem', marginRight: '8px', verticalAlign: 'middle' }} />
                    {AdviceData?.ClientAdd}
                  </Typography>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={6} textAlign="right">
              <Box mt={3}>
                <Typography>
                  {t('Status')}: <StatusButton status={paymentStatus} />
                </Typography>
                <Typography>
                  {t('InvoiceNo')}: <strong>{AdviceData?.InvoiceNo}</strong>
                </Typography>
                <Typography>
                  {t('Invoice Date')}: <strong>{AdviceData?.Date}</strong>
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
                  <TableRow>
                    <TableCell align="left">{AdviceData?.InvoiceNo}</TableCell>
                    <TableCell>{AdviceData?.description}</TableCell>
                    <TableCell align="right">${AdviceData?.Fee}</TableCell>
                  </TableRow>
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
                          <strong>${AdviceData?.Fee}</strong>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <strong>{t('Due Amount')}</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>{paymentStatus === enums.Paid ? '$00.00' : `$${AdviceData?.Fee}`}</strong>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={3} sx={{ gap: 2, mt: 4 }}>
            <Box mt={2}>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {t('Change Payment Status')}:
                <Switch
                  checked={paymentStatus === enums?.Paid}
                  onChange={handlePaymentToggle}
                  color="primary"
                  disabled={paymentStatus === enums?.Paid}
                />
              </Typography>
            </Box>
            <Tooltip title={t('Print')}>
              <Button variant="contained" color="primary" onClick={handlePrint}>
                <PrintIcon />
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default AdviceInvoicePage;
