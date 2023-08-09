import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { registerCompany, authenticateCompany } from './api';
import TrainsList from './components/TrainList';
import TrainDetails from './components/TrainDetails';

function App() {
  const [token, setToken] = useState('');
  const classes = useStyles();

  const handleRegister = async () => {
    try {
      const registrationData = {
        companyName: 'Train Central',
        ownerName: 'Saikamal',
        rollNo: '1602-20-733-040',
        ownerEmail: 'saikamalkonduru@gmail.com',
        accessCode: 'oJnNPG',
      };

      const response = await registerCompany(registrationData);
      console.log('Registration successful:', response);

      // Assuming the API response contains clientID and clientSecret
      const { clientID, clientSecret } = response;
      // Now you can use clientID and clientSecret for authentication
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const authenticationData = {
        companyName: 'Train Central',
        clientID: 'b46128a0-fbde-4c16-a4b1-6ae6ad718e27', // Replace with actual clientID
        ownerName: 'Saikamal',
        ownerEmail: 'saikamalkonduru@gmail.com',
        rollNo: '1602-20-733-040',
        clientSecret: 'X0yol0RPayKB0dAN', // Replace with actual clientSecret
      };

      const response = await authenticateCompany(authenticationData);
      console.log('Authentication successful:', response);

      // Assuming the API response contains access_token
      const { access_token } = response;
      setToken(access_token);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  return (
    <Router>
      <div>
        <h1>Train Schedule App</h1>
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleLogin}>Login</button>

        {token && (
          <nav>
            <ul>
              <li>
                <Link to="/">All Trains</Link>
              </li>
            </ul>
          </nav>
        )}

        <Switch>
          <Route exact path="/">
            <TrainsList token={token} />
          </Route>
          <Route path="/trains/:trainNumber">
            <TrainDetails token={token} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
