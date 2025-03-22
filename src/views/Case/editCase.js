/* eslint-disable react/prop-types */
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
import Palette from '../../ui-component/ThemePalette';
import { Box } from '@mui/system';
import { getApi, postApi, updateApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { Messages } from 'core/comman/comman';
import { enums } from 'core/Statuscode/constant';
import { useState } from 'react';
import Loader from 'core/comman/loader';
import { useTranslation } from 'react-i18next';

const EditCase = (props) => {
  const { open, handleClose, fetchCaseData, rowData } = props;
  const { t } = useTranslation();
  const [clients, setClients] = React.useState([]);
  const [advocates, setAdvocates] = React.useState([]);
  const [courts, setCourts] = React.useState([]);
  const [matters, setMatters] = React.useState([]);
  const [policestations, setPolicestations] = React.useState([]);
  const [judges, setJudges] = React.useState([]);
  const [isLoading, setIsLoading] = useState(false);
  React.useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [clientResponse, advocateResponse, courtResponse, policestationResponse, matterResponse, judgeResopnse] = await Promise.all([
          getApi(urls.client.getallclient),
          getApi(urls.Advocate.getalladvocate),
          getApi(urls.Court.gettallcourt),
          getApi(urls.PoliceStation.getAllPoliceStation),
          getApi(urls.Matter.getallmatter),
          getApi(urls.Judge.gettalljudge)
        ]);

        setClients(clientResponse.data);
        setAdvocates(advocateResponse.data);
        setJudges(judgeResopnse.data);
        setCourts(courtResponse.data);
        setPolicestations(policestationResponse.data);
        setMatters(matterResponse.data);
      } catch (error) {
        console.error(t('Failed to load dropdown data'));
      }
    };

    fetchDropdownData();
  }, []);

  // -----------  validationSchema
  const validationSchema = yup.object({
    Title: yup.string().required(t('Title is required')),
    Advocate: yup.string().required(t('Advocate Name is required')),
    Client: yup.string().required(t('Client is required')),
    Judge: yup.string().required(t('Judge is required')),
    Fir: yup.string().required(t('FIR is required')),
    Matter: yup.string().required(t('Matter is required')),
    Date: yup.date().required(t('Date is required')),
    PoliceStation: yup.string().required(t('Please Select Police Station')),
    Court: yup.string().required(t('Please Select Court')),
    description: yup.string().required(t('Description is required')),
    internalNote: yup.string().required(t('Note is required'))
  });
  const formatDate = (dateString) => {
    if (!dateString) return '';

    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  const initialValues = {
    Title: rowData?.Title || '',
    Date: rowData?.Date ? new Date(formatDate(rowData.Date)).toISOString().split('T')[0] : '',
    Client: rowData?.Client?._id || '',
    Advocate: rowData?.Advocate?._id || '',
    Matter: rowData?.Matter?._id || '',
    Judge: rowData?.Judge?._id || '',
    PoliceStation: rowData?.PoliceStation?._id || '',
    Court: rowData?.Court?._id || '',
    CaseStatus: rowData?.CaseStatus || '',
    Fir: rowData?.Fir || '',
    description: rowData?.description || '',
    internalNote: rowData?.internalNote || ''
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsLoading(true);
      const startTime = Date.now();
      try {
        const response = await updateApi(urls?.Case?.updatecases.replace(':id', rowData?._id), values);
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
        handleClose();
        toast.success(Messages?.Case?.Case_update_success);
        fetchCaseData();
      } catch (error) {
        setIsLoading(false);
        toast.error(Messages?.Case?.Case_update_Failed);
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
            {t('Edit case details')}
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
                    type="text"
                    size="small"
                    inputProps={{ maxLength: 25 }}
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
                    <FormLabel style={{ color: 'black' }}>{t('Date')}</FormLabel>
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
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>{t('Case Status')}</FormLabel>
                  </Box>
                  <TextField
                    select
                    name="CaseStatus"
                    size="small"
                    fullWidth
                    value={formik.values.CaseStatus}
                    onChange={formik.handleChange}
                    error={formik.touched.CaseStatus && Boolean(formik.errors.CaseStatus)}
                    helperText={formik.touched.CaseStatus && formik.errors.CaseStatus}
                  >
                    <MenuItem key="open" value={enums?.Open}>
                      {t('Open')}
                    </MenuItem>
                    <MenuItem key="closed" value={enums?.Closed}>
                      {t('Closed')}
                    </MenuItem>
                    <MenuItem key="pending" value={enums?.Pending}>
                      {t('Pending')}
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel>{t('Client')}</FormLabel>
                    </Box>
                    <Autocomplete
                      id="Client"
                      options={clients}
                      value={clients.find((client) => client._id === formik.values.Client) || null}
                      getOptionLabel={(option) => `${option.Name} (${option.Email})`}
                      isOptionEqualToValue={(option, value) => option._id === value._id}
                      onChange={(event, value) => {
                        formik.setFieldValue('Client', value ? value._id : '');
                      }}
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
                      value={advocates.find((advocate) => advocate._id === formik.values.Advocate) || null}
                      getOptionLabel={(option) => `${option.name}`}
                      isOptionEqualToValue={(option, value) => option._id === value._id}
                      onChange={(event, value) => {
                        formik.setFieldValue('Advocate', value ? value._id : '');
                      }}
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
                      value={matters.find((matter) => matter._id === formik.values.Matter) || null}
                      getOptionLabel={(option) => `${option.Title}`}
                      isOptionEqualToValue={(option, value) => option._id === value._id}
                      onChange={(event, value) => {
                        formik.setFieldValue('Matter', value ? value._id : '');
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={t('Select a matter')}
                          size="small"
                          error={formik.touched.Matter && Boolean(formik.errors.Matter)}
                          helperText={formik.touched.Matter && formik.errors.Matter}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel style={{ color: 'black' }}>{t('Judge')}</FormLabel>
                    </Box>
                    <Autocomplete
                      id="Judge"
                      options={judges}
                      value={judges.find((judge) => judge._id === formik.values.Judge) || null}
                      getOptionLabel={(option) => `${option.Title}`}
                      isOptionEqualToValue={(option, value) => option._id === value._id}
                      onChange={(event, value) => {
                        formik.setFieldValue('Judge', value ? value._id : '');
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={t('Select a judge')}
                          size="small"
                          error={formik.touched.Judge && Boolean(formik.errors.Judge)}
                          helperText={formik.touched.Judge && formik.errors.Judge}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel style={{ color: 'black' }}>{t('Court')}</FormLabel>
                    </Box>
                    <Autocomplete
                      id="Court"
                      options={courts}
                      value={courts.find((court) => court._id === formik.values.Court) || null}
                      getOptionLabel={(option) => `${option.Title}`}
                      isOptionEqualToValue={(option, value) => option._id === value._id}
                      onChange={(event, value) => {
                        formik.setFieldValue('Court', value ? value._id : '');
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={t('Select a court')}
                          size="small"
                          error={formik.touched.Court && Boolean(formik.errors.Court)}
                          helperText={formik.touched.Court && formik.errors.Court}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel style={{ color: 'black' }}>{t('Police Station')}</FormLabel>
                    </Box>
                    <Autocomplete
                      id="PoliceStation"
                      options={policestations}
                      value={policestations.find((policestation) => policestation._id === formik.values.PoliceStation) || null}
                      getOptionLabel={(option) => `${option.Title}`}
                      isOptionEqualToValue={(option, value) => option._id === value._id}
                      onChange={(event, value) => {
                        formik.setFieldValue('PoliceStation', value ? value._id : '');
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={t('Select a police station')}
                          size="small"
                          error={formik.touched.PoliceStation && Boolean(formik.errors.PoliceStation)}
                          helperText={formik.touched.PoliceStation && formik.errors.PoliceStation}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>{t('FIR')}</FormLabel>
                  </Box>
                  <TextField
                    id="Fir"
                    name="Fir"
                    type="text"
                    size="small"
                    inputProps={{ maxLength: 200 }}
                    placeholder={t('Fir')}
                    fullWidth
                    value={formik.values.Fir}
                    onChange={formik.handleChange}
                    error={formik.touched.Fir && Boolean(formik.errors.Fir)}
                    helperText={formik.touched.Fir && formik.errors.Fir}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>{t('Description')}</FormLabel>
                  </Box>
                  <TextField
                    id="description"
                    name="description"
                    inputProps={{ maxLength: 200 }}
                    placeholder={t('Enter Description')}
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
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>{t('Internal Note')}</FormLabel>
                  </Box>
                  <TextField
                    id="internalNote"
                    name="internalNote"
                    placeholder={t('Enter Internal Note')}
                    size="small"
                    inputProps={{ maxLength: 200 }}
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

export default EditCase;
