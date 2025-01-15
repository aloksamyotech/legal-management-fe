/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormHelperText, MenuItem, Select, FormLabel, Grid, TextField } from '@mui/material';
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
import { Messages } from 'core/comman/comman';
import { urls } from 'core/Constant/Urls';
import { updateApi } from 'core/APIs/ApiDocuments';

const EditNote = (props) => {
  const { open, handleClose, id, rowData, fetchNoteData } = props;

  // -----------  validationSchema
  const validationSchema = yup.object({
    Title: yup.string().required('Title is required'),
    Attachment: yup.string().required('Attach a file'),
    Description: yup.string().required('Description  is required')
  });

  // -----------   initialValues

  const initialValues = {
    Title: rowData.Title || '',
    Attachment: rowData.Attachment || '',
    Description: rowData.Description || ''
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('Title', values.Title);
      formData.append('Description', values.Description);
      if (values.Attachment) {
        formData.append('Attachment', values.Attachment);
      }

      try {
        await updateApi(urls?.Note.updatenote.replace(':id', id), formData, { 'Content-Type': 'multipart/form-data' });
        formik.resetForm();
        handleClose();
        toast.success(Messages.Note.Note_update_success);
        fetchNoteData();
      } catch (error) {
        toast.error(Messages.Note.Note_update_failed);
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
            Update Note
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
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>Title</FormLabel>
                  </Box>
                  <TextField
                    id="Title"
                    name="Title"
                    type=""
                    size="small"
                    placeholder="Title"
                    fullWidth
                    value={formik.values.Title}
                    onChange={formik.handleChange}
                    error={formik.touched.Title && Boolean(formik.errors.Title)}
                    helperText={formik.touched.Title && formik.errors.Title}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>Attachment</FormLabel>
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
                    <FormLabel style={{ color: 'black' }}>Description</FormLabel>
                  </Box>
                  <TextField
                    id="Description"
                    name="Description"
                    placeholder="Enter Description"
                    size="small"
                    multiline
                    rows={2}
                    fullWidth
                    value={formik.values.Description}
                    onChange={formik.handleChange}
                    error={formik.touched.Description && Boolean(formik.errors.Description)}
                    helperText={formik.touched.Description && formik.errors.Description}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions sx={{ padding: '15px 24px' }}>
          <Button sx={{ borderRadius: '15px' }} onClick={formik.handleSubmit} variant="contained" color="primary" type="submit">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditNote;
