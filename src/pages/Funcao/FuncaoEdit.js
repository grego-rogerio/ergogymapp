import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../../AppNavbar';
import api from "../../services/api";

class FuncaoEdit extends Component {

  emptyItem = {
    nome: '',
    setor: '',
    errors: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      setores: [],
      item: this.emptyItem
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      try {
        const response = api.get(`/funcao/${this.props.match.params.id}`).then(res => {
          this.setState({ item: res.data })
          console.log("Response Dimount Funcao ", response);
          console.log('Funcao: ', this.state.item);
        });
      } catch (error) {
        this.props.history.push('/funcoes/');
      }
    } 
      try {
        const resp_setor = api.get(`/setor`).then(res => {
          this.setState({ setores: res.data })
          console.log("Response Dimount Setor ", resp_setor);
        });
      } catch (error) {
        this.props.history.push('/funcoes/');
      }
    
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    (name === 'setor') ? item[name] = JSON.parse(value) : item[name] = value;

    this.setState({ item });
    console.log('Setor Change:', item);
    console.log('value:', value);
    console.log('name:', name);

  }

  handleValidation() {
    let item = { ...this.state.item };
    let errors = {};
    let formIsValid = true;

    if (!item["nome"]) {
      formIsValid = false;
      errors["nome"] = "O Campo  \"Nome\" é obrigatorio!";
    }
    if (!item["setor"]) {
      formIsValid = false;
      errors["setor"] = "O Campo  \"Setor\" é obrigatorio!";
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;

    if (this.handleValidation()) {
      var response = null;
      console.log('Valor String', JSON.stringify(item));
      if (item.id) {
        console.log('com id: PUT');
        response = await api.put('/funcao/' + item.id, JSON.stringify(item), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        console.log('SEM id: POST');
        response = await api.post('/funcao/', JSON.stringify(item), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      console.log('👉 Returned data:', response);
      console.log('👉 Valor Final Setor:', this.state.item.setor);
      this.props.history.push('/funcoes');
    } else {
      console.log('validation failed');

    }
  }

  render() {
    const { item } = this.state;
    const title = <h2>{item.id ? 'Edit Funcao' : 'Add Funcao'}</h2>;

    var autores = this.state.setores.map(function (setor) {
      return <option key={setor.id} value={JSON.stringify(setor)}>{setor.nome}</option>;
    });

    return <div>
      <AppNavbar />
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="nome" >Nome<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" name="nome" id="nome" value={item.nome || ''}
              onChange={this.handleChange} autoComplete="nome" maxLength="60" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["nome"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="setor" >Setor<span style={{ color: "red" }}>*</span></Label>
            <select value={JSON.stringify(item.setor)} name="setor" onChange={this.handleChange} >
              <option value="">Selecione</option>
              {autores}
            </select>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["setor"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/funcoes">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(FuncaoEdit);
