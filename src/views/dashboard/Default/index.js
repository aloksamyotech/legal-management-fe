import { useEffect, useState } from 'react';

// material-ui
import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { gridSpacing } from 'store/constant';
import AppCurrentVisits from './AppCurrentVisitCard';
import { TotalHearingsCard } from './hearingCard';
import { TodaysHearingsList } from './HearingList';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import CasesDashboard from './CasesDashboard';
import { enums } from 'core/Statuscode/constant';

// i18n import
import { useTranslation } from 'react-i18next';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [isLoading, setLoading] = useState(true);
  const [cases, setCases] = useState([]);
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    setLoading(false);
  }, []);

  //==========================================||Hearing||=========================================
  const [todayHearings, setTodayHearings] = useState([]);
  const [totalHearings, setTotalHearings] = useState(0);

  useEffect(() => {
    fetchHearingData();
  }, []);

  const fetchHearingData = async () => {
    try {
      const response = await getApi(urls?.Hearing?.getallhearing);
      const formattedData = response.data.map((item) => ({
        id: item._id,
        title: item?.Title || 'N/A',
        date: new Date(item?.Date).toLocaleDateString('en-GB') || 'N/A',
        client: item?.Client?.Name || 'N/A'
      }));

      setTotalHearings(formattedData.length);

      const today = new Date().toLocaleDateString('en-GB');
      const todayData = formattedData.filter((item) => item.date === today);
      setTodayHearings(todayData);
    } catch (error) {
      console.error('Error fetching hearing data:', error);
    }
  };

  //========================================================================Cases-==============
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
    }
  };

  const calculateSummary = (data) => {
    const totalCases = data.length;
    const openCases = data.filter((item) => item.caseStatus === enums.Open).length;
    const closedCases = data.filter((item) => item.caseStatus === enums.Closed).length;
    const pendingCases = totalCases - (openCases + closedCases);

    setSummaryData([
      { label: t('Open Cases'), value: openCases },
      { label: t('Closed Cases'), value: closedCases, color: 'linear-gradient(135deg, #ef5350, #d32f2f)' },
      { label: t('Pending Cases'), value: pendingCases }
    ]);
  };

  useEffect(() => {
    fetchCaseData();
  }, []);

  //============================================================================================================
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4} md={4} padding={0}>
        <TotalHearingsCard totalHearings={totalHearings} />
      </Grid>
      <Grid item xs={12} sm={8} md={8} padding={0}>
        <CasesDashboard />
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <TodaysHearingsList todayHearings={todayHearings} />
      </Grid>
      <Grid item xs={12} sm={8} md={8}>
        {cases.length > 0 ? (
          <AppCurrentVisits
            title={t('Current Case Status')}
            chartData={summaryData}
            chartColors={[theme.palette.primary.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main]}
          />
        ) : (
          <Typography variant="h6" align="center">
            {t('No data available')}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
