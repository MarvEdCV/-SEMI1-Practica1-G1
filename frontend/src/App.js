import React from 'react';
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

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/registro' element={<Registro />}/>
        <Route path='/home' element={[<SideMenu/>,<Home />]}/>
        <Route path='/editar-perfil' element={[<SideMenu/>,<EditarPerfil />]}/>
        <Route path='/subir-foto' element={[<SideMenu/>,<SubirFoto />]}/>
        <Route path='/ver-fotos' element={[<SideMenu/>,<VerFotos />]}/>
        <Route path='/editar-albumes' element={[<SideMenu />,<EditarAlbumes/>]}/>
      </Routes>
    </div>
  );
}

export default App;
