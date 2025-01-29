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
import { Box } from '@mui/system';
import { urls } from 'core/Constant/Urls';
import { postApi } from 'core/APIs/ApiDocuments';
import { Messages } from 'core/comman/comman';
import { useTranslation } from 'react-i18next';  
import Loader from 'core/comman/loader';

const AddPoliceStation = (props) => {
  const { open, handleClose, fetchPoliceStationData } = props;
  const { t } = useTranslation();  
  const [isLoading, setIsLoading] = React.useState(false); 
  // -----------  validationSchema
  const validationSchema = yup.object({
    Title: yup.string().required(t('Title is required')),
    Contact: yup
      .string()
      .matches(/^[0-9]{10}$/, t('Phone number is invalid'))
      .required(t('Phone number is required')),
    Location: yup.string().required(t('Address is required'))
  });

  // -----------   initialValues
  const initialValues = {
    Title: '',
    Contact: '',
    Location: ''
  };

  const handleInput = (event) => {
    const input = event.target;
    const maxLength = 12;
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const startTime = Date.now();
      try {
        let response = await postApi(urls?.PoliceStation?.addPoliceStation, values);
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
        toast.success(t(Messages.PoliceStation.PoliceStation_add_sussess));
        fetchPoliceStationData();
      } catch (error) {
        setIsLoading(false); 
        toast.error(t(Messages.PoliceStation.PoliceStation_add_Failed));
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
            {t('Add Police Station')} 
          </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
        {isLoading && (<Loader isVisible={isLoading}></Loader>          
          )}
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
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
                    placeholder={t('Enter Police Station Name')} 
                    inputProps={{ maxLength: 50 }}
                    fullWidth
                    value={formik.values.Title}
                    onChange={formik.handleChange}
                    error={formik.touched.Title && Boolean(formik.errors.Title)}
                    helperText={formik.touched.Title && formik.errors.Title}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>{t('Contact')}</FormLabel> 
                  </Box>
                  <TextField
                    id="Contact"
                    name="Contact"
                    type="Number"
                    size="small"
                    placeholder={t('Enter Contact No')} 
                    inputProps={{ maxLength: 12 }}
                    onInput={handleInput}
                    fullWidth
                    value={formik.values.Contact}
                    onChange={formik.handleChange}
                    error={formik.touched.Contact && Boolean(formik.errors.Contact)}
                    helperText={formik.touched.Contact && formik.errors.Contact}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>{t('Location')}</FormLabel> 
                  </Box>
                  <TextField
                    id="Location"
                    name="Location"
                    type="text"
                    size="small"
                    placeholder={t('Enter Location')} 
                    inputProps={{ maxLength: 100 }}
                    fullWidth
                    value={formik.values.Location}
                    onChange={formik.handleChange}
                    error={formik.touched.Location && Boolean(formik.errors.Location)}
                    helperText={formik.touched.Location && formik.errors.Location}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions sx={{ padding: '15px 24px' }}>
          <Button sx={{ borderRadius: '15px' }} onClick={formik.handleSubmit} variant="contained" color="primary" type="submit" disabled={isLoading}>
            {t('Create')} 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddPoliceStation;
