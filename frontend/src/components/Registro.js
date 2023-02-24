import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { postFetch } from '../helpers/peticiones'
import Webcam from "react-webcam";
import { URLS } from '../helpers/routes';

import './Login.css'


const Registro = () => {
    const [fotoCam, setFotoCam] = useState("")
    const webcamRef = useRef(null)

    //useNavigate para cambiar la url para cargar otros componentes
    const navigate = useNavigate()
    const navegar = (url) =>{
        navigate(url)
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        if(fotoCam === ""){
            alert("Para registrarse debe de tomarse una foto")
            return
        }

        //Se obtienen todos los datos del usuario a registrar
        let username,nombre,password,passwordver,foto
        username = event.target[0].value
        nombre = event.target[1].value
        password = event.target[2].value
        passwordver = event.target[3].value
        foto = fotoCam

        let usuario ={
            username,
            nombre,
            password,
            passwordver,
            foto
        }
        postFetch(URLS.regitro,usuario)
            .then((data)=> data.json())
            .then((data)=> {
                console.log(data)
                if(data.resultado === true){
                    navigate("/home")
                }else{
                    alert(data.error)
                }
            })
    }


    //Almacena la foto tomada
    const tomarFoto = () =>{
        const imageSrc = webcamRef.current.getScreenshot();
        setFotoCam(imageSrc);
    }


  return (
    <div className='login'>
        <div className='register'>
            <div className='register-image'>
                <Webcam ref={webcamRef} className='register-cam'/>
                <Button onClick={tomarFoto}>Tomar foto</Button>
            </div>
            <div className='login-form'>
                <h1>Registrarse</h1>
                <form className='login-form-input' onSubmit={handleSubmit}>
                    <input id='username' placeholder='Username' required></input>
                    <input id='nombre' placeholder='Nombre completo' required></input>
                    <input type={'password'} id='password' placeholder='Contraseña' required></input>
                    <input type={'password'} id='password-ver' placeholder='Verificar contraseña' required></input>
                    <div className='login-botones'>
                        <Button variant='contained' onClick={() => navegar('/')}>Login</Button> 
                        <Button type='submit' color='success' variant='contained'>Registrarse</Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Registro