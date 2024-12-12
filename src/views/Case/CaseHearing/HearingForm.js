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
import { FormLabel } from '@mui/material';
import { toast } from 'react-toastify';
// import { apipost } from '../../service/api';
import { useTranslation } from 'react-i18next';

const HearingForm = (props) => {
    const { open, handleClose } = props;
    const {t} = useTranslation();
  

  // -----------  validationSchema
  const validationSchema = yup.object({
    file: yup.string().required('File is required'),
    Title: yup.string().required('File Name is required'),
    Description: yup.string().required('Description is required')
  });

  // -----------   initialValues
  const initialValues = {
      Title: '',
      Fee:'',
      Witness:'',
      JudgementStatus:'',
      Date:'',
      JudgementReason:'',
      date:'',
      Description:''
    
  };

  

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('AddEvidence values', values);
      formik.resetForm();
      handleClose();
      toast.success('Evidence upload successfully');
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
          <Typography variant="h6">{t('Add Hearing' )}</Typography>
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
                      inputProps={{maxLength:50}}
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
                      id="date"
                      name="date"
                      size="small"
                      type='date'
                      inputProps={{maxLength:50}}
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
                      type='number'
                      inputProps={{maxLength:50}}
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
                  size="small"
                  maxRows={10}
                  fullWidth
                  inputProps={{maxLength:50}}
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
                <TextField
                  id="JudgementStatus"
                  name="JudgementStatus"
                  size="small"
                  maxRows={10}
                  fullWidth
                  inputProps={{maxLength:50}}
                  value={formik.values.JudgementStatus}
                  onChange={formik.handleChange}
                  type="text"
                  multiple
                  error={formik.touched.JudgementStatus && Boolean(formik.errors.JudgementStatus)}
                  helperText={formik.touched.JudgementStatus && formik.errors.JudgementStatus}
                  />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>{t('Judgement Reason')}</FormLabel>
                <TextField
                  id="JudgementReason"
                  name="JudgementReason"
                  size="small"
                  inputProps={{maxLength:50}}
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
                    <FormLabel>{t("Description")}</FormLabel>
                    <TextField
                      id="Description"
                      inputProps={{maxLength:200}}
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
          <Button
            type="submit"
            variant="contained"
            onClick={formik.handleSubmit}
            style={{ textTransform: 'capitalize' }}
           
          >
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
