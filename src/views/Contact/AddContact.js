/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { toast } from 'react-toastify';

import { Box } from '@mui/system';
import axios from 'axios';
import { urls } from 'core/Constant/Urls';
import { useTranslation } from 'react-i18next';

const AddContact = (props) => {
  const { open, handleClose, fetchContactData } = props;
  const { t } = useTranslation();

  // -----------  validationSchema
  const validationSchema = yup.object({
    Name: yup.string().required(t('Name is required')),
    emailAddress: yup.string().email(t('Invalid email')).required(t('Email is required')),
    gender: yup.string().required(t('gender is required')),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, t('Phone number is invalid'))
      .required(t('Phone number is required')),
    subject: yup.string().required(t('subject is required'))
  });

  // -----------   initialValues
  const initialValues = {
    Name: '',
    phoneNumber: '',
    emailAddress: '',
    gender: '',
    subject: '',
    Message: '',
    avatar: null
  };

  const handleInput = (event) => {
    const input = event.target;
    const maxLength = 12;
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('Name', values.Name);
      formData.append('emailAddress', values.emailAddress);
      formData.append('phoneNumber', values.phoneNumber);
      formData.append('gender', values.gender);
      formData.append('subject', values.subject);
      formData.append('Message', values.Message);
      if (values.avatar) {
        formData.append('avatar', values.avatar);
      }

      try {
        const response = await axios.post(urls.Contact.addcontact, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        toast.success(t('Contact added successfully'));
        formik.resetForm();
        handleClose();
        fetchContactData();
      } catch (error) {
        toast.error(t('Failed to add contact'));
        console.error('Error adding contact:', error);
      }
    }
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue('avatar', file);
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6">{t('Add New Contact')}</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                <Box mb={1}>
                  <FormLabel>{t('Name')}</FormLabel>
                </Box>
                <TextField
                  id="Name"
                  name="Name"
                  inputProps={{ maxLength: 50 }}
                  size="small"
                  placeholder={t('Enter Name')}
                  maxRows={10}
                  fullWidth
                  value={formik.values.Name}
                  onChange={formik.handleChange}
                  error={formik.touched.Name && Boolean(formik.errors.Name)}
                  helperText={formik.touched.Name && formik.errors.Name}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Box mb={1}>
                  <FormLabel>{t('Phone number')}</FormLabel>
                </Box>
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  size="small"
                  type="number"
                  inputProps={{ maxLength: 12 }}
                  onInput={handleInput}
                  placeholder={t('Enter Mobile No')}
                  fullWidth
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={6}>
                <Box mb={1}>
                  <FormLabel component="legend">{t('Gender')}</FormLabel>
                </Box>
                <RadioGroup row name="gender" value={formik.values.gender} onChange={formik.handleChange}>
                  <FormControlLabel value="male" control={<Radio />} label={t('Male')} />
                  <FormControlLabel value="female" control={<Radio />} label={t('Female')} />
                  <FormControlLabel value="other" control={<Radio />} label={t('Other')} />
                </RadioGroup>
                {formik.touched.gender && formik.errors.gender && <FormHelperText error>{formik.errors.gender}</FormHelperText>}
              </Grid>
              <Grid item xs={6}>
                <Box mb={1}>
                  <FormLabel>{t('Upload Image')}</FormLabel>
                </Box>
                <input type="file" name="avatar" accept="image/*" onChange={handleImageChange} style={{ display: 'block' }} />
                {formik.touched.avatar && formik.errors.avatar && <FormHelperText error>{formik.errors.avatar}</FormHelperText>}
              </Grid>
              <Grid item xs={12}>
                <Box mb={1}>
                  <FormLabel>{t('Email')}</FormLabel>
                </Box>
                <TextField
                  id="emailAddress"
                  name="emailAddress"
                  size="small"
                  inputProps={{ maxLength: 50 }}
                  fullWidth
                  value={formik.values.emailAddress}
                  onChange={formik.handleChange}
                  error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
                  helperText={formik.touched.emailAddress && formik.errors.emailAddress}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Box mb={1}>
                  <FormLabel>{t('Subject')}</FormLabel>
                </Box>
                <TextField
                  id="subject"
                  name="subject"
                  size="small"
                  inputProps={{ maxLength: 80 }}
                  multiline
                  fullWidth
                  rows={2}
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  error={formik.touched.subject && Boolean(formik.errors.subject)}
                  helperText={formik.touched.subject && formik.errors.subject}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box mb={1}>
                  <FormLabel>{t('Message')}</FormLabel>
                </Box>
                <TextField
                  id="Message"
                  name="Message"
                  size="small"
                  multiline
                  fullWidth
                  inputProps={{ maxLength: 80 }}
                  rows={2}
                  value={formik.values.Message}
                  onChange={formik.handleChange}
                  error={formik.touched.Message && Boolean(formik.errors.Message)}
                  helperText={formik.touched.Message && formik.errors.Message}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            onClick={formik.handleSubmit}
            style={{ textTransform: 'capitalize' }}
          >
            {t('Save')}
          </Button>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: 'capitalize' }}
            color="error"
            onClick={() => {
              formik.resetForm();
              handleClose();
            }}
          >
            {t('Cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddContact;
