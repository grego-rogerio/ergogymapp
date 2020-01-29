import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../AppNavbar';
import { withRouter } from 'react-router-dom';
import api from "../../services/api";

class FuncaoList extends Component {
 
  constructor(props) {
    super(props);
    this.state = {funcoes: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }
  
  componentDidMount() {
    this.setState({isLoading: true});
    const response = api.get('/funcao').then( res => {this.setState({ funcoes: res.data, isLoading: false})
    console.log("Response Dimount Funcao ",response);  
  });
  }

  async remove(id) {
    await api.delete('/funcao/'+id, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
      let updatedFuncoes = [...this.state.funcoes].filter(i => i.id !== id);
      this.setState({funcoes: updatedFuncoes});
 
  }

  async edit(id) {
    this.props.history.push("/funcao/" + id);
  }

  async createNew() {
    this.props.history.push("/funcao/new");
  }

  render() {
    const {funcoes, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const funcaoList = funcoes.map(funcao => {
      return <tr key={funcao.id}>
      <td style={{whiteSpace: 'nowrap'}}>{funcao.nome}</td>
        <td style={{whiteSpace: 'nowrap'}}>{funcao.setor.nome}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" onClick={() => this.edit(funcao.id)}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(funcao.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" onClick={() => this.createNew()} >Add Funcao</Button>
          </div>
          <h3>Funcoes</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Nome</th>
              <th width="20%">Setor</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {funcaoList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default withRouter(FuncaoList);