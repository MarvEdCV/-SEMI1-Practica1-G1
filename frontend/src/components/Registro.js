import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { postFetch } from '../helpers/peticiones'
import Webcam from "react-webcam";
import { URLS } from '../helpers/routes';
import FileBase64 from 'react-file-base64'

import './Login.css'


const Registro = () => {
    const [foto64, setFoto64] = useState("")
    const [filename, setFilename] = useState("")
    const webcamRef = useRef(null)

    //useNavigate para cambiar la url para cargar otros componentes
    const navigate = useNavigate()
    const navegar = (url) =>{
        navigate(url)
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        if(foto64 === ""){
            alert("Para registrarse debe de tomarse una foto")
            return
        }

        //Se obtienen todos los datos del usuario a registrar
        let username,name,password,passwordver,picture
        username = event.target[0].value
        name = event.target[1].value
        password = event.target[2].value
        passwordver = event.target[3].value
        picture = foto64.split(",")[1]
        console.log(picture)
        if(password !== passwordver){
            alert("Las contraseñas no coinciden")
            return
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
                if(Array.isArray(data)){
                    if(data[0].successStatus === 1){
                        alert("Usuario registrado exitosamente")
                        navegar("/")
                        return
                    }
                    alert("Error al crear el usuario. Ya existe un usuario con ese username.")
                }else{
                    if(data.successStatus === 1){
                        alert("Usuario registrado exitosamente")
                        navegar("/")
                        return
                    }
                    alert("Error al crear el usuario. Ya existe un usuario con ese username.")
                }
               
        }) 
    }




  return (
    <div className='login'>
        <div className='register'>
            <div className='register-image'>  
                    {foto64 ? 
                        <img src={foto64} className='register-cam'></img>
                        :
                        <Webcam 
                            ref={webcamRef} 
                            className='register-cam' 
                            screenshotFormat='image/jpeg'
                        />
                    }
                    {foto64 ?
                        <Button onClick={()=>setFoto64("")} color="error">Volver a tomar foto</Button>
                        :
                        <Button onClick={()=>{
                            setFoto64(webcamRef.current.getScreenshot())
                            setFilename("perfil.webp")
                            //console.log(foto64)
                        }}>Tomar foto</Button>
                    }
                    <Button variant="contained" component="label" style={{"marginTop":"30px"}}>
                        Subir
                        
                    <div style={{"display":"none"}}>
                        <FileBase64 hidden multiple={false} onDone={({name,base64})=>{
                            setFoto64(base64)
                            setFilename(name)
                        }
                        } type="file" />
                    </div>
                    </Button>
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