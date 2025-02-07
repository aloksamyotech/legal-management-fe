import { useState, useEffect } from 'react';
import { Card, Typography, Box, Avatar, Button, Stack, Container, Grid } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddAdvocate from './AddAdvocate';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { getApi } from 'core/APIs/ApiDocuments';
import { urls } from 'core/Constant/Urls';
import UniversalBreadcrumbs from 'core/Breadcrumb/breadcrumb';

const AdvocateCardView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openAdd, setOpenAdd] = useState(false);
  const [advocate, setAdvocate] = useState([]);
  const [loading, setLoading] = useState(true);
  const breadcrumbsData = [
    { label: 'Home', path: '/', color: 'secondary' },
    { label: 'Dashboard', path: '/dashboard/default', color: 'inherit' },
    { label: 'Advocate', path: null }
  ];

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleViewClick = (row) => {
    navigate(`/dashboard/advocate/view/${row._id}`, { state: row });
  };

  const fetchAdvocate = async () => {
    try {
      const response = await getApi(urls?.Advocate?.getalladvocate);
      const formattedData = response.data.map((advocate, index) => ({
        ...advocate,
        Serial: index + 1
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

  const filteredAdvocates = advocate.filter((advocate) => advocate.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <AddAdvocate open={openAdd} handleClose={handleCloseAdd} fetchAdvocates={fetchAdvocate} />
      <Container>
        <Stack direction="column" alignItems="center" mb={3}>
          <Card style={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">{t('Advocate Details')}</Typography>
              <UniversalBreadcrumbs items={breadcrumbsData} />
            </Stack>
          </Card>
        </Stack>

        <Stack
          sx={{ paddingBottom: '1rem', paddingRight: '1rem' }}
          direction="row"
          alignItems="center"
          justifyContent={'space-between'}
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
              fontSize: '40px',
              backgroundColor: '#673ab7',
              boxShadow: 'none',
              borderRadius: '15px'
            }}
          >
            <Typography>{t('Add Advocate')}</Typography>
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {filteredAdvocates.map((advocate) => (
            <Grid item xs={12} sm={6} md={4} key={advocate._id}>
              <Card
                sx={{
                  padding: '20px',
                  borderRadius: '15px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar src={urls.initialbase + advocate.image} alt={advocate.name} sx={{ width: 60, height: 60 }} />
                  <Box>
                    <Typography variant="h6">{advocate.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {advocate.email}
                    </Typography>
                  </Box>
                </Stack>

                <Typography variant="body2" mt={2}>
                  <strong>{t('Phone')}: </strong>
                  {advocate.phone}
                </Typography>
                <Typography variant="body2">
                  <strong>{t('City')}: </strong>
                  {advocate.city}
                </Typography>
                <Typography variant="body2">
                  <strong>{t('State')}: </strong>
                  {advocate.state}
                </Typography>

                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  sx={{ marginTop: '10px' }}
                  onClick={() => handleViewClick(advocate)}
                >
                  <VisibilityIcon sx={{ marginRight: '5px' }} /> {t('View Details')}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  sx={{ marginTop: '10px', ml:1.5, }}
                
                >
                Open Cases:{ advocate.openCases}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default AdvocateCardView;
