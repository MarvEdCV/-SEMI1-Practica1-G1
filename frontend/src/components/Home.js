import React, { useEffect, useState } from 'react'

import "./Home.css" 
import Perfil from './Perfil'
import { useParams } from 'react-router-dom'
import { getDataUser } from '../helpers/dataUserRequest'



const Home = (props) => {
    const {username} = useParams()
    const [dataUser, setDataUser] = useState({
        picture_profile:"",
        name:"",
        username:""
    })

    useEffect(() => {
        //Peticion get para la informacion del usuario
        console.log(username)
        getDataUser(username,setDataUser)

        props.setUsername(username)
    }, [])
    

  return (
    <React.Fragment>
    <div className='contenedor'>
        <div className='contenedor-izq'>
            <Perfil imagen={dataUser.picture_profile }/>
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