import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material'
import Perfil from './Perfil'
import Select from 'react-select';

import './Editar_album.css'
import { deleteFetch, postFetch, putFetch } from '../helpers/peticiones'
import { URLS } from '../helpers/routes'
import { useParams } from 'react-router-dom'

const Editar_albumes = () => {
    const inputName = useRef()
    const [albumes, setAlbumes] = useState([])
    const [selectedItem, setSelectedItem] = useState("")

    //Se obtiene el usuario de la url
    const {username} = useParams()

    //Se obtienen los nombre de los albumes para colocarlos en el select
    useEffect(() => {
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
    

    //Funcion para agregar un nuevo album
    const agregarAlbum = () =>{
        const albumName = inputName.current.value
        if(albumName === ""){
            alert("El nombre del album no puede estar vacio")
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
                if(Array.isArray(data)){
                    alert("Album creado exitosamente")
                }else{
                    alert(data.errorMessage)
                    console.log(data.error)
                }
            })
        inputName.current.value = ""
    }

    //Funcion para modificar un album existente
    const modificarAlbum = () =>{
        const albumName = inputName.current.value
        const newAlbumName = prompt("Ingrese el nuevo nombre del album")
        
        const request = {
            username,
            albumName,
            newAlbumName
        }
        putFetch(URLS.album,request)
            .then((data)=>data.json())
            .then((data)=>{
                if(data[0].successStatus === 1){
                    alert("Album modificado correactemente")
                }else{
                    alert(data[0].errorMessage)
                }
            })
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
                if(data[0].successStatus === 1){
                    alert("Album eliminado correactemente")
                }else{
                    alert(data[0].errorMessage)
                }
            })
    }



  return (
    <div className='editor-perfil'>
        <div className='contenedor'>  
            <div className='contenedor-izq'>
                <Perfil />
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
                        <Select onChange={(e)=>setSelectedItem(e.value)} 
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