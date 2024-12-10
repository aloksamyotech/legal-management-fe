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
const DocumentEdit = (props) => {
  const { open, handleClose } = props;
    // -----------  validationSchema
  const validationSchema = yup.object({
    file: yup.string().required('File is required'),
    fileName: yup.string().required('File Name is required'),
    Note: yup.string().required('Note is required')
  });

  // -----------   initialValues
  const initialValues = {
    file: '',
    fileName: '',
    Note:''
    
  };

  

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('Document', values);
      formik.resetForm();
      handleClose();
      toast.success('Documents upload successfully');
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
          <Typography variant="h6">Add Documents </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form encType="multipart/form-data">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                  <Grid item xs={12} sm={12} md={12}>
                    <FormLabel>Title</FormLabel>
                    <TextField
                      id="fileName"
                      name="fileName"
                      size="small"
                      inputProps={{maxLength:25}}
                      fullWidth
                      value={formik.values.fileName}
                      onChange={formik.handleChange}
                      error={formik.touched.fileName && Boolean(formik.errors.fileName)}
                      helperText={formik.touched.fileName && formik.errors.fileName}
                    />
                  </Grid>
              <Grid item xs={12} sm={12} md={12}>
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
                    <FormLabel>Note</FormLabel>
                    <TextField
                      id="Note"
                      name="Note"
                      inputProps={{maxLength:200}}
                      size="small"
                      fullWidth
                      value={formik.values.Note}
                      onChange={formik.handleChange}
                      error={formik.touched.Note && Boolean(formik.errors.Note)}
                      helperText={formik.touched.Note && formik.errors.Note}
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
            Update
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

export default DocumentEdit;
