import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material'
import Perfil from './Perfil'
import Select from 'react-select';
import { useParams } from 'react-router-dom'
import { getDataUser } from '../helpers/dataUserRequest'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import FileBase64 from 'react-file-base64'
import { postFetch } from '../helpers/peticiones'
import { URLS } from '../helpers/routes'

const Subir_foto = (props) => {
    const [foto64, setFoto64] = useState("")
    const [filename, setFilename] = useState("")
    const [description, sedescription] = useState("")
    const inputName = useRef()
    const [albumes, setAlbumes] = useState([])
    const [selectedItem, setSelectedItem] = useState("")

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

        //Se obtienen los nombre de los albumes para colocarlos en el select
        setAlbumes([])
        postFetch(URLS.album_get,{username:username}) 
        .then((data)=>data.json())
        .then((data)=>{
            Object.keys(data.result.album).forEach(element =>{
                //Si el album es el de las fotos de perfil no se almacena
                if(element === `default-${username}`) return

                let album ={
                    value:element,
                    label:element
                }
                setAlbumes(albumes=>[...albumes,album])
            })
        }) 
    }, [])

    const resolveArguments = () => {
        console.log("entre")
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
        if(description.trim() == ''){
            toast.error("Debe de ingresar una descripción", {
              position: toast.POSITION.TOP_RIGHT
            });
      
            return false;
          }
        return true;
      }
    const uploadPhoto = () =>{
        //Se quita el encabezado de la foto en base63 para solo dejar el contenido
        const picture = foto64.split(",")[1]
        const albumName = selectedItem

       

        console.log(albumName)
        const request = {
            picture,
            filename,
            username,
            description
        }
        if(resolveArguments()){
            toast.warning("Subiendo Foto!!", {
                position: toast.POSITION.TOP_RIGHT
              });
            postFetch(URLS.picture,request)
            .then((data)=>data.json())
            .then((data) =>{
                toast.success("La imagen se ha subido con exito !", {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }).catch((error) =>{
                toast.error("Lo sentimos hubo un error intenta de nuevo", {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }) 
        }
    }
 
    const handleTextChange = event => {
        sedescription(event.target.value);
      };
  return (
    <React.Fragment>
         <ToastContainer />
        <div className='contenedor'>
            <div className='contenedor-izq'>
                <Perfil imagen={dataUser.picture_profile}/>
            </div>
            <div className='contenedor-der'>
                <div className='info'>
                    <div className='input-text'>
                        
                        <br></br>
                            <Button variant="contained" component="label" color='error'  style={{"width":"100%"}} >
                                Seleccionar Foto
                            <div style={{"display":"none"}}>
                                <FileBase64 hidden multiple={false} onDone={({name,base64})=>{
                                    setFoto64(base64)
                                    setFilename(name)
                                    }
                                } type="file" />
                            </div>
                        </Button> 
                       
                    </div>
                    <div className='input-text'>
                        <label htmlFor='foto_nombre' >Nombre de la foto</label>
                        <input className='form-control' value={filename} type={'text'} id='foto_nombre' name='foto_nombre'></input>
                    </div>
                    <div  className='input-text'>
                        <label htmlFor='album'>Descripción</label>
                       <textarea  className='form-control' value = {description} onChange={handleTextChange} type={'text'} id='descripcion' name='descripcion'   ></textarea>
                        
                    </div>
                    <Button   onClick={uploadPhoto} variant="contained" component="label"style={{"marginTop":"30px"}} >
                            Subir
                        </Button>
                      
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Subir_foto