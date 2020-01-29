import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import EmpresaList from "./pages/Empresa/EmpresaList";
import EmpresaEdit from "./pages/Empresa/EmpresaEdit";
import SetorList from "./pages/Setor/SetorList";
import SetorEdit from "./pages/Setor/SetorEdit";
import FuncaoList from "./pages/Funcao/FuncaoList";
import FuncaoEdit from "./pages/Funcao/FuncaoEdit";
import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
    <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/empresas" component={EmpresaList} />
      <PrivateRoute path="/empresa/:id" component={EmpresaEdit} />
      <PrivateRoute path="/setores" component={SetorList} />
      <PrivateRoute path="/setor/:id" component={SetorEdit} />
      <PrivateRoute path="/funcoes" component={FuncaoList} />
      <PrivateRoute path="/funcao/:id" component={FuncaoEdit} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;