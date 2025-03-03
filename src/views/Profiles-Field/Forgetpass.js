import React, { useState } from 'react';
import { Button, Box, Typography, TextField, FormHelperText, CircularProgress } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { urls } from 'core/Constant/Urls';
import { update } from 'immutable';
import { updateApi } from 'core/APIs/ApiDocuments';

const PasswordChangeComponent = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async () => {
    // Simple validation
    if (!newPassword || !confirmPassword) {
      setError('Both fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }

    // Reset error
    setError('');
    setLoading(true);

    // Data to send to backend API
    const data = {
      newPassword,
    };

    try {
        const token = localStorage.getItem('$2b$10$ehdPSDmr6P');
        const response = await updateApi(urls?.user?.forgetpass, data, { 'authorization': token.toString() });
        console.log("response====", response)
      if (response.success === true) {
        setSuccess(true);
        setNewPassword('');
        setConfirmPassword('');
        toast.success('Password changed successfully!');
      } else {
        setError('Failed to change password.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2} width="100%" maxWidth="400px" margin="auto">
      <Typography variant="h6" gutterBottom>
        Change Password
      </Typography>

      <TextField
        label="Enter New Password"
        type="password"
        value={newPassword}
        onChange={handleNewPasswordChange}
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!error}
        helperText={error && error}
      />

      <TextField
        label="Confirm New Password"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!error}
        helperText={error && error}
      />

      {error && <FormHelperText error>{error}</FormHelperText>}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={newPassword === '' || confirmPassword === '' || loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} color="secondary" sx={{ marginRight: '8px' }} /> : 'Change Password'}
      </Button>

      {success && (
        <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
          Password changed successfully!
        </Typography>
      )}
    </Box>
  );
};

export default PasswordChangeComponent;
