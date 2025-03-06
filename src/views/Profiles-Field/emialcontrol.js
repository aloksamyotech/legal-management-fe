import React, { useState, useEffect } from 'react';
import { FormGroup, FormControlLabel, Switch, Card, CardContent, Typography } from '@mui/material';
import { getApi, postApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';

const EmailPermissions = () => {
  const [blockedRoles, setBlockedRoles] = useState([]);
  const roles = ['advocate', 'client', 'Create User', 'On Invoice Generate', 'Cases', 'AddHearing'];

  useEffect(() => {
    const fetchBlockedRoles = async () => {
      try {
        const token = localStorage.getItem('$2b$10$ehdPSDmr6P');
        if (!token) throw new Error('No token found');
        const response = await getApi(urls?.Emailurl?.fetch, {}, { authorization: token.toString() });
        const blockedList = response.data.filter((role) => role.isBlocked).map((role) => role.role);
        setBlockedRoles(blockedList);
      } catch (error) {
        console.error('Failed to fetch blocked roles', error);
      }
    };
    fetchBlockedRoles();
  }, []);

  const updateBackend = async (role, isBlocked) => {
    try {
      const token = localStorage.getItem('$2b$10$ehdPSDmr6P');
      if (!token) throw new Error('No token found');
      await postApi(urls?.Emailurl?.toggle, { role, isBlocked }, { authorization: token.toString() });
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
          Blocked Email Roles
        </Typography>
        <FormGroup>
          {roles?.map((role) => (
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

export default EmailPermissions;
