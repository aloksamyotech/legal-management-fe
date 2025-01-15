import React from 'react';
import {
  Button,
  Dialog,
  FormLabel,
  Grid,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { urls } from 'core/Constant/Urls';
import { Messages } from 'core/comman/comman';

const AddNote = (props) => {
  const { open, handleClose, fetchNoteData } = props;

  // Validation Schema
  const validationSchema = yup.object({
    Title: yup.string().required('Title is required'),
    Attachment: yup.mixed().required('Attach a file'),
    description: yup.string().required('Description is required')
  });

  // Initial Values
  const initialValues = {
    Title: '',
    Attachment: null,
    description: ''
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('Title', values.Title);
      formData.append('Description', values.description);
      if (values.Attachment) {
        formData.append('Attachment', values.Attachment);
      }

      try {
        const response = await axios.post(urls.Note.addnote, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        toast.success(Messages.Note.Note_add_success);
        formik.resetForm();
        handleClose();
        fetchNoteData();
      } catch (error) {
        console.error('Error adding note:', error);
        toast.error(Messages.Note.Note_add_failed);
      }
    }
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === 'Attachment') {
      formik.setFieldValue(name, files[0]);
    } else {
      formik.setFieldValue(name, value);
    }
  };

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
            Create New Note
          </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>Title</FormLabel>
                  </Box>
                  <TextField
                    id="Title"
                    name="Title"
                    size="small"
                    placeholder="Title"
                    inputProps={{ maxLength: 30 }}
                    fullWidth
                    value={formik.values.Title}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    error={formik.touched.Attachment && Boolean(formik.errors.Attachment)}
                    helperText={formik.touched.Attachment && formik.errors.Attachment}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>Description</FormLabel>
                  </Box>
                  <TextField
                    id="description"
                    name="description"
                    placeholder="Enter Description"
                    size="small"
                    multiline
                    inputProps={{ maxLength: 80 }}
                    rows={2}
                    fullWidth
                    value={formik.values.description}
                    onChange={handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
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

export default AddNote;
