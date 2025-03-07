import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, Grid, Stack, Button, TextField, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useTranslation } from 'react-i18next';
import { enums } from 'core/Statuscode/constant';

const HearingReport = () => {
  const { t } = useTranslation();
  const [hearings, setHearings] = useState([]);
  const [filteredHearings, setFilteredHearings] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    client: '',
    judgementStatus: '',
    title: '',
    startDate: '',
    endDate: '',
    timeFilter: ''
  });

  const fetchHearingData = async () => {
    try {
      const response = await getApi(urls?.Hearing?.getallhearing);
      const formattedData = response.data.map((item, index) => ({
        id: item._id,
        serial: index + 1,
        title: item?.Title || 'N/A',
        date: new Date(item?.Date).toLocaleDateString('en-GB') || 'N/A',
        client: item?.Client?.Name || 'N/A',
        fee: item?.Fee || 0,
        judgementStatus: item?.JudgementStatus || 'N/A'
      }));
      setHearings(formattedData);
      setFilteredHearings(formattedData);
      calculateSummary(formattedData);
    } catch (error) {
      console.error('Error fetching hearing data:', error);
    }
  };

  const calculateSummary = (data) => {
    const totalHearings = data.length;
    const totalFee = data.reduce((sum, item) => sum + (item.fee || 0), 0);
    const judgementDone = data.filter((item) => item.judgementStatus === 'Done').length;

    setSummaryData([
      { label: 'Total Hearings', value: totalHearings, color: 'linear-gradient(135deg,rgb(122, 59, 223), #478ed1)' },
      { label: 'Total Fee', value: `$${totalFee}`, color: 'linear-gradient(135deg,rgb(22, 97, 26), #43a047)' },
      { label: 'Judgement Done', value: judgementDone, color: 'linear-gradient(135deg,rgb(147, 43, 41), #d32f2f)' }
    ]);
  };

  const handleFilterChange = (field, value) => {
    setFilterOptions((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    let filtered = hearings;

    if (filterOptions.client) {
      filtered = filtered.filter((item) => item.client.toLowerCase().includes(filterOptions.client.toLowerCase()));
    }

    if (filterOptions.judgementStatus) {
      filtered = filtered.filter((item) => item.judgementStatus.toLowerCase() === filterOptions.judgementStatus.toLowerCase());
    }

    if (filterOptions.title) {
      filtered = filtered.filter((item) => item.title.toLowerCase().includes(filterOptions.title.toLowerCase()));
    }

    if (filterOptions.startDate && filterOptions.endDate) {
      const startDate = new Date(filterOptions.startDate);
      const endDate = new Date(filterOptions.endDate);
      filtered = filtered.filter((item) => {
        const hearingDate = new Date(item.date.split('/').reverse().join('-'));
        return hearingDate >= startDate && hearingDate <= endDate;
      });
    }

    if (filterOptions.timeFilter === enums.today) {
      const today = new Date().toLocaleDateString('en-GB');
      filtered = filtered.filter((item) => item.date === today);
    } else if (filterOptions.timeFilter === enums.thisMonth) {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      filtered = filtered.filter((item) => {
        const hearingDate = new Date(item.date.split('/').reverse().join('-'));
        return hearingDate.getMonth() === currentMonth && hearingDate.getFullYear() === currentYear;
      });
    }

    setFilteredHearings(filtered);
    calculateSummary(filtered);
  };

  const clearFilters = () => {
    setFilterOptions({
      client: '',
      judgementStatus: '',
      title: '',
      startDate: '',
      endDate: '',
      timeFilter: ''
    });
    setFilteredHearings(hearings);
    calculateSummary(hearings);
  };

  useEffect(() => {
    fetchHearingData();
  }, []);

  const columns = [
    { field: 'serial', headerName: 'S.NO', flex: 0.5, align: 'center', headerAlign: 'center' },
    { field: 'title', headerName: 'Title', flex: 1, headerAlign: 'center' },
    { field: 'date', headerName: 'Date', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'client', headerName: 'Client', flex: 1, headerAlign: 'center' },
    { field: 'fee', headerName: 'Fee', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'judgementStatus', headerName: 'Judgement Status', flex: 1, align: 'center', headerAlign: 'center' }
  ];

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Hearing Report</Typography>
      </Stack>

      <Box mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              label="Client"
              value={filterOptions.client}
              onChange={(e) => handleFilterChange('client', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Judgement Status"
              value={filterOptions.judgementStatus}
              onChange={(e) => handleFilterChange('judgementStatus', e.target.value)}
              fullWidth
              select
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Title" value={filterOptions.title} onChange={(e) => handleFilterChange('title', e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Start Date"
              type="date"
              value={filterOptions.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="End Date"
              type="date"
              value={filterOptions.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Time Filter"
              value={filterOptions.timeFilter}
              onChange={(e) => handleFilterChange('timeFilter', e.target.value)}
              fullWidth
              select
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={enums.today}>Today</MenuItem>
              <MenuItem value={enums.thisMonth}>This Month</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={applyFilters} fullWidth>
              Apply Filters
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="outlined" onClick={clearFilters} fullWidth>
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box mb={3}>
        <Grid container spacing={2}>
          {summaryData.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: item.color,
                  color: '#fff',
                  fontWeight: 'bold',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <Typography variant="subtitle1">{item.label}</Typography>
                <Typography variant="h6" fontWeight="bold">
                  {item.value}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Card>
        <Box sx={{ height: 600, p: 2 }}>
          <DataGrid
            rows={filteredHearings}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f4f6f8',
                fontWeight: 'bold'
              },
              '& .MuiDataGrid-cell': {
                justifyContent: 'center',
                fontSize: '13px',
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }
            }}
          />
        </Box>
      </Card>
    </Container>
  );
};

export default HearingReport;
