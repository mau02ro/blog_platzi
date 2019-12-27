import {  CARGANDO, ERROR, ACTUALIZAR, COME_ERROR, COME_CARGANDO, COM_ACTUALIZAR  } from '../types/publicacionesTypes';
import * as usuariosTypes from '../types/usuariosTypes';
import axios from 'axios';

const { TRAER_TODOS : USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = (key) => async(dispatch, getState)=>{
    dispatch({
        type:CARGANDO
    })

    const { usuarios } = getState().usuariosReducer;
    const usuario_id = usuarios[key].id;
    const { publicaciones } = getState().publicacionesReducer;

    try{
            //obtener el id del usuuario
            // const { usuarios } = getState().usuariosReducer;
            // const usuario_id = usuarios[key].id;
    
            const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);  

            const  nuevas = respuesta.data.map((publicacion) => ({
                ...publicacion,
                comentarios:[],
                abierto: false
            }));
            
            //obtener el estado actual de las publicaciones(para evitar sobre escribir)
            // const { publicaciones } = getState().publicacionesReducer;
            const publicaciones_actualizadas = [
                ...publicaciones,
                // respuesta.data
                nuevas
            ];    
    
            // identificar enque posicion estan guardados las publicaciones de cada usuario 
            const publicaciones_key = publicaciones_actualizadas.length - 1;
            const usuarios_actualizados = [...usuarios];
            usuarios_actualizados[key] = {
                ...usuarios[key],
                publicaciones_key: publicaciones_key
            }
    
            dispatch({
                type:USUARIOS_TRAER_TODOS,
                payload: usuarios_actualizados,
            });
    
            dispatch({
                type: ACTUALIZAR,
                payload: publicaciones_actualizadas,            
            });
    }catch(error){        
        dispatch({
            type:ERROR,
            payload:error.message,
        })
    }
}

export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
    const { publicaciones } = getState().publicacionesReducer;
    const selecionada = publicaciones[pub_key][com_key];

    const actualizada = {
        ...selecionada,
        abierto: !selecionada.abierto
    }
    
    const publicaciones_actualizadas = [...publicaciones];
    publicaciones_actualizadas[pub_key] = [
        ...publicaciones[pub_key]
    ];
    publicaciones_actualizadas[pub_key][com_key] = actualizada;

    dispatch({
        type: ACTUALIZAR,
        payload: publicaciones_actualizadas,            
    });

}

export const traerComentarios = (pub_key, com_key) => async(dispatch, getState) => {
    dispatch({
        type:COME_CARGANDO,        
    })
    const { publicaciones } = getState().publicacionesReducer;
    const selecionada = publicaciones[pub_key][com_key];

    try{
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${selecionada.id}`);

        const actualizada = {
            ...selecionada,
            comentarios: respuesta.data
        };

        const publicaciones_actualizadas = [...publicaciones];
        publicaciones_actualizadas[pub_key] = [
            ...publicaciones[pub_key]
        ];

        publicaciones_actualizadas[pub_key][com_key] = actualizada;

        dispatch({
            type: COM_ACTUALIZAR,
            payload: publicaciones_actualizadas,            
        });
    }catch(error){
        dispatch({
            type: COME_ERROR,
            payload: 'Comentarios no disponible',
        })
    }
};