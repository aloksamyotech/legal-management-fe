import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  DialogTitle,
  Typography,
  Box,
  TextField,
  Grid,
  FormLabel
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';

import ClearIcon from '@mui/icons-material/Clear';
import { urls } from 'core/Constant/Urls';
import { Messages } from 'core/comman/comman';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const AddAdvocate = ({ open, handleClose, fetchAdvocates }) => {
  const { t } = useTranslation();
  const validationSchema = yup.object({
    name: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('Name is required')),
    gender: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('gender is required')),
    email: yup.string().email(t('Invalid email')).required(t('Email is required')),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, t('Must be 10 digits'))
      .required(t('Phone is required')),
    city: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('city is required')),
    state: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('state is required')),
    zipCode: yup
      .string()
      .matches(/^[0-9]{6}$/, t('Must be 6 digits'))
      .required(t('zipcode is required')),
    country: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('country is required')),
    address: yup.string().max(200, t('Cannot exceed 200 characters')).required(t('address is required')),
    barNumber: yup.string().max(20, t('Cannot exceed 20 characters')).required(t('barNumber is required')),
    lawUniversity: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('lawUniversity is required')),
    graduationYear: yup
      .string()
      .matches(/^(19|20)\d{2}$/, t('Invalid year'))
      .required(t('Graduation is required')),
    practiceArea: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('Practice Area is required')),
    languages: yup.string().max(100, t('Cannot exceed 100 characters')).required(t('language is required')),
    Specialization: yup.string().max(100, t('Cannot exceed 100 characters')).required(t('Specialization is required')),
    notes: yup.string().max(300, t('Cannot exceed 300 characters')).required(t('notes is required')),
    firms: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('firm is required')),
    position: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('position is required')),
    duration: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('duration is required'))
  });

  const initialValues = {
    certificate: '',
    name: '',
    email: '',
    phone: '',
    gender: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    address: '',
    barNumber: '',
    lawUniversity: '',
    graduationYear: '',
    practiceArea: '',
    languages: '',
    Specialization: '',
    degree: '',
    notes: '',
    firms: '',
    position: '',
    duration: '',
    About: '',
    image: null
  };

  const createFormData = (values) => {
    const formData = new FormData();
    for (const key in values) {
      if (key === 'certificate' || key === 'image') {
        // Handle file uploads
        if (values[key]) {
          Array.from(values[key]).forEach((file) => formData.append(key, file));
        }
      } else {
        formData.append(key, values[key]);
      }
    }
    return formData;
  };

  const submitAdvocateData = async (formData, resetForm, handleClose) => {


    try {
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      const response = await axios.post(urls?.Advocate?.addadvocate, formData, { headers });
      if (response.status === 201) {
        toast.success(t(Messages.advocate.Advocate_add_success));
        fetchAdvocates();
        resetForm();
        handleClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t(Messages.advocate.Advocate_add_Failed));
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const formData = createFormData(values);
      submitAdvocateData(formData, formik.resetForm, handleClose);
    }
  });
  const handleDialogClose = () => {
    formik.resetForm();
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title" aria-describedby="dialog-description">
      <DialogTitle id="dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3" style={{ fontWeight: 'normal' }}>
          {t("Create Advocate")}
        </Typography>
        <ClearIcon onClick={handleDialogClose} style={{ cursor: 'pointer' }} />
      </DialogTitle>
      <DialogContent dividers>
        <Box mb={3}>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            {t("Personal Details")}
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t("Name")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("Name")}
                name="name"
                inputProps={{ maxLength: 50 }}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t("Email")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("Email")}
                name="email"
                inputProps={{ maxLength: 50 }}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t("Phone")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("Phone")}
                name="phone"
                inputProps={{ maxLength: 10 }}
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t("City")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("City")}
                name="city"
                inputProps={{ maxLength: 50 }}
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t("State")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("State")}
                name="state"

                inputProps={{ maxLength: 50 }}
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t("Zip Code")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("Zip Code")}
                name="zipCode"
                inputProps={{ maxLength: 6 }}
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                helperText={formik.touched.zipCode && formik.errors.zipCode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t("Country")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("Country")}
                name="country"
                inputProps={{ maxLength: 50 }}
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t("Gender")}</FormLabel>
              <TextField
                fullWidth
                select
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
                inputProps={{ maxLength: 50 }}
              >
                <MenuItem value="male">{t("Male")}</MenuItem>
                <MenuItem value="female">{t("Female")}</MenuItem>
                <MenuItem value="other">{t("Other")}</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <FormLabel>{t("Address")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("Address")}
                name="address"
                inputProps={{ maxLength: 200 }}
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
          </Grid>
          <Box mt={3} mb={3}>
            <Typography variant="h5" style={{ fontWeight: 'bold' }}>
              {t("Additional Details")}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t("Bar Association Number")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("Bar Association Number")}
                name="barNumber"
                inputProps={{ maxLength: 20 }}
                value={formik.values.barNumber}
                onChange={formik.handleChange}
                error={formik.touched.barNumber && Boolean(formik.errors.barNumber)}
                helperText={formik.touched.barNumber && formik.errors.barNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t("Law university")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("Law university")}
                name="lawUniversity"
                inputProps={{ maxLength: 50 }}
                value={formik.values.lawUniversity}
                onChange={formik.handleChange}
                error={formik.touched.lawUniversity && Boolean(formik.errors.lawUniversity)}
                helperText={formik.touched.lawUniversity && formik.errors.lawUniversity}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t("Graduation Year")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("Graduation Year")}
                name="graduationYear"
                inputProps={{ maxLength: 4 }}
                value={formik.values.graduationYear}
                onChange={formik.handleChange}
                error={formik.touched.graduationYear && Boolean(formik.errors.graduationYear)}
                helperText={formik.touched.graduationYear && formik.errors.graduationYear}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t("Degree")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("Degree")}
                name="degree"
                inputProps={{ maxLength: 50 }}
                value={formik.values.degree}
                onChange={formik.handleChange}
                error={formik.touched.degree && Boolean(formik.errors.degree)}
                helperText={formik.touched.degree && formik.errors.degree}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t("Practice Area")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("Practice Area")}
                name="practiceArea"
                inputProps={{ maxLength: 50 }}
                value={formik.values.practiceArea}
                onChange={formik.handleChange}
                error={formik.touched.practiceArea && Boolean(formik.errors.practiceArea)}
                helperText={formik.touched.practiceArea && formik.errors.practiceArea}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormLabel>{t("Certification")}</FormLabel>
              <TextField
                id="certificate"
                name="certificate"
                type="file"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                onChange={(event) => {
                  formik.setFieldValue('certificate', event.currentTarget.files);
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormLabel>{t("Languages spoken")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("Languages spoken")}
                name="languages"
                inputProps={{ maxLength: 100 }}
                value={formik.values.languages}
                onChange={formik.handleChange}
                error={formik.touched.languages && Boolean(formik.errors.languages)}
                helperText={formik.touched.languages && formik.errors.languages}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t("Specialization")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("Specialization")}
                name="Specialization"
                inputProps={{ maxLength: 100 }}
                value={formik.values.Specialization}
                onChange={formik.handleChange}
                error={formik.touched.Specialization && Boolean(formik.errors.Specialization)}
                helperText={formik.touched.Specialization && formik.errors.Specialization}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>{t("Notes")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("Notes")}
                name="notes"
                inputProps={{ maxLength: 200 }}
                value={formik.values.notes}
                onChange={formik.handleChange}
                error={formik.touched.notes && Boolean(formik.errors.notes)}
                helperText={formik.touched.notes && formik.errors.notes}
              />
            </Grid>
          </Grid>
          <Box mt={3} mb={3}>
            <Typography variant="h5" style={{ fontWeight: 'bold' }}>
              {t("Work History")}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t("Firms")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("Firms")}
                name="firms"
                inputProps={{ maxLength: 50 }}
                value={formik.values.firms}
                onChange={formik.handleChange}
                error={formik.touched.firms && Boolean(formik.errors.firms)}
                helperText={formik.touched.firms && formik.errors.firms}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t("Position")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("Position")}
                name="position"
                inputProps={{ maxLength: 50 }}
                value={formik.values.position}
                onChange={formik.handleChange}
                error={formik.touched.position && Boolean(formik.errors.position)}
                helperText={formik.touched.position && formik.errors.position}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t("Duration")}</FormLabel>
              <TextField
                fullWidth
                placeholder={t("Duration")}
                name="duration"
                inputProps={{ maxLength: 50 }}
                value={formik.values.duration}
                onChange={formik.handleChange}
                error={formik.touched.duration && Boolean(formik.errors.duration)}
                helperText={formik.touched.duration && formik.errors.duration}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormLabel>{t("image")}</FormLabel>
              <TextField
                id="image"
                name="image"
                type="file"
                fullWidth
                InputLabelProps={{
                  shrink: true
                }}
                onChange={(event) => {
                  formik.setFieldValue('image', event.currentTarget.files);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Box mb={1}>
                <FormLabel style={{ color: 'black' }}>{t("About")}</FormLabel>
              </Box>
              <TextField
                id="About"
                name="About"
                placeholder={t("Enter About Him")}
                size="small"
                inputProps={{ maxLength: 200 }}
                multiline
                rows={1}
                fullWidth
                value={formik.values.About}
                onChange={formik.handleChange}
                error={formik.touched.About && Boolean(formik.errors.About)}
                helperText={formik.touched.About && formik.errors.About}
              />
            </Grid>
          </Grid>
          {Object.keys(formik.errors).length > 0 && formik.submitCount > 0 && (
            <Box mt={2}>
              <Typography color="error" variant="body2" style={{ fontWeight: 'bold' }}>
                {t("Please fix the following errors before submitting:")}
              </Typography>
              <ul style={{ color: 'red', marginTop: 8 }}>
                {Object.values(formik.errors).map((error, index) => (
                  <li key={index}>
                    <Typography variant="body2">{error}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          )}
          <DialogActions sx={{ padding: '15px 24px' }}>
            <Button sx={{ borderRadius: '15px' }} onClick={formik.handleSubmit} variant="contained" color="primary" type="submit">
              {t("Create")}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAdvocate;
