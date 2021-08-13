import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import Navbar from './components/Navbar/Navbar';
import LoginUser from './components/Auth/LoginUser';
import Unauthorized from './components/Unauthorized/Unauthorized';
import RegisterUser from './components/Auth/RegisterUser';
import Forms from './components/Forms/Forms';
import AddForm from './components/Forms/AddForm/AddForm';
import EditForm from './components/Forms/EditForm/EditForm';
import AnswerForm from './components/Forms/AnswerForm/AnswerForm';
import ShowAnswers from './components/Forms/ShowAnswers/ShowAnswers';

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
            <Route path="/" exact component={() => <Redirect to="/forms" />} />
            <Route path="/forms" exact component={Forms} />
            <Route path="/loginUser" exact component={LoginUser} />
            <Route path="/register" exact component={RegisterUser} />
            <Route path="/addForm" exact component={AddForm} />
            <Route path="/editForm/:id" exact component={EditForm} />
            <Route path="/answerForm/:id" exact component={AnswerForm} />
            <Route path="/showAnswers/:id" exact component={ShowAnswers} />
            <Route path="/unauthorized" exact component={Unauthorized} />
          </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
