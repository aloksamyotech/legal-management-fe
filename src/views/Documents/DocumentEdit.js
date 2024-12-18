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
import { FormLabel, Box, IconButton } from '@mui/material';
import { toast } from 'react-toastify';

const DocumentEdit = (props) => {
  const { open, handleClose,id } = props;

  // ----------- Validation Schema
  const validationSchema = yup.object({
    files: yup
      .mixed()
      .test(
        "fileCount",
        "You can only upload up to 4 files",
        (value) => !value || (value && value.length <= 4)
      )
      .required("Files are required"),
    fileName: yup.string().required("File Name is required"),
    Note: yup.string().required("Note is required"),
  });

  // ----------- Initial Values
  const initialValues = {
    files: [],
    fileName: '',
    Note: '',
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('Document:', values);
      formik.resetForm();
      handleClose();
      toast.success('Documents uploaded successfully');
    },
  });

  const removeFile = (fileIndex) => {
    const updatedFiles = formik.values.files.filter((_, index) => index !== fileIndex);
    formik.setFieldValue('files', updatedFiles);
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
                  inputProps={{ maxLength: 25 }}
                  fullWidth
                  value={formik.values.fileName}
                  onChange={formik.handleChange}
                  error={formik.touched.fileName && Boolean(formik.errors.fileName)}
                  helperText={formik.touched.fileName && formik.errors.fileName}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>Attachment</FormLabel>
                <input
                  id="files"
                  name="files"
                  type="file"
                  multiple
                  accept="image/*,application/pdf"
                  style={{ marginTop: 8, marginBottom: 8, display: 'block' }}
                  onChange={(event) => {
                    formik.setFieldValue('files', Array.from(event.target.files));
                  }}
                />
                {formik.touched.files && formik.errors.files && (
                  <Typography color="error" variant="caption">
                    {formik.errors.files}
                  </Typography>
                )}
                <Box>
                  {formik.values.files.length > 0 && (
                    <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                      {formik.values.files.map((file, index) => (
                        <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                          <Typography variant="body2" style={{ flexGrow: 1 }}>
                            {file.name}
                          </Typography>
                          <IconButton
                            color="error"
                            onClick={() => removeFile(index)}
                            style={{ marginLeft: 8 }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </li>
                      ))}
                    </ul>
                  )}
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
          <Button
            type="submit"
            variant="contained"
            onClick={formik.handleSubmit}
            style={{ textTransform: 'capitalize' }}
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
