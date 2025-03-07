import React, { useState, useEffect } from 'react';
import { FormGroup, FormControlLabel, Checkbox, Button, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { urls } from 'core/Constant/Urls';
import { updateApi } from 'core/APIs/ApiDocuments';

const userPermissions = [
  'dashboard',
  'advocate',
  'users',
  'logged history',
  'client',
  'advice',
  'cases',
  'contacts',
  'hearing',
  'invoice',
  'evidence',
  'document',
  'expense',
  'notes',
  'case stage',
  'court',
  'police station',
  'matter',
  'practice area',
  'tag',
  'judge',
  'expense type',
  'reports',
  'profile'
];

const PermissionForm = ({ rowData }) => {
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(rowData, "=====================================\\==========")
  useEffect(() => {
    if (rowData?.permission) {
      setSelectedPermissions(rowData.permission);
    }
  }, [rowData]);

  const handleCheckboxChange = (permission) => {
    setSelectedPermissions((prev) => (prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission]));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await updateApi(urls.user.permissionUpdate.replace(':id', rowData?._id), {
        permissions: selectedPermissions
      });

      if (response.success) {
        toast.success('Permissions updated successfully!');
      } else {
        toast.error('Failed to update permissions.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Select User Permissions</h3>
      <FormGroup style={{ display: 'flex', flexWrap: 'wrap', gap: '2px', flexDirection: 'row' }}>
        {userPermissions.map((permission) => (
          <FormControlLabel
            key={permission}
            control={<Checkbox checked={selectedPermissions.includes(permission)} onChange={() => handleCheckboxChange(permission)} />}
            label={permission}
            style={{ flex: '1 1 200px' }}
          />
        ))}
      </FormGroup>
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }} disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Save'}
      </Button>
    </div>
  );
};

export default PermissionForm;
