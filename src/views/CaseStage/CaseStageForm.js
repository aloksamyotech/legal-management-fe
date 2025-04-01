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
import { Box } from '@mui/system';
import { postApi, updateApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { Messages } from 'core/comman/comman';
import { useTranslation } from 'react-i18next';
import Loader from 'core/comman/loader';

const CaseStageForm = ({ open, handleClose, fetchCaseStageData, editData }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(false);

  const validationSchema = yup.object({
    Title: yup.string().required(t('Title is required'))
  });

  const initialValues = {
    Title: editData?.Title || '',
    description: editData?.description || ''
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      if (editData) {
        await updateApi(urls?.CaseStage?.updateCaseStage.replace(':id', editData._id), values);
        toast.success(t(Messages.CaseStage.CaseStage_Update_sussess));
      } else {
        await postApi(urls?.CaseStage?.addCaseStage, values);
        toast.success(t(Messages.CaseStage.CaseStage_add_sussess));
        formik.resetForm();
      }
      fetchCaseStageData();
      handleClose();
    } catch (error) {
      toast.error(editData ? t(Messages.CaseStage.CaseStage_Update_Failed) : t(Messages.CaseStage.CaseStage_add_Failed));
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit
  });

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3">{t(editData ? 'Update CaseStage' : 'Create Case Stage')}</Typography>
        <ClearIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </DialogTitle>
      <DialogContent dividers>
        {isLoading && <Loader isVisible={isLoading} />}
        <form onSubmit={formik.handleSubmit}>
          <DialogContentText height={200} tabIndex={-1}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12}>
                <Box mb={1}>
                  <FormLabel>{t('Title')}</FormLabel>
                </Box>
                <TextField
                  name="Title"
                  size="small"
                  fullWidth
                  placeholder={t('Enter Case Stage')}
                  value={formik.values.Title}
                  onChange={formik.handleChange}
                  error={formik.touched.Title && Boolean(formik.errors.Title)}
                  helperText={formik.touched.Title && formik.errors.Title}
                />
              </Grid>
              <Grid item xs={12}>
                <Box mb={1}>
                  <FormLabel>{t('Description')}</FormLabel>
                </Box>
                <TextField
                  name="description"
                  size="small"
                  multiline
                  fullWidth
                  placeholder={t('Enter Description')}
                  rows={2}
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
        <Button type="submit" variant="contained" color="primary" onClick={formik.handleSubmit} disabled={isLoading}>
          {t(editData ? 'Update' : 'Create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CaseStageForm;
