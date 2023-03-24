import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material'
import Webcam from "react-webcam";
import FileBase64 from 'react-file-base64'

import './Editar_perfil.css'
import { postFetch, putFetch } from '../helpers/peticiones';
import { URLS, url_servidor } from '../helpers/routes';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Editar_perfil = ({setUsername}) => {
    const [foto64, setFoto64] = useState("")
    const [filename, setFilename] = useState("")
    const webcamRef = useRef(null)
    //Se obtiene el usuario de la url
    const {username} = useParams()
    const [dataUser, setDataUser] = useState({
        picture_profile:"",
        name:"",
        username:""
    })

    const [passwordValidated, setPasswordValidated] = useState(false)
    const inputPassword = useRef()


    useEffect(() => {
        setUsername(username)
        //Peticion get para la informacion del usuario
        postFetch(URLS.perfil,{username:username})
            .then((data)=>data.json())
            .then((data)=>{
                setDataUser({
                    name:data[0].name||'',
                    username:data[0].username||'',
                    picture_profile:data[0].picture_profile||''
                })
            })
    }, [username])

    


    const handleSubmit = (event) =>{
        event.preventDefault();
        

        //Se obtienen todos los datos del usuario a modificar
        let username,name,password,foto
        username = event.target[0].value
        name = event.target[1].value
        password = event.target[2].value
        foto = foto64 !== "" ? foto64.split(",")[1] : ""

        //Se valida que la contraseña sea correcta
        toast.warning("Editando Perfil!!", {
            position: toast.POSITION.TOP_RIGHT
          });
        postFetch(URLS.login,{username,password})
            .then((data) =>data.json())
            .then((data) =>{
                console.log(data)
                if(!data.successStatus){
                    toast.error("Contraseña incorrecta", {
                        position: toast.POSITION.TOP_RIGHT
                      });
                    
                    return
                }
                if(foto64 === ""){
                    toast.error("Para editar perfil debes de pones una nueva foto", {
                        position: toast.POSITION.TOP_RIGHT
                      });
                    
                    
                    return
                }
                setUsername(username) //Se vuelve a setear el username del usuario
            
                let usuario ={
                    username,
                    name,
                    filename,
                    picture:foto
                }
                console.log(usuario)
                console.log(foto64.length)
                putFetch(URLS.user,usuario)
                    .then((data)=>data.json())
                    .then((data)=>{
                        console.log(data)
                        if(Array.isArray(data)){
                            if(data[0].successStatus){
                                toast.success("Perfil editado con exito !", {
                                    position: toast.POSITION.TOP_RIGHT
                                  });
                                window.location.reload(false);
                                return
                            }
                            toast.error(data.errorMessage, {
                                position: toast.POSITION.TOP_RIGHT
                              });
                            
                        }else{
                            if(data.successStatus){
                                toast.success("Perfil editado con exito !", {
                                    position: toast.POSITION.TOP_RIGHT
                                  });
                                window.location.reload(false);
                                return
                            }
                            toast.error(data.errorMessage, {
                                position: toast.POSITION.TOP_RIGHT
                              });
                            
                        }
                        
                    })
                })
    }

  return (
    <div className='editor-perfil'>
         <ToastContainer />
        <div className='contenedor'>
            <div className='contenedor-izq'>
                <div className='contenedor-izq-items'>  
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
                    <FileBase64 hidden multiple={false} onDone={({name,base64})=>{
                        setFoto64(base64)
                        setFilename(name)
                        //console.log(base64)
                        //console.log(name)
                    }
                    } type="file" />
                    </Button>
                </div>
            </div>
            <div className='contenedor-der'>
                <form className='info' onSubmit={handleSubmit}>
                    <div className='input-text'>
                        <label htmlFor='username'>Nombre de usuario</label>
                        <input className='form-control' type={'text'} id='username' defaultValue={username} readOnly></input>
                    </div>
                    <div className='input-text'>
                        <label htmlFor='nombre'>Nombre completo</label>
                        <input className='form-control' type={'text'} defaultValue={dataUser.name} id='nombre' required></input>
                    </div>
                    <div className='password-text'>
                        <label htmlFor='password'>Confirmar contraseña</label>
                        <div className='pass-ver'>
                            <input className='form-control' ref={inputPassword}  type={'password'} id='password'></input> 
                        </div>
                    </div>
                    <div className='input-text'>
                    <Button type='submit' variant='contained' className='editar' style={{"width":"100%"}}>Editar</Button> 
                    </div>           
                </form>
            </div>
        </div>
    </div>
  )
}

export default Editar_perfil