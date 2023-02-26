import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import Perfil from './Perfil'
import { useParams } from 'react-router-dom'
import { getDataUser } from '../helpers/dataUserRequest'

const Subir_foto = (props) => {
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
    <React.Fragment>
        <div className='contenedor'>
            <div className='contenedor-izq'>
                <Perfil imagen={dataUser.picture_profile}/>
            </div>
            <div className='contenedor-der'>
                <div className='info'>
                    <div>
                        <label htmlFor='foto'>Elegir foto a subir</label>
                        <Button variant="contained" component="label">
                            Subir
                        <input hidden multiple type="file" />
                        </Button>
                    </div>
                    <div className='input-text'>
                        <label htmlFor='foto_nombre'>Nombre de la foto</label>
                        <input type={'text'} id='foto_nombre' name='foto_nombre'></input>
                    </div>
                    <div className='input-text'>
                        <label htmlFor='album'>Album</label>
                        <select type={'text'} id='album' name='album'>
                            <option>A</option>
                        </select>
                    </div>
                    <div className='input-text'>
                        <Button variant='contained'>Subir foto</Button> 
                    </div>  
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default Subir_foto