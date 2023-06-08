import { Route, Routes as Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import Layout from './layout/Layout';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#A48FFA',
        main: '#6F4FF2',
        dark: '#A48FFA',
        contrastText: 'white',
      },
      secondary: {
        light: '#A48FFA',
        main: '#6F4FF2',
        dark: '#A48FFA',
        contrastText: '#000',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Switch>
          <Route element={<Layout />}>
            <Route path="/" redirect="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
