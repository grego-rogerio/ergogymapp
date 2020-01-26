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

  }

  render() {
    const {empresas, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    

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
            
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default withCookies(withRouter(EmpresaList));