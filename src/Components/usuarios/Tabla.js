import React from 'react';
import { Link } from 'react-router-dom';
 //conectar con redux
import { connect } from 'react-redux';



const Tabla = (props) => {

    const ponerFilas = () => (
        props.usuarios.map((usuario, key)=>(
          <tr key={usuario.id} >
            <td>
              { usuario.name }
            </td>
            <td>
              { usuario.email }
            </td>
            <td>
              { usuario.website }
            </td>
            <td>
              <Link to={ `/publicaciones/${key}` } >
                <div className="eye-solid icon"></div>
              </Link>
            </td>
          </tr>
        ))
      ); 

    return(
        <div >
            <h1>Usuarios</h1>
            <table className="tabla" >
            <thead>
                <tr>
                <th>
                    Nombre 
                </th>
                <th>
                    Correo
                </th>
                <th>
                    Enlace
                </th>
                </tr>
            </thead>
            <tbody>
                { ponerFilas() }
            </tbody>
            </table>
        </div>
    )
};


const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer;
}

export default connect(mapStateToProps)(Tabla);