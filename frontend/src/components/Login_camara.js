import React, {useRef} from 'react'
import 'axios'
import { useNavigate } from 'react-router-dom'
import { Button,TextField } from '@mui/material'

import './Login.css'
import { URLS, url_servidor } from '../helpers/routes'
import { postFetch } from '../helpers/peticiones'
import Webcam from "react-webcam";


const Login_camara = (props) => {
    //useNavigate para cambiar la url para cargar otros componentes
    const navigate = useNavigate()
    const navegar = (url) =>{
      navigate(url)
    }
    const webcamRef = useRef(null)
  
    const handleSubmit = (event) =>{
      event.preventDefault();
      console.log("Iniciando sesion...")
  
      let foto = webcamRef.current.getScreenshot()
      if(!foto){
        alert("No se pudo capturar la foto")
        return 
      }

      let username,picture
      username = event.target[0].value
      picture = webcamRef.current.getScreenshot().split(",")[1]
  
      let datos = {
        username,
        picture    //La password es la foto en base64
      }
      console.log(datos)
      postFetch(URLS.login_camera,datos)
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
          <h1 style={{"margin":"0"}}>Reconocimiento facial</h1>
          <form className='login-form-input  login-camara' onSubmit={handleSubmit}>
            <TextField id="standard-basic" label="Username" variant="standard"/>
            <Webcam ref={webcamRef} className='login-cam'/>
            <div className='login-botones'>
              <Button variant='contained' onClick={() => navegar('/')}>Regresar</Button>
              <Button type='submit' variant='contained'>Ingresar</Button>
            </div>
          </form>
        </div>
      </div>
    )
}

export default Login_camara