import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  FormLabel,
  Grid,
  TextField,
  Chip,
  Box,
  Typography,
  Autocomplete
} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import Palette from '../../ui-component/ThemePalette';
import axios from 'axios';
import { getApi, postApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { useTranslation } from 'react-i18next';
import { Messages } from 'core/comman/comman';
import Loader from 'core/comman/loader';

const AddExpense = (props) => {
  const { open, handleClose, fetchExpenseData } = props;
  const { t } = useTranslation();
  const [attachments, setAttachments] = useState([]);
  const [types, setTypes] = useState([]);
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Validation Schema
  const validationSchema = yup.object({
    Title: yup.string().required(t('Title is required')),
    Case: yup.string().required(t('Case is required')),
    Type: yup.string().required(t('Type is required')),
    Amount: yup.number().required(t('Amount is required')),
    description: yup.string().required(t('Description is required'))
  });

  // Initial Values
  const initialValues = {
    Title: '',
    Case: '',
    Type: '',
    Amount: '',
    description: ''
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('Title', values.Title);
      formData.append('Case', values.Case);
      formData.append('Type', values.Type);
      formData.append('Amount', values.Amount);
      formData.append('Description', values.description);

      attachments.forEach((file) => {
        formData.append('Attachment', file);
      });
      setIsLoading(true);
      const startTime = Date.now();
      try {
        const response = await postApi(urls.Expense.addexpenses, formData, { 'Content-Type': 'multipart/form-data' });

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
        toast.success(t(Messages?.Expense?.Add_Success));
        formik.resetForm();
        setAttachments([]);
        fetchExpenseData();
      } catch (error) {
        setIsLoading(false);
        console.error('Error adding expense:', error);
        toast.error(t(Messages?.Expense?.Add_Failed));
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

  const typeDropdownData = async () => {
    try {
      const TypeResponse = await getApi(urls.ExpenseType.getallExpenseType);
      setTypes(TypeResponse.data);
    } catch (error) {
      toast.error(t('Failed to load dropdown data'));
    }
  };

  useEffect(() => {
    typeDropdownData();
  }, []);

  const caseDropdownData = async () => {
    try {
      const caseResponse = await getApi(urls.Case.getallcase);
      setCases(caseResponse.data);
    } catch (error) {
      toast.error(t('Failed to load dropdown data'));
    }
  };

  useEffect(() => {
    caseDropdownData();
  }, []);

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
            {t('Create New Expense')}
          </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {isLoading && <Loader isVisible={isLoading}></Loader>}
          <form onSubmit={formik.handleSubmit}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel style={{ color: 'black' }}>{t('Case')}</FormLabel>
                    </Box>
                    <Autocomplete
                      id="Case"
                      options={cases}
                      getOptionLabel={(option) => `${option.Title}`}
                      onChange={(event, value) => {
                        formik.setFieldValue('Case', value ? value._id : '');
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
                          placeholder={'Select a Case'}
                          size="small"
                          error={formik.touched.Case && Boolean(formik.errors.Case)}
                          helperText={formik.touched.Case && formik.errors.Case}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel style={{ color: 'black' }}>{t('Type')}</FormLabel>
                    </Box>
                    <Select
                      id="Type"
                      name="Type"
                      size="small"
                      fullWidth
                      value={formik.values.Type}
                      onChange={formik.handleChange}
                      error={formik.touched.Type && Boolean(formik.errors.Type)}
                    >
                      {types.map((type) => (
                        <MenuItem key={type._id} value={type._id}>
                          {type.Title}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.Type && formik.errors.Type}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>{t('Title')}</FormLabel>
                  </Box>
                  <TextField
                    id="Title"
                    name="Title"
                    size="small"
                    fullWidth
                    inputProps={{ maxLength: 30 }}
                    placeholder={t('Title')}
                    value={formik.values.Title}
                    onChange={formik.handleChange}
                    error={formik.touched.Title && Boolean(formik.errors.Title)}
                    helperText={formik.touched.Title && formik.errors.Title}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>{t('Amount')}</FormLabel>
                  </Box>
                  <TextField
                    id="Amount"
                    name="Amount"
                    type="number"
                    size="small"
                    fullWidth
                    placeholder={t('Amount')}
                    value={formik.values.Amount}
                    onChange={formik.handleChange}
                    error={formik.touched.Amount && Boolean(formik.errors.Amount)}
                    helperText={formik.touched.Amount && formik.errors.Amount}
                  />
                </Grid>

                <Grid item xs={12}>
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
                        deleteIcon={<CloseIcon />}
                      />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>{t('Description')}</FormLabel>
                  </Box>
                  <TextField
                    id="description"
                    name="description"
                    size="small"
                    fullWidth
                    multiline
                    inputProps={{ maxLength: 100 }}
                    rows={2}
                    placeholder={t('Enter Description')}
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
          <Button
            sx={{ borderRadius: '15px' }}
            onClick={formik.handleSubmit}
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
          >
            {t('Create')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddExpense;
