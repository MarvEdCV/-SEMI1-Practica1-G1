import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import { postFetch } from '../helpers/peticiones'
import Webcam from "react-webcam";
import { URLS } from '../helpers/routes';
import FileBase64 from 'react-file-base64'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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
            toast.error("Para registrarse debe de agregar una foto", {
                position: toast.POSITION.TOP_RIGHT
              });
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
            toast.error("Las contraseñas ingresadas no coinciden", {
                position: toast.POSITION.TOP_RIGHT
              });
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
                    if(data[0].successStatus === false){
                        //alert("Error al crear el usuario. Ya existe un usuario con ese username.")
                        toast.error("Error al crear el usuario. Ya existe un usuario con ese username.", {
                            position: toast.POSITION.TOP_RIGHT
                          });
                        
                    }
                    toast.success("Usuario registrado exitosamente", {
                        position: toast.POSITION.TOP_RIGHT
                      });
                    
                        navegar("/")
                        return
                   
                }else{
                    toast.error("Error al crear el usuario. Ya existe un usuario con ese username.", {
                        position: toast.POSITION.TOP_RIGHT
                      });
                    
                }
               
        }) 
    }




  return (
    <div className='login'>
        <div className='register'>
        <ToastContainer />
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
                    <input className='form-control' id='username' placeholder='Username' required></input>
                    <input className='form-control' id='nombre' placeholder='Nombre completo' required></input>
                    <input className='form-control' type={'password'} id='password' placeholder='Contraseña' required></input>
                    <input className='form-control' type={'password'} id='password-ver' placeholder='Verificar contraseña' required></input>
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