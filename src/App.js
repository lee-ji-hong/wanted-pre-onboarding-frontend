import { Route, Routes as Switch } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import './App.css';
import Layout from './layout/Layout';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import TodoListPage from './pages/TodoListPage';

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
            <Route path="/" redirect="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/todo" element={<TodoListPage />} />
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
