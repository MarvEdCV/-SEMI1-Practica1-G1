import React from 'react'
import 'axios'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

import './Login.css'
import { URLS, url_servidor } from '../helpers/routes'
import { postFetch } from '../helpers/peticiones'

const Login = (props) => {
  //useNavigate para cambiar la url para cargar otros componentes
  const navigate = useNavigate()
  const navegar = (url) =>{
    navigate(url)
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    console.log("Iniciando sesion...")

    let username,password
    username = event.target[0].value
    password = event.target[1].value

    let datos = {
      username,
      password
    }
    console.log(datos)
    postFetch(URLS.login,datos)
      .then((data) =>data.json())
      .then((data) =>{
        console.log(data)
        if(data.successStatus === true){
          props.setUsername(username)
          navegar(`home/${username}`)
        }else{
          alert(data.errorMessage)
          //Se vacian los input
          event.target[0].value = ""
          event.target[1].value = ""
        }
      })
  }

  return (
    <div className='login'>
      <div className='login-form'>
        <h1>Iniciar sesion</h1>
        <form className='login-form-input' onSubmit={handleSubmit}>
          <input id='username' placeholder='Username'></input>
          <input id='password' type={'password'} placeholder='Contraseña'></input>
          <div className='login-botones'>
            <Button variant='contained' onClick={() => navegar('/registro')}>Registrarse</Button>
            <Button type='submit' variant='contained'>Ingresar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login