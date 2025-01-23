import React, { useState, useEffect } from 'react';
import { Stack, Button, Container, Typography, Box, Card, TextField, InputAdornment, IconButton, Breadcrumbs, Link } from '@mui/material';
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
import { useTranslation } from 'react-i18next';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';

// Breadcrumbs

const Expense = () => {
  const { t } = useTranslation();
  const [openAdd, setOpenAdd] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const breadcrumbsData = [
    { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Expense', path: null } 
  ];
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
        CaseId: expense.Case?._id || 'N/A',
        Case: expense.Case?.Title || 'N/A',
        TypeId: expense.Type?._id,
        Type: expense.Type?.Title,
        Amount: expense.Amount,
        Attachment: expense.Attachment
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

  const filteredExpenses = expenses.filter((expense) => expense.Title.toLowerCase().includes(searchQuery.toLowerCase()));

  const columns = [
    { field: 'id', headerName: t('S.No'), flex: 0.5, align: 'center', headerAlign: 'center' },
    {
      field: 'Title',
      headerName: t('Title'),
      flex: 1,
      align: 'center',
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
      )
    },
    { field: 'Case', headerName: t('Case'), flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'Type', headerName: t('Type'), flex: 1, align: 'center', headerAlign: 'center' },
    {
      field: 'Amount',
      headerName: t('Amount'),
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => <Typography>$ {params.value}</Typography>
    },
    {
      field: 'Attachment',
      headerName: t('Attachment'),
      flex: 1,
      align: 'center',
      headerAlign: 'center',
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
                  onClick={() => alert('More documents available!')}
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
      field: 'action',
      headerName: t('Action'),
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Button variant="text" size="small" onClick={() => handleViewClick(params.row)}>
          <VisibilityIcon color="secondary" sx={{ '&:hover': { color: 'green' } }} />
        </Button>
      )
    }
  ];

  return (
    <>
      <AddExpense open={openAdd} handleClose={handleCloseAdd} fetchExpenseData={fetchExpenseData} />
      <Container>
        <Stack direction="column" alignItems="center" mb={3}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">{t('Expense')}</Typography>
              <UniversalBreadcrumbs items={breadcrumbsData}/>
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
                  sx={{
                    marginBottom: '15px',
                    fontSize: '40px',
                    marginRight: '2rem',
                    backgroundColor: '#673ab7',
                    boxShadow: 'none',
                    borderRadius: '15px'
                  }}
                >
                  <AddIcon fontSize="medium" />
                </Button>
              </Stack>
              <DataGrid
                rowHeight={35}
                rows={filteredExpenses}
                columns={columns}
                getRowId={(row) => row._id}
                columnHeaderHeight={37}
                sx={{
                  padding: '17px',
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
