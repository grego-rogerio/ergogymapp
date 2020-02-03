import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../../AppNavbar';
import { withRouter } from 'react-router-dom';
import api from "../../services/api";

class SetorList extends Component {
 
  constructor(props) {
    super(props);
    this.state = {setores: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }
  
  componentDidMount() {
    this.setState({isLoading: true});
    const response = api.get('/setor').then( res => {this.setState({ setores: res.data, isLoading: false})
    console.log("Response Dimount Setor ",response);  
  });
  }

  async remove(id) {
    await api.delete('/setor/'+id, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
      let updatedSetors = [...this.state.setores].filter(i => i.id !== id);
      this.setState({setores: updatedSetors});
 
  }

  async edit(id) {
    this.props.history.push("/setor/" + id);
  }

  async createNew() {
    this.props.history.push("/setor/new");
  }

  render() {
    const {setores, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const setorList = setores.map(setor => {
      return <tr key={setor.id}>
      <td style={{whiteSpace: 'nowrap'}}>{setor.nome}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" onClick={() => this.edit(setor.id)}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(setor.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" onClick={() => this.createNew()} >Add Setor</Button>
          </div>
          <h3>Setors</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Nome </th>
              <th width="10%">Ação</th>
            </tr>
            </thead>
            <tbody>
            {setorList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default withRouter(SetorList);