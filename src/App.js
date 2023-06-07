import { Route, Routes as Switch } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route element={<Layout />}>
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
