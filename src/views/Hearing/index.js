/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { InputAdornment, Link, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
import HearingData from './HearingData';
import { useNavigate } from 'react-router';
import { getApi } from 'core/APIs/ApiDocuments';
import { useEffect } from 'react';
import { urls } from 'core/Constant/Urls';
import { typography } from '@mui/system';

// ----------------------------------------------------------------------
const breadcrumbs = [
  <Link underline="hover" key="1" color="secondary" href="/" >
    <HomeIcon sx={{ marginTop: "2px" }} fontSize='small' />
  </Link>,
  <Link
    underline="hover"
    key="2"
    color="inherit"
    href="/dashboard/default"
  >
    Dashboard
  </Link>,
  <Typography key="3" sx={{ color: 'text.primary' }}>
    Hearing
  </Typography>,
];


const Hearing= () => {
  const navigate = useNavigate();
   const [Hearings, setHearings] = useState([]);
     const [searchQuery, setSearchQuery] = useState('');
      const [openAdd, setOpenAdd] = useState(false);
      const handleViewClick = (row) => {
          navigate(`/dashboard/hearing/hearingview/${row.id}`, { state: row });
      };
      
  
      const fetchHearingData = async () => {
          try {
            const response = await getApi(urls?.Hearing?.getallhearing);
            const formattedData = response.data.map((hearing, index) => ({
              SerialNo: index + 1,
              _id: hearing?._id,
              Title: hearing?.Title,
              Case:hearing?.Case?.Title,
              Fee:hearing?.Fee,
              Witness:hearing?.Witness,
              JudgementStatus:hearing?.JudgementStatus,
              JudgementReason:hearing?.JudgementReason,
              Description:hearing?.Description,
              Date: new Date(hearing?.Date).toLocaleDateString("en-GB"),
   
              
            }));
            setHearings(formattedData);
          } catch (error) {
            console.error('Error fetching cases:', error);
          }
        };
      
        useEffect(() => {
          fetchHearingData();
        }, []);
        const filteredHearing = Hearings.filter((item) =>
          item.Title.toLowerCase().includes(searchQuery.toLowerCase())
        ); 
  
  
  const columns = [
    {
      field: 'SerialNo',
      headerName: 'S.NO',
      flex: 1,
      headerAlign: 'center',
      align: 'center', 
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Case',
      headerName: 'Case',
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
      cellClassName: ' name-column--cell--capitalize'
    },
    {
      field: 'Fee',
      headerName: 'Fees',
      flex: 1,
      headerAlign: 'center',
      align: 'center', 
      cellClassName: ' name-column--cell--capitalize',
      renderCell: (params) => (
      <Typography>${params.row.Fee}</Typography>
      )
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
          sx={{ fontSize: "40px", "&:hover":{background: "none"}}}
          onClick={() => handleViewClick(params.row)}
        >
          <VisibilityIcon  color='secondary' sx={{
          "&:hover": {
            color: 'green'
          }
        }} />
        </Button>)
    }
  ];

 
  return (
    <>
    <Container>
      <Stack direction="column" alignItems="center" mb={3}>
        <Card style={{ width: '100%', }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
            <Typography variant="h4">Hearing</Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>

          </Stack>
        </Card>
      </Stack>

      <TableStyle>

        <Box width="100%">
          <Card style={{ height: '600px', paddingTop: '15px' }}>
            <Stack sx={{ paddingRight: "1rem", }} direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>


              <TextField
                variant="outlined"
                color='secondary'
                size="small"
                value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                inputProps={{ maxLength: 30 }}
                sx={{ width: '20%', }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color='secondary' />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <DataGrid
              rowHeight={42}
              rows={filteredHearing}
              columns={columns}
              getRowId={(row) => row._id}
              sx={{padding:"17px",
                border: "2px solid lightgray", 
                "& .MuiDataGrid-columnHeaders": {
                  
                },
                "& .MuiDataGrid-columnHeader": {
                  border: "1px solid lightgray", 
                },
                "& .MuiDataGrid-cell": {
                  border: "1px solid lightgray",

                },
              }}
            />
          </Card>
        </Box>
      </TableStyle>

    </Container>
  </>
);
};

export default Hearing;
