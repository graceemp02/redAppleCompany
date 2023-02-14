/** @format */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages';
import Protected from './context/Protected';
import { ThemeProvider, createTheme } from '@mui/material/styles';
let theme = createTheme({ typography: { color: 'black', button: { textTransform: 'none' } } });
function App() {
  return (
    // <BrowserRouter>
    <BrowserRouter basename='/company'>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<Protected />} />
          <Route path='/*' element={<Protected />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
