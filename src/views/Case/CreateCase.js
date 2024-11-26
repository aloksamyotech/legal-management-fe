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


const AddAdvice= (props) => {
  const { open, handleClose } = props;
 
  // -----------  validationSchema
  const validationSchema = yup.object({
   
    Title: yup.string().required('Title is required'),
    Client: yup.string().required('Client is required'),
    Advocate: yup.string().required('Advocate Name is required'),
    Matter: yup.string().required('Matter Name is required'),
    Date: yup.date().required("Date is required"),
    Fee:yup.number().required("Please Enter the Fee"),
    description: yup.string().required('Address is required'),
    internalNote: yup.string().required('Address is required'),
  });

  // -----------   initialValues
 
  const initialValues ={
    Title: '',
    Date: '',
    Client:'',
    Advocate: '',
    Matter: '',
    Judge: '',
    PoliceStation: '',
    Court: '',
    Fir:'',
    discription:'',
    internalNote: ''
  };

  

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('CaseData', values);
      formik.resetForm();
      handleClose();
      toast.success('Case Add successfully');
      
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
          <Typography style={{fontWeight:'normal'}} variant="h3">Create New Case</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4}}>
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
                  <FormLabel>Date</FormLabel>
                  <TextField
                    name="Date"
                    type="date"
                    size="small"
                    fullWidth
                    value={formik.values.Date}
                    onChange={formik.handleChange}
                    error={formik.touched.Date && Boolean(formik.errors.Date)}
                    helperText={formik.touched.Date && formik.errors.Date}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                    <FormLabel>Client</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="Client"
                      name="Client"
                      size="small"
                      fullWidth
                      value={formik.values.Client}
                      onChange={formik.handleChange}
                      error={formik.touched.Client && Boolean(formik.errors.Client)}
                      helperText={formik.touched.Client && formik.errors.Client}
                    >
                      <MenuItem value="John Doe">John Doe</MenuItem>
                      <MenuItem value="Smith hook">Smith hook </MenuItem>
                      <MenuItem value="tom lokey">Tom lokey</MenuItem>
                      <MenuItem value="salina stair">Salina stair </MenuItem>
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>
                      {formik.touched.Client && formik.errors.Client}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                    <FormLabel>Advocate</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="Advocate"
                      name="Advocate"
                      size="small"
                      fullWidth
                      value={formik.values.Advocate}
                      onChange={formik.handleChange}
                      error={formik.touched.Advocate && Boolean(formik.errors.Advocate)}
                      helperText={formik.touched.Advocate && formik.errors.Advocate}
                    >
                      <MenuItem value="John Doe">John Doe</MenuItem>
                      <MenuItem value="Smith hook">Smith hook </MenuItem>
                      <MenuItem value="tom lokey">Tom lokey</MenuItem>
                      <MenuItem value="salina stair">Salina stair </MenuItem>
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>
                      {formik.touched.Advocate && formik.errors.Advocate}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                    <FormLabel>Matter</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="Matter"
                      name="Matter"
                      size="small"
                      fullWidth
                      value={formik.values.Matter}
                      onChange={formik.handleChange}
                      error={formik.touched.Matter&& Boolean(formik.errors.Matter)}
                      helperText={formik.touched.Matter && formik.errors.Matter}
                    >
                      <MenuItem value="Divorce Proceeding">Divorce Proceeding</MenuItem>
                      <MenuItem value="Criminal Offence">Criminal Offence </MenuItem>
                      <MenuItem value="Child Custody Dispute">Child Custody Dispute</MenuItem>
                      <MenuItem value="Child Support">Child Support </MenuItem>
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>
                      {formik.touched.Matter && formik.errors.Matter}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                    <FormLabel>Judge</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="Judge"
                      name="Judge"
                      size="small"
                      fullWidth
                      value={formik.values.Judge}
                      onChange={formik.handleChange}
                      error={formik.touched.Judge&& Boolean(formik.errors.Judge)}
                      helperText={formik.touched.Judge && formik.errors.Judge}
                    >
                      <MenuItem value="Chief Justice">Chief Justice</MenuItem>
                      <MenuItem value="District Judge">District Judge</MenuItem>
                      <MenuItem value="Circuit Judge">Circuit Judge</MenuItem>
                      <MenuItem value="Associate Justice">Associate Justice </MenuItem>
                      <MenuItem value="Presiding Judge">Presiding Judge </MenuItem>
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>
                      {formik.touched.Judge && formik.errors.Judge}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                
          
                <Grid item xs={12} sm={6} md={6}>
                <Box mb={1}>

                  <FormLabel style={{color:"black"}}>Fee</FormLabel>
                </Box>
                  <TextField
                    id="Fee"
                    name="Fee"
                    type="number"
                    size="small"
                    placeholder='Enter Fee'
                    fullWidth
                    value={formik.values.Fee}
                    onChange={formik.handleChange}
                    error={formik.touched.Fee && Boolean(formik.errors.Fee)}
                    helperText={formik.touched.Fee && formik.errors.Fee}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                    <FormLabel>Matter</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="Status"
                      name="Status"
                      size="small"
                      fullWidth
                      value={formik.values.Status}
                      onChange={formik.handleChange}
                      error={formik.touched.Status&& Boolean(formik.errors.Status)}
                      helperText={formik.touched.Status && formik.errors.Status}
                    >
                      <MenuItem value="Draft">Draft</MenuItem>
                      <MenuItem value="Approved">Approved</MenuItem>
                      <MenuItem value="On-Hold">On-Hold</MenuItem>
                      <MenuItem value="Closed">Closed </MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>
                      {formik.touched.Status && formik.errors.Status}
                    </FormHelperText>
                  </FormControl>
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
               <Grid item xs={12} sm={6} md={6}>
                <Box mb={1}>

                  <FormLabel style={{color:"black"}}>Internal Note</FormLabel>
                </Box>
                  <TextField
                    id="internalNote"
                    name="internalNote"
                    placeholder="Enter Internal Note"
                    size="small"
                    multiline
                    rows={2}
                    fullWidth
                    value={formik.values.internalNote}
                    onChange={formik.handleChange}
                    error={formik.touched.internalNote && Boolean(formik.errors.internalNote)}
                    helperText={formik.touched.internalNote && formik.errors.internalNote}
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

export default AddAdvice;