/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormHelperText, MenuItem, Select, FormLabel, Grid, TextField, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Palette from '../../ui-component/ThemePalette';
import { borderRadius, Box } from '@mui/system';
import Loader from 'core/comman/loader';
import { urls } from 'core/Constant/Urls';
import { postApi } from 'core/APIs/ApiDocuments';
import { Messages } from 'core/comman/comman';

const AddUser = (props) => {
  const { open, handleClose,fetchUserdata } = props;

  // -----------  validationSchema
  const validationSchema = yup.object({
    Name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    AsignRole: yup.string().required('Role is required'),
    mobileNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits.')
      .required('Mobile number is required.'),
    password: yup
      .string()
      .required('Password is required.')
      .min(8, 'Password must be at least 8 characters long.')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
      .matches(/[0-9]/, 'Password must contain at least one number.')
      .matches(/[@$!%*?&]/, 'Password must contain at least one special character.')
  });

  // -----------   initialValues

  const initialValues = {
    Name: '',
    email: '',
    mobileNumber: '',
    AsignRole: '',
    password: '',
    gender: '',
    address: '',

  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem('$2b$10$ehdPSDmr6P');
        if (!token) throw new Error('No token found');

        const response = await postApi(urls?.user?.register, values, { 'authorization': token.toString() });

        handleClose();
        formik.resetForm();
        toast.success(Messages.User.add_success);
        fetchUserdata();

      } catch (error) {

        toast.error(Messages.User.add_Failed);
      }
    }
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography style={{ fontWeight: 'normal' }} variant="h3">
            Create New User
          </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel style={{ color: 'black' }}>Asign Role</FormLabel>
                    </Box>
                    <Select
                      labelId="demo-simple-select-label"
                      id="AsignRole"
                      name="AsignRole"
                      size="small"
                      fullWidth
                      value={formik.values.AsignRole}
                      onChange={formik.handleChange}
                      error={formik.touched.AsignRole && Boolean(formik.errors.AsignRole)}
                      helperText={formik.touched.AsignRole && formik.errors.AsignRole}
                    >
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="Staff">Staff</MenuItem>
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>
                      {formik.touched.AsignRole && formik.errors.AsignRole}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>Name</FormLabel>
                  </Box>
                  <TextField
                    id="Name"
                    name="Name"
                    type=""
                    size="small"
                    inputProps={{ maxLength: 50 }}
                    placeholder="Name"
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
                    id="email"
                    name="email"
                    type=""
                    size="small"
                    inputProps={{ maxLength: 50 }}
                    placeholder="Enter Email"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>Password</FormLabel>
                  </Box>
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    size="small"
                    inputProps={{ maxLength: 25 }}
                    placeholder="Enter Password"
                    fullWidth
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>Mobile</FormLabel>
                  </Box>
                  <TextField
                    id="mobileNumber"
                    name="mobileNumber"
                    type="number"
                    size="small"
                    inputProps={{ maxLength: 12 }}
                    placeholder="Enter Mobile No"
                    fullWidth
                    value={formik.values.mobileNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                    helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup row name="gender" value={formik.values.gender} onChange={formik.handleChange}>
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                  </RadioGroup>
                  {formik.touched.gender && (
                    <FormHelperText error>{formik.errors.gender}</FormHelperText>
                  )}
                </Grid>


                <Grid item xs={12}>
                  <FormLabel>Address</FormLabel>
                  <TextField
                    id="address"
                    name="address"
                    size="small"
                    fullWidth
                    placeholder="Enter Address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                  />
                </Grid>

              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions sx={{ padding: '15px 24px' }}>
          <Button sx={{ borderRadius: '15px' }} onClick={formik.handleSubmit} variant="contained" color="primary" type="submit">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddUser;
