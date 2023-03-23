import Select from 'react-select';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { postFetch } from '../helpers/peticiones';
import { URLS } from '../helpers/routes';
import { getDataUser } from '../helpers/dataUserRequest';

const Descripcion_foto = (props) => {
    
    const [selectedLang, setSelectedLang] = useState("")
    const [lblLanguage, setLblLanguage] = useState("Español")
    const [description, setDescription] = useState("")
    const [traduction, settraduction] = useState("")
    const [pictureUrl, setPictureUrl] = useState("")

    const idiomas = [
        {value:"en",label:"Ingles"},
        {value:"ru",label:"Ruso"},
        {value:"ja",label:"Japones"},
        {value:"he",label:"Hebreo"}
    ]

    //Se obtiene el usuario de la url
    const {username,picture_id} = useParams()
    const [dataUser, setDataUser] = useState({
        picture_profile:"",
        name:"",
        username:""
    })


    useEffect(()=>{
        if(selectedLang === "") return
        //onsole.log(picture_id)
        //console.log(selectedLang)
        const picture = {
            picture_id,
            language: selectedLang
        }

        postFetch(URLS.traduction,picture)
            .then((data)=>data.json())
            .then((data)=>{
                settraduction(data.traduction)
                setDescription(data.description)
                setPictureUrl(data.url)
            })
    },[selectedLang])


    useEffect(()=>{
        
        getDataUser(username,setDataUser)
        props.setUsername(username)
        const picture = {
            picture_id,
            language: "es"
        }
        postFetch(URLS.traduction,picture)
            .then((data)=>data.json())
            .then((data)=>{
                setPictureUrl(data.url)
                settraduction(data.traduction)
                setDescription(data.description)
            })
    },[])


    return (
        <React.Fragment>
            <div className='contenedor'>
                <div className='contenedor-izq'>
                    <img src={pictureUrl}></img>
                </div>
                <div className='contenedor-der'>
                    <div className='contenedor-descripcion'>
                        <div className='contenedor-text'>
                            <h2>Idioma original</h2>
                            <div className='text'>
                                {description}
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor='album'>Idioma</label>
                            <Select menuPosition='fixed' onChange={(e)=>{
                                    setSelectedLang(e.value)
                                    setLblLanguage(e.label)    
                                }} 
                                    type={'text'} 
                                    options={idiomas}
                            />
                        </div>
                        <d1v className='contenedor-text'>
                            <h2>Traducido al {lblLanguage}</h2>
                            <div className='text'>
                                {traduction}
                            </div>
                        </d1v>
                        
                        
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Descripcion_foto