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
        let username,name,password,passwordver,picture
        username = event.target[0].value
        name = event.target[1].value
        password = event.target[2].value
        passwordver = event.target[3].value
        picture = fotoCam.split(",")[1]
        console.log(picture)
        if(password !== passwordver){
            alert("Las contraseñas no coinciden")
        }

        let usuario ={
            username,
            name,
            password,
            filename:"perfil.webp",
            picture
        }
        console.log(usuario)
        postFetch(URLS.user,usuario)
            .then((data)=> data.json())
            .then((data)=> {
                console.log(data)
                if(data[0].successStatus === 1){
                    alert("Usuario registrado exitosamente")
                }else{
                    alert(data.errorMessage)
                }
        }) 
    }




  return (
    <div className='login'>
        <div className='register'>
            <div className='register-image'>
                    {fotoCam ? 
                        <img src={fotoCam} className='register-cam'></img>
                        :
                        <Webcam ref={webcamRef} className='register-cam'/>
                    }
                    {fotoCam ?
                        <Button onClick={()=>setFotoCam("")} color="error">Volver a tomar foto</Button>
                        :
                        <Button onClick={()=>{
                            setFotoCam(webcamRef.current.getScreenshot())
                            console.log(fotoCam)
                        }}>Tomar foto</Button>
                    }
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