import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class EmpresaList extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const {cookies} = props;
    this.state = {empresas: [], csrfToken: cookies.get('XSRF-TOKEN'), isLoading: true};
    this.remove = this.remove.bind(this);
  }
  
  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/empresa', {credentials: 'include'})
      .then(response => response.json())
      .then(data => this.setState({empresas: data, isLoading: false}))
      .catch(() => this.props.history.push('/'));
  }

  async remove(id) {
    await fetch(`/empresa/${id}`, {
      method: 'DELETE',
      headers: {
        'X-XSRF-TOKEN': this.state.csrfToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(() => {
      let updatedEmpresas = [...this.state.empresas].filter(i => i.id !== id);
      this.setState({empresas: updatedEmpresas});
    });
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

export default withCookies(withRouter(EmpresaList));