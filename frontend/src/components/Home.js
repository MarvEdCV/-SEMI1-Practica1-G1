import React, { useEffect, useState } from 'react'
import SideMenu from './SideMenu'

import "./Home.css" 
import Perfil from './Perfil'
import Navegar from '../helpers/navegar'
import { URLS } from '../helpers/routes'



const Home = () => {
    const [dataUser, setDataUser] = useState({
        imagen:"",
        name:"",
        username:""
    })

    useEffect(() => {
        //Peticion get para la informacion del usuario
        fetch(URLS.perfil)
            .then((data)=>data.json())
            .then((data)=>{
                setDataUser({
                    name:data.name,
                    username:data.username,
                    imagen:data.imagen
                })
            })
    }, [])
    

  return (
    <React.Fragment>
    <div className='contenedor'>
        <div className='contenedor-izq'>
            <Perfil imagen={dataUser.imagen}/>
        </div>
        <div className='contenedor-der'>
            <div className='info'>
                <div className='input-text'>
                    <label htmlFor='username'>Nombre de usuario</label>
                    <input type={'text'} id='username' value={dataUser.username} readOnly></input>
                </div>
                <div className='input-text'>
                    <label htmlFor='nombre'>Nombre completo</label>
                    <input type={'text'} id='nombre'  value={dataUser.name} readOnly></input>
                </div>
            </div>
        </div>
    </div>
        
    </React.Fragment>
  )
}

export default Home