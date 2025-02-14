import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, IconButton, Select, MenuItem, Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router';
import { getApi, postApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { toast } from 'react-toastify';
import { Messages } from 'core/comman/comman';
import { useTranslation } from 'react-i18next';

const InvoiceForm = () => {
  const { t } = useTranslation();
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [hearings, setHearings] = useState([{ title: '', amount: '', notes: '' }]);
  const [extraExpenses, setExtraExpenses] = useState([{ title: '', amount: '', notes: '' }]);
  const [formData, setFormData] = useState({
    Client: '',
    ClientName: '',
    Advocate: '',
    AdvocateName: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [dropHearings, setdropHearings] = useState([]);

  ////////////////// Fetch case details by caseId///////////////////
  const fetchCaseData = async () => {
    try {
      const response = await getApi(urls?.Case?.getcase.replace(':id', caseId));
      const caseData = response.data;
      const formattedData = {
        clientId: caseData?.Client?._id,
        clientName: caseData?.Client?.Name,
        advocateId: caseData?.Advocate?._id,
        advocateName: caseData?.Advocate?.name,
        title: caseData?.Title,
        matter: caseData?.Matter
      };

      setFormData((prevData) => ({
        ...prevData,
        Client: formattedData.clientId,
        ClientName: formattedData.clientName,
        Advocate: formattedData.advocateId,
        AdvocateName: formattedData.advocateName
      }));
    } catch (error) {
      console.error('Error fetching case data:', error);
    }
  };

  const fetchHearingData = async () => {
    try {
      const response = await getApi(urls?.Hearing?.getcaseHearing.replace(':caseId', caseId));
      if (response.data.status === 404) {
        setdropHearings([]);
        return;
      }
      const formattedData = response?.data?.map((hearing) => ({
        _id: hearing?._id,
        Title: hearing?.Title,
        Fee: hearing?.Fee
      }));
      setdropHearings(formattedData);
    } catch (error) {
      console.error('Error fetching hearing data:', error);
    }
  };

  useEffect(() => {
    fetchCaseData();
    fetchHearingData();
  }, []);

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
      alert('Please fill in the existing hearing before adding a new one.');
      return;
    }
    setHearings([...hearings, { title: '', amount: '', notes: '' }]);
  };

  const removeHearing = (index) => {
    const updatedHearings = hearings.filter((_, i) => i !== index);
    setHearings(updatedHearings);
  };
  // =======================Extra expense add=================================//
  const handleExpenseChange = (index, field, value) => {
    const updatedExpenses = [...extraExpenses];
    updatedExpenses[index][field] = value;
    setExtraExpenses(updatedExpenses);
  };
  const addExpense = () => {
    if (extraExpenses.some((expense) => !expense.title || !expense.amount)) {
      alert('Please fill in the existing expense before adding a new one.');
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
      alert('Please ensure all hearings have valid titles.');
      return;
    }
    if (extraExpenses.some((expense) => !expense.title || !expense.amount)) {
      alert('Please ensure all extra expenses have valid titles and amounts.');
      return;
    }

    const invoiceData = {
      Case: caseId,
      Client: formData.Client,
      Advocate: formData.Advocate,
      hearings: hearings.map((hearing) => ({
        title: hearing.title,
        amount: parseFloat(hearing.amount),
        notes: hearing.notes
      })),
      extraExpenses: extraExpenses.map((expense) => ({
        title: expense.title,
        amount: parseFloat(expense.amount),
        notes: expense.notes
      })),
      date: formData.date
    };
    console.log(invoiceData);
    await postApi(urls.Invoice.create, invoiceData);
    setHearings([{ title: '', amount: '', notes: '' }]);
    setExtraExpenses([{ title: '', amount: '', notes: '' }]);
    toast.success(Messages?.Invoice?.Create_success);
    navigate(`/dashboard/cases/casesview/${caseId}`);
  };

  return (
    <Card fullWidth>
      <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <TextField fullWidth label="Client" value={formData.ClientName} disabled sx={{ mb: 2 }} />
        <TextField fullWidth label="Advocate" value={formData.AdvocateName} disabled sx={{ mb: 2 }} />
        <TextField
          fullWidth
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          sx={{ mb: 2 }}
          InputLabelProps={{
            shrink: true
          }}
        />

        <Box sx={{ mb: 2 }}>
          {hearings.map((hearing, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 1
              }}
            >
              <Select
                value={hearing.title}
                onChange={(e) => handleHearingChange(index, 'title', e.target.value)}
                error={!hearing.title}
                helperText={!hearing.title ? 'Title is required' : ''}
                sx={{ flex: 1 }}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  {t("Select Hearing")}
                </MenuItem>
                {dropHearings.map((hearing) => (
                  <MenuItem key={hearing._id} value={hearing._id}>
                    {hearing.Title}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                label="Amount"
                type="number"
                onChange={(e) => handleHearingChange(index, 'amount', e.target.value)}
                value={hearing.amount}
                sx={{ width: 100 }}
              />
              <TextField
                label="Notes"
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
            {t("Add Hearing")}
          </Button>
        </Box>
        <Box sx={{ mb: 2 }}>
          {extraExpenses.map((expense, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 1
              }}
            >
              <TextField
                label="Title"
                value={expense.title}
                onChange={(e) => handleExpenseChange(index, 'title', e.target.value)}
                error={!expense.title}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Amount"
                type="number"
                value={expense.amount}
                onChange={(e) => handleExpenseChange(index, 'amount', e.target.value)}
                error={!expense.amount}
                sx={{ width: 100 }}
              />
              <TextField
                label="Notes"
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
            {t("Add Expense")}
          </Button>
        </Box>

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {t("Create")}
        </Button>
      </Box>
    </Card>
  );
};

export default InvoiceForm;
