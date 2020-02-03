import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../AppNavbar';
import { withRouter } from 'react-router-dom';
import api from "../../services/api";

class EmpresaList extends Component {
 
  constructor(props) {
    super(props);
    this.state = {empresas: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }
  
  componentDidMount() {
    this.setState({isLoading: true});
    const response = api.get('/empresa').then( res => {this.setState({ empresas: res.data, isLoading: false})
    console.log("Response Dimount Empresa ",response);  
  });
  }

  async remove(id) {
    await api.delete('/empresa/'+id, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
      let updatedEmpresas = [...this.state.empresas].filter(i => i.id !== id);
      this.setState({empresas: updatedEmpresas});
 
  }

  async edit(id) {
    this.props.history.push("/empresa/" + id);
  }

  async createNew() {
    this.props.history.push("/empresa/new");
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
            <Button size="sm" color="primary" onClick={() => this.edit(empresa.id)}>Edit</Button>
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
            <Button color="success" onClick={() => this.createNew()} >Add Empresa</Button>
          </div>
          <h3>Empresas</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Razão Social </th>
              <th width="20%">Nome Fantasia</th>
              <th width="20%">CNPJ</th>
              <th width="20%">Telefone</th>
              <th width="20%">Celular</th>
              <th width="10%">Ação</th>
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