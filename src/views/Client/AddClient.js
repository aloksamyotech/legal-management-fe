/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormLabel, Grid, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Box } from '@mui/system';
import axios from 'axios';

const AddClient = (props) => {
  const { open, handleClose } = props;

  // Validation Schema
  const validationSchema = yup.object({
    Name: yup.string().required('Name is required'),
    phonenum: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number is invalid')
      .required('Phone number is required'),
    Email: yup.string().email('Invalid email').required('Email is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    zipcode: yup
      .string()
      .matches(/^[0-9]{5,10}$/, 'Invalid zipcode')
      .required('Zipcode is required'),
    country: yup.string().required('Country is required'),
    image: yup.mixed().required('Image is required'),
  });

  // Initial Values
  const initialValues = {
    Name: '',
    Email: '',
    phonenum: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    address: '',
    image: null, // For the image file
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }

      try {
        const response = await axios.post(
          'http://localhost:7200/api/v1/client/addClient',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response?.status === 201) {
          toast.success('Client added successfully');
          formik.resetForm();
          handleClose();
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to add client');
      }
    },
  });

  const handleInput = (event) => {
    const input = event.target;
    const maxLength = 12;
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography style={{ fontWeight: 'normal' }} variant="h3">
            Create Client
          </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                {/* Existing Fields */}
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>Name</FormLabel>
                  </Box>
                  <TextField
                    id="Name"
                    name="Name"
                    placeholder="Enter Name"
                    size="small"
                    inputProps={{ maxLength: 50 }}
                    fullWidth
                    value={formik.values.Name}
                    onChange={formik.handleChange}
                    error={formik.touched.Name && Boolean(formik.errors.Name)}
                    helperText={formik.touched.Name && formik.errors.Name}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>Email</FormLabel>
                  </Box>
                  <TextField
                    id="Email"
                    name="Email"
                    placeholder="Enter Email"
                    size="small"
                    inputProps={{ maxLength: 50 }}
                    fullWidth
                    value={formik.values.Email}
                    onChange={formik.handleChange}
                    error={formik.touched.Email && Boolean(formik.errors.Email)}
                    helperText={formik.touched.Email && formik.errors.Email}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>Phone Number</FormLabel>
                  </Box>
                  <TextField
                    id="phonenum"
                    name="phonenum"
                    type="number"
                    size="small"
                    inputProps={{ maxLength: 12 }}
                    onInput={handleInput}
                    placeholder="Enter Mobile No"
                    fullWidth
                    value={formik.values.phonenum}
                    onChange={formik.handleChange}
                    error={formik.touched.phonenum && Boolean(formik.errors.phonenum)}
                    helperText={formik.touched.phonenum && formik.errors.phonenum}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>City</FormLabel>
                  </Box>
                  <TextField
                    id="city"
                    name="city"
                    size="small"
                    inputProps={{ maxLength: 30 }}
                    placeholder="Enter City"
                    fullWidth
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>State</FormLabel>
                  </Box>
                  <TextField
                    id="state"
                    name="state"
                    size="small"
                    inputProps={{ maxLength: 30 }}
                    placeholder="Enter State"
                    fullWidth
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>Zip Code</FormLabel>
                  </Box>
                  <TextField
                    id="zipcode"
                    name="zipcode"
                    size="small"
                    placeholder="Enter Zip Code"
                    fullWidth
                    value={formik.values.zipcode}
                    onChange={formik.handleChange}
                    error={formik.touched.zipcode && Boolean(formik.errors.zipcode)}
                    helperText={formik.touched.zipcode && formik.errors.zipcode}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>Country</FormLabel>
                  </Box>
                  <TextField
                    id="country"
                    name="country"
                    size="small"
                    placeholder="Enter Country"
                    fullWidth
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    error={formik.touched.country && Boolean(formik.errors.country)}
                    helperText={formik.touched.country && formik.errors.country}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>Address</FormLabel>
                  </Box>
                  <TextField
                    id="address"
                    name="address"
                    placeholder="Enter Address"
                    size="small"
                    inputProps={{ maxLength: 200 }}
                    multiline
                    rows={2}
                    fullWidth
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                  />
                </Grid>
                {/* New Image Upload Field */}
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>Image</FormLabel>
                  </Box>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      formik.setFieldValue('image', event.currentTarget.files[0]);
                    }}
                  />
                  {formik.touched.image && Boolean(formik.errors.image) && (
                    <Typography color="error" variant="body2">
                      {formik.errors.image}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions sx={{ padding: '15px 24px' }}>
          <Button
            sx={{ borderRadius: '15px' }}
            onClick={formik.handleSubmit}
            variant="contained"
            color="primary"
            type="submit"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddClient;
