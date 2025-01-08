
import React, { useState, useEffect } from 'react';
import {
  Stack,
  Button,
  Container,
  Typography,
  Box,
  Card,
  TextField,
  InputAdornment,
  IconButton,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddExpense from './AddExpense';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DescriptionIcon from '@mui/icons-material/Description';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import TableStyle from '../../ui-component/TableStyle';

// Breadcrumbs
const breadcrumbs = [
  <Link underline="hover" key="1" color="secondary" href="/">
    <HomeIcon sx={{ marginTop: '2px' }} fontSize="small" />
  </Link>,
  <Link underline="hover" key="2" color="inherit" href="/dashboard/default">
    Dashboard
  </Link>,
  <Typography key="3" sx={{ color: 'text.primary' }}>
    Expense
  </Typography>,
];

const Expense = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate= useNavigate();
  const handleViewClick = (row) => {
    navigate(`/dashboard/expenses/expenseview/${row._id}`, { state: row });
  };
 
  const fetchExpenseData = async () => {
    try {
      const response = await getApi(urls?.Expense?.getallexpenses);
         
      const formattedData = response.data.map((expense, index) => ({
        id: index + 1,
        _id: expense._id,
        Title: expense.Title,
        CaseId: expense.Case?._id||"N/A",
        Case: expense.Case?.Title||"N/A",
        TypeId: expense.Type?._id,
        Type: expense.Type?.Title,
        Amount: expense.Amount,
        Attachment: expense.Attachment,
      }));
      setExpenses(formattedData);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenseData();
  }, []);


  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  
  const filteredExpenses = expenses.filter((expense) =>
    expense.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const columns = [
    { field: 'id', headerName: 'S.No', flex: 0.5, align: 'center', headerAlign: 'center' },
    { field: 'Title', headerName: 'Title', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'Case', headerName: 'Case', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'Type', headerName: 'Type', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'Amount', headerName: 'Amount', flex: 1, align: 'center', headerAlign: 'center' },
    {
      field: 'Attachment',
      headerName: 'Attachment',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          {params?.value?.length > 0 ? (
            params?.value?.slice(0, 2).map((file, index) => (
              <IconButton key={index} size="small">
                <DescriptionIcon
                  onClick={() => window.open(urls?.initialbase + file?.url, "_blank")}
                  sx={{ color: "blue" }}
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
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Button variant="text" size="small"
        onClick={() => handleViewClick(params.row)}>
           <VisibilityIcon color="secondary" sx={{ '&:hover': { color: 'green' } }} />
              </Button>
      ),
    },
  ];

  return (
    <>
      <AddExpense open={openAdd} handleClose={handleCloseAdd} fetchExpenseData={fetchExpenseData}  />
      <Container>
        <Stack direction="column" alignItems="center" mb={3}>
          <Card style={{ width: '100%' }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              padding={2}
            >
              <Typography variant="h4">Expense</Typography>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Stack>
          </Card>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <Stack
                sx={{ paddingRight: '1rem' }}
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={2}
              >
                <TextField
                  variant="outlined"
                  color="secondary"
                  placeholder="Search"
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ width: '20%' }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="secondary" />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  onClick={handleOpenAdd}
                  sx={{
                    marginBottom: '15px',
                    fontSize: '40px',
                    marginRight: '2rem',
                    backgroundColor: '#673ab7',
                    boxShadow: 'none',
                    borderRadius: '15px',
                  }}
                >
                  <AddIcon fontSize="medium" />
                </Button>
              </Stack>
              <DataGrid
                rowHeight={42}
                rows={filteredExpenses}
                columns={columns}
                getRowId={(row) => row._id}
                sx={{
                  padding: '17px',
                  border: '2px solid lightgray',
                  '& .MuiDataGrid-columnHeaders': {},
                  '& .MuiDataGrid-columnHeader': {
                    border: '1px solid lightgray',
                  },
                  '& .MuiDataGrid-cell': {
                    border: '1px solid lightgray',
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

export default Expense;
