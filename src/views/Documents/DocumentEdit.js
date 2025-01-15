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
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormLabel, Box, IconButton, Chip } from '@mui/material';
import { toast } from 'react-toastify';
import { updateApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { Messages } from 'core/comman/comman';
import { useEffect } from 'react';
import { GridCloseIcon } from '@mui/x-data-grid';
import { useState } from 'react';

const DocumentEdit = (props) => {
  const { open, handleClose, id, rowData, fetchDocumentData } = props;
  const [attachments, setAttachments] = useState([]);

  // ----------- Validation Schema
  const validationSchema = yup.object({
    Title: yup.string().required('File Name is required'),
    Note: yup.string().required('Note is required')
  });
  console.log(rowData.Title, '>>>>>>>>>>>>>>>>');
  // ----------- Initial Values
  const initialValues = {
    file: rowData.file || '',
    Title: rowData.Title || '',
    Note: rowData.Note || '',
    Case: rowData.CaseId
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('Title', values.Title);
      formData.append('Case', values.Case);
      formData.append('Note', values.Note);
      attachments.forEach((file) => {
        formData.append('Attachment', file);
      });

      try {
        const response = await updateApi(urls?.Document?.updatedocument.replace(':id', id), formData, {
          'Content-Type': 'multipart/form-data'
        });

        if (response?.data) {
          toast.success(Messages?.Document?.updateSuccess);
          formik.resetForm();
          setAttachments([]);
          handleClose();
          fetchDocumentData();
        }
      } catch (error) {
        console.error('Error adding expense:', error);
        toast.error(Messages?.Document?.updateFailed);
      }
    }
  });
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setAttachments((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleFileRemove = (fileName) => {
    setAttachments((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

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
          <Typography variant="h6">Update Documents </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Title</FormLabel>
                <TextField
                  id="Title"
                  name="Title"
                  size="small"
                  inputProps={{ maxLength: 25 }}
                  fullWidth
                  value={formik.values.Title}
                  onChange={formik.handleChange}
                  error={formik.touched.Title && Boolean(formik.errors.Title)}
                  helperText={formik.touched.Title && formik.errors.Title}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box mb={1}>
                  <FormLabel style={{ color: 'black' }}>Attachment</FormLabel>
                </Box>
                <Button variant="contained" component="label">
                  Upload Files
                  <input type="file" multiple hidden onChange={handleFileChange} />
                </Button>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    flexWrap: 'wrap',
                    maxHeight: '100px',
                    overflowY: 'auto',
                    marginTop: 1,
                    color: 'white'
                  }}
                >
                  {attachments.map((file, index) => (
                    <Chip
                      key={index}
                      sx={{ background: 'green', color: 'white' }}
                      label={file.name}
                      onDelete={() => handleFileRemove(file.name)}
                      deleteIcon={<GridCloseIcon />}
                    />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Note</FormLabel>
                <TextField
                  id="Note"
                  name="Note"
                  inputProps={{ maxLength: 200 }}
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
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }}>
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
