import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormLabel, Grid, TextField } from '@mui/material';
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
import { Messages } from 'core/comman/comman';
import { Box } from '@mui/system';
import { updateApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useTranslation } from 'react-i18next';  // Import useTranslation hook

const UpdatePracticearea = (props) => {
  const { open, handleClose, fetchPracticeareaData, editData } = props;
  const { t } = useTranslation();  // Initialize translation hook

  // -----------  validationSchema
  const validationSchema = yup.object({
    Title: yup.string().required(t('Title is required'))  // Apply translation
  });

  // -----------   initialValues
  const initialValues = {
    Title: editData.Title || '',
    description: editData.description || '',
    address: editData.address || ''
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateApi(urls?.PracticeArea.updatepracticearea.replace(':id', editData._id), values);
        formik.resetForm();
        handleClose();
        toast.success(t(Messages.PracticeArea.PracticeArea_Update_sussess));
        fetchPracticeareaData();
      } catch (error) {
        toast.error(t(Messages.PracticeArea.PracticeArea_Update_Failed));
      }
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
          <Typography style={{ fontWeight: 'normal' }} variant="h3">
            {t('Update Practice Area')}  
          </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText height={250} id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>{t('Title')}</FormLabel>  
                  </Box>
                  <TextField
                    id="Title"
                    name="Title"
                    type="text"
                    size="small"
                    inputProps={{ maxLength: 30 }}
                    placeholder={t('Enter Expense Type')}  
                    fullWidth
                    value={formik.values.Title}
                    onChange={formik.handleChange}
                    error={formik.touched.Title && Boolean(formik.errors.Title)}
                    helperText={formik.touched.Title && formik.errors.Title}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>{t('Location')}</FormLabel>  
                  </Box>
                  <TextField
                    id="address"
                    name="address"
                    type="text"
                    inputProps={{ maxLength: 100 }}
                    size="small"
                    placeholder={t('Enter Practice Area Location')}  
                    fullWidth
                    value={formik.values.address}
                    onChange={formik.handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>{t('Description')}</FormLabel>  
                  </Box>
                  <TextField
                    name="description"
                    size="small"
                    multiline
                    placeholder={t('Enter Description')}  
                    inputProps={{ maxLength: 150 }}
                    rows={2}
                    fullWidth
                    value={formik.values.description}
                    onChange={formik.handleChange}
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
            {t('Update')}  
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdatePracticearea;
