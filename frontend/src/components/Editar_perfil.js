import React, { useRef, useState } from 'react'
import { Button } from '@mui/material'
import Webcam from "react-webcam";

import './Editar_perfil.css'


const Editar_perfil = () => {
    const [fotoCam, setFotoCam] = useState("")
    const webcamRef = useRef(null)


    const handleSubmit = (event) =>{
        event.preventDefault();

        //Se obtienen todos los datos del usuario a modificar
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
        console.log(usuario)
    }


     //Almacena la foto tomada
     const tomarFoto = () =>{
        const imageSrc = webcamRef.current.getScreenshot();
        setFotoCam(imageSrc);
    }

  return (
    <div className='editor-perfil'>
        <div className='contenedor'>
            <div className='contenedor-izq'>
                <div className='contenedor-izq-items'>  
                    {fotoCam === "" && <Webcam ref={webcamRef} className='register-cam'/>}
                    {fotoCam === "" || <img src={fotoCam} className='register-cam'></img>}
                    <Button onClick={tomarFoto}>Tomar foto</Button>
                    <Button variant="contained" component="label" style={{"marginTop":"30px"}}>
                        Subir
                    <input hidden multiple type="file" />
                    </Button>
                </div>
            </div>
            <div className='contenedor-der'>
                <form className='info' onSubmit={handleSubmit}>
                    <div className='input-text'>
                        <label htmlFor='username'>Nombre de usuario</label>
                        <input type={'text'} id='username'></input>
                    </div>
                    <div className='input-text'>
                        <label htmlFor='nombre'>Nombre completo</label>
                        <input type={'text'} id='nombre'></input>
                    </div>
                    <div className='password-text'>
                        <label htmlFor='password'>Confirmar contraseña</label>
                        <div className='pass-ver'>
                            <input type={'password'} id='password'></input>
                            <Button variant='contained'>Confirmar password</Button> 
                        </div>
                    </div>
                    <div className='input-text'>
                    <Button type='submit' variant='contained' className='editar'>Editar</Button> 
                    </div>           
                </form>
            </div>
        </div>
    </div>
  )
}

export default Editar_perfil