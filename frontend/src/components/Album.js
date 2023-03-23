import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Album.css'

const Album = ({nombre,fotos,username}) => {

    //useNavigate para cambiar la url para cargar otros componentes
    const navigate = useNavigate()
    const navegar = (url) =>{
        navigate(url)
    }

  return (
    <>
     <div className='nombre'>
    <h2>{nombre}</h2>
</div>
    <div className='album'>
       
        <div className='fotos'>
            {
            fotos.map(foto =>( 
              nombre !== `default-${username}`
                ?
                  <a onClick={()=>navegar(`/descripcion-foto/${username}/${foto.picture_id}`)}>
                    <img src={foto.url}></img>
                  </a>
                :
                  <img src={foto.url}></img>
            ))
            }
        </div>
       
    </div>
    </>
   
  )
}

export default Album