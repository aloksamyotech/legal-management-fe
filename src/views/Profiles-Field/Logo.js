import React, { useState } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { updateApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ImageUploadComponent = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle image file change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image update (send to backend)
  const handleUpdate = async () => {
    if (!image) {
      alert(t('No image selected'));
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', image);

    try {
      const token = localStorage.getItem('$2b$10$ehdPSDmr6P');
      if (!token) throw new Error(t('No token found'));
      const response = await updateApi(urls?.user?.updateLogo, formData, {
        'Content-Type': 'multipart/form-data',
        authorization: token.toString()
      });

      if (response.success === true) {
        toast.success(t('Logo uploaded successfully!'));
        window.location.reload();
        setImage(null);
        setImagePreview(null);
      }
    } catch (err) {
      console.error(err);
      setError(t('Failed to upload image. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2} width="100%" sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        {t('Upload Logo (1000*239)')}
      </Typography>

      <Box
        component="label"
        htmlFor="upload-image"
        sx={{
          width: '100%',
          height: '200px',
          border: '2px dashed #1976d2',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#e3f2fd',
            borderColor: '#1565c0'
          },
          padding: '10px'
        }}
      >
        <CloudUploadIcon sx={{ fontSize: '50px', color: '#1976d2' }} />
        <Typography variant="body1" color="textSecondary">
          {image ? t('Change Logo') : t('Click or Drag to Upload')}
        </Typography>
        <input type="file" id="upload-image" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
      </Box>

      {imagePreview && (
        <Box
          component="img"
          src={imagePreview}
          alt="Preview"
          sx={{
            width: 170,
            height: "100%",
            objectFit: 'cover',
            borderRadius: '10px',
            marginTop: '16px'
          }}
        />
      )}

      {error && (
        <Typography color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        disabled={!image || loading}
        sx={{
          mt: 2,
          textTransform: 'none',
          padding: '12px',
          width: '100%',
          fontSize: '16px'
        }}
      >
        {loading ? <CircularProgress size={24} color="secondary" sx={{ marginRight: '8px' }} /> : t('Upload')}
      </Button>
    </Box>
  );
};

export default ImageUploadComponent;
