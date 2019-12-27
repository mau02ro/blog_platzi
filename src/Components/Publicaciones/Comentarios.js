import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../../loader/Loader';

const Comentarios = (props) => {    

    if(props.com_error ){
        return(
            <h3>{props.com_error}</h3>
        )
    }

    if(props.com_cargando && !props.comentarios.length){
        return(
            <Spinner/>
        )
    }

    const ponerComentarios = ()=>(
        props.comentarios.map( (comentario, key_coment) => (
            <li key={ key_coment }>
                <b><u>{ comentario.email }</u></b>
                <br/>
                <p>{ comentario.body }</p>
            </li>
        ))
    )

    return(
        <ul>
            { ponerComentarios() }
        </ul>
    );
}

const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer;

export default connect(mapStateToProps)(Comentarios);