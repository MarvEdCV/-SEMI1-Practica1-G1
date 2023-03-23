import React from 'react'
import './Album.css'

const Album = ({nombre,fotos}) => {
  return (
    <>
     <div className='nombre'>
    <h2>{nombre}</h2>
</div>
    <div className='album'>
       
        <div className='fotos'>
            {
            fotos.map(foto =>( 
                <img src={foto.url}></img>
            ))
            }
        </div>
       
    </div>
    </>
   
  )
}

export default Album