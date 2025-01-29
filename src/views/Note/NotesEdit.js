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
import { useTranslation } from 'react-i18next';
import Loader from 'core/comman/loader';
import { useState } from 'react';

const EditNote = (props) => {
  const { open, handleClose, id, rowData, fetchNoteData } = props;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  // -----------  validationSchema
  const validationSchema = yup.object({
    Title: yup.string().required(t('Title is required')),
    Attachment: yup.string().required(t('Attach a file')),
    Description: yup.string().required(t('Description is required'))
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
      setIsLoading(true);
      const startTime = Date.now();
      try {
        const response = await updateApi(urls?.Note.updatenote.replace(':id', id), formData, { 'Content-Type': 'multipart/form-data' });
        if (response) {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, 500 - elapsedTime);
          setTimeout(() => {
            setIsLoading(false);
            handleClose();
          }, remainingTime);
        } else {
          setIsLoading(false);
        }
        formik.resetForm();
        toast.success(t(Messages.Note.Note_update_success));
        fetchNoteData();
      } catch (error) {
        setIsLoading(false);
        toast.error(t(Messages.Note.Note_update_failed));
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
            {t('Update Note')}
          </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {isLoading && <Loader isVisible={isLoading}></Loader>}
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>{t('Title')}</FormLabel>
                  </Box>
                  <TextField
                    id="Title"
                    name="Title"
                    type=""
                    size="small"
                    placeholder={t('Title')}
                    fullWidth
                    value={formik.values.Title}
                    onChange={formik.handleChange}
                    error={formik.touched.Title && Boolean(formik.errors.Title)}
                    helperText={formik.touched.Title && formik.errors.Title}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>{t('Attachment')}</FormLabel>
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
                    <FormLabel style={{ color: 'black' }}>{t('Description')}</FormLabel>
                  </Box>
                  <TextField
                    id="Description"
                    name="Description"
                    placeholder={t('Enter Description')}
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
          <Button
            sx={{ borderRadius: '15px' }}
            onClick={formik.handleSubmit}
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
          >
            {t('Update')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditNote;
