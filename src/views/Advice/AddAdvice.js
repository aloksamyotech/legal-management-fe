import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormHelperText, FormLabel, Grid, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Box, fontSize } from '@mui/system';
import { getApi, postApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { Messages } from 'core/comman/comman';

import { useTranslation } from 'react-i18next';

const AddAdvice = (props) => {
  const { open, handleClose, fetchAdviceData } = props;
  const { t } = useTranslation();
  const [clients, setClients] = React.useState([]);
  const [advocates, setAdvocates] = React.useState([]);
  const [matters, setMatters] = React.useState([]);

  React.useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [clientResponse, advocateResponse, matterResponse] = await Promise.all([
          getApi(urls.client.getallclient),
          getApi(urls.Advocate.getalladvocate),
          getApi(urls.Matter.getallmatter),
        ]);

        setClients(clientResponse.data);
        setAdvocates(advocateResponse.data);
        setMatters(matterResponse.data);
      } catch (error) {
        console.log(t(Messages.dropdownload_failed));
      }
    };

    fetchDropdownData();
  }, []);

  const validationSchema = yup.object({
    Client: yup.string().required(t('Client is required')),
    Advocate: yup.string().required(t('Advocate Name is required')),
    Matter: yup.string().required(t('Matter Name is required')),

    Fee: yup.number().required(t('Fee Amount is required')),
    description: yup.string().required(t('Description is required')),
    internalNote: yup.string().required(t('Internal Note is required')),
  });

  const initialValues = {
    Client: '',
    Advocate: '',
  
    Matter: '',
    Fee: '',
    Status: '',
    description: '',
    internalNote: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await postApi(urls?.Advice?.addadvice, values);
        formik.resetForm();
        handleClose();
        toast.success(t(Messages.Advice.Advice_add_success));
        fetchAdviceData();
      } catch (error) {
        console.error(t(Messages.Advice.Advice_add_Failed));
      }
    },
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3">{t('Create Advice')}</Typography>
          <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText>
              <Grid container rowSpacing={2} columnSpacing={4}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel>{t('Client')}</FormLabel>
                    </Box>
                    <Autocomplete
                      id="Client"
                      options={clients}
                      getOptionLabel={(option) => `${option.Name} (${option.Email})`}
                      onChange={(event, value) => {
                        formik.setFieldValue('Client', value ? value._id : '');
                      }}
                      renderOption={(props, option) => (
                        <Box
                          fontSize={"12px"}
                          height={"32px"}
                          padding={1}
                          component="li" {...props} display="flex" justifyContent="space-between" alignItems="center">
                          <span>{option.Name}</span>
                          <Box
                          height="auto"
                          ml={1}
                          px={1}
                          py={0.5}
                          bgcolor="rgba(94, 220, 111, 0.89)"
                          borderRadius={1}
                          fontSize="inherit"
                          textAlign="center"
                          whiteSpace="nowrap"
                          overflow="inherit"
                          textOverflow="ellipsis"
                          >
                            {option.Email}
                          </Box>
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={t('Select a client')}
                          size="small"
                          error={formik.touched.Client && Boolean(formik.errors.Client)}
                          helperText={formik.touched.Client && formik.errors.Client}
                        />
                      )}
                    />

                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel>{t('Advocate')}</FormLabel>
                    </Box>
                    <Autocomplete
                      id="Advocate"
                      options={advocates}
                      getOptionLabel={(option) =>
                        `${option.name}${option.Specialization ? ` (${option.Specialization})` : ''}`
                      }
                      onChange={(event, value) => {
                        formik.setFieldValue('Advocate', value ? value._id : '');
                      }}
                      renderOption={(props, option) => (
                        <Box
                          fontSize={{ xs: '10px', sm: '12px' }}
                       
                          component="li"
                          {...props}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          padding={{ xs: '4px', sm: '8px' }}
                        >
                          <Box flex={1} textAlign="left">
                            {option.name}
                          </Box>
                         
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={t('Select a advocate')}
                          size="small"
                          error={formik.touched.Advocate && Boolean(formik.errors.Advocate)}
                          helperText={formik.touched.Advocate && formik.errors.Advocate}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel>{t('Matter')}</FormLabel>
                    </Box>
                    <Autocomplete
                      id="Matter"
                      options={matters}
                      getOptionLabel={(option) => option.Title || ''}
                      onChange={(event, value) => {
                        formik.setFieldValue('Matter', value ? value._id : '');
                      }}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          {...props}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          fontSize={{ xs: '10px', sm: '12px' }}
                          padding={{ xs: '4px', sm: '8px' }}
                          height={{ xs: '40px', sm: '32px' }}
                        >
                          <span>{option.Title}</span>
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder={t('Select a matter')}
                          error={formik.touched.Matter && Boolean(formik.errors.Matter)}
                          helperText={formik.touched.Matter && formik.errors.Matter}
                        />
                      )}
                    />

                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mb={1}>
                    <FormLabel>{t('Fee($)')}</FormLabel>
                  </Box>
                  <TextField
                    name="Fee"
                    type="number"
                    size="small"
                    placeholder={t('Enter Fee')}
                    fullWidth
                    value={formik.values.Fee}
                    onChange={formik.handleChange}
                    error={formik.touched.Fee && Boolean(formik.errors.Fee)}
                    helperText={formik.touched.Fee && formik.errors.Fee}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel>{t('Status')}</FormLabel>
                    </Box>
                    <Autocomplete
                      id="Status"
                      options={[
                        { label: t('Draft'), value: 'Draft' },
                        { label: t('Approved'), value: 'Approved' },
                        { label: t('On-Hold'), value: 'On-hold' },
                        { label: t('Closed'), value: 'Closed' },
                        { label: t('Cancelled'), value: 'Cancelled' },
                      ]}
                      getOptionLabel={(option) => option.label}
                      onChange={(event, value) => {
                        formik.setFieldValue('Status', value ? value.value : '');
                      }}
                      renderInput={(params) => (
                        <TextField
                        placeholder={t('Select a status')}
                          {...params}
                          size="small"
                          error={formik.touched.Status && Boolean(formik.errors.Status)}
                          helperText={formik.touched.Status && formik.errors.Status}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Box mb={1}>
                    <FormLabel>{t('Description')}</FormLabel>
                  </Box>
                  <TextField
                    name="description"
                    size="small"
                    multiline
                    rows={2}
                    fullWidth
                    placeholder={t('Enter description')}
                    inputProps={{ maxLength: 200 }}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Box mb={1}>
                    <FormLabel>{t('Internal Note')}</FormLabel>
                  </Box>
                  <TextField
                    name="internalNote"
                    size="small"
                    inputProps={{ maxLength: 200 }}
                    multiline
                    rows={2}
                    placeholder={t('Enter internal note')}
                    fullWidth
                    value={formik.values.internalNote}
                    onChange={formik.handleChange}
                    error={formik.touched.internalNote && Boolean(formik.errors.internalNote)}
                    helperText={formik.touched.internalNote && formik.errors.internalNote}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" color="primary">
            {t('Create')}
          </Button>
        </DialogActions>
      </Dialog >
    </div >
  );
};

export default AddAdvice;
