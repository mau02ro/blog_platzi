import { combineReducers } from 'redux';

//reducers
import usuariosReducer from './usuariosReducer';
import publicacionesReducer from './publicacionesReducer';
import tareasReducer from './tareasReducer';


export default combineReducers({
    usuariosReducer,
    publicacionesReducer,
    tareasReducer
});