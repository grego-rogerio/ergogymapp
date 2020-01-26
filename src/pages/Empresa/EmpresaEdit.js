import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../../AppNavbar';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import InputMask from 'react-input-mask';

class EmpresaEdit extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  emptyItem = {
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    inscricaoEstadual: '',
    indIEIsento: '',
    telefone: '',
    celular: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    referencia: '',
    email: '',
    observacao: '',
    errors: {}
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      item: this.emptyItem,
      csrfToken: cookies.get('XSRF-TOKEN')
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log("Token: " + csrfToken);
    console.log("Token2" + this.state.csrfToken);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
      try {
        const empresa = await (await fetch(`/empresa/${this.props.match.params.id}`, { credentials: 'include' })).json();
        this.setState({ item: empresa });
      } catch (error) {
        this.props.history.push('/empresa/');
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

    if (!item["razaoSocial"]) {
      formIsValid = false;
      errors["razaoSocial"] = "O Campo  \"Razão Social\" é obrigatorio!";
    }
    if (!item["nomeFantasia"]) {
      formIsValid = false;
      errors["nomeFantasia"] = "O Campo  \"Nome Fantasia\" é obrigatorio!";
    }
    if (!item["cnpj"]) {
      formIsValid = false;
      errors["cnpj"] = "O Campo  \"CNPJ\" é obrigatorio!";
    }
    if (!item["celular"]) {
      formIsValid = false;
      errors["celular"] = "O Campo  \"Celular\" é obrigatorio!";
    }
    if (!item["cep"]) {
      formIsValid = false;
      errors["cep"] = "O Campo  \"CEP\" é obrigatorio!";
    }
    if (!item["endereco"]) {
      formIsValid = false;
      errors["endereco"] = "O Campo  \"Endereço\" é obrigatorio!";
    }
    if (!item["bairro"]) {
      formIsValid = false;
      errors["bairro"] = "O Campo  \"Bairro\" é obrigatorio!";
    }
    if (!item["cidade"]) {
      formIsValid = false;
      errors["cidade"] = "O Campo  \"Cidade\" é obrigatorio!";
    }
    if (!item["uf"]) {
      formIsValid = false;
      errors["uf"] = "O Campo  \"UF\" é obrigatorio!";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }


  async handleSubmit(event) {
    event.preventDefault();
    const { item, csrfToken } = this.state;

    if (this.handleValidation()) {
      item.id = (item.id) ? item.id : '';
      await fetch('/empresa/' + item.id, {
        method: (item.id) ? 'PUT' : 'POST',
        headers: {
          'X-XSRF-TOKEN': this.state.csrfToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
        credentials: 'include'
      });
      this.props.history.push('/empresas');
    } else {
      console.log('validation failed');
    }
  }

  render() {
    const { item } = this.state;
    const title = <h2>{item.id ? 'Edit Empresa' : 'Add Empresa'}</h2>;

    return <div>
      <AppNavbar />
      <Container>
        {title}
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="razaoSocial" >Razão Social<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" name="razaoSocial" id="razaoSocial" value={item.razaoSocial || ''}
              onChange={this.handleChange} autoComplete="razaoSocial" maxLength="60" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["razaoSocial"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="nomeFantasia" >Nome Fantasia<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" name="nomeFantasia" id="nomeFantasia" value={item.nomeFantasia || ''}
              onChange={this.handleChange} autoComplete="nomeFantasia" maxLength="60" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["nomeFantasia"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="cnpj" >CNJP<span style={{ color: "red" }}>*</span></Label>
            <InputMask mask="99.999.999/9999-99" name="cnpj" id="cnpj" value={item.cnpj || ''}
              onChange={this.handleChange} autoComplete="cnpj" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["cnpj"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="inscricaoEstadual" >Inscrição Estadual</Label>
            <Input type="text" name="inscricaoEstadual" id="inscricaoEstadual" value={item.inscricaoEstadual || ''}
              onChange={this.handleChange} autoComplete="inscricaoEstadual" maxLength="18" />
          </FormGroup>
          <FormGroup>
            <Label for="telefone" >Telefone</Label>
            <InputMask mask="(99) 9999-9999" name="telefone" id="telefone" value={item.telefone || ''}
              onChange={this.handleChange} autoComplete="telefone" />
          </FormGroup>
          <FormGroup>
            <Label for="celular" >Celular<span style={{ color: "red" }}>*</span></Label>
            <InputMask mask="(99) 99999-9999" name="celular" id="celular" value={item.celular || ''}
              onChange={this.handleChange} autoComplete="celular" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["celular"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="cep" >CEP<span style={{ color: "red" }}>*</span></Label>
            <InputMask mask="99999-999" name="cep" id="cep" value={item.cep || ''}
             onChange={this.handleChange} autoComplete="cep" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["cep"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="endereco" >Endereço<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" name="endereco" id="endereco" value={item.endereco || ''}
              onChange={this.handleChange} autoComplete="endereco" maxLength="40" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["endereco"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="numero" >Número</Label>
            <Input type="text" name="numero" id="numero" value={item.numero || ''}
              onChange={this.handleChange} autoComplete="numero" maxLength="10" />
          </FormGroup>
          <FormGroup>
            <Label for="complemento" >Complemento</Label>
            <Input type="text" name="complemento" id="complemento" value={item.complemento || ''}
              onChange={this.handleChange} autoComplete="complemento" maxLength="60" />
          </FormGroup>
          <FormGroup>
            <Label for="bairro" >Bairro<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" name="bairro" id="bairro" value={item.bairro || ''}
              onChange={this.handleChange} autoComplete="bairro" maxLength="40" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["bairro"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="cidade" >Cidade<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" name="cidade" id="cidade" value={item.cidade || ''}
              onChange={this.handleChange} autoComplete="cidade" maxLength="40" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["cidade"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="uf" >UF<span style={{ color: "red" }}>*</span></Label>
            <select name="uf" id="uf" value={item.uf || ''}
              onChange={this.handleChange} autoComplete="uf" maxLength="40" >
              <option value=""></option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MT">MT</option>
              <option value="MS">MS</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["uf"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="referencia" >Referência</Label>
            <Input type="text" name="referencia" id="referencia" value={item.referencia || ''}
              onChange={this.handleChange} autoComplete="referencia" maxLength="60" />
          </FormGroup>
          <FormGroup>
            <Label for="email" >Email</Label>
            <Input type="text" name="email" id="email" value={item.email || ''}
              onChange={this.handleChange} autoComplete="email" maxLength="60" />
          </FormGroup>
          <FormGroup>
            <Label for="observacao" >Observação</Label>
            <textarea type="text" name="observacao" id="observacao" value={item.observacao || ''}
              onChange={this.handleChange} autoComplete="observacao"></textarea>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/empresas">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withCookies(withRouter(EmpresaEdit));
