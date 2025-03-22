import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Box, Dialog, Typography } from '@mui/material';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { urls } from 'core/Constant/Urls';
import Loader from 'core/comman/loader';
import { useTranslation } from 'react-i18next';
import { GridClearIcon } from '@mui/x-data-grid';

const BulkUploadComponent = (props) => {
  const { open, handleClose, fetchClient } = props;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleDownloadSampleSheet = () => {
    const sampleData = [
      {
        Name: 'John Doe',
        Email: 'john@example.com',
        phonenum: '1234567890',
        city: 'New York',
        state: 'NY',
        zipcode: '10001',
        country: 'USA',
        address: '123 Main St',
        About: 'A sample client'
      },
      {
        Name: 'Jane Smith',
        Email: 'jane@example.com',
        phonenum: '0987654321',
        city: 'Los Angeles',
        state: 'CA',
        zipcode: '90001',
        country: 'USA',
        address: '456 Elm St',
        About: 'Another sample client'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Clients');

    XLSX.writeFile(wb, 'sample_bulk_upload.xlsx');
  };

  const handleBulkSubmit = async () => {
    if (!file) {
      toast.error(t('Please upload a file first'));
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('$2b$10$ehdPSDmr6P');
      if (!token) throw new Error('No token found');

      const formData = new FormData();
      formData.append('file', file);

      const headers = {
        'Content-Type': 'multipart/form-data',
        authorization: token.toString()
      };

      const response = await axios.post(urls?.client?.bulkupload, formData, { headers });
      if (response.status === 200) {
        handleClose();
        toast.success(t('Bulk upload successful!'));
        setFile(null);
        fetchClient();
      } else {
        toast.error(t('Failed to upload bulk data.'));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t('Failed to upload bulk data.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogClose = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
      <Box sx={{ padding: 3 }} display={'flex'} flexDirection={'column'}>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">{t('Bulk Upload Clients')}</Typography>
          <GridClearIcon onClick={handleDialogClose} style={{ cursor: 'pointer' }} />
        </Box>

        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} style={{ margin: '15px 0' }} />
        <Button variant="outlined" color="secondary" onClick={handleDownloadSampleSheet} sx={{ marginBottom: 2 }}>
          {t('Download Sample Sheet')}
        </Button>

        {isLoading && <Loader isVisible={isLoading} />}

        <Button variant="contained" color="primary" onClick={handleBulkSubmit} disabled={isLoading || !file} sx={{ marginTop: 2 }}>
          {t('Upload Data')}
        </Button>
      </Box>
    </Dialog>
  );
};

export default BulkUploadComponent;
