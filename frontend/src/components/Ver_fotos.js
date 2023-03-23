import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDataUser } from '../helpers/dataUserRequest'
import { postFetch } from '../helpers/peticiones'
import { URLS } from '../helpers/routes'
import Album from './Album'
import Perfil from './Perfil'

import "./Album.css"

const Ver_fotos = (props) => {
  const [albumes, setAlbumes] = useState([])
  const {username} = useParams()
    const [dataUser, setDataUser] = useState({
        picture_profile:"",
        name:"",
        username:""
    })

    //Peticion get para la informacion del usuario
    useEffect(() => {
      getDataUser(username,setDataUser)

      props.setUsername(username)
  }, [])



  useEffect(() => {
    //Se obtienen los nombre de los albumes para colocarlos en el select
    setAlbumes([])
    postFetch(URLS.album_get,{username:username}) 
    .then((data)=>data.json())
    .then((data)=>{
        Object.keys(data.result.album).forEach(nombre =>{
            let album ={
                nombre:nombre,
                fotos:data.result.album[nombre]
            }
            //console.log(album.fotos)
            setAlbumes(albumes=>[...albumes,album])
        })
    }) 
  }, [])  


  return (
    <div className='ver-fotos'>
        <div className='contenedor'>
            <div className='contenedor-izq'>
                <Perfil imagen={dataUser.picture_profile}/>
            </div>
            <div className='contenedor-albumes'>
              <div className='contenedor-fotos'>
                {
                  albumes.map(({nombre,fotos})=>(
                    <Album nombre={nombre} fotos={fotos} username={username}/>
                  ))
                }
              </div>
                
            </div>
        </div>
    </div>
  )
}

export default Ver_fotos