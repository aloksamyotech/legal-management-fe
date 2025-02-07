import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, Grid } from '@mui/material';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useTranslation } from 'react-i18next';
import { enums, Message } from 'core/Statuscode/constant';

const CasesDashboard = () => {
  const { t } = useTranslation();
  const [cases, setCases] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        caseStatus: item?.CaseStatus || 'N/A'
      }));
      setCases(formattedData);
      calculateSummary(formattedData);
    } catch (error) {
      console.error('Error fetching case data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSummary = (data) => {
    const totalCases = data.length;
    const openCases = data.filter((item) => item.caseStatus === enums.Open).length;
    const closedCases = data.filter((item) => item.caseStatus === enums.Closed).length;
    const pendingCases = totalCases - (openCases + closedCases);

    setSummaryData([
      { label: 'Total Cases', value: totalCases, color: 'linear-gradient(135deg,rgb(136, 150, 163),rgb(121, 138, 154))' },
      { label: 'Open Cases', value: openCases, color: 'linear-gradient(135deg,rgb(119, 140, 158),rgb(121, 138, 154))' },
      { label: 'Closed Cases', value: closedCases, color: 'linear-gradient(135deg,rgb(119, 140, 158),rgb(121, 138, 154))' },
      { label: 'Pending Cases', value: pendingCases, color: 'linear-gradient(135deg,rgb(119, 140, 158),rgb(121, 138, 154))'}
    ]);
  };

  useEffect(() => {
    fetchCaseData();
  }, []);

  return (
    <Container disableGutters>
    <Box mb={1}>
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : cases.length === 0 ? (
        <Typography variant="h6">{Message?.No_Data_Available}</Typography>
      ) : (
        <Grid container spacing={2}>
          {summaryData.map((item, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Card
                sx={{
                  borderRadius:2,
                  p: 3,
                  textAlign: 'center',
                  background: item.color,
                  color: '#0000',
                  fontWeight: 'bold',
                  flex: 1,
                 
                }}
              >
                <Typography  variant="subtitle1">{item.label}</Typography>
                <Typography  variant="h6" fontWeight="bold">{item.value}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  </Container>
  );
};

export default CasesDashboard;
