import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material'
import Perfil from './Perfil'
import { useParams } from 'react-router-dom'
import { getDataUser } from '../helpers/dataUserRequest'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './Extraer_texto.css'
import FileBase64 from 'react-file-base64'
import { postFetch } from '../helpers/peticiones'
import { URLS } from '../helpers/routes'

const Extraer_texto = (props) => {
    const [foto64, setFoto64] = useState("")
    const [filename, setFilename] = useState("")
    const [textoExtraido, setTextoExtraido] = useState("")

    const styles = {
        textExtract:{
            display:"flex",
            maxHeight:"20rem"
        }
    }

    //Se obtiene el usuario de la url
    const {username} = useParams()
    const [dataUser, setDataUser] = useState({
        picture_profile:"",
        name:"",
        username:""
    })

    
    useEffect(() => {
        //Peticion get para la informacion del usuario
        getDataUser(username,setDataUser)
        props.setUsername(username)
    }, [])

    const resolveArguments = () => {

        if(filename.trim() == ''){
          toast.error("Debe de seleccionar una imagene", {
            position: toast.POSITION.TOP_RIGHT
          });
    
          return false;
        }
    
        if(foto64.trim() == ''){
          toast.error("Debe de seleccionar una imagen", {
            position: toast.POSITION.TOP_RIGHT
          });
    
          return false;
        }
        return true;
      }
    const extractText = () =>{
        //Se quita el encabezado de la foto en base63 para solo dejar el contenido
        const picture = foto64.split(",")[1]
        const body = {
            picture
        }
        
        if(resolveArguments()){
            toast.warning("Analizando imagen para extraer texto!!", {
                position: toast.POSITION.TOP_RIGHT
              });
            postFetch(URLS.extract_text,body)
                .then((data) => data.json())
                .then((data)=>{
                    setTextoExtraido(data)
                    toast.success("Se ha extraido el texto con exito !", {
                        position: toast.POSITION.TOP_RIGHT
                      });
                })
                .catch((error) =>{
                    toast.error("Lo sentimos hubo un error intenta de nuevo", {
                        position: toast.POSITION.TOP_RIGHT
                      });
                })

        }
    }
 
  return (
    <React.Fragment>
         <ToastContainer />
        <div className='contenedor'>
            <div className='contenedor-izq'>
                <Perfil imagen={dataUser.picture_profile}/>
            </div>
            <div className='contenedor-der'>
                <div className='info'>
                    <div className='contenedor-image-extract'>
                        <Button  variant="contained" component="label" color='warning'  style={{"width":"50%"}} >
                            Seleccionar Foto
                            <div style={{"display":"none"}}>
                                <FileBase64 hidden multiple={false} onDone={({name,base64})=>{
                                    setFoto64(base64)
                                    setFilename(name)
                                    }
                                } type="file" />
                            </div>
                        </Button> 
                        <br></br>
                        
                        <img className='image-extract' src={foto64}></img>   
                       
                       
                        <br></br>
                    </div>
                    <Button onClick={extractText} variant="contained" component="label"style={{"marginTop":"30px"}} >
                        Extraer texto
                    </Button>
                    <textarea  className='extracted-text form-control' value = {textoExtraido} type={'text'} readOnly></textarea>
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Extraer_texto