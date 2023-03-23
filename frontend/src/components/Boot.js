import React, { useEffect, useState } from 'react'

import "./Home.css" 
import Perfil from './Perfil'
import { useParams } from 'react-router-dom'
import { getDataUser } from '../helpers/dataUserRequest'



const Boot = (props) => {
  
    

  return (
    <React.Fragment>
    <div className='contenedor'>
        <div className='contenedor-izq'>
           
        </div>
        <div className='contenedor-der'>
            <div className='info'>
                <div className='input-text'>
                   
                   
                </div>
                
            </div>
        </div>
    </div>
        
    </React.Fragment>
  )
}

export default Boot