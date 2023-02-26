import React, { useRef, useState } from 'react'
import { Button } from '@mui/material'
import Webcam from "react-webcam";
import FileBase64 from 'react-file-base64'

import './Editar_perfil.css'


const Editar_perfil = () => {
    const [foto64, setFoto64] = useState("")
    const [filename, setFilename] = useState("")
    const webcamRef = useRef(null)


    const handleSubmit = (event) =>{
        event.preventDefault();

        //Se obtienen todos los datos del usuario a modificar
        let username,nombre,password,passwordver,foto
        username = event.target[0].value
        nombre = event.target[1].value
        password = event.target[2].value
        passwordver = event.target[3].value
        foto = foto64

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
        setFoto64(imageSrc);
    }

  return (
    <div className='editor-perfil'>
        <div className='contenedor'>
            <div className='contenedor-izq'>
                <div className='contenedor-izq-items'>  
                    {foto64 ? 
                        <img src={foto64} className='register-cam'></img>
                        :
                        <Webcam ref={webcamRef} className='register-cam'/>
                    }
                    {foto64 ?
                        <Button onClick={()=>setFoto64("")} color="error">Volver a tomar foto</Button>
                        :
                        <Button onClick={()=>{
                            setFoto64(webcamRef.current.getScreenshot())
                            setFilename("perfil.webp")
                            console.log(foto64)
                        }}>Tomar foto</Button>
                    }
                    <Button variant="contained" component="label" style={{"marginTop":"30px"}}>
                        Subir
                    <FileBase64 hidden multiple={false} onDone={({name,base64})=>{
                        setFoto64(base64)
                        setFilename(name)
                        console.log(base64)
                        console.log(name)
                    }
                    } type="file" />
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