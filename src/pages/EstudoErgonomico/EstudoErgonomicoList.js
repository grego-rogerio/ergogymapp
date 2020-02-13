import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table, Form, FormGroup, Label } from 'reactstrap';
import AppNavbar from '../../AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import api from "../../services/api";

class SetorList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      estudosErgonomicos: [],
      empresas: [],
      setores: [],
      funcoes: [],
      empresa: '',
      setor: '',
      funcao: '',
      errors: {},
      isLoading: true
    };
    this.remove = this.remove.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const response = api.get('/empresa').then(res => {
        this.setState({ empresas: res.data, isLoading: false })
        console.log("Response Dimount Empresa ", response);
      });
      const responseSetor = api.get('/setor/funcao').then(res => {
        this.setState({ setores: res.data, isLoading: false })
        console.log("Response Dimount Empresa ", responseSetor);
      });
    } catch (error) {
      this.props.history.push('/home');
    }
  }

  handleChange(event) {
    this.setState({ isLoading: true });
    const target = event.target;
    const value = (target.value)?JSON.parse(target.value):target.value;
    const name = target.name;
    console.log('Name: ', name);
    if (name === 'empresa') {
      this.setState({ empresa: value, isLoading: false })
    } else if (name === 'funcao') {
      this.setState({ funcao: value, isLoading: false })
    } else if (name === 'setor') {
      this.setState({ setor: value });
      console.log('setor.id', value.id);
      try {
        const response = api.get(`/funcao/setor/${value.id}`).then(res => {
          this.setState({ funcoes: res.data, isLoading: false })
          console.log("Response Dimount Empresa ", response);
        });
      } catch (error) {
        this.props.history.push('/home');
      }
    }
  }

  async pesquisar() {

    if (this.handleValidation(true)) {
      
      const { empresa, setor, funcao } = this.state;
      try{
      let parametro = '?idEmpresa=' + empresa.id;
      (funcao) ? parametro += '&idSetor=' + setor.id + '&idFuncao=' + funcao.id : (setor) ? parametro += '&idSetor=' + setor.id : parametro += '';
      console.log('Parametro', parametro);
      await api.get(`/estudoErgonomico/filtros${parametro}`).then(res => {
        this.setState({ estudosErgonomicos: res.data, isLoading: false })
      });
    } catch (error) {
      this.setState({ isLoading: false,estudosErgonomicos:[] });
      this.props.history.push('/estudosErgonomicos');
    }
    }
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
    if(this.handleValidation(false)){
    this.props.history.push("/estudoErgonomico/new");
    }
  }

  handleValidation(isPesquisar) {
    const { empresa, setor, funcao } = this.state;

    let errors = {};
    let formIsValid = true;

    if (!empresa) {
      formIsValid = false;
      errors["empresa"] = "O Campo  \"Empresa\" é obrigatorio!";
    }
    if (!isPesquisar) {
      if (!setor) {
        formIsValid = false;
        errors["setor"] = "O Campo  \"Setor\" é obrigatorio!";
      }

      if (!funcao) {
        formIsValid = false;
        errors["funcao"] = "O Campo  \"Função\" é obrigatorio!";
      }
    }
    console.log('Erros',errors);
    console.log('formIsValid',formIsValid);
    this.setState({ errors: errors });
    return formIsValid;
  }

  render() {
    const { estudosErgonomicos, empresa, setor, funcao, empresas, setores, funcoes, isLoading } = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    var empresaList = empresas.map(function (emp) {
      return <option key={emp.id} value={JSON.stringify(emp)}>{emp.nomeFantasia}</option>;
    });
    var setorList = setores.map(function (setor) {
      return <option key={setor.id} value={JSON.stringify(setor)}>{setor.nome}</option>;
    });
    var funcaoList = funcoes.map(function (funcao) {
      return <option key={funcao.id} value={JSON.stringify(funcao)}>{funcao.nome}</option>;
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
                <select name="empresa" value={JSON.stringify(empresa)} onChange={this.handleChange} >
                  <option value="">Selecione</option>
                  {empresaList}
                </select>
                {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["empresa"]}</span> : ''}
              </FormGroup>
              <FormGroup>
                <Label for="setor" >Setor<span style={{ color: "red" }}>*</span></Label>
                <select name="setor" value={JSON.stringify(setor)} onChange={this.handleChange}>
                  <option value="">Selecione</option>
                  {setorList}
                </select>
                {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["setor"]}</span> : ''}
              </FormGroup>
              <FormGroup>
                <Label for="funcao" >Função<span style={{ color: "red" }}>*</span></Label>
                <select name="funcao" value={JSON.stringify(funcao)} onChange={this.handleChange}>
                  <option value="">Selecione</option>
                  {funcaoList}
                </select>
                {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["funcao"]}</span> : ''}
              </FormGroup>
              <FormGroup>
                <Button color="primary" onClick={() => this.pesquisar()}>Pesquisar</Button>{' '}
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