import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormHelperText, MenuItem, Select, FormLabel, Grid, TextField, Autocomplete } from '@mui/material';
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
import { getApi, updateApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useTranslation } from 'react-i18next';
import { Messages } from 'core/comman/comman';

const UpdateAdvicedata = (props) => {
  const { open, handleClose, id, rowData, fetchAdviceData } = props;
  const { t } = useTranslation();
  const [matters, setMatters] = React.useState([]);

  React.useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [matterResponse] = await Promise.all([getApi(urls.Matter.getallmatter)]);
        setMatters(matterResponse.data);
      } catch (error) {
        console.log(t("Failed to load Dropdown"));
      }
    };

    fetchDropdownData();
  }, []);

  const validationSchema = yup.object({
    Matter: yup.string().required(t('Matter Name is required')),
    Date: yup.date().required(t('Date is required')),
    Fee: yup.number().required(t('Fee Amount is required')),
    description: yup.string().required(t('Description is required')),
    internalNote: yup.string().required(t('Internal Note is required')),
  });

  const initialValues = {
    Client: rowData?.ClientId || '',
    Advocate: rowData?.AdvocateId || '',
    Date: rowData?.Date || '',
    Matter: rowData?.MatterId || '',
    Fee: rowData?.Fee || '',
    Status: rowData?.Status || '',
    description: rowData?.description || '',
    internalNote: rowData?.internalNote || '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await updateApi(urls?.Advice?.updateadvice.replace(':id', id), values);
        formik.resetForm();
        handleClose();
        toast.success(t('Advice updated successfully'));
        fetchAdviceData();
      } catch (error) {
        toast.error(t('Failed to update advice'));
      }
    },
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3">{t('Update Advice')}</Typography>
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
                    <TextField id="Client" name="Client" size="small" value={rowData?.Client || t('N/A')} disabled fullWidth />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel>{t('Advocate')}</FormLabel>
                    </Box>
                    <TextField id="Advocate" name="Advocate" size="small" value={rowData?.Advocate || t('N/A')} disabled fullWidth />
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
                      value={matters.find((matter) => matter._id === formik.values.Matter) || null} 
                      getOptionLabel={(option) => option.Title || ''}
                      isOptionEqualToValue={(option, value) => option._id === value._id} 
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
                          error={formik.touched.Matter && Boolean(formik.errors.Matter)}
                          helperText={formik.touched.Matter && formik.errors.Matter}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <Box mb={1}>
                    <FormLabel>{t('Date')}</FormLabel>
                  </Box>
                  <TextField
                    name="Date"
                    type="date"
                    size="small"
                    fullWidth
                    value={formik.values.Date}
                    onChange={formik.handleChange}
                    error={formik.touched.Date && Boolean(formik.errors.Date)}
                    helperText={formik.touched.Date && formik.errors.Date}
                  />
                </Grid> */}
                <Grid item xs={12} sm={6}>
                  <Box mb={1}>
                    <FormLabel>{t('Fee')}</FormLabel>
                  </Box>
                  <TextField
                    name="Fee"
                    type="number"
                    size="small"
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
                    <Select
                      id="Status"
                      name="Status"
                      size="small"
                      value={formik.values.Status}
                      onChange={formik.handleChange}
                      error={formik.touched.Status && Boolean(formik.errors.Status)}
                    >
                      <MenuItem value="Draft">{t('Draft')}</MenuItem>
                      <MenuItem value="Approved">{t('Approved')}</MenuItem>
                      <MenuItem value="On-hold">{t('On-Hold')}</MenuItem>
                      <MenuItem value="Closed">{t('Closed')}</MenuItem>
                      <MenuItem value="Cancelled">{t('Cancelled')}</MenuItem>
                    </Select>
                    <FormHelperText>{formik.touched.Status && formik.errors.Status}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mb={1}>
                    <FormLabel>{t('Description')}</FormLabel>
                  </Box>
                  <TextField
                    name="description"
                    size="small"
                    multiline
                    rows={2}
                    fullWidth
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mb={1}>
                    <FormLabel>{t('Internal Note')}</FormLabel>
                  </Box>
                  <TextField
                    name="internalNote"
                    size="small"
                    multiline
                    rows={2}
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
            {t('Update')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default UpdateAdvicedata;
