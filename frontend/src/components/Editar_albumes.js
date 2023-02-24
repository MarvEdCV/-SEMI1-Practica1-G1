import React from 'react'
import { Button } from '@mui/material'
import Perfil from './Perfil'

import './Editar_album.css'

const Editar_albumes = () => {

    
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
                        <input name='nombre-album' id='nombre-album'></input>
                        <div className='botones'>
                            <Button variant='contained'>Agregar</Button> 
                            <Button variant='contained'>Cancelar</Button>
                            <Button variant='contained'>Modificar</Button>
                        </div>
                    </div>   
                    <div className='del-album'>
                        <label htmlFor='album'>Album</label>
                        <select type={'text'} id='album' name='album'>
                            <option>A</option>
                        </select>
                        <Button variant='contained' className='btn-del'>Elminar album</Button>
                    </div>       
                </div>
            </div>
        </div>
    </div>
  )
}

export default Editar_albumes