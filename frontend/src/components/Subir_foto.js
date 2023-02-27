import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material'
import Perfil from './Perfil'
import Select from 'react-select';
import { useParams } from 'react-router-dom'
import { getDataUser } from '../helpers/dataUserRequest'

import FileBase64 from 'react-file-base64'
import { postFetch } from '../helpers/peticiones'
import { URLS } from '../helpers/routes'

const Subir_foto = (props) => {
    const [foto64, setFoto64] = useState("")
    const [filename, setFilename] = useState("")
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
                let album ={
                    value:element,
                    label:element
                }
                setAlbumes(albumes=>[...albumes,album])
            })
        }) 
    }, [])


    const uploadPhoto = () =>{
        //Se quita el encabezado de la foto en base63 para solo dejar el contenido
        const picture = foto64.split(",")[1]
        const albumName = selectedItem

        if(foto64 === ""){
            alert("Debes de seleccionar la foto a subir")
            return
        }
        if(inputName.current.value === ""){
            alert("Debes de colocarle un nombre a la foto")
            return
        }
        
        if(albumName === ""){
            alert("Debes de seleccionar un album")
            return
        }

        console.log(albumName)
        const request = {
            picture,
            filename,
            username,
            albumName
        }
        postFetch(URLS.picture,request)
            .then((data)=>data.json())
            .then((data) =>{
                alert("Imagen subida correctamente")
            }) 
    }
 
    
  return (
    <React.Fragment>
        <div className='contenedor'>
            <div className='contenedor-izq'>
                <Perfil imagen={dataUser.picture_profile}/>
            </div>
            <div className='contenedor-der'>
                <div className='info'>
                    <div className='input-text'>
                        <label htmlFor='foto'>Elegir foto a subir</label>
                            <Button variant="contained" component="label" >
                                Subir
                            <div style={{"display":"none"}}>
                                <FileBase64 hidden multiple={false} onDone={({name,base64})=>{
                                    setFoto64(base64)
                                    setFilename(name)
                                    }
                                } type="file" />
                            </div>
                        </Button> 
                        { filename}
                    </div>
                    <div className='input-text'>
                        <label htmlFor='foto_nombre'>Nombre de la foto</label>
                        <input ref={inputName} type={'text'} id='foto_nombre' name='foto_nombre'></input>
                    </div>
                    <div >
                        <label htmlFor='album'>Album</label>
                        <Select onChange={(e)=>setSelectedItem(e.value)} 
                                type={'text'} 
                                options={albumes}
                        />
                        <Button onClick={uploadPhoto} variant="contained" component="label"style={{"marginTop":"30px"}} >
                            Subir
                        </Button>
                    </div>
                      
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Subir_foto