import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, Grid, Stack, Button, TextField, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useTranslation } from 'react-i18next';
import { enums } from 'core/Statuscode/constant';
import PaymentIcon from '@mui/icons-material/Payment';
import HearingIcon from '@mui/icons-material/Hearing';
import GavelIcon from '@mui/icons-material/Gavel';

const HearingReport = () => {
  const { t } = useTranslation();
  const [hearings, setHearings] = useState([]);
  const [filteredHearings, setFilteredHearings] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [clearfilter, setClearfilter] = useState(false);
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
      const params = new URLSearchParams(filterOptions); // Convert filter options to query parameters
      const response = await getApi(`${urls?.Hearing?.getallhearingRepo}?${params}`);
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
      { label: t('Total Hearings'), value: totalHearings, icon: <HearingIcon sx={{ color: 'white' }} /> },
      { label: t('Total Fee'), value: `$${totalFee}`, icon: <PaymentIcon sx={{ color: 'white' }} /> },
      { label: t('Judgement Done'), value: judgementDone, icon: <GavelIcon sx={{ color: 'white' }} /> }
    ]);
  };

  const handleFilterChange = (field, value) => {
    setFilterOptions((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    fetchHearingData();
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
    setClearfilter(true);
  };

  useEffect(() => {
    fetchHearingData();
  }, [clearfilter]);
  const columns = [
    { field: 'serial', headerName: t('S.NO'), flex: 0.5, align: 'center', headerAlign: 'center' },
    { field: 'title', headerName: t('Title'), flex: 1, headerAlign: 'center' },
    { field: 'date', headerName: t('Date'), flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'client', headerName: t('Client'), flex: 1, headerAlign: 'center' },
    { field: 'fee', headerName: t('Fee'), flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'judgementStatus', headerName: t('Judgement Status'), flex: 1, align: 'center', headerAlign: 'center' }
  ];

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">{t('Hearing Report')}</Typography>
      </Stack>

      <Box mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              label={t('Client')}
              value={filterOptions.client}
              onChange={(e) => handleFilterChange('client', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label={t('Judgement Status')}
              value={filterOptions.judgementStatus}
              onChange={(e) => handleFilterChange('judgementStatus', e.target.value)}
              fullWidth
              select
            >
              <MenuItem value="">{t('All')}</MenuItem>
              <MenuItem value="Delivered">{t('Delivered')}</MenuItem>
              <MenuItem value="In Progress">{t('In Progress')}</MenuItem>
              <MenuItem value="Pending">{t('Pending')}</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label={t('Title')}
              value={filterOptions.title}
              onChange={(e) => handleFilterChange('title', e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label={t('Start Date')}
              type="date"
              value={filterOptions.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label={t('End Date')}
              type="date"
              value={filterOptions.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label={t('Time Filter')}
              value={filterOptions.timeFilter}
              onChange={(e) => handleFilterChange('timeFilter', e.target.value)}
              fullWidth
              select
            >
              <MenuItem value="">{t('None')}</MenuItem>
              <MenuItem value={enums.today}>{t('Today')}</MenuItem>
              <MenuItem value={enums.thisMonth}>{t('This Month')}</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <Button
              sx={{ background: '#8b3fe8', ':hover': { background: '#8b3fe8' } }}
              variant="contained"
              onClick={applyFilters}
              fullWidth
            >
              {t('Apply Filters')}
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              sx={{ color: '#8b3fe8', borderColor: '#8b3fe8', ':hover': { borderColor: '#8b3fe8' } }}
              variant="outlined"
              onClick={clearFilters}
              fullWidth
            >
              {t('Clear Filters')}
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
                  display: 'flex',
                  alignItems: 'center',
                  padding: 2,
                  borderRadius: '5px',
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                  maxWidth: 300
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#8b3fe8',
                    padding: '10px',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 2
                  }}
                >
                  {item?.icon}
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {item?.value}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {item?.label}
                  </Typography>
                </Box>
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
