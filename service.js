async function getNews(){
    try {
        const res =await fetch('https://68088e67942707d722dea28c.mockapi.io/news')
        if(!res.ok){
            throw new Error(`${res.status}`);
            
        }
        const data =await res.json();
        return data;
    } catch (error) {
        console.log(error.message); 
    }
}
async  function deleteByID(id){
    const res = await fetch(`https://68088e67942707d722dea28c.mockapi.io/news/${id}`,{
        method:'DELETE'
    });
    const data = await res.json();
    return data;
}
async function addNews(newNews) {
    const response = await fetch(`https://68088e67942707d722dea28c.mockapi.io/news`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNews)
    });
    return await response.json();
}
async function updateNews(id,updatedNews){
    const resp =  await fetch(`https://68088e67942707d722dea28c.mockapi.io/news/${id}`,{
        method:'PUT',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(updatedNews)
    })
    if(resp.ok){
        const data = await resp.json();
        console.log(data);
        return data;
        
    }else{
        throw new Error("Mehsul yenilenebilmedi");
    }
}
export{
    getNews,
    deleteByID,
    addNews,
    updateNews
   
}