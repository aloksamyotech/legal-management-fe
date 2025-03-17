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
import Shortcut from './shortcut';
import DashboardCard from './DashboardCard';
import AdviceMonthChart from './LineChart';
import CasesPerMonthChart from './monthlyCasesChart';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const [isLoading, setLoading] = useState(true);
  const [cases, setCases] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [Casesummary, setcasesummary] = useState({});
  const [clients, setClients] = useState([]);

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
    setcasesummary({
      totalcases: totalCases,
      opencases: openCases,
      closedcases: closedCases,
      pendingCases: pendingCases
    });
    setSummaryData([
      { label: t('Open Cases'), value: openCases },
      { label: t('Closed Cases'), value: closedCases, color: 'linear-gradient(135deg, #ef5350, #d32f2f)' },
      { label: t('Pending Cases'), value: pendingCases }
    ]);
  };

  useEffect(() => {
    fetchCaseData();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await getApi(urls?.client?.getallclient);
      const formattedData = response?.data?.map((client, index) => ({
        _id: client._id
      }));
      setClients(formattedData || []);
    } catch (error) {
      console.error(t('Error fetching client data:'), error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);
  //============================================================================================================
  return (
    <Grid container spacing={2}>
      {/* <Grid item xs={12} sm={4} md={4} padding={0}>
        <TotalHearingsCard totalHearings={totalHearings} />
      </Grid>
      <Grid item xs={12} sm={8} md={8} padding={0}>
        <CasesDashboard />
      </Grid> */}
      <Grid item xs={12}>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <DashboardCard
              title={t('Total Cases')}
              num1={Casesummary?.totalcases}
              num2={clients?.length}
              color="linear-gradient(135deg,rgb(255, 162, 75) 0%,rgb(255, 136, 39) 100%)"
              color2="#FF7C11"
            />
          </Grid>
          <Grid item xs={3}>
            <DashboardCard
              title={t('Open Cases')}
              num1={Casesummary?.opencases}
              num2={clients?.length}
              color="linear-gradient(135deg, rgb(102, 52, 177) 0%, rgb(183, 135, 235) 100%)"
              color2="#8952cc"
            />
          </Grid>
          <Grid item xs={3}>
            <DashboardCard
              title={t('Closed Cases')}
              num1={Casesummary?.closedcases}
              num2={clients?.length}
              color="linear-gradient(135deg,rgb(255, 162, 75) 0%,rgb(255, 136, 39) 100%)"
              color2="#FF7C11"
            />
          </Grid>
          <Grid item xs={3}>
            <DashboardCard
              title={t('Pending Cases')}
              num1={Casesummary?.pendingCases}
              num2={clients?.length}
              color="linear-gradient(135deg, rgb(102, 52, 177) 0%, rgb(183, 135, 235) 100%)"
              color2="#8952cc"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Shortcut icon={1} title={'Add Client'} path={'/dashboard/client'} />
          </Grid>
          <Grid item xs={3}>
            <Shortcut icon={2} title={'Add Advocate'} path={'/dashboard/advocate'} />
          </Grid>
          <Grid item xs={3}>
            <Shortcut icon={3} title={'Add User'} path={'/dashboard/users'} />
          </Grid>
          <Grid item xs={3}>
            <Shortcut icon={4} title={'View Report'} path={'/dashboard/report'} />
          </Grid>
          <Grid item xs={3}>
            <Shortcut icon={5} title={'View Profile'} path={'/dashboard/profile'} />
          </Grid>
          <Grid item xs={3}>
            <Shortcut icon={6} title={'Create New Case'} path={'/dashboard/cases'} />
          </Grid>
          <Grid item xs={3}>
            <Shortcut icon={7} title={'Create New Contact'} path={'/dashboard/contact'} />
          </Grid>
          <Grid item xs={3}>
            <Shortcut icon={8} title={'Add Notes'} path={'/dashboard/notes'} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        <TodaysHearingsList todayHearings={todayHearings} totalHearings={totalHearings} />
      </Grid>
      <Grid item xs={12} sm={4} md={4}>
        {cases.length > 0 ? (
          <AppCurrentVisits
            title={t('Current Case Status')}
            chartData={summaryData}
            chartColors={[theme.palette.primary.main, theme.palette.error.main, theme.palette.warning.main]}
          />
        ) : (
          <Typography variant="h6" align="center">
            {t('No data available')}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={4} md={4} spacing={2}>
        <Grid>
          <AdviceMonthChart />
        </Grid>
        <Grid mt={2}>
          <CasesPerMonthChart></CasesPerMonthChart>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
