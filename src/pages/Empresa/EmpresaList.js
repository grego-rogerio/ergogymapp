import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import api from "../../services/api";

class EmpresaList extends Component {
 
  constructor(props) {
    super(props);
    this.state = {empresas: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }
  
  componentDidMount() {
    this.setState({isLoading: true});
    api.get('/empresa').then( res => {
      this.setState({ empresas: res.data, isLoading: false})
    });
  }

  async remove(id) {

  }

  render() {
    const {empresas, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const empresaList = empresas.map(empresa => {
      return <tr key={empresa.id}>
      <td style={{whiteSpace: 'nowrap'}}>{empresa.razaoSocial}</td>
        <td style={{whiteSpace: 'nowrap'}}>{empresa.nomeFantasia}</td>
        <td style={{whiteSpace: 'nowrap'}}>{empresa.cnpj}</td>
        <td style={{whiteSpace: 'nowrap'}}>{empresa.telefone}</td>
        <td style={{whiteSpace: 'nowrap'}}>{empresa.celular}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/empresa/" + empresa.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(empresa.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/empresa/new">Add Empresa</Button>
          </div>
          <h3>Empresas</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Razão Social </th>
              <th width="20%">Nome Fantasia</th>
              <th width="20%">cnpj</th>
              <th width="20%">Telefone</th>
              <th width="20%">Celular</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {empresaList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default withRouter(EmpresaList);