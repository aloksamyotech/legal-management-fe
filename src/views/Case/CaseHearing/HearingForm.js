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
import { FormHelperText, FormLabel, MenuItem, Select } from '@mui/material';
import { toast } from 'react-toastify';
// import { apipost } from '../../service/api';
import { useTranslation } from 'react-i18next';
import { postApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { Palette } from '@mui/icons-material';

const HearingForm = (props) => {
  const { open, handleClose, caseData, fetchHearingData } = props;
  const { t } = useTranslation();

  // -----------  validationSchema
  const validationSchema = yup.object({
    Title: yup.string().required('File Name is required'),
    Fee: yup.number().typeError('Fee must be a number').positive('Fee must be greater than zero').required('Fee is required'),
    Witness: yup.string().required('Witness is required'),
    JudgementStatus: yup.string().required('Judgement Status is required'),
    Date: yup.date().typeError('Invalid date format').required('Date is required'),
    JudgementReason: yup.string().max(500, 'Judgement Reason cannot exceed 500 characters'),
    Description: yup.string().required('Description is required')
  });

  // -----------   initialValues
  const initialValues = {
    Case: caseData._id,
    Client:caseData?.Client?._id,
    Title: '',
    Fee: '',
    Witness: '',
    JudgementStatus: '',
    JudgementReason: '',
    Date: '',
    Description: ''
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await postApi(urls?.Hearing?.addhearing, values);
        formik.resetForm();
        handleClose();
        toast.success('Hearing added successfully');
        fetchHearingData();
      } catch (error) {
        toast.error('Failed to add hearing');
      }
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
          <Typography variant="h6">{t('Add Hearing')}</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form encType="multipart/form-data">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>{t('Title')}</FormLabel>
                <TextField
                  id="Title"
                  name="Title"
                  size="small"
                  placeholder="Enter Title"
                  inputProps={{ maxLength: 50 }}
                  fullWidth
                  value={formik.values.Title}
                  onChange={formik.handleChange}
                  error={formik.touched.Title && Boolean(formik.errors.Title)}
                  helperText={formik.touched.Title && formik.errors.Title}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>{t('Date')}</FormLabel>
                <TextField
                  id="Date"
                  name="Date"
                  size="small"
                  type="Date"
                  inputProps={{ maxLength: 50 }}
                  fullWidth
                  value={formik.values.Date}
                  onChange={formik.handleChange}
                  error={formik.touched.Date && Boolean(formik.errors.Date)}
                  helperText={formik.touched.Date && formik.errors.Date}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>{t('Fees')}</FormLabel>
                <TextField
                  id="Fee"
                  name="Fee"
                  size="small"
                  placeholder="Enter Fee"
                  type="number"
                  inputProps={{ maxLength: 50 }}
                  fullWidth
                  value={formik.values.Fee}
                  onChange={formik.handleChange}
                  error={formik.touched.Fee && Boolean(formik.errors.Fee)}
                  helperText={formik.touched.Fee && formik.errors.Fee}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>{t('Witness')}</FormLabel>
                <TextField
                  id="Witness"
                  name="Witness"
                  placeholder="Enter Witness"
                  size="small"
                  maxRows={10}
                  fullWidth
                  inputProps={{ maxLength: 50 }}
                  value={formik.values.Witness}
                  onChange={formik.handleChange}
                  type="text"
                  multiple
                  error={formik.touched.Witness && Boolean(formik.errors.Witness)}
                  helperText={formik.touched.Witness && formik.errors.Witness}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>{t('Judgement Status')}</FormLabel>
                <Select
                  id="JudgementStatus"
                  name="JudgementStatus"
                  size="small"
                  fullWidth
                  value={formik.values.JudgementStatus}
                  onChange={formik.handleChange}
                  error={formik.touched.JudgementStatus && Boolean(formik.errors.JudgementStatus)}
                  displayEmpty
                  sx={{
                    '& .MuiSelect-select': {
                      color: formik.values.JudgementStatus === '' ? 'text.disabled' : 'initial'
                    }
                  }}
                >
                  <MenuItem value="" disabled>
                    {t('Select Judgement Status')}
                  </MenuItem>
                  <MenuItem value="Pending">{t('Pending')}</MenuItem>
                  <MenuItem value="In Progress">{t('In Progress')}</MenuItem>
                  <MenuItem value="Delivered">{t('Delivered')}</MenuItem>
                </Select>
                <FormHelperText>{formik.touched.JudgementStatus && formik.errors.JudgementStatus}</FormHelperText>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>{t('Judgement Reason')}</FormLabel>
                <TextField
                  id="JudgementReason"
                  name="JudgementReason"
                  size="small"
                  placeholder="Enter Judgement Reason "
                  inputProps={{ maxLength: 50 }}
                  maxRows={10}
                  fullWidth
                  value={formik.values.JudgementReason}
                  onChange={formik.handleChange}
                  type="text"
                  multiple
                  error={formik.touched.JudgementReason && Boolean(formik.errors.JudgementReason)}
                  helperText={formik.touched.JudgementReason && formik.errors.JudgementReason}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <FormLabel>{t('Description')}</FormLabel>
                <TextField
                  id="Description"
                  placeholder="Enter Description"
                  inputProps={{ maxLength: 200 }}
                  name=""
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }}>
            Save
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

export default HearingForm;
