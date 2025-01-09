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
import { IconButton, } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useEffect } from 'react';

// ----------------------------------------------------------------------
const breadcrumbs = [
  <Link underline="hover" key="1" color="secondary" href="/" >
    <HomeIcon sx={{ marginTop: "2px" }} fontSize='small' />
  </Link>,
  <Link
    underline="hover"
    key="2"
    color="inherit"
    href="/dashboard/default"
  >
    Dashboard
  </Link>,
  <Typography key="3" sx={{ color: 'text.primary' }}>
    Invoice
  </Typography>,
];


const Invoice = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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
        date: new Date(invoice?.date).toLocaleDateString("en-GB"),
      }));
      setInvoices(formattedData);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  useEffect(() => {
    fetchInvoiceData();
  }, []);
  const filteredInvoice = invoices?.filter((item) =>
    item.Case.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const columns = [

    {
      field: 'InvoiceNo',
      headerName: 'InoviceNo',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Case',
      headerName: 'Case',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Client',
      headerName: 'Client',
      flex: 1,
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Advocate',
      headerName: 'Advocate',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'TotalPrice',
      headerName: 'Amount',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => (
        <Typography>${params.value}</Typography>
      )
    },
    {
      field: 'PaymentStatus',
      headerName: 'Status',
      flex: .8,
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => {
        if (params.value === "Paid") {
          return <Button variant="contained"
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
          >{params.value}</Button>;
        } else {
          return <Button variant="contained"
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
            }}>{params.value}</Button>;
        }

      }
    },

    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="inherit"
          size="small"
          sx={{ fontSize: "40px", "&:hover": { background: "none" } }}
          onClick={() => handleViewClick(params.row)}
        >
          <VisibilityIcon color='secondary' sx={{
            "&:hover": {
              color: 'green'
            }
          }} />
        </Button>)
    }
  ];


  return (
    <>
      <Container>
        <Stack direction="column" alignItems="center" mb={3}>
          <Card style={{ width: '100%', }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">Invoice</Typography>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>

            </Stack>
          </Card>
        </Stack>

        <TableStyle>

          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <Stack sx={{ paddingRight: "1rem", }} direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>


                <TextField
                  variant="outlined"
                  color='secondary'
                  placeholder='Search'
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  inputProps={{ maxLength: 30 }}
                  sx={{ width: '20%', }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color='secondary' />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <DataGrid
                rowHeight={42}
                rows={filteredInvoice}
                columns={columns}
                getRowId={(row) => row._id}
                sx={{
                  padding: "17px",
                  border: "2px solid lightgray",
                  "& .MuiDataGrid-columnHeaders": {

                  },
                  "& .MuiDataGrid-columnHeader": {
                    border: "1px solid lightgray",
                  },
                  "& .MuiDataGrid-cell": {
                    border: "1px solid lightgray",

                  },
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
