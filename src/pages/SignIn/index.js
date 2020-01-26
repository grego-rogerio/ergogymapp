import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import Logo from "../../assets/Logo_Ergogym.png";
import api from "../../services/api";
import { login } from "../../services/auth";

import { Form, Container } from "./styles";

class SignIn extends Component {
  state = {
    usernameOrEmail: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { usernameOrEmail, password } = this.state;
    if (!usernameOrEmail || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/api/auth/signin", { usernameOrEmail, password });
        console.log('👉 Returned data:', response);
        login(response.data.token);
        this.props.history.push("/home");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T"
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          <img src={Logo} alt="ErgoGym logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="usernameOrEmail"
            placeholder="Endereço de e-mail / Username"
            onChange={e => this.setState({ usernameOrEmail: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/signup">Criar conta grátis</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);