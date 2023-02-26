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

function App() {
  const [username, setUsername] = useState("")
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login setUsername={setUsername}/>}/>
        <Route path={`/registro/`} element={<Registro />}/>
        <Route path={`/home/:username`} element={[<SideMenu/>,<Home />]}/>
        <Route path={`/editar-perfil/:username`} element={[<SideMenu/>,<EditarPerfil />]}/>
        <Route path={`/subir-foto/:username`} element={[<SideMenu/>,<SubirFoto />]}/>
        <Route path={`/ver-fotos/:username`} element={[<SideMenu/>,<VerFotos />]}/>
        <Route path={`/editar-albumes/:username`} element={[<SideMenu />,<EditarAlbumes/>]}/>
      </Routes>
    </div>
  );
}

export default App;
