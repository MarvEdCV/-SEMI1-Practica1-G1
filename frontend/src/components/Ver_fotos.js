import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDataUser } from '../helpers/dataUserRequest'
import Perfil from './Perfil'

const Ver_fotos = (props) => {
  const {username} = useParams()
    const [dataUser, setDataUser] = useState({
        picture_profile:"",
        name:"",
        username:""
    })

    useEffect(() => {
      //Peticion get para la informacion del usuario
      console.log(username)
      getDataUser(username,setDataUser)

      props.setUsername(username)
  }, [])




  return (
    <div className='ver-fotos'>
        <div className='contenedor'>
            <div className='contenedor-izq'>
                <Perfil imagen={dataUser.picture_profile}/>
            </div>
            <div className='contenedor-der contenedor-fotos'>
                
            </div>
        </div>
    </div>
  )
}

export default Ver_fotos