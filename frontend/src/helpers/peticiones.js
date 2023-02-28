export async function postFetch(url='',data={}){
    const response = await fetch(url,{
        method:"POST",
        mode:"cors",
        crossorigin: true,
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })
    return response
}


export async function putFetch(url='',data={}){
    const response = await fetch(url,{
        method:"PUT",
        mode:"cors",
        crossorigin:true,
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    return response
}


export async function deleteFetch(url='',data={}){
    const response = await fetch(url,{
        method:"DELETE",
        mode:"cors",
        crossorigin:true,
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(data)
    })
    return response
}

