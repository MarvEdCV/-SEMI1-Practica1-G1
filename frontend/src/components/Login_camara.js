import React, {useRef} from 'react'
import 'axios'
import { useNavigate } from 'react-router-dom'
import { Button,TextField } from '@mui/material'

import './Login.css'
import { URLS, url_servidor } from '../helpers/routes'
import { postFetch } from '../helpers/peticiones'
import Webcam from "react-webcam";
import { toast, ToastContainer } from 'react-toastify'


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
        toast.error("Error al capturar la foto, intente de nuevo", {
          position: toast.POSITION.TOP_RIGHT
        });
        return 
      }
      
      let username,picture
      username = event.target[0].value
      picture = foto.split(",")[1]
  
      let datos = {
        username,
        picture    //La password es la foto en base64
      }
      console.log(datos)
      postFetch(URLS.login_camera,datos)
        .then((data) =>data.json())
        .then((data) =>{
          console.log(data)
          if(data.FaceMatches.length>0){
            props.setUsername(username)
            navegar(`/home/${username}`)
          }else if(data.FaceMatches.length===0){
            toast.error("No se ha iniciado sesion, el rostro no coincide", {
              position: toast.POSITION.TOP_RIGHT
            });
          }else{
            toast.error("Error al iniciar sesion, intente de nuevo", {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        })
        .catch((error) =>{
          toast.error("Lo sentimos hubo un error intenta de nuevo", {
              position: toast.POSITION.TOP_RIGHT
            });
      })
    }
  
    return (
      <div className='login'>
        <ToastContainer />
        <div className='login-form'>
          <h1 style={{"margin":"0"}}>Reconocimiento facial</h1>
          <form className='login-form-input  login-camara' onSubmit={handleSubmit}>
            <TextField id="standard-basic" label="Username" variant="standard" required/>
            <Webcam 
              ref={webcamRef} 
              className='login-cam'
              screenshotFormat='image/jpeg'
            />
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