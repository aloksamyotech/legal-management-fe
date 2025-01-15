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
import palette from 'ui-component/ThemePalette';
import * as yup from 'yup';
import { Chip, FormControl, FormHelperText, FormLabel, MenuItem, Select } from '@mui/material';
import { toast } from 'react-toastify';
import { getApi, updateApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { Messages } from 'core/comman/comman';
import { useEffect } from 'react';
import { Box } from '@mui/system';
import { GridCloseIcon } from '@mui/x-data-grid';
import { useState } from 'react';
// import { apipost } from '../../service/api';

const EvidenceEdit = (props) => {
  const { open, handleClose, rowData, id, fetchEvidenceData } = props;
  const [hearings, setHearing] = useState([]);
  const [attachments, setAttachments] = useState([]);

  // -----------  validationSchema
  const validationSchema = yup.object({
    // file: yup.string().required('File is required'),
    Title: yup.string().required('File Name is required'),
    Favor: yup.string().required('Favor is required'),
    Description: yup.string().required('Description is required'),
    Hearing: yup.string().required('Hearing is required')
  });

  // -----------   initialValues
  const initialValues = {
    Hearing: rowData.HearingId || '',
    Title: rowData.Title || '',
    Favor: rowData.Favor || '',
    file: rowData.file || '',
    Description: rowData.Description || '',
    Case: rowData.CaseId
  };

  // formik
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

      try {
        const response = await updateApi(urls?.Evidence?.updateevidence.replace(':id', id), formData, {
          'Content-Type': 'multipart/form-data'
        });

        if (response?.data) {
          toast.success(Messages?.Evidence?.updateSuccess);
          formik.resetForm();
          setAttachments([]);
          handleClose();
          fetchEvidenceData();
        }
      } catch (error) {
        console.error('Error adding expense:', error);
        toast.error(Messages?.Evidence?.updateFailed);
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
      const hearingResponse = await getApi(urls.Hearing.getcaseHearing.replace(':caseId', rowData.CaseId));
      setHearing(hearingResponse.data);
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
          <Typography variant="h6">Update Evidence </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form onSubmit={formik.handleSubmit}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Title</FormLabel>
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
                  <FormLabel style={{ color: 'black' }}>Hearing</FormLabel>

                  <Select
                    id="Hearing"
                    name="Hearing"
                    size="small"
                    fullWidth
                    value={formik.values.Hearing}
                    onChange={formik.handleChange}
                    error={formik.touched.Hearing && Boolean(formik.errors.Hearing)}
                  >
                    {hearings.map((hearing) => (
                      <MenuItem key={hearing._id} value={hearing._id}>
                        {hearing.Title}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText style={{ color: palette.error.main }}>{formik.touched.Hearing && formik.errors.Hearing}</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Favor</FormLabel>
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
                  <FormLabel style={{ color: 'black' }}>Attachment</FormLabel>
                </Box>
                <Button variant="contained" component="label">
                  Upload Files
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
                <FormLabel>Description</FormLabel>
                <TextField
                  id="Description"
                  inputProps={{ maxLength: 200 }}
                  name=""
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

export default EvidenceEdit;
