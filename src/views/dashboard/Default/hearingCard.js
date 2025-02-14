import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Card, Stack, List, ListItem, ListItemText } from '@mui/material';
import { enums } from 'core/Statuscode/constant';
export const TotalHearingsCard = ({ totalHearings }) => {
  return (
    <Card
      sx={{
        p: 3,
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgb(185, 144, 243),rgb(120, 36, 198))',
        color: '#fff',
        fontWeight: 'bold',
        flex: 1,
        // transition: 'transform 0.3s',
        // '&:hover': { transform: 'scale(1.05)' }
      }}
    >
      <Typography variant="subtitle1">{enums?.Total_Hearings}</Typography>
      <Typography variant="h6" fontWeight="bold">
        {totalHearings}
      </Typography>
    </Card>
  );
};
