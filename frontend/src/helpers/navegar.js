
import React from 'react'
import { useNavigate } from 'react-router-dom'


//useNavigate para cambiar la url para cargar otros componentes
function Navegar({url}){  
    console.log("hlo")
    const navigate = useNavigate()
    return navigate(url)
}

export default Navegar