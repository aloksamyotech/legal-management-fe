/* eslint-disable react/prop-types */
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
import Palette from '../../ui-component/ThemePalette';
import { Box } from '@mui/system';
import { getApi, postApi, updateApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import { Messages } from 'core/comman/comman';

const EditCase = (props) => {
  const { open, handleClose, fetchCaseData, rowData } = props;

  const [clients, setClients] = React.useState([]);
  const [advocates, setAdvocates] = React.useState([]);
  const [courts, setCourts] = React.useState([]);
  const [matters, setMatters] = React.useState([]);
  const [policestations, setPolicestations] = React.useState([]);
  const [judges, setJudges] = React.useState([]);

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
        toast.error('Failed to load dropdown data');
      }
    };

    fetchDropdownData();
  }, []);

  // -----------  validationSchema
  const validationSchema = yup.object({
    Title: yup.string().required('Title is required'),
    Advocate: yup.string().required('Advocate Name is required'),
    Client: yup.string().required('Client is required'),
    Judge: yup.string().required('Judge is required'),
    Fir: yup.string().required('FIR is required'),
    Matter: yup.string().required('Matter is required'),
    Date: yup.date().required('Date is required'),
    PoliceStation: yup.string().required('Please Select Police Station'),
    Court: yup.string().required('Please Select Court'),
    description: yup.string().required('Description  is required'),
    internalNote: yup.string().required('Note is required')
  });

  // -----------   initialValues

  const initialValues = {
    Title: rowData?.Title || '',
    Date: rowData?.Date || '',
    Client: rowData?.Client?._id || '',
    Advocate: rowData?.Advocate?._id || '',
    Matter: rowData?.Matter?._id || '',
    Judge: rowData?.Judge?._id || '',
    PoliceStation: rowData?.PoliceStation?._id || '',
    Court: rowData?.Court?._id || '',
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
      try {
        await updateApi(urls?.Case?.updatecases.replace(':id', rowData?._id), values);
        formik.resetForm();
        handleClose();
        toast.success(Messages?.Case?.Case_update_success);
        fetchCaseData();
      } catch (error) {
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
            Create New Case
          </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>Title</FormLabel>
                  </Box>
                  <TextField
                    id="Title"
                    name="Title"
                    type=""
                    size="small"
                    inputProps={{ maxLength: 25 }}
                    placeholder="Title"
                    fullWidth
                    value={formik.values.Title}
                    onChange={formik.handleChange}
                    error={formik.touched.Title && Boolean(formik.errors.Title)}
                    helperText={formik.touched.Title && formik.errors.Title}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>Date</FormLabel>
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
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel style={{ color: 'black' }}>Client</FormLabel>
                    </Box>
                    <Select
                      labelId="demo-simple-select-label"
                      id="Client"
                      name="Client"
                      size="small"
                      placeholder="Select Client"
                      fullWidth
                      value={formik.values.Client}
                      onChange={formik.handleChange}
                      error={formik.touched.Client && Boolean(formik.errors.Client)}
                      helperText={formik.touched.Client && formik.errors.Client}
                    >
                      {clients.map((client) => (
                        <MenuItem key={client._id} value={client._id}>
                          {client.Name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.Client && formik.errors.Client}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel style={{ color: 'black' }}>Advocate</FormLabel>
                    </Box>
                    <Select
                      labelId="demo-simple-select-label"
                      id="Advocate"
                      name="Advocate"
                      size="small"
                      fullWidth
                      value={formik.values.Advocate}
                      onChange={formik.handleChange}
                      error={formik.touched.Advocate && Boolean(formik.errors.Advocate)}
                      helperText={formik.touched.Advocate && formik.errors.Advocate}
                      displayEmpty
                      sx={{
                        '& .MuiSelect-select': {
                          color: formik.values.Advocate === '' ? 'text.disabled' : 'initial'
                        }
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select Advocate
                      </MenuItem>
                      {advocates.map((advocate) => (
                        <MenuItem key={advocate._id} value={advocate._id}>
                          {advocate.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>
                      {formik.touched.Advocate && formik.errors.Advocate}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel style={{ color: 'black' }}>Matter</FormLabel>
                    </Box>
                    <Select
                      labelId="demo-simple-select-label"
                      id="Matter"
                      name="Matter"
                      size="small"
                      fullWidth
                      value={formik.values.Matter}
                      onChange={formik.handleChange}
                      error={formik.touched.Matter && Boolean(formik.errors.Matter)}
                      helperText={formik.touched.Matter && formik.errors.Matter}
                      displayEmpty
                      sx={{
                        '& .MuiSelect-select': {
                          color: formik.values.Matter === '' ? 'text.disabled' : 'initial'
                        }
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select Matter
                      </MenuItem>
                      {matters.map((matter) => (
                        <MenuItem key={matter._id} value={matter._id}>
                          {matter.Title}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.Matter && formik.errors.Matter}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel style={{ color: 'black' }}>Judge</FormLabel>
                    </Box>
                    <Select
                      labelId="demo-simple-select-label"
                      id="Judge"
                      name="Judge"
                      size="small"
                      fullWidth
                      value={formik.values.Judge}
                      onChange={formik.handleChange}
                      error={formik.touched.Judge && Boolean(formik.errors.Judge)}
                      helperText={formik.touched.Judge && formik.errors.Judge}
                      displayEmpty
                      sx={{
                        '& .MuiSelect-select': {
                          color: formik.values.Judge === '' ? 'text.disabled' : 'initial'
                        }
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select Judge
                      </MenuItem>
                      {judges.map((judge) => (
                        <MenuItem key={judge._id} value={judge._id}>
                          {judge.Title}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.Judge && formik.errors.Judge}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel style={{ color: 'black' }}>Court</FormLabel>
                    </Box>
                    <Select
                      labelId="demo-simple-select-label"
                      id="Court"
                      name="Court"
                      size="small"
                      fullWidth
                      value={formik.values.Court}
                      onChange={formik.handleChange}
                      error={formik.touched.Court && Boolean(formik.errors.Court)}
                      helperText={formik.touched.Court && formik.errors.Court}
                      displayEmpty
                      sx={{
                        '& .MuiSelect-select': {
                          color: formik.values.Court === '' ? 'text.disabled' : 'initial'
                        }
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select Court
                      </MenuItem>
                      {courts.map((court) => (
                        <MenuItem key={court._id} value={court._id}>
                          {court.Title}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.Court && formik.errors.Court}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormControl fullWidth>
                    <Box mb={1}>
                      <FormLabel style={{ color: 'black' }}>Police Station</FormLabel>
                    </Box>
                    <Select
                      labelId="demo-simple-select-label"
                      id="PoliceStation"
                      name="PoliceStation"
                      size="small"
                      fullWidth
                      value={formik.values.PoliceStation}
                      onChange={formik.handleChange}
                      error={formik.touched.PoliceStation && Boolean(formik.errors.PoliceStation)}
                      helperText={formik.touched.PoliceStation && formik.errors.PoliceStation}
                      displayEmpty
                      sx={{
                        '& .MuiSelect-select': {
                          color: formik.values.PoliceStation === '' ? 'text.disabled' : 'initial'
                        }
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select Police Station
                      </MenuItem>
                      {policestations.map((policestation) => (
                        <MenuItem key={policestation._id} value={policestation._id}>
                          {policestation.Title}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>
                      {formik.touched.PoliceStation && formik.errors.PoliceStation}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>FIR</FormLabel>
                  </Box>
                  <TextField
                    id="Fir"
                    name="Fir"
                    type=""
                    size="small"
                    inputProps={{ maxLength: 200 }}
                    placeholder="Fir"
                    fullWidth
                    value={formik.values.Fir}
                    onChange={formik.handleChange}
                    error={formik.touched.Fir && Boolean(formik.errors.Fir)}
                    helperText={formik.touched.Fir && formik.errors.Fir}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box mb={1}>
                    <FormLabel style={{ color: 'black' }}>Description</FormLabel>
                  </Box>
                  <TextField
                    id="description"
                    name="description"
                    inputProps={{ maxLength: 200 }}
                    placeholder="Enter Description"
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
                    <FormLabel style={{ color: 'black' }}>Internal Note</FormLabel>
                  </Box>
                  <TextField
                    id="internalNote"
                    name="internalNote"
                    placeholder="Enter Internal Note"
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
          <Button sx={{ borderRadius: '15px' }} onClick={formik.handleSubmit} variant="contained" color="primary" type="submit">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditCase;
