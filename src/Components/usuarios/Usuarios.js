import React,  { Component } from 'react';

import { connect } from 'react-redux';
import * as usuariosActions from '../../actions/usuariosActions';

import Loader from '../../loader/Loader';
import Tabla  from './Tabla';

class Usuarios extends Component{

  componentDidMount(){    
    if(!this.props.usuarios.length){
      this.props.traerTodos();
    }
  }

  pornerContenido = () => {
    if(this.props.cargando === true){
      return <Loader />
    }

    if(this.props.error){
      return `${this.props.error}`;
    }

    return(
      <Tabla />
    )
  }

  render(){
    
    return(
      <div >
        {this.pornerContenido()}
      </div>
    )
  }
}

//mapStateToProps por primer parametro recive todos los reducer y le devuelvo al componente solo el indicado
const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions )(Usuarios);
