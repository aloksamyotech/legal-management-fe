import { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack, Button, Container, Typography, Box, Card, Avatar } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import HomeIcon from '@mui/icons-material/Home';
import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
import AddAdvocate from './AddAdvocate';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import advocateData from './AdvocateData';
// ----------------------------------------------------------------------
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { urls } from 'core/Constant/Urls';
import { getApi } from 'core/APIs/ApiDocuments';

const Advocate = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleViewClick = (row) => {
    navigate(`/dashboard/advocate/view/${row._id}`, { state: row });
  };
  const { t } = useTranslation();
  const [openAdd, setOpenAdd] = useState(false);
  const [advocate, setAdvocate] = useState([]);
  const [loading, setLoading] = useState(true);
  const breadcrumbs = [
    <Link underline="hover" key="1" color="secondary" href="/">
      <HomeIcon sx={{ marginTop: '2px' }} fontSize="small" />
    </Link>,
    <Link underline="hover" key="2" color="inherit" href="/dashboard/default">
      Dashboard
    </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      Advocate
    </Typography>
  ];

  const columns = [
    {
      field: 'Serial',
      headerName: '#',
      flex: 0.5,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'profile',
      headerName: 'Advocate Profile',
      flex: 1.5,

      renderCell: (params) => (
        <Box
          onClick={() => handleViewClick(params.row)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              color: 'secondary.main',
              textDecoration: 'underline'
            }
          }}
        >
          <Avatar sx={{ marginLeft: '-10px' }} src={urls.initialbase + params.row.image} alt={params.row.name}></Avatar>
          <Typography sx={{ marginLeft: '20px' }} spacing={2}>
            <Typography variant="h5">
              {params.row.name}
              <CheckCircleIcon
                fontSize="10px"
                sx={{
                  marginLeft: '5px',
                  padding: 0,
                  marginBottom: '-3px',
                  color: 'green'
                }}
              />{' '}
            </Typography>
            <Typography variant="inherit">{params.row.email}</Typography>
          </Typography>
        </Box>
      )
    },

    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },
    {
      field: 'city',
      headerName: 'City',
      flex: 1
    },
    {
      field: 'state',
      headerName: 'State',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="inherit"
          size="small"
          sx={{ fontSize: '40px', marginLeft: '-10px', '&:hover': { background: 'none' } }}
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
  const fetchAdvocate = async () => {
    try {
      const response = await getApi(urls?.Advocate?.getalladvocate);
      const formattedData = response.data.map((advocate, index) => ({
        _id: advocate._id,
        Serial: index + 1,
        name: advocate?.name || 'N/A',
        email: advocate?.email || 'N/A',
        phone: advocate?.phone || 'N/A',
        gender: advocate?.gender || 'N/A',
        city: advocate?.city || 'N/A',
        state: advocate?.state || 'N/A',
        zipCode: advocate?.zipCode || 'N/A',
        country: advocate?.country || 'N/A',
        address: advocate?.address || 'N/A',
        certificate: advocate?.certificate || 'N/A',
        barNumber: advocate?.barNumber || 'N/A',
        lawUniversity: advocate?.lawUniversity || 'N/A',
        graduationYear: advocate?.graduationYear || 'N/A',
        practiceArea: advocate?.practiceArea || 'N/A',
        languages: advocate?.languages || 'N/A',
        skill: advocate?.skill || 'N/A',
        degree: advocate?.degree || 'N/A',
        notes: advocate?.notes || 'N/A',
        firms: advocate?.firms || 'N/A',
        position: advocate?.position || 'N/A',
        duration: advocate?.duration || 'N/A',
        image: advocate?.image || 'N/A',
        About: advocate?.About || 'N/A'
      }));
      setAdvocate(formattedData || []);
    } catch (error) {
      console.error('Error fetching Advocate data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvocate();
  }, []);
  const filteredadvocate = advocate.filter((advocate) => advocate.name.toLowerCase().includes(searchQuery.toLowerCase()));
  return (
    <>
      <AddAdvocate open={openAdd} handleClose={handleCloseAdd} fetchAdvocates={fetchAdvocate} />
      <Container>
        <Stack direction="column" alignItems="center" mb={3}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">{t('Advocate Details')}</Typography>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>
            </Stack>
          </Card>
        </Stack>

        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <Stack
                sx={{ paddingBottom: '1rem', paddingRight: '1rem' }}
                direction="row"
                alignItems="center"
                justifyContent={'flex-end'}
                spacing={2}
              >
                <TextField
                  variant="outlined"
                  color="secondary"
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                  <AddIcon color="white" fontSize="medium" />
                </Button>
              </Stack>
              <DataGrid rowHeight={80} rows={filteredadvocate} columns={columns} getRowId={(row) => row._id} loading={loading} />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default Advocate;
