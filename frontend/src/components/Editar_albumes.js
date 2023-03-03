import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material'
import Perfil from './Perfil'
import Select from 'react-select';

import './Editar_album.css'
import { deleteFetch, postFetch, putFetch } from '../helpers/peticiones'
import { URLS } from '../helpers/routes'
import { useParams } from 'react-router-dom'
import { getDataUser } from '../helpers/dataUserRequest';

const Editar_albumes = (props) => {
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
    

    //Funcion para agregar un nuevo album
    const agregarAlbum = () =>{
        const albumName = inputName.current.value
        if(albumName === ""){
            alert("El nombre del album no puede estar vacio")
            return
        }else if(albumName === `default-${username}`){
            alert("No se posible crear un album con ese nombre")
            return    
        }

        //Se valida si exite un album con el mismo nombre
        const found = albumes.some(el => el.value === albumName)
        if(found){
            alert("Error al crear el album. Ya existe un album con ese nombre")
            return
        }

        const request = {
            username,
            albumName
        }
        console.log(request)
        postFetch(URLS.album,request)
            .then((data)=>data.json())
            .then((data)=>{
                console.log(data)
                if(Array.isArray(data)){
                    if(data[0].successStatus === 1){
                        alert("Album creado exitosamente")
                        window.location.reload(false);
                    }else{
                        alert(data.errorMessage)
                        console.log(data.errorMessage)
                    }
                }else{
                    if(data.successStatus === 1){
                        alert("Album creado exitosamente")
                        window.location.reload(false);
                    }else{
                        alert(data.errorMessage)
                        console.log(data.errorMessage)
                    }
                }
            })
        inputName.current.value = ""
    }


    //Funcion para modificar un album existente
    const modificarAlbum = () =>{
        const albumName = inputName.current.value
        const newAlbumName = prompt("Ingrese el nuevo nombre del album")

        if(newAlbumName === null) return

        //Validaciones con respecto al nombre del album
        if(albumName === ""){
            alert("El nombre del album no puede estar vacio")
            return
        }else if(albumName === `default-${username}`){
            alert("No se posible modificar ese album")    
            return
        }
        if(newAlbumName === `default-${username}`){
            alert("No se puede asignar ese nombre a un album")    
            return
        }else if(newAlbumName === ""){
            alert("El nuevo nombre del album debe tener por lo menos un caracter")
            return
        }

        //Se valida si exite un album con el mismo nombre
        const found = albumes.some(el => el.value === newAlbumName)
        if(found){
            alert("Error al modificar el album. Ya existe un album con ese nombre")
            return
        }

        const request = {
            username,
            albumName,
            newAlbumName
        }
        putFetch(URLS.album,request)
            .then((data)=>data.json())
            .then((data)=>{
                if(Array.isArray(data)){
                    if(data[0].successStatus === 1){
                        alert("Album modificado correactemente")
                        window.location.reload(false);
                    }else{
                        alert(data[0].errorMessage)
                        console.log(data[0].errorMessage)
                    }
                }else{
                    if(data.successStatus === 1){
                        alert("Album modificado correactemente")
                        window.location.reload(false);
                    }else{
                        alert(data.errorMessage)
                        console.log(data.errorMessage)
                    }
                }
            })
        inputName.current.value = ""
    }


    //Funcion para eliminar un album
    const deleteAlbum = () =>{
        const albumName = selectedItem

        const request = {
            username,
            albumName
        }

        deleteFetch(URLS.album,request)
            .then((data)=>data.json())
            .then((data)=>{
                if(Array.isArray(data)){
                    if(data[0].successStatus === 1){
                        alert("Album eliminado correactemente")
                        window.location.reload(false);
                    }else{
                        alert(data.errorMessage)
                        console.log(data.error)
                    }
                }else{
                    if(data.successStatus === 1){
                        alert("Album eliminado correactemente")
                        window.location.reload(false);
                    }else{
                        alert(data.errorMessage)
                        console.log(data.error)
                    }
                }
            })
    }



  return (
    <div className='editor-perfil'>
        <div className='contenedor'>  
            <div className='contenedor-izq'>
                <Perfil imagen={dataUser.picture_profile}/>
            </div>
            <div className='contenedor-der'>
                <div className='info'>
                    <div className='mod-album'>
                        <label htmlFor='nombre-album'>Nombre album</label>
                        <input name='nombre-album' id='nombre-album' ref={inputName}></input>
                        <div className='botones'>
                            <Button onClick={agregarAlbum} variant='contained'>Agregar</Button> 
                            <Button onClick={()=>inputName.current.value = ""} variant='contained'>Cancelar</Button>
                            <Button onClick={modificarAlbum} variant='contained'>Modificar</Button>
                        </div>
                    </div>   
                    <div className='del-album'>
                        <label htmlFor='album'>Album</label>
                        <Select menuPosition='fixed' onChange={(e)=>setSelectedItem(e.value)} 
                                type={'text'} 
                                id='album' 
                                name='album' 
                                options={albumes}
                        />
                        <Button onClick={deleteAlbum} variant='contained' className='btn-del'>Elminar album</Button>
                    </div>       
                </div>
            </div>
        </div>
    </div>
  )
}

export default Editar_albumes