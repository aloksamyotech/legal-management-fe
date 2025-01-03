
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card, Grid } from '@mui/material';
import { Link } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useParams } from 'react-router';

const breadcrumbs = [
  <Link underline="hover" key="1" color="secondary" href="/">
    <HomeIcon sx={{ marginTop: '2px' }} fontSize="small" />
  </Link>,
  <Link underline="hover" key="2" color="inherit" href="/dashboard/default">
    Dashboard
  </Link>,
  <Typography key="3" sx={{ color: 'secondary' }}>
    Hearing
  </Typography>,
  <Typography key="4" sx={{ color: 'text.primary' }}>
    Hearing Details
  </Typography>,
];

const HearingView = () => {
  const { id } = useParams();
  const location = useLocation();
  const rowData = location.state;

  const handleEdit = () => {
    console.log('Edit clicked:', rowData);
    // Add your edit logic here
  };

  const handleDelete = () => {
    console.log('Delete clicked:', rowData);
    // Add your delete logic here
  };

  return (
    <Container>
      <Stack direction="column" alignItems="center" mb={3}>
        <Card
          sx={{
            width: '100%',
            background: 'linear-gradient(90deg, #e3f2fd 0%,rgb(217, 162, 252) 100%)',
            color: '#000',
            transition: 'background 0.5s ease',
            '&:hover': {
              background: 'linear-gradient(90deg,rgb(217, 162, 252) 0%, #e3f2fd 100%)',
            },
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            padding={2}
          >
            <Typography variant="h4">Hearing Details</Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
        </Card>
      </Stack>

      <Box width="100%">
        <Card
          sx={{
            height: 'auto',
            padding: '15px',
           
          }}
        >
          <Stack
            display="flex"
            textAlign="center"
            justifyContent="center"
            alignItems="center"
            padding={2}
          >
            <Box
              boxShadow={2}
              sx={{
                borderRadius: '15px',
                padding: 2,
                width: '80%',
                mt: 2,
                background: 'linear-gradient(90deg, #f3e5f5 0%,rgb(229, 213, 254) 100%)',
                color: '#000',
                boxShadow: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 6,
                },
              }}
            >
              <Grid container spacing={2}>
                {[
                  { label: 'Title', value: rowData?.Title },
                  { label: 'Case', value: rowData?.Case },
                  { label: 'Date & Time', value: rowData?.Date },
                  { label: 'Witness', value: rowData?.Witness },
                  { label: 'Fees', value: rowData?.Fee },
                  { label: 'Judgement Reason', value: rowData?.JudgementStatus },
                  { label: 'Description', value: rowData?.Description },
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Typography variant="subtitle1">{item.label}</Typography>
                    <Typography color="text.secondary">{item.value || 'N/A'}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>

            
            <Stack direction="row" spacing={2} mt={3}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Box>
    </Container>
  );
};

export default HearingView;
