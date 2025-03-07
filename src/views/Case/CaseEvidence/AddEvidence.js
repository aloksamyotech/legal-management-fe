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
import { Autocomplete, Chip, FormControl, FormHelperText, FormLabel, MenuItem, Select } from '@mui/material';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { urls } from 'core/Constant/Urls';
import { getApi, postApi } from 'core/APIs/ApiDocuments';
import palette from 'ui-component/ThemePalette';
import { Box } from '@mui/system';
import { GridCloseIcon } from '@mui/x-data-grid';
import { useState } from 'react';
import { Messages } from 'core/comman/comman';
import Loader from 'core/comman/loader';
import { useTranslation } from 'react-i18next';

const EvidenceForm = (props) => {
  const { t } = useTranslation();
  const { open, handleClose, caseData, id, fetchEvidenceData } = props;
  const [hearings, setHearing] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const validationSchema = yup.object({
    Title: yup.string().required(t('File Name is required')),
    Favor: yup.string().required(t('Favor is required')),
    Description: yup.string().required(t('Description is required')),
    Hearing: yup.string().required(t('Hearing is required'))
  });

  const initialValues = {
    Hearing: '',
    Title: '',
    Favor: '',
    file: '',
    Description: '',
    Case: caseData._id
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('Title', values.Title);
      formData.append('Case', values.Case);
      formData.append('Hearing', values.Hearing);
      formData.append('Favor', values.Favor);
      formData.append('Description', values.Description);

      attachments.forEach((file) => {
        formData.append('Attachment', file);
      });
      setIsLoading(true);
      const startTime = Date.now();
      try {
        const response = await postApi(urls?.Evidence?.addevidence, formData, { 'Content-Type': 'multipart/form-data' });

        if (response?.data) {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, 500 - elapsedTime);
          setTimeout(() => {
            setIsLoading(false);
            handleClose();
          }, remainingTime);
        } else {
          setIsLoading(false);
        }
        toast.success(Messages?.Evidence?.addSuccess);
        formik.resetForm();
        setAttachments([]);
        fetchEvidenceData();
      } catch (error) {
        setIsLoading(false);
        console.error('Error adding expense:', error);
        toast.error(Messages?.Evidence?.addFailed);
      }
    }
  });
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setAttachments((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleFileRemove = (fileName) => {
    setAttachments((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };
  const hearingDropdownData = async () => {
    try {
      const hearingResponse = await getApi(urls.Hearing.getcaseHearing.replace(':caseId', id));
      if (hearingResponse.data.status === 404) {
        setHearing([]);
        return;
      }
      setHearing(hearingResponse?.data);
    } catch (error) {
      console.log('Failed to load dropdown data', error);
    }
  };

  useEffect(() => {
    hearingDropdownData();
  }, [open]);
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
          <Typography variant="h6">{t('Add Evidence')}</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          {isLoading && <Loader isVisible={isLoading}></Loader>}
          <form onSubmit={formik.handleSubmit}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel style={{ color: 'black' }}>{t('Title')}</FormLabel>
                <TextField
                  id="Title"
                  name="Title"
                  size="small"
                  inputProps={{ maxLength: 50 }}
                  fullWidth
                  value={formik.values.Title}
                  onChange={formik.handleChange}
                  error={formik.touched.Title && Boolean(formik.errors.Title)}
                  helperText={formik.touched.Title && formik.errors.Title}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel style={{ color: 'black' }}>{t('Hearing')}</FormLabel>
                  <Autocomplete
                    id="Hearing"
                    options={hearings}
                    getOptionLabel={(option) => `${option.Title}`}
                    onChange={(event, value) => {
                      formik.setFieldValue('Hearing', value ? value._id : '');
                    }}
                    renderOption={(props, option) => (
                      <Box
                        fontSize={'12px'}
                        height={'32px'}
                        padding={0}
                        component="li"
                        {...props}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ background: '#f3f3f3', borderRadius: '5px', mt: '1px' }}
                      >
                        <span>{option.Title}</span>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={'Select a Hearing'}
                        size="small"
                        error={formik.touched.Hearing && Boolean(formik.errors.Hearing)}
                        helperText={formik.touched.Hearing && formik.errors.Hearing}
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel style={{ color: 'black' }}>{t('Favor')}</FormLabel>
                <TextField
                  id="Favor"
                  name="Favor"
                  size="small"
                  inputProps={{ maxLength: 50 }}
                  fullWidth
                  value={formik.values.Favor}
                  onChange={formik.handleChange}
                  error={formik.touched.Favor && Boolean(formik.errors.Favor)}
                  helperText={formik.touched.Favor && formik.errors.Favor}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box mb={1}>
                  <FormLabel style={{ color: 'black' }}>{t('Attachment')}</FormLabel>
                </Box>
                <Button variant="contained" component="label">
                  {t('Upload Files')}
                  <input type="file" multiple hidden onChange={handleFileChange} />
                </Button>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    flexWrap: 'wrap',
                    maxHeight: '100px',
                    overflowY: 'auto',
                    marginTop: 1,
                    color: 'white'
                  }}
                >
                  {attachments.map((file, index) => (
                    <Chip
                      key={index}
                      sx={{ background: 'green', color: 'white' }}
                      label={file.name}
                      onDelete={() => handleFileRemove(file.name)}
                      deleteIcon={<GridCloseIcon />}
                    />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <FormLabel style={{ color: 'black' }}>{t('Description')}</FormLabel>
                <TextField
                  id="Description"
                  inputProps={{ maxLength: 200 }}
                  name="Description"
                  size="small"
                  rowSpacing={2}
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
            disabled={isLoading}
          >
            {t('Save')}
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
            {t('Cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EvidenceForm;
