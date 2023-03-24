import React, { useState } from 'react';
import './App.css';
import Home from './components/Home';
import SideMenu from './components/SideMenu';
import 'react-router-dom'
import { Link, Route, Routes } from 'react-router-dom';
import EditarPerfil from './components/Editar_perfil';
import SubirFoto from './components/Subir_foto';
import VerFotos from './components/Ver_fotos';
import EditarAlbumes from './components/Editar_albumes';
import Login from './components/Login';
import Registro from './components/Registro';
import Login_camara from './components/Login_camara';
import Descripcion_foto from './components/Descripcion_foto';
import Extraer_texto from './components/Extraer_texto';
import Boot from './components/Boot';

function App() {
  const [username, setUsername] = useState("")
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login setUsername={setUsername}/>}/>
        <Route path='/login-camara' element={<Login_camara setUsername={setUsername}/>}/>
        <Route path={`/registro/`} element={<Registro />}/>
        <Route path={`/home/:username`} element={[<SideMenu username={username}/>,<Home setUsername={setUsername}/>]}/>
        <Route path={`/editar-perfil/:username`} element={[<SideMenu username={username}/>,<EditarPerfil setUsername={setUsername}/>]}/>
        <Route path={`/subir-foto/:username`} element={[<SideMenu username={username}/>,<SubirFoto setUsername={setUsername}/>]}/>
        <Route path={`/ver-fotos/:username`} element={[<SideMenu username={username}/>,<VerFotos setUsername={setUsername}/>]}/>
        <Route path={`/descripcion-foto/:username/:picture_id`} element={[<SideMenu username={username}/>,<Descripcion_foto setUsername={setUsername}/>]}/>
        <Route path={`/extraer-texto/:username`} element={[<SideMenu username={username}/>,<Extraer_texto setUsername={setUsername}/>]}/>
        <Route path={`/editar-albumes/:username`} element={[<SideMenu username={username}/>,<EditarAlbumes setUsername={setUsername}/>]}/>
      </Routes>
      <Boot></Boot>
    </div>
  );
}

export default App;
