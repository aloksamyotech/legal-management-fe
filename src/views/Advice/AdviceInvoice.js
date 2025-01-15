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
import { useLocation, useNavigate } from 'react-router';
import css from './PrintInvoice.css';
const StatusButton = ({ status }) => {
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
  const { AdviceData } = props;
  const navigate = useNavigate();
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
                Law Management
              </Typography>
            </Grid>

            <Grid item xs={6} padding={2} textAlign="right">
              <Stack spacing={1} alignItems="flex-end">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PersonIcon style={{ fontSize: '1rem' }} />
                  <Typography>Smartweb Infotech</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <PhoneIcon style={{ fontSize: '1rem' }} />
                  <Typography>07878787878</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <EmailIcon style={{ fontSize: '1rem' }} />
                  <Typography>smartweb@gmail.com</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Box mt={3}>
                <Typography variant="h4" gutterBottom>
                  INVOICE TO:
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
                  Status: <StatusButton status={AdviceData?.Payment} />
                </Typography>
                <Typography>
                  InvoiceNo: <strong>{AdviceData?.InvoiceNo}</strong>
                </Typography>
                <Typography>
                  Invoice Date: <strong>{AdviceData?.Date}</strong>
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
                      <strong>Item</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Description</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Amount</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">{AdviceData?.InvoiceNo}</TableCell>
                    <TableCell>{AdviceData?.internalNote}</TableCell>
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
                          <strong>Total</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>${AdviceData?.Fee}</strong>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <strong>Due Amount</strong>
                        </TableCell>
                        <TableCell align="right">
                          <strong>{AdviceData?.Payment === 'Paid' ? '$00.00' : `$${AdviceData?.Fee}`}</strong>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={3} sx={{ gap: 2, mt: 4 }}>
            <Tooltip title="Print">
              <Button variant="contained" color="primary" onClick={handlePrint}>
                <PrintIcon color="black"></PrintIcon>
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default AdviceInvoicePage;
