// import { Link } from 'react-router-dom';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// // project imports
// import AuthWrapper1 from '../AuthWrapper1';
// import AuthCardWrapper from '../AuthCardWrapper';
// import AuthLogin from '../auth-forms/AuthLogin';
// import Logo from 'ui-component/Logo';
// import AuthFooter from 'ui-component/cards/AuthFooter';

// // assets

// // ================================|| AUTH3 - LOGIN ||================================ //

// const Login = () => {
//   const theme = useTheme();
//   const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

//   return (
//     <AuthWrapper1>
//       <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
//         <Grid item xs={12}>
//           <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
//             <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
//               <AuthCardWrapper>
//                 <Grid container spacing={2} alignItems="center" justifyContent="center">
//                   <Grid item sx={{ mb: 3 }}>
//                     <Link to="#">
//                       <Logo />
//                     </Link>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
//                       <Grid item>
//                         <Stack alignItems="center" justifyContent="center" spacing={1}>
//                           <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
//                             Hi, Welcome Back
//                           </Typography>
//                           <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
//                             Enter your credentials to continue
//                           </Typography>
//                         </Stack>
//                       </Grid>
//                     </Grid>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <AuthLogin />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Divider />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Grid item container direction="column" alignItems="center" xs={12}>
//                       <Typography component={Link} to="/pages/register/register3" variant="subtitle1" sx={{ textDecoration: 'none' }}>
//                         Don&apos;t have an account?
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </AuthCardWrapper>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
//           <AuthFooter />
//         </Grid>
//       </Grid>
//     </AuthWrapper1>
//   );
// };

// export default Login;

import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Grid, Typography, Button, Stack, Card } from '@mui/material';
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import AuthFooter from 'ui-component/cards/AuthFooter';
import Logo from 'ui-component/Logo';
import illustration from 'assets/images/iii.png';
import illustration2 from 'assets/images/illustration.webp';
import loginlogo from 'assets/images/loginlogo.png';

const Login = () => {
  const theme = useTheme();

  return (
    <AuthWrapper1>
      <Grid container sx={{ minHeight: '100vh', backgroundColor: '#d8c5f0' }} alignItems="center" justifyContent="center">
        <Grid item container spacing={4} alignItems="center" justifyContent="center" sx={{ maxWidth: '1100px' }}>
          {/* Login Form Section */}
          <Grid item xs={12} md={5}>
            <AuthCardWrapper>
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item sx={{ mb: 2 }}>
                  <Link to="#">
                    {/* <Logo /> */}
                    <img src={loginlogo} alt="company logo" width={70} height={70} style={{ color: 'red' }}></img>
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Stack alignItems="center" justifyContent="center" spacing={1}>
                    <Typography color={theme.palette.secondary.main} gutterBottom variant="h4">
                      Hi, Welcome Back
                    </Typography>
                    <Typography variant="body2" textAlign="center">
                      Sign in with Email address
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <AuthLogin />
                </Grid>
              </Grid>
            </AuthCardWrapper>
          </Grid>
          {/* Illustration Section */}
          <Grid item xs={12} md={6} display={{ xs: 'none', md: 'block' }}>
            <img src={illustration} alt="Login Illustration" style={{ width: '100%', maxWidth: '1000px' }} />
            <Grid xs={12} md={12} display={'flex'} justifyContent={'center'}>
              <Typography variant="h1">Legal Management System </Typography>
            </Grid>
            <Grid xs={12} md={12} display={'flex'} justifyContent={'center'}>
              <Typography variant="h3">Register your case here </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
