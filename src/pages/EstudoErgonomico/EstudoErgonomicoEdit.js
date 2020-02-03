import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../../AppNavbar';
import api from "../../services/api";

class SetorEdit extends Component {

  emptyItem = {
    nome: '',
    errors: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      item: this.emptyItem
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      try {
        const response = api.get(`/setor/${this.props.match.params.id}`).then( res => {this.setState({ item: res.data})
        console.log("Response Dimount Setor ",response);  
      });
        
      } catch (error) {
        this.props.history.push('/setores/');
      }
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  handleValidation() {
    let item = { ...this.state.item };
    let errors = {};
    let formIsValid = true;

    if (!item["nome"]) {
      formIsValid = false;
      errors["nome"] = "O Campo  \"Nome\" é obrigatorio!";
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { item } = this.state;

    if (this.handleValidation()) {
      var response = null;
      console.log('Valor String',JSON.stringify(item));
      if(item.id){
        console.log('com id: PUT');
        response =  await api.put('/setor/' + item.id, JSON.stringify(item), {
          headers: {
              'Content-Type': 'application/json'
          }});
      }else{
        console.log('SEM id: POST');
        response =  await api.post('/setor/', JSON.stringify(item), {
          headers: {
              'Content-Type': 'application/json'
          }});
      }
      console.log('👉 Returned data:', response);
      this.props.history.push('/setores');
    } else {
      console.log('validation failed');
    }
  }

  render() {
    const { item } = this.state;
    const title = <h2>{item.id ? 'Edit Setor' : 'Add Setor'}</h2>;

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
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/setores">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(SetorEdit);
