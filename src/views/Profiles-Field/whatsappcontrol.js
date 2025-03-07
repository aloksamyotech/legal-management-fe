import React, { useState } from 'react';
import { FormGroup, FormControlLabel, Switch, Card, CardContent, Typography } from '@mui/material';

const WhatsappPermissions = () => {
  const [blockedRoles, setBlockedRoles] = useState([]);

  const updateBackend = async (role, isBlocked) => {
    try {
      console.log('email blocked of ', role);
    } catch (error) {
      console.error('Failed to update blocked roles', error);
    }
  };

  const handleToggle = (role) => {
    setBlockedRoles((prev) => {
      const updatedRoles = prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role];
      updateBackend(role, updatedRoles.includes(role));
      return updatedRoles;
    });
  };

  return (
    <Card sx={{ maxWidth: 400, p: 2, m: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Blocked Whatsapp Roles
        </Typography>
        <FormGroup>
          {['advocate', 'client', 'staff', 'manager', 'admin'].map((role) => (
            <FormControlLabel
              key={role}
              control={<Switch checked={blockedRoles.includes(role)} onChange={() => handleToggle(role)} />}
              label={role.charAt(0).toUpperCase() + role.slice(1)}
            />
          ))}
        </FormGroup>
      </CardContent>
    </Card>
  );
};

export default WhatsappPermissions;
