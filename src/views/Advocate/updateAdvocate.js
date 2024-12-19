/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {
  FormLabel,
  Grid,
  TextField,
  MenuItem
} from '@mui/material';
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

const UpdateAdvocate = (props) => {
  const { open, handleClose } = props;
 
  // -----------  validationSchema
  const validationSchema = yup.object({
      name: yup.string().max(50, "Cannot exceed 50 characters").required("Name is required"),
      gender: yup.string().max(50, "Cannot exceed 50 characters").required("gender is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      phone: yup.string().matches(/^[0-9]{10}$/, "Must be 10 digits").required("Phone is required"),
      city: yup.string().max(50, "Cannot exceed 50 characters").required("city is required"),
      state: yup.string().max(50, "Cannot exceed 50 characters").required("state is required"),
      zipCode: yup.string().matches(/^[0-9]{5}$/, "Must be 5 digits").required("zipcode is required"),
      country: yup.string().max(50, "Cannot exceed 50 characters").required("country is required"),
      address: yup.string().max(200, "Cannot exceed 200 characters").required("address is required"),
      barNumber: yup.string().max(20, "Cannot exceed 20 characters").required("barNumber is required"),
      lawUnivercity: yup.string().max(50, "Cannot exceed 50 characters").required("lawUnivercity is required"),
      graduationYear: yup.string().matches(/^(19|20)\d{2}$/, "Invalid year").required("Graduation is required"),
      practiceArea: yup.string().max(50, "Cannot exceed 50 characters").required("Practice Area is required"),
      languages: yup.string().max(100, "Cannot exceed 100 characters").required("language is required"),
      skill: yup.string().max(100, "Cannot exceed 100 characters").required("skill is required"),
      notes: yup.string().max(300, "Cannot exceed 300 characters").required("notes is required"),
      firms: yup.string().max(50, "Cannot exceed 50 characters").required("firm is required"),
      position: yup.string().max(50, "Cannot exceed 50 characters").required("position is required"),
      duration: yup.string().max(50, "Cannot exceed 50 characters").required("duration is required"),
    });
  
  // -----------   initialValues
 

  
  const initialValues = {
      certificate:"",
      name: "",
      email: "",
      phone: "",
      gender: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      address: "",
      barNumber: "",
      lawUnivercity: "",
      graduationYear: "",
      practiceArea: "",
      languages: "",
      skill: "",
      degree: "",
      notes: "",
      firms: "",
      position: "",
      duration: "",
    };
  
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        console.log('Form Values:', values);
        formik.resetForm();
        handleClose();
        toast.success('Advocate added successfully');
      },
    });
  
  return (
    <div>
        
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormLabel>Name</FormLabel>
              <TextField
                fullWidth
                placeholder="Name"
                name="name"
                inputProps={{ maxLength: 50 }}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Email</FormLabel>
              <TextField
                fullWidth
                placeholder="Email"
                name="email"
                inputProps={{ maxLength: 50 }}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Phone</FormLabel>
              <TextField
                fullWidth
                placeholder="Phone"
                name="phone"
                inputProps={{ maxLength: 10 }}
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>City</FormLabel>
              <TextField
                fullWidth
                placeholder="City"
                name="city"
                inputProps={{ maxLength: 50 }}
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>State</FormLabel>
              <TextField
                fullWidth
                placeholder="State"
                name="state"
                inputProps={{ maxLength: 50 }}
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Zip Code</FormLabel>
              <TextField
                fullWidth
                placeholder="Zip Code"
                name="zipCode"
                inputProps={{ maxLength: 5 }}
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                helperText={formik.touched.zipCode && formik.errors.zipCode}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Country</FormLabel>
              <TextField
                fullWidth
                placeholder="Country"
                name="country"
                inputProps={{ maxLength: 50 }}
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Gender</FormLabel>
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
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <FormLabel>Address</FormLabel>
              <TextField
                fullWidth
                placeholder="Address"
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
            <Typography variant="h5" style={{ fontWeight: 'bold' }}>Additional Details</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormLabel>Bar Association Number</FormLabel>
              <TextField
                fullWidth
                placeholder="Bar Association Number"
                name="barNumber"
                inputProps={{ maxLength: 20 }}
                value={formik.values.barNumber}
                onChange={formik.handleChange}
                error={formik.touched.barNumber && Boolean(formik.errors.barNumber)}
                helperText={formik.touched.barNumber && formik.errors.barNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Law Univercity</FormLabel>
              <TextField
                fullWidth
                placeholder="Law univercity"
                name="lawUnivercity"
                inputProps={{ maxLength: 50 }}
                value={formik.values.lawUnivercity}
                onChange={formik.handleChange}
                error={formik.touched.lawUnivercity && Boolean(formik.errors.lawUnivercity)}
                helperText={formik.touched.lawUnivercity && formik.errors.lawUnivercity}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Graduation Year</FormLabel>
              <TextField
                fullWidth
                placeholder="Graduation Year"
                name="graduationYear"
                inputProps={{ maxLength: 4 }}
                value={formik.values.graduationYear}
                onChange={formik.handleChange}
                error={formik.touched.graduationYear && Boolean(formik.errors.graduationYear)}
                helperText={formik.touched.graduationYear && formik.errors.graduationYear}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Practice Area</FormLabel>
              <TextField
                fullWidth
                placeholder="Practice Area"
                name="practiceArea"
                inputProps={{ maxLength: 50 }}
                value={formik.values.practiceArea}
                onChange={formik.handleChange}
                error={formik.touched.practiceArea && Boolean(formik.errors.practiceArea)}
                helperText={formik.touched.practiceArea && formik.errors.practiceArea}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Degree</FormLabel>
              <TextField
                fullWidth
                placeholder="Degree"
                name="degree"
                inputProps={{ maxLength: 50 }}
                value={formik.values.degree}
                onChange={formik.handleChange}
                error={formik.touched.degree && Boolean(formik.errors.degree)}
                helperText={formik.touched.degree && formik.errors.degree}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <FormLabel>Certification</FormLabel>
              <TextField
                id="certificate"
                name="certificate"
                size="small"
                fullWidth
                type="file"
                multiple
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  formik.setFieldValue('certificate', event.currentTarget.files);
                }}
                error={formik.touched.certificate && Boolean(formik.errors.certificate)}
                helperText={formik.touched.certificate && formik.errors.certificate}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormLabel>Languages Spoken</FormLabel>
              <TextField
                fullWidth
                placeholder="Languages spoken"
                name="languages"
                inputProps={{ maxLength: 100 }}
                value={formik.values.languages}
                onChange={formik.handleChange}
                error={formik.touched.languages && Boolean(formik.errors.languages)}
                helperText={formik.touched.languages && formik.errors.languages}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Skill</FormLabel>
              <TextField
                fullWidth
                placeholder="Skill"
                name="skill"
                inputProps={{ maxLength: 100 }}
                value={formik.values.skill}
                onChange={formik.handleChange}
                error={formik.touched.skill && Boolean(formik.errors.skill)}
                helperText={formik.touched.skill && formik.errors.skill}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Notes</FormLabel>
              <TextField
                fullWidth
                placeholder="Notes"
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
            <Typography variant="h5" style={{ fontWeight: 'bold' }}>Work History</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormLabel>Firms</FormLabel>
              <TextField
                fullWidth
                placeholder="Firms"
                name="firms"
                inputProps={{ maxLength: 50 }}
                value={formik.values.firms}
                onChange={formik.handleChange}
                error={formik.touched.firms && Boolean(formik.errors.firms)}
                helperText={formik.touched.firms && formik.errors.firms}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Position</FormLabel>
              <TextField
                fullWidth
                placeholder="Position"
                name="position"
                inputProps={{ maxLength: 50 }}
                value={formik.values.position}
                onChange={formik.handleChange}
                error={formik.touched.position && Boolean(formik.errors.position)}
                helperText={formik.touched.position && formik.errors.position}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Duration</FormLabel>
              <TextField
                fullWidth
                placeholder="Duration"
                name="duration"
                inputProps={{ maxLength: 50 }}
                value={formik.values.duration}
                onChange={formik.handleChange}
                error={formik.touched.duration && Boolean(formik.errors.duration)}
                helperText={formik.touched.duration && formik.errors.duration}
              />
            </Grid>
          </Grid>
          <DialogActions sx={{ padding: "15px"}}>
            <Button sx={{ borderRadius: "15px" }} onClick={formik.handleSubmit} variant="contained" color="primary" type="submit">
              Create
            </Button>
          </DialogActions>
        </form>
    </div>
  );
};

export default UpdateAdvocate;
