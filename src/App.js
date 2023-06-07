import { Route, Routes as Switch } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route element={<Layout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
