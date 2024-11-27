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
import FormControl from '@mui/material/FormControl';
import ClearIcon from '@mui/icons-material/Clear';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { toast } from 'react-toastify';

import Palette from '../../ui-component/ThemePalette';
import { Box } from '@mui/system';

const AddContact = (props) => {
  const { open, handleClose } = props;
 

  // -----------  validationSchema
  const validationSchema = yup.object({
    Name: yup.string().required('Name is required'),
    emailAddress: yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number is invalid')
      .required('Phone number is required'),
    subject: yup.string().required("subject is required"),
  });

  // -----------   initialValues
  const initialValues = {
    Name: '',
    phoneNumber: '',
    emailAddress: '',
    subject: '',
    Message:''
  };

 
  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('ContactValues', values);
      handleClose();
      toast.success('Contact Add successfully');
    }
  });

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6">Add New Contact</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                <Box mb={1}></Box>
                <FormLabel>Name</FormLabel>
                <TextField
                  id="Name"
                  name="Name"
                  size="small"
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
                <FormLabel>Phone number</FormLabel>
                </Box>
                <TextField
                  id="phoneNumber"
                  name="phoneNumber"
                  size="small"
                  type="number"
                  fullWidth
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
              <Box mb={1}>
                <FormLabel>Email</FormLabel>
              </Box>
                <TextField
                  id="emailAddress"
                  name="emailAddress"
                  size="small"
                  fullWidth
                  value={formik.values.emailAddress}
                  onChange={formik.handleChange}
                  error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
                  helperText={formik.touched.emailAddress && formik.errors.emailAddress}
                />
              </Grid>
             
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Subject</FormLabel>
                <TextField
                  id="subject"
                  name="subject"
                  size="small"
                  multiline
                  fullWidth
                  rows={4}
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  error={formik.touched.subject && Boolean(formik.errors.subject)}
                  helperText={formik.touched.subject && formik.errors.subject}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Message</FormLabel>
                <TextField
                  id="Message"
                  name="Message"
                  size="small"
                  multiline
                  fullWidth
                  rows={4}
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
            // startIcon={<FiSave />}
          >
            Save
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
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddContact;
