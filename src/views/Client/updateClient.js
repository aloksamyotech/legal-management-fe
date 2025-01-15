import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {
  FormLabel,
  Grid,
  TextField
} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';

import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box } from '@mui/system';
import { urls } from 'core/Constant/Urls';
import { Messages } from 'core/comman/comman';

const UpdateClient = (props) => {
  const { Email,rowData,fetchClientData } = props;

  const validationSchema = yup.object({
    Name: yup.string().required('First Name is required'),
    phonenum: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number is invalid')
      .required('Phone number is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
  });

  const initialValues = {
    Name: rowData?.Name||'',
    About: rowData?.About||'',
    phonenum: rowData?.phonenum||'',
    city: rowData?.city||'',
    state: rowData?.state||'',
    zipcode: rowData?.zipcode||'',
    country: rowData?.country||'',
    address: rowData?.address||'',
    image: rowData?.image||null,
  };

  const prepareFormData = (values) => {
    const formData = new FormData();
    formData.append('Email', Email);
    for (const key in values) {
      formData.append(key, values[key]);
    }
    
    return formData;
  };
  

  const updateClient = async (formData) => {
    try {
      const response = await axios.put(
        'http://localhost:7200/api/v1/client/updateClient',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
            if (response.status === 200) {
           toast.success(Messages.client.Client_update_success);
           fetchClientData()
           }
         } catch (error) {
         
           toast.error(error.response?.data?.message || Messages.client.Client_update_Failed);
         }
       };
  

  const formik = useFormik({
    initialValues,
    validationSchema,  
    enableReinitialize: true, 
    onSubmit: (values, { resetForm }) => {
      const formData = prepareFormData(values);
      updateClient(formData).then(() => {
        resetForm();
      });
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
      <form>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
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
              <FormLabel style={{ color: 'black' }}>Phone number</FormLabel>
            </Box>
            <TextField
              id="phonenum"
              name="phonenum"
              type="number"
              size="small"
              inputProps={{
                maxLength: 12,
              }}
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
              type="city"
              size="small"
              inputProps={{ maxLength: 30 }}
              placeholder="Enter city"
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
              type=""
              size="small"
              inputProps={{ maxLength: 30 }}
              placeholder="Enter state"
              fullWidth
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Box mb={1}>
              <FormLabel style={{ color: 'black' }}>Zip code</FormLabel>
            </Box>
            <TextField
              id="zipcode"
              name="zipcode"
              type="number"
              size="small"
              inputProps={{ maxLength: 10 }}
              placeholder="Enter zipcode"
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
              type="country"
              placeholder="Enter country"
              size="small"
              inputProps={{ maxLength: 30 }}
              fullWidth
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <Box mb={1}>
              <FormLabel style={{ color: 'black' }}>About</FormLabel>
            </Box>
            <TextField
              id="About"
              name="About"
              placeholder="Enter About"
              size="small"
              inputProps={{ maxLength: 200 }}
              multiline
              rows={2}
              fullWidth
              value={formik.values.About}
              onChange={formik.handleChange}
              error={formik.touched.About && Boolean(formik.errors.About)}
              helperText={formik.touched.About && formik.errors.About}
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

          <Grid item xs={12} sm={6} md={6}>
            <FormLabel>Upload Image</FormLabel>
            <TextField
              id="image"
              name="image"
              size="small"
              maxRows={10}
              fullWidth
              type="file"
              multiple
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                formik.setFieldValue('image', event.currentTarget.files[0]);
              }}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
            />
          </Grid>
        </Grid>
      </form>

      <DialogActions sx={{ padding: '15px ' }}>
        <Button
          sx={{ borderRadius: '15px' }}
          onClick={formik.handleSubmit}
          variant="contained"
          color="primary"
          type="submit"
        >
          Update
        </Button>
      </DialogActions>
    </div>
  );
};

export default UpdateClient;
