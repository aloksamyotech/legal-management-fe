import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {
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

const AddPoliceStation= (props) => {
  const { open, handleClose } = props;
 
  // -----------  validationSchema
  const validationSchema = yup.object({
    Title: yup.string().required('Title is required'),
    Contact: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number is invalid')
      .required('Phone number is required'),
    Location: yup.string().required('Address is required'),
  });

  // -----------   initialValues
  const initialValues ={
    Title: '',
    Contact:'',
    Location:'',
  };

  const handleInput = (event) => { const input = event.target; 
    const maxLength = 12; 
    if (input.value.length > maxLength) 
      { input.value = input.value.slice(0, maxLength); } };
  

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('Practice Area Data', values);
      formik.resetForm();
      handleClose();
      toast.success('Practice Area Added Successfully');
      
    }
  });

  return (
    <div>
      <Dialog
      fullWidth
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
          <Typography style={{fontWeight:'normal'}} variant="h3">Add Police Station</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent  dividers>
          <form>
            <DialogContentText  id="scroll-dialog-description" tabIndex={-1} >
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4}}>
                <Grid item xs={12} sm={12} md={12}>
                <Box mb={1}>

                  <FormLabel style={{color:"black"}}>Title</FormLabel>
                </Box>
                  <TextField
                    id="Title"
                    name="Title"
                    type="text"
                    size="small"
                    placeholder='Enter Police Station Name'
                    inputProps={{maxLength:50}}
                    fullWidth
                    value={formik.values.Title}
                    onChange={formik.handleChange}
                    error={formik.touched.Title && Boolean(formik.errors.Title)}
                    helperText={formik.touched.Title && formik.errors.Title}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                <Box mb={1}>

                  <FormLabel style={{color:"black"}}>Contact</FormLabel>
                </Box>
                  <TextField
                    id="Contact"
                    name="Contact"
                    type="Number"
                    size="small"
                    placeholder='Enter Contact No'
                    inputProps={{maxLength:12}}
                    onInput={handleInput}
                    fullWidth
                    value={formik.values.Contact}
                    onChange={formik.handleChange}
                    error={formik.touched.Contact && Boolean(formik.errors.Contact)}
                    helperText={formik.touched.Contact && formik.errors.Contact}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                <Box mb={1}>

                  <FormLabel style={{color:"black"}}>Location</FormLabel>
                </Box>
                  <TextField
                    id="Location"
                    name="Location"
                    type="text"
                    size="small"
                    placeholder='Enter Location'
                    inputProps={{maxLength:100}}
                    fullWidth
                    value={formik.values.Location}
                    onChange={formik.handleChange}
                    error={formik.touched.Location && Boolean(formik.errors.Location)}
                    helperText={formik.touched.Location && formik.errors.Location}
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

export default AddPoliceStation;