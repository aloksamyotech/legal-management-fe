import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, IconButton, Select, MenuItem, Typography, Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from 'react-router';
import { getApi, updateApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { toast } from 'react-toastify';
import { Messages } from 'core/comman/comman';
import { useTranslation } from 'react-i18next';
import Loader from 'core/comman/loader';

const EditInvoiceForm = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const invoice = location?.state;
  const invoiceId = invoice?._id;
  const [isLoading, setIsLoading] = useState(false);
  const [extraExpenses, setExtraExpenses] = useState([]);
  const [hearings, setHearings] = useState([]);
  const [formData, setFormData] = useState({
    Client: '',
    ClientName: '',
    Advocate: '',
    AdvocateName: '',
    date: ''
  });

  const [dropHearings, setDropHearings] = useState([]);

  const fetchInvoiceData = async () => {
    try {
      const response = await getApi(urls?.Invoice?.getinvoiceByid.replace(':id', invoiceId));
      const invoiceData = response?.data;

      setFormData({
        Case: invoiceData?.Case?._id,
        CaseTitle: invoiceData?.Case?.Title,
        Client: invoiceData?.Client?._id,
        ClientName: invoiceData?.Client?.Name,
        Advocate: invoiceData?.Advocate?._id,
        AdvocateName: invoiceData?.Advocate?.name,
        date: new Date(invoiceData?.date).toISOString().split('T')[0]
      });

      setHearings(
        invoiceData?.hearings?.map((hearing) => ({
          title: hearing?.title?._id || '',
          amount: hearing.amount,
          notes: hearing.notes
        })) || []
      );
      setExtraExpenses(
        invoiceData?.extraExpenses?.map((expense) => ({
          title: expense?.title || '',
          amount: expense?.amount,
          notes: expense?.notes
        })) || []
      );
    } catch (error) {
      console.error(t('Error fetching invoice data:'), error);
    }
  };

  const fetchHearingData = async () => {
    try {
      const response = await getApi(urls?.Hearing?.getcaseHearing.replace(':caseId', formData.Case));
      const formattedData = response?.data?.map((hearing) => ({
        _id: hearing?._id,
        Title: hearing?.Title,
        Fee: hearing?.Fee
      }));
      setDropHearings(formattedData);
    } catch (error) {
      console.error(t('Error fetching hearing data:'), error);
    }
  };

  useEffect(() => {
    fetchInvoiceData();
  }, [invoiceId]);

  useEffect(() => {
    if (formData.Client) fetchHearingData();
  }, [formData.Client]);

  const handleHearingChange = (index, field, value) => {
    const updatedHearings = [...hearings];

    if (field === 'title') {
      const selectedHearing = dropHearings.find((hearing) => hearing._id === value);
      updatedHearings[index] = {
        ...updatedHearings[index],
        title: selectedHearing?._id || '',
        amount: selectedHearing?.Fee || ''
      };
    } else {
      updatedHearings[index][field] = value;
    }

    setHearings(updatedHearings);
  };

  const addHearing = () => {
    if (hearings.some((hearing) => !hearing.title)) {
      alert(t('Please fill in the existing hearing before adding a new one.'));
      return;
    }
    setHearings([...hearings, { title: '', amount: '', notes: '' }]);
  };

  const removeHearing = (index) => {
    const updatedHearings = hearings.filter((_, i) => i !== index);
    setHearings(updatedHearings);
  };

  const handleExpenseChange = (index, field, value) => {
    const updatedExpenses = [...extraExpenses];
    updatedExpenses[index][field] = value;
    setExtraExpenses(updatedExpenses);
  };

  const addExpense = () => {
    if (extraExpenses.some((expense) => !expense.title || !expense.amount)) {
      alert(t('Please fill in the existing expense before adding a new one.'));
      return;
    }
    setExtraExpenses([...extraExpenses, { title: '', amount: '', notes: '' }]);
  };

  const removeExpense = (index) => {
    const updatedExpenses = extraExpenses.filter((_, i) => i !== index);
    setExtraExpenses(updatedExpenses);
  };

  const handleSubmit = async () => {
    if (hearings.some((hearing) => !hearing.title)) {
      alert(t('Please ensure all hearings have valid titles.'));
      return;
    }
    if (extraExpenses.some((expense) => !expense.title || !expense.amount)) {
      alert(t('Please ensure all extra expenses have valid titles and amounts.'));
      return;
    }

    const updatedInvoiceData = {
      Case: formData?.Case,
      Client: formData?.Client,
      Advocate: formData?.Advocate,
      hearings: hearings.map((hearing) => ({
        title: hearing?.title,
        amount: parseFloat(hearing?.amount),
        notes: hearing?.notes
      })),
      extraExpenses: extraExpenses.map((expense) => ({
        title: expense.title,
        amount: parseFloat(expense.amount),
        notes: expense.notes
      })),
      date: formData.date
    };
    setIsLoading(true);
    const startTime = Date.now();
    try {
      const response = await updateApi(urls?.Invoice?.updateinvoice?.replace(':id', invoiceId), updatedInvoiceData);
      if (response) {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 500 - elapsedTime);
        setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      } else {
        setIsLoading(false); 
      }
      toast.success(t(Messages?.Invoice?.update_success));
    } catch (error) {
      setIsLoading(false); 
      console.error(t('Error updating invoice:'), error);
    }
  };

  return (
    <Card fullWidth>
      <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <TextField fullWidth label={t('Client')} value={formData?.ClientName} disabled sx={{ mb: 2 }} />
        <TextField fullWidth label={t('Advocate')} value={formData?.AdvocateName} disabled sx={{ mb: 2 }} />
        <TextField
          fullWidth
          label={t('Date')}
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          sx={{ mb: 2 }}
          InputLabelProps={{
            shrink: true
          }}
        />
 {isLoading && (<Loader isVisible={isLoading}></Loader>          
          )}
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ paddingBottom: '10px' }} variant="h5">
            {t('Hearings')}
          </Typography>
          {hearings.map((hearing, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Select
                value={hearing.title}
                onChange={(e) => handleHearingChange(index, 'title', e.target.value)}
                error={!hearing.title}
                sx={{ flex: 1 }}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  {t('Select Hearing')}
                </MenuItem>
                {dropHearings.map((hearing) => (
                  <MenuItem key={hearing._id} value={hearing._id}>
                    {hearing.Title}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                label={t('Amount')}
                type="number"
                value={hearing.amount}
                onChange={(e) => handleHearingChange(index, 'amount', e.target.value)}
                sx={{ width: 100 }}
              />
              <TextField
                label={t('Notes')}
                value={hearing.notes}
                onChange={(e) => handleHearingChange(index, 'notes', e.target.value)}
                sx={{ flex: 2 }}
              />
              <IconButton onClick={() => removeHearing(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button variant="contained" onClick={addHearing} sx={{ mt: 1 }}>
            {t('Add Hearing')}
          </Button>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography sx={{ paddingBottom: '20px' }} variant="h5">
            {t('Extra-Expense')}
          </Typography>
          {extraExpenses.map((expense, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <TextField
                label={t('Title')}
                value={expense.title}
                onChange={(e) => handleExpenseChange(index, 'title', e.target.value)}
                error={!expense.title}
                sx={{ flex: 1 }}
              />
              <TextField
                label={t('Amount')}
                type="number"
                value={expense.amount}
                onChange={(e) => handleExpenseChange(index, 'amount', e.target.value)}
                error={!expense.amount}
                sx={{ width: 100 }}
              />
              <TextField
                label={t('Notes')}
                value={expense.notes}
                onChange={(e) => handleExpenseChange(index, 'notes', e.target.value)}
                sx={{ flex: 2 }}
              />
              <IconButton onClick={() => removeExpense(index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button variant="contained" onClick={addExpense} sx={{ mt: 1 }}>
            {t('Add Expense')}
          </Button>
        </Box>

        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isLoading}>
          {t('Update Invoice')}
        </Button>
      </Box>
    </Card>
  );
};

export default EditInvoiceForm;
