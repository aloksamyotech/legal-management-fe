import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, Stack, List, ListItem, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { enums } from 'core/Statuscode/constant';
export const TotalHearingsCard = ({ totalHearings }) => {
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        borderBottomLeftRadius:0,
        borderBottomRightRadius:0,
        p: 3,
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgb(185, 144, 243), rgb(120, 36, 198))',
        color: '#fff',
        fontWeight: 'bold',
        flex: 1
      }}
    >
      <Typography variant="h4">{t(enums?.Total_Hearings)}</Typography>
      <Typography variant="h5" fontWeight="bold">
        {totalHearings}
      </Typography>
    </Card>
  );
};
