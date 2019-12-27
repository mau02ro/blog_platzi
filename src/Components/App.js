import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Menu from './menu';
import Usuarios from './usuarios/Usuarios';
import Publicaciones from './Publicaciones/Publicaciones';
import Tareas from './Tareas/tareas';
import tareasGuardar from './Tareas/guardar';



const App = ()=>(
  <BrowserRouter>
    <Menu />
    <div className="margen" >
      <Route exact path='/' component={ Usuarios } />
      <Route exact path='/tareas' component={ Tareas } />
      <Route exact path='/publicaciones/:key' component={ Publicaciones } />
      <Route exact path='/tareas/guardar' component={ tareasGuardar } />
      <Route exact path='/tareas/guardar/:usu_id/:tar_id' component={ tareasGuardar } />
    </div>
  </BrowserRouter>
);

export default App;