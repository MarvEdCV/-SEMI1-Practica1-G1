import Select from 'react-select';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const Descripcion_foto = () => {
    
    const [selectedLang, setSelectedLang] = useState("")

    const idiomas = [
        {value:"ingles",label:"Ingles"},
        {value:"portugues",label:"Portugues"},
        {value:"aleman",label:"Aleman"}
    ]

    //Se obtiene el usuario de la url
    const {username} = useParams()
    const [dataUser, setDataUser] = useState({
        picture_profile:"",
        name:"",
        username:""
    })


    return (
        <React.Fragment>
            <div className='contenedor'>
                <div className='contenedor-izq'>
                    <img></img>
                </div>
                <div className='contenedor-der'>
                    <div className='contenedor-descripcion'>
                        <div className='contenedor-text'>
                            <h2>Idioma original</h2>
                            <div className='text'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi 
                                non quis exercitationem culpa nesciunt nihil aut nostrum explicabo 
                                reprehenderit optio amet ab temporibus asperiores quasi cupiditate. 
                                Voluptatum ducimus voluptates voluptas?
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor='album'>Idioma</label>
                            <Select menuPosition='fixed' onChange={(e)=>setSelectedLang(e.value)} 
                                    type={'text'} 
                                    options={idiomas}
                            />
                        </div>
                        <d1v className='contenedor-text'>
                            <h2>Traducido al {selectedLang}</h2>
                            <div className='text'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi 
                                non quis exercitationem culpa nesciunt nihil aut nostrum explicabo 
                                reprehenderit optio amet ab temporibus asperiores quasi cupiditate. 
                                Voluptatum ducimus voluptates voluptas?
                            </div>
                        </d1v>
                        
                        
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Descripcion_foto