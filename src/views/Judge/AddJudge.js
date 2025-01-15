import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography, FormLabel } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Box } from '@mui/system';
import { urls } from 'core/Constant/Urls';
import { postApi, updateApi } from 'core/APIs/ApiDocuments';
import { Messages } from 'core/comman/comman';

const AddJudge = ({ open, handleClose, fetchJudgeData, editData }) => {
  const initialValues = {
    Title: editData?.Title || '',
    mobile: editData?.mobile || '',
    description: editData?.description || ''
  };

  const validationSchema = yup.object({
    Title: yup.string().required('Title is required'),
    mobile: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Must be 10 digits')
      .required('Mobile number is required')
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (editData) {
          await updateApi(urls?.Judge?.updatejudge.replace(':id', editData._id), values);
          toast.success(Messages.Judge.Judge_update_success);
        } else {
          await postApi(urls?.Judge?.addjudge, values);
          toast.success(Messages.Judge.Judge_add_sussess);
        }
        formik.resetForm();
        handleClose();
        fetchJudgeData();
      } catch (error) {
        toast.error(editData ? Messages.Judge.Judge_update_failed : Messages.Judge.Judge_add_Failed);
      }
    }
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3" sx={{ fontWeight: 'normal' }}>
          {editData ? 'Edit Judge' : 'Add New Judge'}
        </Typography>
        <ClearIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormLabel>Title</FormLabel>
              <TextField
                id="Title"
                name="Title"
                fullWidth
                value={formik.values.Title}
                onChange={formik.handleChange}
                error={formik.touched.Title && Boolean(formik.errors.Title)}
                helperText={formik.touched.Title && formik.errors.Title}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>Mobile</FormLabel>
              <TextField
                id="mobile"
                name="mobile"
                fullWidth
                value={formik.values.mobile}
                onChange={formik.handleChange}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>Description</FormLabel>
              <TextField
                id="description"
                name="description"
                fullWidth
                multiline
                rows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions sx={{ padding: '15px 24px' }}>
        <Button onClick={formik.handleSubmit} variant="contained" color="primary">
          {editData ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddJudge;
