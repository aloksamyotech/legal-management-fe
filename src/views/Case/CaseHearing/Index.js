import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment, Link, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TableStyle from '../../../ui-component/TableStyle';
import HearingData from 'views/Hearing/HearingData';
import { useNavigate } from 'react-router';
import HearingForm from './HearingForm';
import { urls } from 'core/Constant/Urls';
import { getApi } from 'core/APIs/ApiDocuments';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

const AddHearing = (props) => {
  const { caseData, id } = props;
  const navigate = useNavigate();
  const [Hearings, setHearings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const handleViewClick = (row) => {
    navigate(`/dashboard/hearing/hearingview/${row._id}`, { state: row });
  };

  const fetchHearingData = async () => {
    try {
      const response = await getApi(urls?.Hearing?.getcaseHearing.replace(':caseId', id));
      if (response.data.status === 404) {
        setHearings([]);
        return;
      }
      const formattedData = response?.data?.map((hearing, index) => ({
        SerialNo: index + 1,
        _id: hearing?._id,
        Title: hearing?.Title,
        Fee: hearing?.Fee,
        Witness: hearing?.Witness,
        JudgementStatus: hearing?.JudgementStatus,
        JudgementReason: hearing?.JudgementReason,
        Description: hearing?.Description,
        Date: new Date(hearing?.Date).toLocaleDateString('en-GB')
      }));
      setHearings(formattedData);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  useEffect(() => {
    fetchHearingData();
  }, []);
  const filteredHearing = Hearings?.filter((item) => item.Title.toLowerCase().includes(searchQuery.toLowerCase()));

  const columns = [
    {
      field: 'SerialNo',
      headerName: 'Serial.No',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },

    {
      field: 'Title',
      headerName: 'Title',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize',
      renderCell: (params) => (
        <Typography
          sx={{
            color: 'primary.main',
            cursor: 'pointer',
            textDecoration: 'underline',
            '&:hover': {
              textDecoration: 'underline',
              color: 'secondary.main'
            }
          }}
          onClick={() => handleViewClick(params.row)}
        >
          {params.value}
        </Typography>
      )
    },
    {
      field: 'Fee',
      headerName: 'Fees',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Date',
      headerName: 'Date',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'JudgementStatus',
      headerName: 'Judgement Status',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'action',
      headerAlign: 'center',
      align: 'center',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="inherit"
          size="small"
          sx={{ fontSize: '40px', '&:hover': { background: 'none' } }}
          onClick={() => handleViewClick(params.row)}
        >
          <Link fontSize={0} color="inherit">
            <VisibilityIcon
              color="secondary"
              sx={{
                '&:hover': {
                  color: 'green'
                }
              }}
            />
          </Link>
        </Button>
      )
    }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <HearingForm caseData={caseData} open={openAdd} handleClose={handleCloseAdd} fetchHearingData={fetchHearingData}></HearingForm>
      <Container sx={{ padding: '0%' }}>
        <TableStyle>
          <Box mt={3}>
            <Card style={{ height: '', paddingTop: '15px' }}>
              <Stack sx={{ paddingRight: '1rem', paddingLeft: '1rem' }} direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4">Hearings</Typography>

                <Stack width={'100%'} direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
                  <TextField
                    variant="outlined"
                    color="secondary"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    inputProps={{ maxLength: 30 }}
                    sx={{ width: '20%' }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="secondary" />
                        </InputAdornment>
                      )
                    }}
                  />
                  <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    onClick={handleOpenAdd}
                    sx={{
                      marginBottom: '15px',
                      fontSize: '40px',
                      marginRight: '2rem',
                      backgroundColor: '#673ab7',
                      boxShadow: 'none',
                      borderRadius: '15px'
                    }}
                  >
                    <AddIcon fontSize="medium" sx={{ color: 'white' }} />
                  </Button>
                </Stack>
              </Stack>

              <DataGrid
                rowHeight={42}
                rows={filteredHearing}
                columns={columns}
                getRowId={(row) => row._id}
                sx={{
                  padding: '17px',
                  border: '2px solid lightgray',
                  '& .MuiDataGrid-columnHeaders': {},
                  '& .MuiDataGrid-columnHeader': {
                    border: '1px solid lightgray'
                  },
                  '& .MuiDataGrid-cell': {
                    border: '1px solid lightgray'
                  }
                }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default AddHearing;
