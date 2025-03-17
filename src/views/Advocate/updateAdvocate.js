/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import { Grid, TextField, FormLabel, MenuItem, Box, Typography, DialogActions, FormControl, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { urls } from 'core/Constant/Urls';
import { Messages } from 'core/comman/comman';
import { useState } from 'react';
import { getApi, updateApi } from 'core/APIs/ApiDocuments';
import { statusCodes } from 'core/Statuscode/constant';
import Loader from 'core/comman/loader';
import { useEffect } from 'react';

const UpdateAdvocate = (props) => {
  const [PracticeareaData, setPracticeareaData] = useState([]);
  const { t } = useTranslation();
  const { email, rowData, fetchAdvocateData } = props;
  const [isLoading, setIsLoading] = useState(false);
  // ----------- Validation Schema
  const validationSchema = yup.object({
    name: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('Name is required')),
    gender: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('Gender is required')),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, t('Must be 10 digits'))
      .required(t('Phone is required')),
    city: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('City is required')),
    state: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('State is required')),
    zipCode: yup
      .string()
      .matches(/^[0-9]{6}$/, t('Zipcode must be 6 digits'))
      .required(t('Zip code is required')),
    country: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('Country is required')),
    address: yup.string().max(200, t('Cannot exceed 200 characters')).required(t('Address is required')),
    barNumber: yup.string().max(20, t('Cannot exceed 20 characters')).required(t('Bar number is required')),
    lawUniversity: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('Law University is required')),
    graduationYear: yup
      .string()
      .matches(/^(19|20)\d{2}$/, t('Invalid year'))
      .required(t('Graduation year is required')),
    practiceArea: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('Practice area is required')),
    languages: yup.string().max(100, t('Cannot exceed 100 characters')).required(t('Languages are required')),
    Specialization: yup.string().max(100, t('Cannot exceed 100 characters')).required(t('Specialization is required')),
    notes: yup.string().max(300, t('Cannot exceed 300 characters')).required(t('Notes are required')),
    firms: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('Firm is required')),
    position: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('Position is required')),
    duration: yup.string().max(50, t('Cannot exceed 50 characters')).required(t('Experience is required'))
  });

  // ----------- Initial Values
  const initialValues = {
    certificate: rowData?.certificate || '',
    name: rowData?.name || '',
    phone: rowData?.phone || '',
    gender: rowData?.gender || '',
    city: rowData?.city || '',
    state: rowData?.state || '',
    zipCode: rowData?.zipCode || '',
    country: rowData?.country || '',
    address: rowData?.address || '',
    barNumber: rowData?.barNumber || '',
    lawUniversity: rowData?.lawUniversity || '',
    graduationYear: rowData?.graduationYear || '',
    practiceArea: rowData?.practiceAreaId || '',
    // practiceAreaId: rowData?.practiceAreaId || '',
    languages: rowData?.languages || '',
    Specialization: rowData?.Specialization || '',
    degree: rowData?.degree || '',
    notes: rowData?.notes || '',
    firms: rowData?.firms || '',
    position: rowData?.position || '',
    duration: rowData?.duration || '',
    image: rowData?.image || '',
    About: rowData?.About || ''
  };

  const prepareFormData = (values) => {
    const formData = new FormData();
    formData.append('email', email);
    for (const key in values) {
      if (key === 'certificate' || key === 'image') {
        if (values[key]) {
          Array.from(values[key]).forEach((file) => formData.append(key, file));
        }
      } else {
        formData.append(key, values[key]);
      }
    }
    return formData;
  };
  const updateAdvocate = async (formData) => {
    setIsLoading(true);
    const startTime = Date.now();

    try {
      const response = await updateApi(urls.Advocate.updateadvocate, formData, { 'Content-Type': 'multipart/form-data' });
      console.log('============', response);
      if (response.success === true) {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 500 - elapsedTime);
        setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      } else {
        setIsLoading(false);
      }
      fetchAdvocateData();
      toast.success(t(Messages.advocate.Advocate_update_success));
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response?.data?.message || t(Messages.advocate.Advocate_update_Failed));
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      const formData = prepareFormData(values);
      updateAdvocate(formData).then(() => {
        resetForm();
      });
    }
  });
  const fetchPracticeareaData = async () => {
    const response = await getApi(urls?.PracticeArea?.getllpracticearea);
    const formattedData = response.data.map((practicearea, index) => ({
      _id: practicearea._id,
      Serial: index + 1,
      Title: practicearea.Title,
      address: practicearea.address,
      description: practicearea.description,
      CreatedAt: new Date(practicearea.CreatedAt).toLocaleDateString('en-GB')
    }));
    setPracticeareaData(formattedData || []);
  };

  useEffect(() => {
    fetchPracticeareaData();
  }, []);

  return (
    <div>
      {isLoading && <Loader isVisible={isLoading}></Loader>}
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormLabel>{t('Name')}</FormLabel>
            <TextField
              fullWidth
              placeholder={t('Name')}
              name="name"
              inputProps={{ maxLength: 50 }}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>{t('Image')}</FormLabel>
            <TextField
              id="image"
              name="image"
              size="small"
              fullWidth
              type="file"
              multiple
              InputLabelProps={{
                shrink: true
              }}
              onChange={(event) => {
                formik.setFieldValue('image', event.currentTarget.files);
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormLabel>{t('Phone')}</FormLabel>
            <TextField
              fullWidth
              placeholder={t('Phone')}
              name="phone"
              inputProps={{ maxLength: 10 }}
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>{t('City')}</FormLabel>
            <TextField
              fullWidth
              placeholder={t('City')}
              name="city"
              inputProps={{ maxLength: 50 }}
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>{t('State')}</FormLabel>
            <TextField
              fullWidth
              placeholder={t('State')}
              name="state"
              inputProps={{ maxLength: 50 }}
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>{t('Zip Code')}</FormLabel>
            <TextField
              fullWidth
              placeholder={t('Zip Code')}
              name="zipCode"
              inputProps={{ maxLength: 5 }}
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
              helperText={formik.touched.zipCode && formik.errors.zipCode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>{t('Country')}</FormLabel>
            <TextField
              fullWidth
              placeholder={t('Country')}
              name="country"
              inputProps={{ maxLength: 50 }}
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>{t('Gender')}</FormLabel>
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
              <MenuItem value="male">{t('Male')}</MenuItem>
              <MenuItem value="female">{t('Female')}</MenuItem>
              <MenuItem value="other">{t('Other')}</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <FormLabel>{t('Address')}</FormLabel>
            <TextField
              fullWidth
              placeholder={t('Address')}
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
            {t('Additional Details')}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormLabel>{t('Bar Association Number')}</FormLabel>
            <TextField
              fullWidth
              placeholder={t('Bar Association Number')}
              name="barNumber"
              inputProps={{ maxLength: 20 }}
              value={formik.values.barNumber}
              onChange={formik.handleChange}
              error={formik.touched.barNumber && Boolean(formik.errors.barNumber)}
              helperText={formik.touched.barNumber && formik.errors.barNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>{t('Law University')}</FormLabel>
            <TextField
              fullWidth
              placeholder={t('Law University')}
              name="lawUniversity"
              inputProps={{ maxLength: 50 }}
              value={formik.values.lawUniversity}
              onChange={formik.handleChange}
              error={formik.touched.lawUniversity && Boolean(formik.errors.lawUniversity)}
              helperText={formik.touched.lawUniversity && formik.errors.lawUniversity}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>{t('Graduation Year')}</FormLabel>
            <TextField
              fullWidth
              placeholder={t('Graduation Year')}
              name="graduationYear"
              inputProps={{ maxLength: 4 }}
              value={formik.values.graduationYear}
              onChange={formik.handleChange}
              error={formik.touched.graduationYear && Boolean(formik.errors.graduationYear)}
              helperText={formik.touched.graduationYear && formik.errors.graduationYear}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormLabel>{t('Practice Area')}</FormLabel>
            <TextField
              fullWidth
              placeholder={t('Practice Area')}
              name="practiceArea"
              inputProps={{ maxLength: 50 }}
              value={formik.values.practiceArea}
              onChange={formik.handleChange}
              error={formik.touched.practiceArea && Boolean(formik.errors.practiceArea)}
              helperText={formik.touched.practiceArea && formik.errors.practiceArea}
            />
          </Grid> */}
          <Grid item xs={12} sm={6} md={6}>
            <FormControl fullWidth>
              <Box mb={1}>
                <FormLabel>{t('Practice Area')}</FormLabel>
              </Box>
              <Autocomplete
                id="practiceArea"
                options={PracticeareaData}
                value={PracticeareaData.find((practicearea) => practicearea._id === formik.values.practiceArea) || null}
                getOptionLabel={(option) => `${option.Title}`}
                isOptionEqualToValue={(option, value) => option._id === value._id}
                onChange={(event, value) => {
                  formik.setFieldValue('practiceArea', value ? value._id : '');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={t('Select a practice area')}
                    size="small"
                    error={formik.touched.practiceArea && Boolean(formik.errors.practiceArea)}
                    helperText={formik.touched.practiceArea && formik.errors.practiceArea}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>{t('Degree')}</FormLabel>
            <TextField
              fullWidth
              placeholder={t('Degree')}
              name="degree"
              inputProps={{ maxLength: 50 }}
              value={formik.values.degree}
              onChange={formik.handleChange}
              error={formik.touched.degree && Boolean(formik.errors.degree)}
              helperText={formik.touched.degree && formik.errors.degree}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>{t('Certification')}</FormLabel>
            <TextField
              id="certificate"
              name="certificate"
              size="small"
              fullWidth
              type="file"
              multiple
              InputLabelProps={{
                shrink: true
              }}
              onChange={(event) => {
                formik.setFieldValue('certificate', event.currentTarget.files);
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormLabel>{t('Languages Spoken')}</FormLabel>
            <TextField
              fullWidth
              placeholder={t('Languages Spoken')}
              name="languages"
              inputProps={{ maxLength: 100 }}
              value={formik.values.languages}
              onChange={formik.handleChange}
              error={formik.touched.languages && Boolean(formik.errors.languages)}
              helperText={formik.touched.languages && formik.errors.languages}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>{t('Specializations')}</FormLabel>
            <TextField
              fullWidth
              placeholder={t('Specializations')}
              name="Specialization"
              inputProps={{ maxLength: 100 }}
              value={formik.values.Specialization}
              onChange={formik.handleChange}
              error={formik.touched.Specialization && Boolean(formik.errors.Specialization)}
              helperText={formik.touched.Specialization && formik.errors.Specialization}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel>{t('Notes')}</FormLabel>
            <TextField
              fullWidth
              placeholder={t('Notes')}
              name="notes"
              inputProps={{ maxLength: 300 }}
              value={formik.values.notes}
              onChange={formik.handleChange}
              error={formik.touched.notes && Boolean(formik.errors.notes)}
              helperText={formik.touched.notes && formik.errors.notes}
            />
          </Grid>
        </Grid>
        <Box mt={3} mb={3}>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            {t('Work History')}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormLabel>{t('Firms')}</FormLabel>
            <TextField
              fullWidth
              placeholder={t('Firms')}
              name="firms"
              inputProps={{ maxLength: 50 }}
              value={formik.values.firms}
              onChange={formik.handleChange}
              error={formik.touched.firms && Boolean(formik.errors.firms)}
              helperText={formik.touched.firms && formik.errors.firms}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>{t('Position')}</FormLabel>
            <TextField
              fullWidth
              placeholder={t('Position')}
              name="position"
              inputProps={{ maxLength: 50 }}
              value={formik.values.position}
              onChange={formik.handleChange}
              error={formik.touched.position && Boolean(formik.errors.position)}
              helperText={formik.touched.position && formik.errors.position}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel>{t('Experience(year)')}</FormLabel>
            <TextField
              fullWidth
              placeholder={t('Duration')}
              name="duration"
              inputProps={{ maxLength: 50 }}
              value={formik.values.duration}
              onChange={formik.handleChange}
              error={formik.touched.duration && Boolean(formik.errors.duration)}
              helperText={formik.touched.duration && formik.errors.duration}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box mb={1}>
              <FormLabel style={{ color: 'black' }}>{t('About')}</FormLabel>
            </Box>
            <TextField
              id="About"
              name="About"
              placeholder={t('Enter About Him')}
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
        <DialogActions sx={{ padding: '15px' }}>
          <Button sx={{ borderRadius: '15px' }} variant="contained" color="primary" type="submit" disabled={isLoading}>
            {t('Update')}
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default UpdateAdvocate;
