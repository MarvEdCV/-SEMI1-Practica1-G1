import { postFetch } from "./peticiones"
import { URLS } from "./routes"



export const getDataUser = (username,setDataUser) =>{
    postFetch(URLS.perfil,{username:username})
    .then((data)=>data.json())
    .then((data)=>{
        setDataUser({
            name:data[0].name||'',
            username:data[0].username||'',
            picture_profile:data[0].picture_profile||'',
            labels:data[0].labels.split(",")
        })
    })
}