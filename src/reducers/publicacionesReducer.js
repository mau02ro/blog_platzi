import {  CARGANDO, ERROR, ACTUALIZAR, COME_ERROR, COME_CARGANDO, COM_ACTUALIZAR  } from '../types/publicacionesTypes';

const INITIAL_STATE = {
    //inicializando el estado
    publicaciones:[],
    cargando: false,
    error: '',
    com_cargando: false,
    com_error: ''
}

//case
export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case ACTUALIZAR:
            return{
                ...state,
                publicaciones: action.payload,
                cargando: false,
                com_cargando:false
            };
        
        case COM_ACTUALIZAR:
            return{
                ...state,
                publicaciones: action.payload,
                com_cargando:false
            };

        case CARGANDO:
            return{
                ...state, 
                cargando: true,
            };    

        case ERROR:
            return{
                ...state, 
                error: action.payload,
                cargando: false,
            };  

        case COME_CARGANDO:
            return{
                ...state, 
                com_cargando: true,
            };    

        case COME_ERROR:
            return{
                ...state, 
                com_error: action.payload,
                com_cargando: false,
            }; 

        default: return state;
    }
}