import React from 'react';

import { connect } from 'react-redux';
//acciones de usuarios
import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';

import Cargando from '../../loader/Loader';

import Comentarios from './Comentarios';

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerProUsuario, abrirCerrar, traerComentarios } = publicacionesActions;


class Publicaciones extends React.Component{

    async componentDidMount(){
        const{
            usuariosTraerTodos,
            publicacionesTraerProUsuario,
            match:{
                params:{
                    key
                }
            }
        } = this.props;
        
        if(!this.props.usuariosReducer.usuarios.length){
            await usuariosTraerTodos(); 
         }
        
        //  para solucionar: Cannot use 'in' operator to search for 'publicaciones_key' in undefined
         if(this.props.usuariosReducer.error){
             return;
         }

        if(!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])){
            publicacionesTraerProUsuario(key);
        }
    }   
    
    ponerUsuario = ()=>{
        const{
            usuariosReducer,
            publicacionesReducer,
            match:{
                params:{
                    key
                }
            }
        }= this.props;

        if(publicacionesReducer.cargando || usuariosReducer.cargando || !usuariosReducer.usuarios.length){
            return(
                <Cargando />
            )
        }

        if(publicacionesReducer.error || usuariosReducer.error){
            return(
                <p>Informacion de usuarios no disponible</p>
            )
        }

        const nombre = usuariosReducer.usuarios[key].name;

       return(
            <h1>Publicaciones de { nombre } </h1>
       )

       
    }

    ponerPublicaciones = ()=>{
        const{
            usuariosReducer,
            usuariosReducer: { usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: { params: {key} }
        }=this.props;

        if(!usuarios.length) return;
        if(usuariosReducer.error) return;

        if(publicacionesReducer.cargando || usuariosReducer.cargando ){
            return(
                <Cargando />
            )
        }

        if(publicacionesReducer.error || usuariosReducer.error){
            return(
                <p>Error1...</p>
            )
        }
        
        if(!publicaciones.length) return;
        if(!('publicaciones_key' in usuarios[key])) return;

        const { publicaciones_key } = usuarios[key];
        
        return this.mostrarInfo(publicaciones[publicaciones_key], publicaciones_key);

    }

    mostrarInfo = (publicaciones, pub_key) => (
        publicaciones.map((publicacion, com_key)=>(
            <div 
                className='pub_titulo'
                key={publicacion.id}   
                onClick={ ()=>this.mostrarComentarios(pub_key, com_key, publicacion.comentarios) }             
            >
                <h2>{ publicacion.title }</h2>
                <p>{ publicacion.body }</p>
                {
                    (publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios} /> : 'cerrado'
                }
            </div>
        ))
    );

    mostrarComentarios = (pub_key, com_key, comentarios) => {
       
        this.props.abrirCerrar(pub_key, com_key);

        if(!comentarios.length){
            this.props.traerComentarios(pub_key, com_key);
        }

        
    };

    render(){     
        return(
            <div>               
               { this.ponerUsuario() }
               { this.ponerPublicaciones() }
            </div>
        );
    }
}

const mapStateToProps = ({ usuariosReducer, publicacionesReducer }) => {
    return{ 
        usuariosReducer,
        publicacionesReducer
    };
};

const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerProUsuario,
    abrirCerrar,
    traerComentarios
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);