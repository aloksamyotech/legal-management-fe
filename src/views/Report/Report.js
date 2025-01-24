import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, Grid, Stack, Button, TextField, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useTranslation } from 'react-i18next';
import HearingReport from './HearingReport';
import { enums } from 'core/Statuscode/constant';

const CasesReport = () => {
  const { t } = useTranslation();
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    client: '',
    caseStatus: '',
    caseName: '',
    startDate: '',
    endDate: '',
    timeFilter: '',
  });

  const fetchCaseData = async () => {
    try {
      const response = await getApi(urls?.Case?.getallcase);
      const formattedData = response.data.map((item, index) => ({
        id: item._id,
        serial: index + 1,
        title: item?.Title || 'N/A',
        date: new Date(item?.Date).toLocaleDateString('en-GB') || 'N/A',
        client: item?.Client?.Name || 'N/A',
        matter: item?.Matter?.Title || 'N/A',
        advocate: item?.Advocate?.name || 'N/A',
        caseStatus: item?.CaseStatus || 'N/A',
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
      { label: 'Total Cases', value: totalCases },
      { label: 'Open Cases', value: openCases },
      { label: 'Closed Cases', value: closedCases },
    ]);
  };

  const handleFilterChange = (field, value) => {
    setFilterOptions((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    let filtered = cases;

    if (filterOptions.client) {
      filtered = filtered.filter((caseItem) =>
        caseItem.client.toLowerCase().includes(filterOptions.client.toLowerCase())
      );
    }

    if (filterOptions.caseStatus) {
      filtered = filtered.filter((caseItem) =>
        caseItem.caseStatus.toLowerCase() === filterOptions.caseStatus.toLowerCase()
      );
    }

    if (filterOptions.caseName) {
      filtered = filtered.filter((caseItem) =>
        caseItem.title.toLowerCase().includes(filterOptions.caseName.toLowerCase())
      );
    }

    if (filterOptions.startDate && filterOptions.endDate) {
      const startDate = new Date(filterOptions.startDate);
      const endDate = new Date(filterOptions.endDate);
      filtered = filtered.filter((caseItem) => {
        const caseDate = new Date(caseItem.date.split('/').reverse().join('-'));
        return caseDate >= startDate && caseDate <= endDate;
      });
    }

    if (filterOptions.timeFilter === enums.today) {
      const today = new Date().toLocaleDateString('en-GB');
      filtered = filtered.filter((caseItem) => caseItem.date === today);
    } else if (filterOptions.timeFilter === enums.thisMonth) {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      filtered = filtered.filter((caseItem) => {
        const caseDate = new Date(caseItem.date.split('/').reverse().join('-'));
        return caseDate.getMonth() === currentMonth && caseDate.getFullYear() === currentYear;
      });
    }

    setFilteredCases(filtered);
    calculateSummary(filtered);
  };

  const clearFilters = () => {
    setFilterOptions({
      client: '',
      caseStatus: '',
      caseName: '',
      startDate: '',
      endDate: '',
      timeFilter: '',
    });
    setFilteredCases(cases);
    calculateSummary(cases);
  };

  useEffect(() => {
    fetchCaseData();
  }, []);

  const columns = [
    { field: 'serial', headerName: 'S.NO', flex: 0.5, align: 'center', headerAlign: 'center' },
    { field: 'title', headerName: 'Title', flex: 1, headerAlign: 'center' },
    { field: 'date', headerName: 'Date', flex: 1, align: 'center', headerAlign: 'center' },
    { field: 'client', headerName: 'Client', flex: 1, headerAlign: 'center' },
    { field: 'matter', headerName: 'Matter', flex: 1, headerAlign: 'center' },
    { field: 'advocate', headerName: 'Advocate', flex: 1, headerAlign: 'center' },
    { field: 'caseStatus', headerName: 'Case Status', flex: 1, align: 'center', headerAlign: 'center' },
  ];

  return (<>
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Case Report</Typography>
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
              label="Case Status"
              value={filterOptions.caseStatus}
              onChange={(e) => handleFilterChange('caseStatus', e.target.value)}
              fullWidth
              select
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value={enums.Open}>Open</MenuItem>
              <MenuItem value={enums.Closed}>Closed</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Case Name"
              value={filterOptions.caseName}
              onChange={(e) => handleFilterChange('caseName', e.target.value)}
              fullWidth
            />
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
              <Card sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  {item.label}
                </Typography>
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
            rows={filteredCases}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f4f6f8',
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-cell': {
                justifyContent: 'center',
                fontSize: '13px',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              },
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
