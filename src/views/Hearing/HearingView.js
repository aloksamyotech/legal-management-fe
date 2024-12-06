/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card , Grid } from '@mui/material';
import {  Link } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import TableStyle from '../../ui-component/TableStyle';
import hearingViewData from './HearingviewData';
import { useLocation, useParams } from 'react-router';

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
  <Typography key="3" sx={{ color: 'secondary' }}>
    Hearing
  </Typography>,
  <Typography key="4" sx={{ color: 'text.primary' }}>
    Hearing Details
  </Typography>,
];


const HearingView= () => {
    const { id } = useParams();
    const location = useLocation();
    const rowData = location.state;
 console.log(rowData);
  return (
    <>
    <Container>
      <Stack direction="column" alignItems="center" mb={3}>
        <Card style={{ width: '100%', }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
            <Typography variant="h4">Hearing Details</Typography>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>

          </Stack>
        </Card>
      </Stack>

      <TableStyle>
      
        <Box width="100%">
            
          <Card style={{ height: '500px', paddingTop: '15px',  }}>
          <Stack display={"flex"} textAlign={"center"} justifyContent={"center"} alignItems={"center"} padding={2}>
            <Box boxShadow={3} sx={{ borderRadius:"15px"}} padding={2} height={"300px"} width="80%" mt={4}>

                              
          <Grid padding={2} container rowSpacing={2} columnSpacing={{ xs: 0, sm: 5, md: 4}}>
              
              <Grid item xs={12} sm={6} md={6}>
              
                <Typography>Title</Typography>
            <Typography color={"text.secondary"} >{hearingViewData?.Title}</Typography>
            </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Typography>Case</Typography>
                <Typography color={"text.secondary"}>{hearingViewData?.Case}</Typography>
            </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Typography>Date & Time</Typography>
                <Typography color={"text.secondary"}>{hearingViewData?.Date}</Typography>
            </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Typography>Witness</Typography>
                <Typography color={"text.secondary"}>{hearingViewData?.witness}</Typography>
            </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Typography>Fees</Typography>
                <Typography color={"text.secondary"}>{hearingViewData?.Fees}</Typography>
            </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Typography>Judgement Reason</Typography>
                <Typography color={"text.secondary"}>{hearingViewData?.JudgementStatus}</Typography>
            </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Typography>Description</Typography>
                <Typography color={"text.secondary"}>{hearingViewData?.Description}</Typography>
            </Grid>
            </Grid>
              
            </Box>


</Stack>
          </Card>
        </Box>
      </TableStyle>

    </Container>
  </>
);
};

export default HearingView;
