import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const CasesPerMonthChart = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  useEffect(() => {
    getApi(urls.Case.getallcase)
      .then((response) => {
        const cases = response.data;
        const monthData = Array(12).fill(0);
        const currentYear = dayjs().year();

        cases.forEach((caseItem) => {
          const caseMonth = dayjs(caseItem.Date).month();
          const caseYear = dayjs(caseItem.Date).year();
          if (caseYear === currentYear) {
            monthData[caseMonth] += 1;
          }
        });

        const formattedData = monthData.map((value, index) => ({
          month: dayjs().month(index).format('MMM'),
          value
        }));

        setData(formattedData);
      })
      .catch((error) => console.error('Error fetching cases data:', error));
  }, []);

  return (
    <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography variant="body2" color="textSecondary">
            {t('Cases Per Month')}
          </Typography>
          <ArrowUpwardIcon fontSize="small" color="primary" />
        </Box>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={data} margin={{ top: 15, right: 20, left: 15, bottom: 2 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#888" tick={{ fill: '#888' }} />

            <Tooltip
              contentStyle={{
                backgroundColor: '#333',
                border: 'none',
                borderRadius: '5px'
              }}
              labelStyle={{
                color: '#fff'
              }}
              itemStyle={{
                color: '#fff'
              }}
            />
            <Bar dataKey="value" fill="url(#barGradient)" barSize={15} radius={[4, 4, 0, 0]} animationDuration={500} />
            <defs>
              <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2ecc71" stopOpacity={1} />
                <stop offset="100%" stopColor="#27ae60" stopOpacity={1} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CasesPerMonthChart;
