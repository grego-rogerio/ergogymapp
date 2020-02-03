import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Form, FormGroup, Label } from 'reactstrap';
import AppNavbar from '../../AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import api from "../../services/api";

class SetorList extends Component {

  emptyItem = {
    empresa: '',
    setor: '',
    funcao: '',
    errors: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      estudosErgonomicos: [],
      empresas: [],
      setores: [],
      item: this.emptyItem,
      isLoading: true
    };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const response = api.get('/empresa').then(res => {
        this.setState({ empresas: res.data, isLoading: false })
        console.log("Response Dimount Empresa ", response);
      });
      const responseSetor = api.get('/setor').then(res => {
        this.setState({ setores: res.data, isLoading: false })
        console.log("Response Dimount Empresa ", responseSetor);
      });
    } catch (error) {
      this.props.history.push('/home');
    }
let item = JSON.parse(this.emptyItem);
    this.setState(item);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = JSON.parse(value);
    this.setState({ item });

  }

  async pesquisar() {
    this.setState({ isLoading: true });
    const response = await api.get('/estudoErgonomico').then(res => {
      this.setState({ estudosErgonomicos: res.data, isLoading: false })
      console.log("Response Dimount Setor ", response);
    });
  }

  async remove(id) {
    await api.delete('/estudoErgonomico/' + id, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let updatedSetors = [...this.state.estudosErgonomicos].filter(i => i.id !== id);
    this.setState({ estudosErgonomicos: updatedSetors });

  }

  async edit(id) {
    this.props.history.push("/estudoErgonomico/" + id);
  }

  async createNew() {
    this.props.history.push("/estudoErgonomico/new");
  }

  render() {
    const { item, estudosErgonomicos, empresas, setores, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    var empresaList = empresas.map(function (emp) {
      return <option key={emp.id} value={JSON.stringify(emp)}>{emp.nomeFantasia}</option>;
    });
    var setorList = setores.map(function (setor) {
      return <option key={setor.id} value={JSON.stringify(setor)}>{setor.nome}</option>;
    });


    const estudoErgonomicoList = estudosErgonomicos.map(estudoErgonomico => {
      return <tr key={estudoErgonomico.id}>
        <td style={{ whiteSpace: 'nowrap' }}>{estudoErgonomico.id}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{estudoErgonomico.funcionario}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{estudoErgonomico.empresa.nomeFantasia}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{estudoErgonomico.setor.nome}</td>
        <td style={{ whiteSpace: 'nowrap' }}>{estudoErgonomico.funcao.nome}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" onClick={() => this.edit(estudoErgonomico.id)}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(estudoErgonomico.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar />
        <Container fluid>
          <div>
            <h4>Filtro</h4>
            <Form >
              <FormGroup>
                <Label for="empresa" >Empresa<span style={{ color: "red" }}>*</span></Label>
                <select name="empresa" value={JSON.stringify(item.empresa)} onChange={this.handleChange} >
                  <option value="">Selecione</option>
                  {empresaList}
                </select>
                {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["nome"]}</span> : ''}
              </FormGroup>
              <FormGroup>
                <Label for="setor" >Setor<span style={{ color: "red" }}>*</span></Label>
                <select name="setor" value={JSON.stringify(item.setor)} onChange={this.handleChange}>
                  <option value="">Selecione</option>
                  {setorList}
                </select>
                {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["nome"]}</span> : ''}
              </FormGroup>
              <FormGroup>
                <Label for="funcao" >Função<span style={{ color: "red" }}>*</span></Label>
                <select name="funcao" value="" onChange={this.handleChange}>
                  <option value="">Selecione</option>
                </select>
                {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["nome"]}</span> : ''}
              </FormGroup>
              <FormGroup>
                <Button color="primary" type="submit">Pesquisar</Button>{' '}
                <Button color="secondary" tag={Link} to="/home">Cancel</Button>
              </FormGroup>
            </Form>
          </div>
          <div className="float-right">
            <Button color="success" onClick={() => this.createNew()} >Aplicar Questionário</Button>
          </div>
          <h4>Estudos Ergonomicos</h4>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">ID </th>
                <th width="20%">Funcionário </th>
                <th width="20%">Empresa </th>
                <th width="20%">Setor </th>
                <th width="20%">Função </th>
                <th width="10%">Ação</th>
              </tr>
            </thead>
            <tbody>
              {estudoErgonomicoList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default withRouter(SetorList);