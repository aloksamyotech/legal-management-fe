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
import { Box } from '@mui/system';
import { urls } from 'core/Constant/Urls';
import { postApi, updateApi } from 'core/APIs/ApiDocuments';
import { Messages } from 'core/comman/comman';


const AddCourt = (props) => {
  const { open, handleClose, fetchCourtData, editData } = props;

  const initialValues = {
    Title: editData?.Title || '',
    description: editData?.description || '',
    address: editData?.address || '',
  };

  const validationSchema = yup.object({
    Title: yup.string().required('Title is required'),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true, 
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (editData) {
          
          await updateApi(urls?.Court?.updatecourt.replace(':id', editData._id), values);
          toast.success(Messages.Court.Court_update_success);
        } else {
        
          await postApi(urls?.Court?.addcourt, values);
          toast.success(Messages.Court.Court_add_sussess);
        }
        formik.resetForm();
        handleClose();
        fetchCourtData();
      } catch (error) {
        toast.error(Messages.Court.Court_add_Failed);
      }
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'

          }}
        >
          <Typography style={{ fontWeight: 'normal' }} variant="h3">{editData ? 'Edit Court' : 'Add New Court'}</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
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
              <FormLabel>Location</FormLabel>
              <TextField
                id="address"
                name="address"
                fullWidth
                value={formik.values.address}
                onChange={formik.handleChange}
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
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions sx={{ padding: "15px 24px" }}>
        <Button onClick={formik.handleSubmit} variant="contained" color="primary">
          {editData ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCourt;
