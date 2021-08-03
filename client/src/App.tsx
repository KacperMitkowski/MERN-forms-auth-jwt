import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import Navbar from './components/Navbar/Navbar';
import LoginUser from './components/Auth/LoginUser';
import Unauthorized from './components/Unauthorized/Unauthorized';
import RegisterUser from './components/Auth/RegisterUser';
import Forms from './components/Forms/Forms';

const theme = createTheme({
  typography: {
    "fontFamily": `"Open Sans", sans-serif`,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 700
  }
});

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Forms} />
            <Route path="/loginUser" exact component={LoginUser} />
            <Route path="/register" exact component={RegisterUser} />
            <Route path="/unauthorized" exact component={Unauthorized} />
          </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;