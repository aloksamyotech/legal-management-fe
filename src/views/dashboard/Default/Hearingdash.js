import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, Stack, List, ListItem, ListItemText } from '@mui/material';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { enums } from 'core/Statuscode/constant';

const HearingDashboard = () => {
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
        client: item?.Client?.Name || 'N/A',
      }));
      
      setTotalHearings(formattedData.length);
      
      const today = new Date().toLocaleDateString('en-GB');
      const todayData = formattedData.filter((item) => item.date === today);
      setTodayHearings(todayData);
    } catch (error) {
      console.error('Error fetching hearing data:', error);
    }
  };

  return (
    <Container>
      <Stack direction="row" spacing={2} mb={3}>
        <Card sx={{ p: 3, textAlign: 'center', background: 'linear-gradient(135deg, rgb(122, 59, 223), #478ed1)', color: '#fff', fontWeight: 'bold', flex: 1, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
          <Typography variant="subtitle1">{enums?.Total_Hearings}</Typography>
          <Typography variant="h6" fontWeight="bold">{totalHearings}</Typography>
        </Card>
      </Stack>
      <Box>
        <Typography variant="h6" mb={2}></Typography>
        {todayHearings.length > 0 ? (
          <List>
            {todayHearings.map((hearing) => (
              <ListItem key={hearing.id} sx={{ background: '#f4f6f8', mb: 1, borderRadius: 1 }}>
                <ListItemText primary={`${hearing.title} - ${hearing.client}`} secondary={hearing.date} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No hearing for today</Typography>
        )}
      </Box>
    </Container>
  );
};

export default HearingDashboard;
