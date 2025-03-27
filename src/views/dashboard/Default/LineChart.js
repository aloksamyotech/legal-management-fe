import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent } from '@mui/material';
import { Typography, Box } from '@mui/material';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import dayjs from 'dayjs';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useTranslation } from 'react-i18next';

const AdviceMonthChart = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [totalAdvice, setTotalAdvice] = useState(0);
  const [thisMonthAdvice, setThisMonthAdvice] = useState(0);
  const [trend, setTrend] = useState(0);

  useEffect(() => {
    getApi(urls.Advice.getalladvice)
      .then((response) => {
        const advices = response.data;

        // Group data by all months
        const monthData = Array(12).fill(0);
        const currentYear = dayjs().year();
        const currentMonthIndex = dayjs().month();

        advices.forEach((advice) => {
          const adviceMonth = dayjs(advice.Date).month();
          const adviceYear = dayjs(advice.Date).year();
          if (adviceYear === currentYear) {
            monthData[adviceMonth] += 1;
          }
        });

        // Prepare chart data for all months
        const formattedData = monthData.map((value, index) => ({
          month: dayjs().month(index).format('MMM'),
          value
        }));

        // Calculate trend percentage (compare last month with this month)
        const lastMonthValue = monthData[currentMonthIndex - 1] || 0;
        const trendValue = lastMonthValue ? (((monthData[currentMonthIndex] - lastMonthValue) / lastMonthValue) * 100).toFixed(1) : 0;

        setData(formattedData);
        setTotalAdvice(advices.length);
        setThisMonthAdvice(monthData[currentMonthIndex]);
        setTrend(trendValue);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ background: 'linear-gradient(135deg, rgb(102, 52, 177) 0%, rgb(183, 135, 235) 100%)', color: 'white', p: 2 }}>
        <Typography variant="subtitle1">{t('Advice Per Month')}</Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {trend > 0 ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
          <Typography variant="body2">{trend}%</Typography>
        </Box>
        <ResponsiveContainer width="100%" height={60}>
          <LineChart data={data}>
            <XAxis dataKey="month" stroke="white" tick={{ fill: 'white' }} />
            <Line type="monotone" dataKey="value" stroke="white" strokeWidth={2} />
            {/* Tooltip Component */}
            <Tooltip
              contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '15px' }}
              labelStyle={{ color: 'white' }}
              itemStyle={{ color: 'white' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Box textAlign="center">
          <Typography variant="h6">{totalAdvice}</Typography>
          <Typography variant="body2">{t('Total Advice')}</Typography>
        </Box>
        <Box textAlign="center">
          <Typography variant="h6">{thisMonthAdvice}</Typography>
          <Typography variant="body2">{t('This Month')}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AdviceMonthChart;
