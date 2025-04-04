import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, Stack, List, ListItem, ListItemText } from '@mui/material';
import { enums } from 'core/Statuscode/constant';
import { useTranslation } from 'react-i18next';
import { TotalHearingsCard } from './hearingCard';
export const TodaysHearingsList = ({ todayHearings, totalHearings }) => {
  const { t } = useTranslation();
  return (
    <>
      <TotalHearingsCard totalHearings={totalHearings} />
      <Card
        sx={{
          p: 3,
          textAlign: 'center',
          color: '#fff',
          fontWeight: 'bold',
          flex: 1,
          height: 345,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0
        }}
      >
        <Box>
          <Typography variant="h4" mb={2}>
            {t(enums.Todays_Hearings)}
          </Typography>
          {todayHearings.length > 0 ? (
            <List>
              {todayHearings.map((hearing) => (
                <ListItem key={hearing.id} sx={{ background: '#f4f6f8', mb: 1, borderRadius: 1 }}>
                  <ListItemText primary={`${hearing.title} - ${hearing.client}`} secondary={hearing.date} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color={'black'}>{t(enums.No_hearing_today)}</Typography>
          )}
        </Box>
      </Card>
    </>
  );
};
