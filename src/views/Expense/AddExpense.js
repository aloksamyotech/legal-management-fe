/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  FormLabel,
  Grid,
  TextField
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
import Palette from '../../ui-component/ThemePalette';
import {  Box } from '@mui/system';
import { Attachment } from '@mui/icons-material';


const AddExpense= (props) => {
  const { open, handleClose } = props;
 
  // -----------  validationSchema
  const validationSchema = yup.object({
   
    Title: yup.string().required('Title is required'),
    Case: yup.string().required('Case is required'),
    Type: yup.string().required('Type is required'),
    Attachment: yup.string().required('File is required'),
    Amount:yup.number().required("Amount is required"),
    description: yup.string().required('Description  is required'),
  });

  // -----------   initialValues
 
  const initialValues ={
    Title: '',
    Case: '',
    Type: '',
    Amount: '',
    Attachment: '',
    description:''
  };

  

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('ExpensesData', values);
      formik.resetForm();
      handleClose();
      toast.success('Expense Add successfully');
      
    }
  });

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
            justifyContent: 'space-between'
           
          }}
        >
          <Typography style={{fontWeight:'normal'}} variant="h3">Create New Expense</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4}}>
                <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                <Box mb={1}>
                    <FormLabel style={{color:"black"}}>Case</FormLabel>
                </Box>
                    <Select
                      labelId="demo-simple-select-label"
                      id="Case"
                      name="Case"
                      size="small"
                      fullWidth
                      value={formik.values.Case}
                      onChange={formik.handleChange}
                      error={formik.touched.Case&& Boolean(formik.errors.Case)}
                      helperText={formik.touched.Case && formik.errors.Case}
                    >
                      <MenuItem value="Personal Injury Claim">Personal Injury Claim</MenuItem>
                      <MenuItem value="Contract Dispute">Contract Dispute </MenuItem>
                      <MenuItem value="Esate Dispute">Esate Dispute</MenuItem>
                      <MenuItem value="Drug Trafficing Charges">Drug Trafficing Charges </MenuItem>
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>
                      {formik.touched.Case && formik.errors.Case}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                <Box mb={1}>
                    <FormLabel style={{color:"black"}}>Type</FormLabel>
                </Box>
                    <Select
                      labelId="demo-simple-select-label"
                      id="Type"
                      name="Type"
                      size="small"
                      fullWidth
                      value={formik.values.Type}
                      onChange={formik.handleChange}
                      error={formik.touched.Type && Boolean(formik.errors.Type)}
                      helperText={formik.touched.Type && formik.errors.Type}
                    >
                      <MenuItem value="Court Case">Court Cost </MenuItem>
                      <MenuItem value="Filling Fees">Filling Fees </MenuItem>
                      <MenuItem value="Deposition Cost">Deposition Cost</MenuItem>
                      <MenuItem value="Travel Expenses">Travel Expenses </MenuItem>
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>
                      {formik.touched.Type && formik.errors.Type}
                    </FormHelperText>
                  </FormControl>
                </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Box mb={1}>
                  <FormLabel style={{color:"black"}}>Title</FormLabel>
                </Box>

                  <TextField
                    id="Title"
                    name="Title"
                    type=""
                    size="small"
                    placeholder='Title'
                    fullWidth
                    value={formik.values.Title}
                    onChange={formik.handleChange}
                    error={formik.touched.Title && Boolean(formik.errors.Title)}
                    helperText={formik.touched.Title && formik.errors.Title}
                  />
                </Grid>
           
                <Grid item xs={12} sm={6} md={6}>
                <Box mb={1}>
                  <FormLabel style={{color:"black"}}>Amount</FormLabel>
                </Box>
                  <TextField
                    id="Amount"
                    name="Amount"
                    type="number"
                    size="small"
                    placeholder='Amount'
                    fullWidth
                    value={formik.values.Amount}
                    onChange={formik.handleChange}
                    error={formik.touched.Amount && Boolean(formik.errors.Amount)}
                    helperText={formik.touched.Amount && formik.errors.Amount}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                <Box mb={1}>
                  <FormLabel style={{color:"black"}}>Attachment</FormLabel>
                </Box>
                <TextField
                  id="Attachment"
                  name="Attachment"
                  size="small"
                  fullWidth
                  type="file"
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={(event) => {
                    formik.setFieldValue('Attachment', event.currentTarget.files[0]);
                  }}
                  error={formik.touched.Attachment && Boolean(formik.errors.Attachment)}
                  helperText={formik.touched.Attachment && formik.errors.Attachment}
                />
                </Grid>
               <Grid item xs={12} sm={6} md={6}>
                <Box mb={1}>

                  <FormLabel style={{color:"black"}}>Description</FormLabel>
                </Box>
                  <TextField
                    id="description"
                    name="description"
                    placeholder="Enter Description"
                    size="small"
                    multiline
                    rows={2}
                    fullWidth
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </Grid>
               
                
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" color="primary" type="submit">
            Create
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddExpense;