/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card, Avatar, Grid, Divider, } from '@mui/material';
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
import EditIcon from '@mui/icons-material/Edit';
import AddContact from './AddContact';

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
    Contacts
  </Typography>,
];
const ContactData = [
  {
    id: 1,
    firstName: 'Jonny',
    lastName: 'Doe',
    gender: 'male',
    phoneNumber: '9981923587',
    emailAddress: 'ap@samyotech.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  }, {
    id: 2,
    firstName: 'Jack',
    lastName: 'Doe',
    gender: 'male',
    phoneNumber: '9981923587',
    emailAddress: 'ap@samyotech.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  }, {
    id: 3,
    firstName: 'Sandy',
    lastName: 'Dev',
    gender: 'male',
    phoneNumber: '9981923587',
    emailAddress: 'ap@samyotech.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  }, {
    id: 4,
    firstName: 'John',
    lastName: 'Bruh',
    gender: 'male',
    phoneNumber: '9981923587',
    emailAddress: 'ap@samyotech.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
];

const Contact = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      <AddContact open={openAdd} handleClose={handleCloseAdd} />
      <Container>
        <Stack direction="column" alignItems="center" mb={3}>
          <Card style={{ width: '100%', }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} padding={2}>
              <Typography variant="h4">Contacts</Typography>
              <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                {breadcrumbs}
              </Breadcrumbs>

            </Stack>
          </Card>
        </Stack>

        <TableStyle>

          <Box width="100%">
            <Card style={{  paddingTop: '15px' }}>
              <Stack sx={{ paddingRight: "1rem", }} direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2} >


                <TextField
                  variant="outlined"
                  color='secondary'
                  size="small"
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
                <Button color="secondary" variant="contained" size='large' onClick={handleOpenAdd} sx={{ marginBottom: "15px", fontSize: "40px", marginRight: "2rem", backgroundColor: "#673ab7", boxShadow: "none", borderRadius: "15px" }}>
                  <AddIcon color='white'
                    fontSize="medium" />

                </Button>

              </Stack>
              <Grid container spacing={3} padding={"17px"}>
                {ContactData.map((contact) => (
                  <Grid item xs={12} sm={6} md={4} key={contact.id}>
                    <Card sx={{ background: "#f2f3f5", height: "21.5rem", padding: "16px" }}>
                      <Box display="flex" flexDirection="column" alignItems="flex-start" textAlign="left" padding={1}>
                        <Avatar
                          alt={contact.firstName}
                          src={contact.avatar}
                          sx={{ width: 80, height: 80, mb: 2 }}

                        />
                        <Typography variant="h3" fontWeight="bold" gutterBottom>
                          {contact.firstName} {contact.lastName}
                        </Typography>
                        <Stack mt={2} display="flex" alignItems="flex-end" flexDirection="row">
                          <Typography variant="body2" color="text.secondary" >
                            Email:
                            <Typography color={"black"}>
                              {contact.emailAddress}
                            </Typography>
                          </Typography>
                          <Typography marginLeft={"12px"} variant="body2" color="text.secondary" >
                            Gender
                            <Typography color={"black"}>
                              {contact.gender}
                            </Typography>
                          </Typography>
                        </Stack>
                        <Typography mt={2} variant="body2" color="text.secondary">
                          Mobile No:
                          <Typography color={"black"}>
                            {contact.phoneNumber}

                          </Typography>
                        </Typography>

                      </Box>
                      <Stack mt={2} direction="row" alignItems="center" justifyContent={'flex-end'}  >
                        <Button color="secondary" variant="outlined" size='large' sx={{ marginBottom: "15px", fontSize: ".8rem", boxShadow: "none", borderRadius: "15px", padding:"5px" }}>
                          <EditIcon fontSize='.8rem' ></EditIcon>
                          Edit
                        </Button>
                      </Stack>
                    </Card>
                  </Grid>
                ))}
              </Grid>

            </Card>
          </Box>
        </TableStyle>

      </Container>
    </>
  );
};

export default Contact;
