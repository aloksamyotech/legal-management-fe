import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { FormControl, FormHelperText, MenuItem, Select, FormLabel, Grid, TextField } from '@mui/material';
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
import axios from 'axios';
import { getApi, postApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { Messages } from 'core/comman/comman';

const AddAdvice = (props) => {
  const { open, handleClose, fetchAdviceData } = props;

  const [clients, setClients] = React.useState([]);
  const [advocates, setAdvocates] = React.useState([]);
  const [matters, setMatters] = React.useState([]);

  React.useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [clientResponse, advocateResponse, matterResponse] = await Promise.all([
          getApi(urls.client.getallclient),
          getApi(urls.Advocate.getalladvocate),
          getApi(urls.Matter.getallmatter)
        ]);

        setClients(clientResponse.data);
        setAdvocates(advocateResponse.data);
        setMatters(matterResponse.data);
      } catch (error) {
        toast.error(Messages.dropdownload_failed);
      }
    };

    fetchDropdownData();
  }, []);

  const validationSchema = yup.object({
    Client: yup.string().required('Client is required'),
    Advocate: yup.string().required('Advocate Name is required'),
    Matter: yup.string().required('Matter Name is required'),
    Date: yup.date().required('Date is required'),
    Fee: yup.number().required('Fee Amount is required'),
    description: yup.string().required('Description is required'),
    internalNote: yup.string().required('Internal Note is required')
  });

  // Initial values
  const initialValues = {
    Client: '',
    Advocate: '',
    Date: '',
    Matter: '',
    Fee: '',
    Status: '',
    description: '',
    internalNote: ''
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await postApi(urls?.Advice?.addadvice, values);
        formik.resetForm();
        handleClose();
        toast.success(Messages.Advice.Advice_add_success);
        fetchAdviceData();
      } catch (error) {
        toast.error(Messages.Advice.Advice_add_Failed);
      }
    }
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3">Create Advice</Typography>
          <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText>
              <Grid container rowSpacing={2} columnSpacing={4}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel>Client</FormLabel>
                    </Box>
                    <Select
                      id="Client"
                      name="Client"
                      size="small"
                      value={formik.values.Client}
                      onChange={formik.handleChange}
                      error={formik.touched.Client && Boolean(formik.errors.Client)}
                    >
                      {clients.map((client) => (
                        <MenuItem key={client._id} value={client._id}>
                          {client.Name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{formik.touched.Client && formik.errors.Client}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel>Advocate</FormLabel>
                    </Box>
                    <Select
                      id="Advocate"
                      name="Advocate"
                      size="small"
                      value={formik.values.Advocate}
                      onChange={formik.handleChange}
                      error={formik.touched.Advocate && Boolean(formik.errors.Advocate)}
                    >
                      {advocates.map((advocate) => (
                        <MenuItem key={advocate._id} value={advocate._id}>
                          {advocate.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{formik.touched.Advocate && formik.errors.Advocate}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel>Matter</FormLabel>
                    </Box>
                    <Select
                      id="Matter"
                      name="Matter"
                      size="small"
                      value={formik.values.Matter}
                      onChange={formik.handleChange}
                      error={formik.touched.Matter && Boolean(formik.errors.Matter)}
                    >
                      {matters.map((matter) => (
                        <MenuItem key={matter._id} value={matter._id}>
                          {matter.Title}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>{formik.touched.Matter && formik.errors.Matter}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box mb={1}>
                    <FormLabel>Date</FormLabel>
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
                <Grid item xs={12} sm={6}>
                  <Box mb={1}>
                    <FormLabel>Fee</FormLabel>
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
                      <FormLabel>Status</FormLabel>
                    </Box>
                    <Select
                      id="Status"
                      name="Status"
                      size="small"
                      value={formik.values.Status}
                      onChange={formik.handleChange}
                      error={formik.touched.Status && Boolean(formik.errors.Status)}
                    >
                      <MenuItem value="Draft">Draft</MenuItem>
                      <MenuItem value="Approved">Approved</MenuItem>
                      <MenuItem value="On-hold">On-Hold</MenuItem>
                      <MenuItem value="Closed">Closed</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                    <FormHelperText>{formik.touched.Status && formik.errors.Status}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mb={1}>
                    <FormLabel>Description</FormLabel>
                  </Box>
                  <TextField
                    name="description"
                    size="small"
                    multiline
                    rows={2}
                    fullWidth
                    inputProps={{ maxLength: 200 }}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mb={1}>
                    <FormLabel>Internal Note</FormLabel>
                  </Box>
                  <TextField
                    name="internalNote"
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
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddAdvice;
