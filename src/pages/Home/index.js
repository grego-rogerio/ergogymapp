import React, { Component } from 'react';
import '../../App.css';
import AppNavbar from '../../AppNavbar';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <li><Link to="/empresas">Cadastro de Empresas</Link></li>
          <li><Link to="/setores">Cadastro de Setor</Link></li>
          <li><Link to="/funcoes">Cadastro de Função</Link></li>
        </Container>
      </div>
    );
  }
}

export default Home;