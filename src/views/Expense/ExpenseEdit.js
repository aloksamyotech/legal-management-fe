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
import { getApi, postApi, updateApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';

const EditExpense = (props) => {
  const { open, handleClose,id, fetchExpenseData, data } = props;
  const [attachments, setAttachments] = useState([]);
  const [types, setTypes] = useState([]);  
const [cases, setCases] = useState([]);
  const validationSchema = yup.object({
    Title: yup.string().required('Title is required'),
    Case: yup.string().required('Case is required'),
    Type: yup.string().required('Type is required'),
    Amount: yup.number().required('Amount is required'),
    description: yup.string().required('Description is required'),
  });

  // Formik
  const formik = useFormik({
    enableReinitialize: true, 
    initialValues: {
      Title: data?.Title || '',
      Case: data?.CaseId || '',
      Type: data?.TypeId||'' ,
      Amount: data?.Amount || '',
      description: data?.description || '',
    },
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

      try {
        const response = await updateApi(urls.Expense.updateexpense.replace(':id',id), formData, {
          'Content-Type': 'multipart/form-data',
        });

        if (response?.data) {
          toast.success('Expense updated successfully');
          formik.resetForm();
          setAttachments([]);
          handleClose();
          fetchExpenseData();
        }
      } catch (error) {
        console.error('Error updating expense:', error);
        toast.error('Failed to update expense');
      }
    },
  });


  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setAttachments((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleFileRemove = (fileName) => {
    setAttachments((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
  };

  
  const typeDropdownData = async () => {
    try {
      const TypeResponse = await getApi(urls.ExpenseType.getallExpenseType);
      setTypes(TypeResponse.data);
    } catch (error) {
      toast.error('Failed to load dropdown data');
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
      toast.error('Failed to load dropdown data');
    }
  };

  useEffect(() => {
    caseDropdownData();
  }, []);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle
        id="scroll-dialog-title"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography style={{ fontWeight: 'normal' }} variant="h3">
          Edit Expense
        </Typography>
        <Typography>
          <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
            <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel style={{ color: 'black' }}>Case</FormLabel>
                    </Box>
                    <Select
                      id="Case"
                      name="Case"
                      size="small"
                      fullWidth
                      value={formik.values.Case}
                      onChange={formik.handleChange}
                      error={formik.touched.Case && Boolean(formik.errors.Case)}
                    >
                     {cases.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.Title}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>
                      {formik.touched.Case && formik.errors.Case}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>Type</FormLabel>
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
                  <FormHelperText style={{ color: Palette.error.main }}>
                    {formik.touched.Type && formik.errors.Type}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box mb={1}>
                  <FormLabel style={{ color: 'black' }}>Title</FormLabel>
                </Box>
                <TextField
                  id="Title"
                  name="Title"
                  size="small"
                  fullWidth
                  placeholder="Title"
                  value={formik.values.Title}
                  onChange={formik.handleChange}
                  error={formik.touched.Title && Boolean(formik.errors.Title)}
                  helperText={formik.touched.Title && formik.errors.Title}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box mb={1}>
                  <FormLabel style={{ color: 'black' }}>Amount</FormLabel>
                </Box>
                <TextField
                  id="Amount"
                  name="Amount"
                  type="number"
                  size="small"
                  fullWidth
                  placeholder="Amount"
                  value={formik.values.Amount}
                  onChange={formik.handleChange}
                  error={formik.touched.Amount && Boolean(formik.errors.Amount)}
                  helperText={formik.touched.Amount && formik.errors.Amount}
                />
              </Grid>

              <Grid item xs={12}>
                <Box mb={1}>
                  <FormLabel style={{ color: 'black' }}>Attachment</FormLabel>
                </Box>
                <Button variant="contained" component="label">
                  Upload Files
                  <input
                    type="file"
                    multiple
                    hidden
                    onChange={handleFileChange}
                  />
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
                    color: 'white',
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
                  <FormLabel style={{ color: 'black' }}>Description</FormLabel>
                </Box>
                <TextField
                  id="description"
                  name="description"
                  size="small"
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="Enter Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
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
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExpense;
