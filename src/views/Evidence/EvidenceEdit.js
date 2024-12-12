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
import { FormLabel } from '@mui/material';
import { toast } from 'react-toastify';
// import { apipost } from '../../service/api';

const EvidenceEdit = (props) => {
  const { open, handleClose } = props;
  

  // -----------  validationSchema
  const validationSchema = yup.object({
    file: yup.string().required('File is required'),
    Title: yup.string().required('File Name is required'),
    Favor:yup.string().required('Favor is required'),
    Description: yup.string().required('Description is required'),
    Hearing: yup.string().required('Hearing is required')
  });

  // -----------   initialValues
  const initialValues = {
    Case:'',
    Hearing: '',
    Title: '',
    Favor:'',
    file:'',
    Description:""
    
  };

  

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('AddEvidence values', values);
      formik.resetForm();
      handleClose();
      toast.success('Evidence upload successfully');
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
          }}
        >
          <Typography variant="h6">Add Evidence </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form encType="multipart/form-data">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormLabel>Title</FormLabel>
                    <TextField
                      id="Title"
                      name="Title"
                      size="small"
                      inputProps={{maxLength:50}}
                      fullWidth
                      value={formik.values.Title}
                      onChange={formik.handleChange}
                      error={formik.touched.Title && Boolean(formik.errors.Title)}
                      helperText={formik.touched.Title && formik.errors.Title}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormLabel>Case</FormLabel>
                    <TextField
                      id="Case"
                      name="Case"
                      size="small"
                      inputProps={{maxLength:50}}
                      fullWidth
                      value={formik.values.Case}
                      onChange={formik.handleChange}
                      error={formik.touched.Case && Boolean(formik.errors.Case)}
                      helperText={formik.touched.Case && formik.errors.Case}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormLabel>Hearing</FormLabel>
                    <TextField
                      id="Hearing"
                      name="Hearing"
                      size="small"
                      inputProps={{maxLength:50}}
                      fullWidth
                      value={formik.values.Hearing}
                      onChange={formik.handleChange}
                      error={formik.touched.Hearing && Boolean(formik.errors.Hearing)}
                      helperText={formik.touched.Hearing && formik.errors.Hearing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <FormLabel>Favor</FormLabel>
                    <TextField
                      id="Favor"
                      name="Favor"
                      size="small"
                      inputProps={{maxLength:50}}
                      fullWidth
                      value={formik.values.Favor}
                      onChange={formik.handleChange}
                      error={formik.touched.Favor && Boolean(formik.errors.Favor)}
                      helperText={formik.touched.Favor && formik.errors.Favor}
                    />
                  </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Attachment</FormLabel>
                <TextField
                  id="file"
                  name="file"
                  size="small"
                  maxRows={10}
                  fullWidth
                  type="file"
                  multiple
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={(event) => {
                    formik.setFieldValue('file', event.currentTarget.files[0]);
                  }}
                  error={formik.touched.file && Boolean(formik.errors.file)}
                  helperText={formik.touched.file && formik.errors.file}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                    <FormLabel>Description</FormLabel>
                    <TextField
                      id="Description"
                      inputProps={{maxLength:200}}
                      name=""
                      size="small"
                      rowSpacing={2}
                      fullWidth
                      value={formik.values.Description}
                      onChange={formik.handleChange}
                      error={formik.touched.Description && Boolean(formik.errors.Description)}
                      helperText={formik.touched.Description && formik.errors.Description}
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

export default EvidenceEdit;
