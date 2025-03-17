import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, Grid, Stack, Button, TextField, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useTranslation } from 'react-i18next';
import HearingReport from './HearingReport';
import { enums } from 'core/Statuscode/constant';
import VideocamIcon from '@mui/icons-material/Videocam';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import AllInboxIcon from '@mui/icons-material/AllInbox';

const CasesReport = () => {
  const { t } = useTranslation();
  const [cases, setCases] = useState([]);
  const [clearfilter, setclearfilter] = useState(false);
  const [filteredCases, setFilteredCases] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    client: '',
    caseStatus: '',
    caseName: '',
    startDate: '',
    endDate: '',
    timeFilter: ''
  });

  const fetchCaseData = async () => {
    try {
      // Create query string from filterOptions
      const params = new URLSearchParams(filterOptions).toString();
      const query = params ? `?${params}` : '';

      const response = await getApi(`${urls?.Case?.getallcaserepo}${query}`);
      const formattedData = response.data.map((item, index) => ({
        id: item._id,
        serial: index + 1,
        title: item?.Title || 'N/A',
        date: new Date(item?.Date).toLocaleDateString('en-GB') || 'N/A',
        client: item?.Client?.Name || 'N/A',
        matter: item?.Matter?.Title || 'N/A',
        advocate: item?.Advocate?.name || 'N/A',
        caseStatus: item?.CaseStatus || 'N/A'
      }));
      setCases(formattedData);
      setFilteredCases(formattedData);
      calculateSummary(formattedData);
    } catch (error) {
      console.error('Error fetching case data:', error);
    }
  };

  const calculateSummary = (data) => {
    const totalCases = data.length;
    const openCases = data.filter((item) => item.caseStatus === enums.Open).length;
    const closedCases = data.filter((item) => item.caseStatus === enums.Closed).length;

    setSummaryData([
      { label: t('Total Cases'), value: totalCases, icon: <AllInboxIcon sx={{ color: 'white' }} /> },
      { label: t('Open Cases'), value: openCases, icon: <WorkOutlineIcon sx={{ color: 'white' }} /> },
      { label: t('Closed Cases'), value: closedCases, icon: <WorkOffIcon sx={{ color: 'white' }} /> }
    ]);
  };

  const handleFilterChange = (field, value) => {
    setFilterOptions((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    fetchCaseData();
  };

  const clearFilters = () => {
    setFilterOptions({
      client: '',
      caseStatus: '',
      caseName: '',
      startDate: '',
      endDate: '',
      timeFilter: ''
    });
    setclearfilter(true);
  };

  useEffect(() => {
    fetchCaseData();
  }, [clearfilter]);

  const columns = [
    { field: 'serial', headerName: t('S.NO'), flex: 0.5, align: 'center', headerAlign: 'center' },
    { field: 'title', headerName: t('Title'), flex: 1, headerAlign: 'center' },
    { field: 'date', headerName: t('Date'), flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'client', headerName: t('Client'), flex: 1, headerAlign: 'center' },
    { field: 'matter', headerName: t('Matter'), flex: 1, headerAlign: 'center' },
    { field: 'advocate', headerName: t('Advocate'), flex: 1, headerAlign: 'center' },
    { field: 'caseStatus', headerName: t('Case Status'), flex: 1, align: 'center', headerAlign: 'center' }
  ];

  return (
    <>
      <Container>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">{t('Case Report')}</Typography>
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
                label={t('Case Status')}
                value={filterOptions.caseStatus}
                onChange={(e) => handleFilterChange('caseStatus', e.target.value)}
                fullWidth
                select
              >
                <MenuItem value="">{t('All')}</MenuItem>
                <MenuItem value={enums.Open}>{t('Open')}</MenuItem>
                <MenuItem value={enums.Closed}>{t('Closed')}</MenuItem>
                <MenuItem value={enums.Pending}>{t('Pending')}</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                label={t('Case Name')}
                value={filterOptions.caseName}
                onChange={(e) => handleFilterChange('caseName', e.target.value)}
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
              rows={filteredCases}
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
      <Box mt={3}>
        <HearingReport></HearingReport>
      </Box>
    </>
  );
};

export default CasesReport;
