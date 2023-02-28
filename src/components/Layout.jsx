/** @format */

import {
  AppBar,
  Button,
  createTheme,
  Divider,
  Paper,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import MyStepper from './MyStepper';
let theme = createTheme();
const redColor = theme.palette.error.main;
const Layout = () => {
  const name = localStorage.getItem('com_client_name');
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <>
      <AppBar position='static' sx={{ bgcolor: 'white' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt='Iamredapple Logo' style={{ width: '50px', marginRight: '1rem' }} />
            {!isMobile && (
              <Typography sx={{ fontSize: '2vh', fontWeight: 'bold', color: 'rgba(0,0,0,0.8)' }}>
                Red Apple
              </Typography>
            )}
          </div>
          <Typography
            component='div'
            sx={{
              fontSize: '3.5vh',
              color: 'black',
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}>
            Installation
          </Typography>
          <Button variant='contained' sx={{ fontSize: '1.5vh' }} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div>
        <Paper sx={{ p: 1, m: 1 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{ justifyContent: 'space-between', marginBlock: '2vh' }}>
            <Typography sx={{ fontSize: '2vh', mr: '1vh', color: 'rgba(0,0,0,0.8)' }}>
              Client: {name}
            </Typography>
            <Typography sx={{ fontSize: '2vh', mr: '1vh', color: redColor }}>
              For more than 1 pictures, combine in single pdf file.
            </Typography>
            <Typography sx={{ fontSize: '2vh', mr: '1vh', color: redColor }}>
              File size must be less than 5MB
            </Typography>
          </Stack>
          <Divider sx={{ borderWidth: '1px', borderColor: 'rgba(0, 0, 0, 0.17)' }} />
          <MyStepper />
        </Paper>
      </div>
    </>
  );
};

export default Layout;
