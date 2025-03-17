import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormLabel, Grid, TextField, Select, MenuItem, FormHelperText, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { urls } from 'core/Constant/Urls';
import { postApi, updateApi } from 'core/APIs/ApiDocuments';
import { Messages } from 'core/comman/comman';
import { useTranslation } from 'react-i18next';
import Loader from 'core/comman/loader';
import { statusCodes } from 'core/Statuscode/constant';
import currencyCodes from 'currency-codes';

const roles = ['Admin', 'Staff', 'Advocate', 'Manager'];

const AddUser = (props) => {
  const { open, handleClose, fetchUserdata, editData } = props;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const initialValues = {
    Name: editData?.Name || '',
    email: editData?.email || '',
    mobileNumber: editData?.mobileNumber || '',
    AsignRole: editData?.AsignRole || '',
    password: '',
    Gender: editData?.Gender || '',
    address: editData?.address || '',
    image: '',
    currency: editData?.currency || ''
  };
  const currencyOptions = currencyCodes.data.map((currency) => ({
    code: currency.code,
    name: currency.currency
  }));
  const validationSchema = yup.object({
    Name: yup.string().required(t('Name is required')),
    email: yup.string().email(t('Invalid email address')).required(t('Email is required')),
    mobileNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, t('Mobile number must be exactly 10 digits'))
      .required(t('Mobile number is required')),
    AsignRole: yup.string().required(t('Role is required')),
    Gender: yup.string().required('Gender is required'),
    //image: yup.mixed().required(t('Image is required')),
    ...(editData
      ? {}
      : {
          password: yup.string().required(t('Password is required'))
        })
  });

  // const formik = useFormik({
  //   initialValues,
  //   enableReinitialize: true,
  //   validationSchema,
  //   onSubmit: async (values) => {
  //     setIsLoading(true);
  //     const startTime = Date.now();
  //     try {
  //       const token = localStorage.getItem('$2b$10$ehdPSDmr6P');
  //       if (!token) throw new Error('No token found');
  //       let response;
  //       if (editData) {
  //         response = await updateApi(urls?.user?.update.replace(':id', editData._id), values);
  //         toast.success(t(Messages.User.update_success));
  //         console.log(response);
  //       } else {
  //         response = await postApi(urls?.user?.register, values, { authorization: token.toString() });
  //         toast.success(t(Messages.User.add_success));
  //         formik.resetForm();
  //       }

  //       fetchUserdata();
  //       if (response && (response.status === statusCodes.created || response.success == true)) {
  //         const elapsedTime = Date.now() - startTime;
  //         setTimeout(() => {
  //           setIsLoading(false);
  //           handleClose();
  //         }, Math.max(0, 500 - elapsedTime));
  //       } else {
  //         setIsLoading(false);
  //       }
  //     } catch (error) {
  //       toast.error(editData ? t(Messages.User.update_Failed) : t(Messages.User.add_Failed));
  //       setIsLoading(false);
  //     }
  //   }
  // });
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      if (values?.currency) {
        localStorage.setItem('$2b$10$ehdPSDmr6P3', values?.currency);
      }
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      if (image) {
        formData.append('image', image);
      }
      try {
        const token = localStorage.getItem('$2b$10$ehdPSDmr6P');
        if (!token) throw new Error('No token found');
        let response;
        if (editData) {
          response = await updateApi(urls?.user?.update.replace(':id', editData._id), formData, { 'Content-Type': 'multipart/form-data' });
          toast.success(t(Messages.User.update_success));
        } else {
          for (const pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
          }
          response = await postApi(urls?.user?.register, formData, {
            'Content-Type': 'multipart/form-data',
            authorization: token.toString()
          });
          toast.success(t(Messages.User.add_success));
          formik.resetForm();
          setImage(null);
        }
        fetchUserdata();
        setIsLoading(false);
        handleClose();
      } catch (error) {
        toast.error(editData ? t(Messages.User.update_Failed) : t(Messages.User.add_Failed));
        setIsLoading(false);
      }
    }
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
        <Typography style={{ fontWeight: 'normal' }} variant="h3">
          {editData ? t('Edit User') : t('Add New User')}
        </Typography>
        <Typography>
          <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        {isLoading && <Loader isVisible={isLoading} />}
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t('Name')}</FormLabel>
              <TextField
                id="Name"
                name="Name"
                fullWidth
                value={formik.values.Name}
                onChange={formik.handleChange}
                error={formik.touched.Name && Boolean(formik.errors.Name)}
                helperText={formik.touched.Name && formik.errors.Name}
              />
            </Grid>
            {!editData && (
              <Grid item xs={12} sm={6}>
                <FormLabel>{t('Email')}</FormLabel>
                <TextField
                  id="email"
                  name="email"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <FormLabel>{t('Mobile Number')}</FormLabel>
              <TextField
                id="mobileNumber"
                name="mobileNumber"
                fullWidth
                value={formik.values.mobileNumber}
                onChange={formik.handleChange}
                error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel>{t('Role')}</FormLabel>
              <Select
                id="AsignRole"
                name="AsignRole"
                fullWidth
                value={formik.values.AsignRole}
                onChange={formik.handleChange}
                error={formik.touched.AsignRole && Boolean(formik.errors.AsignRole)}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {t(role)}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.AsignRole && formik.errors.AsignRole && <Typography color="error">{formik.errors.AsignRole}</Typography>}
            </Grid>
            {!editData && (
              <Grid item xs={12}>
                <FormLabel>{t('Password')}</FormLabel>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            )}
            {(formik.values.AsignRole === 'Admin' || formik.values.AsignRole === 'Company') && (
              <Grid item xs={12} sm={6}>
                <FormLabel>{t('Set Currency')}</FormLabel>
                <Select id="currency" name="currency" fullWidth value={formik.values.currency} onChange={formik.handleChange}>
                  {currencyOptions.map((currency) => (
                    <MenuItem key={currency.code} value={currency.code}>
                      {currency.name} - {currency.code}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <FormLabel>{t('Gender')}</FormLabel>
              <RadioGroup row name="Gender" value={formik.values.Gender} onChange={formik.handleChange}>
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
              {formik.touched.Gender && <FormHelperText error>{formik.errors.Gender}</FormHelperText>}
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormLabel>{t('Image')}</FormLabel>
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormLabel>{t('Address')}</FormLabel>
              <TextField
                id="address"
                name="address"
                fullWidth
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions sx={{ padding: '15px 24px' }}>
        <Button onClick={formik.handleSubmit} variant="contained" color="primary" disabled={isLoading}>
          {editData ? t('Update') : t('Create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUser;
