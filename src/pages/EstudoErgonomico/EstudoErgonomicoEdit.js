import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../../AppNavbar';
import api from "../../services/api";

class SetorEdit extends Component {

  emptyItem = {
    id: '',
    funcionario: '',
    empresa: '',
    setor: '',
    funcao: '',
    indFaixaSalarial: '',
    indGenero: '',
    indTempoTrabalho: '',
    indHorario: '',
    inicioJornada: '',
    fimJornada: '',
    peso: '',
    altura: '',
    indAusencia: '',
    diasAusencia: '',
    motivo: '',
    indTipoDor: '',
    indMetas: '',
    indTempoMetas: '',
    indAvaliacaoFuncao: '',
    indAvaliacaoAmbiente: '',
    indAvaliacaoChefe: '',
    indAvaliacaoColegas: '',
    indHoraExtra: '',
    indSatisfacao: '',
    indDor: '',
    indLocalDor: '',
    indQueixaDor: '',
    descricaoQueixa: '',
    sugestao: '',
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
        const response = api.get(`/estudoErgonomico/${this.props.match.params.id}`).then(res => {
          this.setState({ item: res.data })
          console.log("Response Dimount EstudoErgonomico ", response);
        });

      } catch (error) {
        this.props.history.push('/estudosErgonomicos/');
      }
    }else{
      
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

    if (!item["funcionario"]) {
      formIsValid = false;
      errors["funcionario"] = "O Campo  \"Funcionario\" é obrigatorio!";
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
        response = await api.put('/estudoErgonomico/' + item.id, JSON.stringify(item), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        console.log('SEM id: POST');
        response = await api.post('/estudoErgonomico/', JSON.stringify(item), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      console.log('👉 Returned data:', response);
      this.props.history.push('/estudosErgonomicos');
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
            <Label for="funcionario" >Funcionario<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" name="funcionario" id="funcionario" value={item.funcionario || ''}
              onChange={this.handleChange} autoComplete="funcionario" maxLength="60" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["funcionario"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="empresa" >Empresa<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" name="empresa" id="empresa" value={item.empresa || ''}
              onChange={this.handleChange} autoComplete="empresa" maxLength="60" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["empresa"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="setor" >Setor<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" name="setor" id="setor" value={item.setor || ''}
              onChange={this.handleChange} autoComplete="setor" maxLength="60" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["setor"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="funcao" >Função<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" name="funcao" id="funcao" value={item.funcao || ''}
              onChange={this.handleChange} autoComplete="funcao" maxLength="60" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["funcao"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="indFaixaSalarial" >Faixa Salarial<span style={{ color: "red" }}>*</span></Label>
            <ul>
            <li><Input id="indFaixaSalarial_0" name="indFaixaSalarial" type="radio" value="0"
            checked={this.state.item.indFaixaSalarial === "0"} onChange={this.handleChange} />
            <label htmlFor="public">Menor que 1 Salario</label></li>
            <li><Input id="indFaixaSalarial_1" name="indFaixaSalarial" type="radio" value="1"
            checked={this.state.item.indFaixaSalarial === "1"} onChange={this.handleChange} />
            <label htmlFor="public">Entre 1 e 2 Salario</label></li>
            <li><Input id="indFaixaSalarial_2" name="indFaixaSalarial" type="radio" value="2"
            checked={this.state.item.indFaixaSalarial === "2"} onChange={this.handleChange} />
            <label htmlFor="public">Acima de 2 Salario</label></li>
            </ul>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["indFaixaSalarial"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="indGenero" >Genero<span style={{ color: "red" }}>*</span></Label>
            <ul>
            <li><Input id="indGenero_0" name="indGenero" type="radio" value="0"
            checked={this.state.item.indGenero === "0"} onChange={this.handleChange} />
            <label htmlFor="public">Masculino</label></li>
            <li><Input id="indGenero_1" name="indGenero" type="radio" value="1"
            checked={this.state.item.indGenero === "1"} onChange={this.handleChange} />
            <label htmlFor="public">Feminino</label></li>
            </ul>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["indGenero"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="indTempoTrabalho" >Tempo de Trabalho<span style={{ color: "red" }}>*</span></Label>
            <ul>
            <li><Input id="indTempoTrabalho_0" name="indTempoTrabalho" type="radio" value="0"
            checked={this.state.item.indTempoTrabalho === "0"} onChange={this.handleChange} />
            <label htmlFor="public">ate 1 ano</label></li>
            <li><Input id="indTempoTrabalho_1" name="indTempoTrabalho" type="radio" value="1"
            checked={this.state.item.indTempoTrabalho === "1"} onChange={this.handleChange} />
            <label htmlFor="public">De 1 a 3 anos</label></li>
            <li><Input id="indTempoTrabalho_2" name="indTempoTrabalho" type="radio" value="2"
            checked={this.state.item.indTempoTrabalho === "2"} onChange={this.handleChange} />
            <label htmlFor="public">Acima de 3 anos</label></li>
            </ul>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["indTempoTrabalho"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="indHorario" >Horario de Trabalho<span style={{ color: "red" }}>*</span></Label>
            <ul>
            <li><Input id="indHorario_0" name="indHorario" type="radio" value="0"
            checked={this.state.item.indHorario === "0"} onChange={this.handleChange} />
            <label>Matutino</label></li>
            <li><Input id="indHorario_1" name="indHorario" type="radio" value="1"
            checked={this.state.item.indHorario === "1"} onChange={this.handleChange} />
            <label>Diurno</label></li>
            <li><Input id="indHorario_2" name="indHorario" type="radio" value="2"
            checked={this.state.item.indHorario === "2"} onChange={this.handleChange} />
            <label>Noturno</label></li>
            </ul>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["indHorario"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="inicioJornada" >Hora Inicio da Jornada<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" name="inicioJornada" id="inicioJornada" value={item.inicioJornada || ''}
              onChange={this.handleChange} autoComplete="inicioJornada" maxLength="6" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["inicioJornada"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="fimJornada" >Hora Fim da Jornada<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" name="fimJornada" id="fimJornada" value={item.fimJornada || ''}
              onChange={this.handleChange} autoComplete="fimJornada" maxLength="6" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["fimJornada"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="peso" >Peso<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" name="peso" id="peso" value={item.peso || ''}
              onChange={this.handleChange} autoComplete="peso" maxLength="6" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["peso"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="altura" >Altura<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" name="altura" id="altura" value={item.altura || ''}
              onChange={this.handleChange} autoComplete="altura" maxLength="6" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["altura"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="indAusencia" >Teve ausencia no ultimo ano?<span style={{ color: "red" }}>*</span></Label>
            <ul>
            <li><Input id="indAusencia_0" name="indAusencia" type="radio" value="0"
            checked={this.state.item.indAusencia === "0"} onChange={this.handleChange} />
            <label>Sim</label></li>
            <li><Input id="indAusencia_1" name="indAusencia" type="radio" value="1"
            checked={this.state.item.indAusencia === "1"} onChange={this.handleChange} />
            <label>Nao</label></li>
            </ul>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["indAusencia"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="diasAusencia" >Dias de Ausência<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" name="diasAusencia" id="diasAusencia" value={item.diasAusencia || ''}
              onChange={this.handleChange} autoComplete="diasAusencia" maxLength="6" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["diasAusencia"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="motivo" >Motivo<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" name="motivo" id="motivo" value={item.motivo || ''}
              onChange={this.handleChange} autoComplete="motivo" maxLength="6" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["motivo"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="indTipoDor" >Sente alguma Dor?<span style={{ color: "red" }}>*</span></Label>
            <ul>
            <li><Input id="indTipoDor_0" name="indTipoDor" type="radio" value="0"
            checked={this.state.item.indTipoDor === "0"} onChange={this.handleChange} />
            <label>Cabeca</label></li>
            <li><Input id="indTipoDor_1" name="indTipoDor" type="radio" value="1"
            checked={this.state.item.indTipoDor === "1"} onChange={this.handleChange} />
            <label>Pescoco</label></li>
            <li><Input id="indTipoDor_2" name="indTipoDor" type="radio" value="2"
            checked={this.state.item.indTipoDor === "2"} onChange={this.handleChange} />
            <label>Costas</label></li>
            </ul>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["indTipoDor"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="indMetas" >Seu trabalho contem metas?<span style={{ color: "red" }}>*</span></Label>
            <ul>
            <li><Input id="indMetas_0" name="indMetas" type="radio" value="0"
            checked={this.state.item.indMetas === "0"} onChange={this.handleChange} />
            <label>Sim</label></li>
            <li><Input id="indMetas_1" name="indMetas" type="radio" value="1"
            checked={this.state.item.indMetas === "1"} onChange={this.handleChange} />
            <label>Nao</label></li>
            </ul>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["indMetas"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="indTempoMetas" >Tempo de Meta?<span style={{ color: "red" }}>*</span></Label>
            <ul>
            <li><Input id="indTempoMetas_0" name="indTempoMetas" type="radio" value="0"
            checked={this.state.item.indTempoMetas === "0"} onChange={this.handleChange} />
            <label>agressiva</label></li>
            <li><Input id="indTempoMetas_1" name="indTempoMetas" type="radio" value="1"
            checked={this.state.item.indTempoMetas === "1"} onChange={this.handleChange} />
            <label>normal</label></li>
            <li><Input id="indTempoMetas_2" name="indTempoMetas" type="radio" value="2"
            checked={this.state.item.indTempoMetas === "2"} onChange={this.handleChange} />
            <label>Costas</label></li>
            </ul>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["indTempoMetas"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="indAvaliacaoFuncao" >Como avalia a Funcao?<span style={{ color: "red" }}>*</span></Label>
            <ul>
            <li><Input id="indAvaliacaoFuncao_0" name="indAvaliacaoFuncao" type="radio" value="0"
            checked={this.state.item.indAvaliacaoFuncao === "0"} onChange={this.handleChange} />
            <label>boa</label></li>
            <li><Input id="indAvaliacaoFuncao_1" name="indAvaliacaoFuncao" type="radio" value="1"
            checked={this.state.item.indAvaliacaoFuncao === "1"} onChange={this.handleChange} />
            <label>ruim</label></li>
            <li><Input id="indAvaliacaoFuncao_2" name="indAvaliacaoFuncao" type="radio" value="2"
            checked={this.state.item.indAvaliacaoFuncao === "2"} onChange={this.handleChange} />
            <label>pessimo</label></li>
            </ul>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["indAvaliacaoFuncao"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="indAvaliacaoAmbiente" >Como avalia o Ambiente?<span style={{ color: "red" }}>*</span></Label>
            <ul>
            <li><Input id="indAvaliacaoAmbiente_0" name="indAvaliacaoAmbiente" type="radio" value="0"
            checked={this.state.item.indAvaliacaoAmbiente === "0"} onChange={this.handleChange} />
            <label>boa</label></li>
            <li><Input id="indAvaliacaoAmbiente_1" name="indAvaliacaoAmbiente" type="radio" value="1"
            checked={this.state.item.indAvaliacaoAmbiente === "1"} onChange={this.handleChange} />
            <label>ruim</label></li>
            <li><Input id="indAvaliacaoAmbiente_2" name="indAvaliacaoAmbiente" type="radio" value="2"
            checked={this.state.item.indAvaliacaoAmbiente === "2"} onChange={this.handleChange} />
            <label>pessimo</label></li>
            </ul>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["indAvaliacaoAmbiente"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="indAvaliacaoChefe" >Como avalia o Chefe?<span style={{ color: "red" }}>*</span></Label>
            <ul>
            <li><Input id="indAvaliacaoChefe_0" name="indAvaliacaoChefe" type="radio" value="0"
            checked={this.state.item.indAvaliacaoChefe === "0"} onChange={this.handleChange} />
            <label>boa</label></li>
            <li><Input id="indAvaliacaoChefe_1" name="indAvaliacaoChefe" type="radio" value="1"
            checked={this.state.item.indAvaliacaoChefe === "1"} onChange={this.handleChange} />
            <label>ruim</label></li>
            <li><Input id="indAvaliacaoChefe_2" name="indAvaliacaoChefe" type="radio" value="2"
            checked={this.state.item.indAvaliacaoChefe === "2"} onChange={this.handleChange} />
            <label>pessimo</label></li>
            </ul>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["indAvaliacaoChefe"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="indAvaliacaoColegas" >Como avalia os Colegas?<span style={{ color: "red" }}>*</span></Label>
            <ul>
            <li><Input id="indAvaliacaoColegas_0" name="indAvaliacaoColegas" type="radio" value="0"
            checked={this.state.item.indAvaliacaoColegas === "0"} onChange={this.handleChange} />
            <label>boa</label></li>
            <li><Input id="indAvaliacaoColegas_1" name="indAvaliacaoColegas" type="radio" value="1"
            checked={this.state.item.indAvaliacaoColegas === "1"} onChange={this.handleChange} />
            <label>ruim</label></li>
            <li><Input id="indAvaliacaoColegas_2" name="indAvaliacaoColegas" type="radio" value="2"
            checked={this.state.item.indAvaliacaoColegas === "2"} onChange={this.handleChange} />
            <label>pessimo</label></li>
            </ul>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["indAvaliacaoColegas"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="indHoraExtra" >Como avalia os Colegas?<span style={{ color: "red" }}>*</span></Label>
            <ul>
            <li><Input id="indHoraExtra_0" name="indHoraExtra" type="radio" value="0"
            checked={this.state.item.indHoraExtra === "0"} onChange={this.handleChange} />
            <label>boa</label></li>
            <li><Input id="indHoraExtra_1" name="indHoraExtra" type="radio" value="1"
            checked={this.state.item.indHoraExtra === "1"} onChange={this.handleChange} />
            <label>ruim</label></li>
            <li><Input id="indHoraExtra_2" name="indHoraExtra" type="radio" value="2"
            checked={this.state.item.indHoraExtra === "2"} onChange={this.handleChange} />
            <label>pessimo</label></li>
            </ul>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["indHoraExtra"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="indSatisfacao" >Como avalia a Satisfacao?<span style={{ color: "red" }}>*</span></Label>
            <ul>
            <li><Input id="indSatisfacao_0" name="indSatisfacao" type="radio" value="0"
            checked={this.state.item.indSatisfacao === "0"} onChange={this.handleChange} />
            <label>boa</label></li>
            <li><Input id="indSatisfacao_1" name="indSatisfacao" type="radio" value="1"
            checked={this.state.item.indSatisfacao === "1"} onChange={this.handleChange} />
            <label>ruim</label></li>
            <li><Input id="indSatisfacao_2" name="indSatisfacao" type="radio" value="2"
            checked={this.state.item.indSatisfacao === "2"} onChange={this.handleChange} />
            <label>pessimo</label></li>
            </ul>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["indSatisfacao"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="indDor" >Como avalia Dor?<span style={{ color: "red" }}>*</span></Label>
            <ul>
            <li><Input id="indDor_0" name="indDor" type="radio" value="0"
            checked={this.state.item.indDor === "0"} onChange={this.handleChange} />
            <label>boa</label></li>
            <li><Input id="indDor_1" name="indDor" type="radio" value="1"
            checked={this.state.item.indDor === "1"} onChange={this.handleChange} />
            <label>ruim</label></li>
            <li><Input id="indDor_2" name="indDor" type="radio" value="2"
            checked={this.state.item.indDor === "2"} onChange={this.handleChange} />
            <label>pessimo</label></li>
            </ul>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["indDor"]}</span> : ''}
          </FormGroup>          
          <FormGroup>
            <Label for="indLocalDor" >Como avalia Local da Dor?<span style={{ color: "red" }}>*</span></Label>
            <ul>
            <li><Input id="indLocalDor_0" name="indLocalDor" type="radio" value="0"
            checked={this.state.item.indLocalDor === "0"} onChange={this.handleChange} />
            <label>boa</label></li>
            <li><Input id="indLocalDor_1" name="indLocalDor" type="radio" value="1"
            checked={this.state.item.indLocalDor === "1"} onChange={this.handleChange} />
            <label>ruim</label></li>
            <li><Input id="indLocalDor_2" name="indLocalDor" type="radio" value="2"
            checked={this.state.item.indLocalDor === "2"} onChange={this.handleChange} />
            <label>pessimo</label></li>
            </ul>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["indLocalDor"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="indQueixaDor" >Como avalia Local da Dor?<span style={{ color: "red" }}>*</span></Label>
            <ul>
            <li><Input id="indQueixaDor_0" name="indQueixaDor" type="radio" value="0"
            checked={this.state.item.indQueixaDor === "0"} onChange={this.handleChange} />
            <label>boa</label></li>
            <li><Input id="indQueixaDor_1" name="indQueixaDor" type="radio" value="1"
            checked={this.state.item.indQueixaDor === "1"} onChange={this.handleChange} />
            <label>ruim</label></li>
            <li><Input id="indQueixaDor_2" name="indQueixaDor" type="radio" value="2"
            checked={this.state.item.indQueixaDor === "2"} onChange={this.handleChange} />
            <label>pessimo</label></li>
            </ul>
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["indQueixaDor"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="descricaoQueixa" >Descricao da Queixa<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" name="descricaoQueixa" id="descricaoQueixa" value={item.descricaoQueixa || ''}
              onChange={this.handleChange} autoComplete="descricaoQueixa" maxLength="6" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["descricaoQueixa"]}</span> : ''}
          </FormGroup>
          <FormGroup>
            <Label for="sugestao" >Sugestao<span style={{ color: "red" }}>*</span></Label>
            <Input type="text" name="sugestao" id="sugestao" value={item.sugestao || ''}
              onChange={this.handleChange} autoComplete="sugestao" maxLength="6" />
            {(this.state.errors) ? <span style={{ color: "red" }}>{this.state.errors["sugestao"]}</span> : ''}
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
