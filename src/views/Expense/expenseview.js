import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Link from '@mui/material/Link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArticleIcon from '@mui/icons-material/Article';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useTranslation } from 'react-i18next';
import expenseviewData from './ExpenseviewData';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import {
  Divider,
  Breadcrumbs,
  Container,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Typography,
  Button,
  Tooltip
} from '@mui/material';
import { useState } from 'react';
import ExpenseEdit from './ExpenseEdit';
import { deleteApi, getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import DeleteConfirmationDialog from 'core/deleteDialog';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';

const ExpenseView = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = React.useState(0);
  const [openAdd, setOpenAdd] = useState(false);
  const [rowData, setrowdata] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  const breadcrumbsData = [
    { label: 'Home', path: '/', icon: HomeIcon, color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Expense', path: '/dashboard/expenses', color: 'inherit' },
    { label: 'Expense View', path: null }
  ];
  const fetchExpenseData = async () => {
    const response = await getApi(urls?.Expense?.getexpense.replace(':id', id));
    const expense = response.data;

    const formattedData = {
      _id: expense._id,
      Title: expense.Title,
      CaseId: expense?.Case?._id,
      Case: expense.Case?.Title,
      TypeId: expense.Type?._id,
      Type: expense.Type?.Title,
      Amount: expense.Amount,
      Description: expense.Description,
      Attachment: expense.Attachment
    };

    setrowdata(formattedData);
  };

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleDelete = async () => {
    try {
      const response = await deleteApi(urls.Expense.deleteexpense.replace(':id', expenseToDelete));

      if (response.status === 200) {
        setrowdata({});
        setDeleteDialogOpen(false);
        navigate(`/dashboard/expenses`);
      }
    } catch (error) {
      console.error('Error deleting the expense:', error);
      alert('An error occurred while deleting the expense.');
    }
  };

  const openDeleteDialog = (expenseId) => {
    setExpenseToDelete(expenseId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => setDeleteDialogOpen(false);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  return (
    <Container>
      <ExpenseEdit open={openAdd} handleClose={handleCloseAdd} id={id} data={rowData} fetchExpenseData={fetchExpenseData} />
      <DeleteConfirmationDialog open={deleteDialogOpen} onClose={closeDeleteDialog} onDelete={handleDelete} />
      <Stack direction="column" alignItems="center" mb={3}>
        <Card style={{ width: '100%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={3}>
            <Typography variant="h4">{t('Expense Details')}</Typography>
            <UniversalBreadcrumbs items={breadcrumbsData} />
          </Stack>
        </Card>
      </Stack>
      <Box width="100%">
        <Card style={{ height: 'auto', paddingTop: '5px' }}>
          <Box sx={{ padding: 1 }}>
            <Tabs variant="scrollable" value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
              <Tab
                value={0}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography mr={1} fontSize="1.5rem">
                      <AccountCircleIcon />
                    </Typography>
                    <Typography mb={0.7}>{t('Expense Details')}</Typography>
                  </Box>
                }
              />
              <Tab
                value={1}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography mr={1} fontSize="1.5rem">
                      <ArticleIcon />
                    </Typography>
                    <Typography mb={0.7}>{t('Receipts')}</Typography>
                  </Box>
                }
              />
            </Tabs>
            <Divider sx={{ borderColor: 'grey.300' }} />

            {tabValue === 0 && (
              <Grid item xs={12} md={12}>
                <Card
                  sx={{
                    margin: '15px',
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <CardContent>
                    <Box sx={{ textAlign: 'left', mb: 2 }}>
                      <Typography variant="h4" sx={{ mt: 2 }}>
                        {rowData?.Title}
                      </Typography>
                      <Divider sx={{ mt: '10px', borderColor: 'grey.300' }} />
                    </Box>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>{t('Case')}:</strong> {rowData?.Case}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>{t('Type')}:</strong> {rowData?.Type}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>{t('Amount')}:</strong> {rowData?.Amount}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      <strong>{t('Description')}:</strong> {rowData?.Description}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 2,
                        mt: 4
                      }}
                    >
                      <Tooltip title={t('Edit')}>
                        <Button onClick={handleOpenAdd} variant="outlined" color="secondary">
                          <AppRegistrationIcon /> <Typography ml={1}>{t('Edit')}</Typography>
                        </Button>
                      </Tooltip>
                      <Tooltip title={t('Delete')}>
                        <Button variant="contained" color="error" onClick={() => openDeleteDialog(rowData._id)}>
                          <DeleteOutlineIcon />
                        </Button>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {tabValue === 1 && (
              <Box padding={2} border={'none'}>
                <Grid item xs={12} md={8.5}>
                  <Card
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <CardContent>
                      <List>
                        {rowData?.Attachment?.map((item, index) => (
                          <ListItem
                            key={index}
                            button
                            onClick={() => window.open(urls.initialbase + item.url, '_blank')}
                            sx={{
                              borderBottom: '1px solid',
                              borderColor: 'divider'
                            }}
                          >
                            <ListItemIcon>
                              <DescriptionIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={item.name} />
                            <ListItemText secondary={item.type} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              </Box>
            )}
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default ExpenseView;
