import React from 'react';
import { Box, Typography, Table, Tooltip,TableBody, TableCell, Grid, TableContainer, TableHead, TableRow, Paper, Button, Divider } from '@mui/material';
import { Stack, Container, Card } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import PrintIcon from '@mui/icons-material/Print';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useRef } from 'react';
    


const rows = [
    { item: "Preliminary Hearing", description: "This is the demo dummy data", amount: 500 },
    { item: "Initial Hearing", description: "This is the demo dummy data", amount: 300 },
    { item: "Initial Hearing", description: "This is the demo dummy data", amount: 300 },
];

const totalAmount = rows.reduce((sum, row) => sum + row.amount, 0);

const breadcrumbs = [
    <Link underline="hover" key="1" color="secondary" href="/" >
        <HomeIcon sx={{ marginTop: "2px" }} fontSize='small' />
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/dashboard/default">
        Dashboard
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
        Invoice
    </Typography>,
];

const StatusButton = ({ status }) => {
    if (status === "Paid") {
        return (
            <Button
                variant="contained"
                sx={{
                    backgroundColor: "#89eb8c33",
                    color: "green",
                    boxShadow: "none",
                    padding: "3px 3px",
                    fontSize: ".7rem",
                    "&:hover": {
                        color: "white",
                        backgroundColor: "#00e676"
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
                    backgroundColor: "#ef978e4d",
                    color: "#f02410",
                    boxShadow: "none",
                    padding: "3px 3px",
                    fontSize: ".7rem",
                    "&:hover": {
                        color: "white",
                        backgroundColor: "#f02410"
                    }
                }}
            >
                {status}
            </Button>
        );
    }
};

const InvoicePage = () => {
    const printRef = useRef();

    const handlePrint = () => {
        const content = printRef.current.innerHTML;
        const printWindow = window.open("", "", "width=800,height=600");
        printWindow.document.write(`
          <html>
            <head>
              <title>Invoice</title>
              <style>
                @media print {
                  body {
                    margin: 0;
                    padding: 0;
                    background-color: white;
                  }
                  .no-print {
                    display: none;
                  }
                  .print-container {
                    width: 100%;
                    margin: 0 auto;
                    padding: 20px;
                    box-sizing: border-box;
                  }
                  table {
                    border-collapse: collapse;
                    width: 100%;
                  }
                  th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                  }
                  th {
                    background-color: #f4f4f4;
                  }
                }
              </style>
            </head>
            <body>
              ${content}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      };
    const Status = "Paid";
    return (
        <Container>
            <Stack direction="column" alignItems="center" mb={3}>
                <Card style={{ width: '100%' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
                        <Typography variant="h4">Invoice</Typography>
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Stack>
                </Card>
            </Stack>
            <Card>
                <Box p={3} ref={printRef} className="print-container">
                    <Grid container spacing={2} mt={0.5} alignItems="center" bgcolor="lightblue" borderRadius={2} ml={-1}>
                        <Grid item xs={6} padding={2}>
                            <Typography variant="h2" fontWeight="bold">
                                Law Management
                            </Typography>
                        </Grid>

                        <Grid item xs={6} padding={2} textAlign="right">
                            <Stack spacing={1} alignItems="flex-end">
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <PersonIcon  style={{ fontSize: "1rem" }}/>
                                    <Typography>Smartweb Infotech</Typography>
                                </Stack>

                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <PhoneIcon  style={{ fontSize: "1rem" }}/>
                                    <Typography>07878787878</Typography>
                                </Stack>

                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <EmailIcon  style={{ fontSize: "1rem" }}/>
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
                                        <PersonIcon style={{ fontSize: "1rem" ,marginRight: "8px", verticalAlign: "middle" }} />
                                        John Doe
                                    </Typography>
                                    <Typography>
                                        <PhoneIcon style={{fontSize: "1rem" , marginRight: "8px", verticalAlign: "middle" }} />
                                        123-456-7890
                                    </Typography>
                                    <Typography>
                                        <LocationOnIcon style={{fontSize: "1rem" , marginRight: "8px", verticalAlign: "middle" }} />
                                        123 Main St, Apt 4B
                                    </Typography>
                                </Stack>
                            </Box>
                        </Grid>

                        <Grid item xs={6} textAlign="right">
                            <Box mt={3}>
                                <Typography>
                                    Status:{" "}
                                    <StatusButton status={Status} />
                                </Typography>
                                <Typography>
                                    Invoice No: <strong>#INV-0001</strong>
                                </Typography>
                                <Typography>
                                    Invoice Date: <strong>Jul 28, 2024</strong>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Box mt={3} padding={3}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Item</strong></TableCell>
                                        <TableCell><strong>Description</strong></TableCell>
                                        <TableCell align="right"><strong>Amount</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="left">{row.item}</TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell align="right">${row.amount}</TableCell>
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
                                                <TableCell colSpan={2}><strong>Total</strong></TableCell>
                                                <TableCell align="right"><strong>${totalAmount}</strong></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={2}><strong>Due Amount</strong></TableCell>
                                                <TableCell align="right"><strong>${totalAmount}</strong></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" mt={3}  sx={{gap: 2, mt: 4,}} >
                        <Tooltip title="Print">
                            <Button variant="contained" color="primary"  onClick={handlePrint} >
                                <PrintIcon color="black"></PrintIcon>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <Button variant="outlined" color="secondary">
                                <AppRegistrationIcon></AppRegistrationIcon> <Typography ml={1}>Edit</Typography>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <Button variant="contained" color="error">
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
