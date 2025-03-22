import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, Grid } from '@mui/material';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useTranslation } from 'react-i18next';
import { enums, Message } from 'core/Statuscode/constant';
import { motion } from 'framer-motion';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import PendingIcon from '@mui/icons-material/Pending';
const CasesDashboard = () => {
  const { t } = useTranslation();
  const [cases, setCases] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseData();
  }, []);

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
      { label: t('Total Cases'), value: totalCases, color: '#6A1B9A', icon: <LocalPoliceIcon sx={{ fontSize: 65, opacity: 0.2 }} /> },
      { label: t('Open Cases'), value: openCases, color: '#1976D2', icon: <AutorenewIcon sx={{ fontSize: 65, opacity: 0.2 }} /> },
      { label: t('Closed Cases'), value: closedCases, color: '#D32F2F', icon: <BlockIcon sx={{ fontSize: 65, opacity: 0.2 }} /> },
      { label: t('Pending Cases'), value: pendingCases, color: '#F57C00', icon: <PendingIcon sx={{ fontSize: 65, opacity: 0.2 }} /> }
    ]);
  };

  return (
    <Container disableGutters>
      {loading ? (
        <Typography variant="h6" align="center">
          {t('Loading...')}
        </Typography>
      ) : cases.length === 0 ? (
        <Typography variant="h6" align="center">
          {t(Message?.No_Data_Available)}
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {summaryData.map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}> */}
              <Card
                sx={{
                  borderRadius: 3,
                  p: 3,
                  textAlign: 'left',
                  backgroundColor: item.color,
                  color: '#fff',
                  boxShadow: 6,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 100,
                  position: 'relative'
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.label}
                </Typography>
                <Typography variant="h3" fontWeight="bold">
                  {item.value}
                </Typography>
                <Box sx={{ position: 'absolute', top: 10, right: 10 }}>{item.icon}</Box>
              </Card>
              {/* </motion.div> */}
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CasesDashboard;
