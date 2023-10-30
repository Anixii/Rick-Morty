export const getCharacters = async (page:number) =>{ 
    const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`, {
      next: {
        revalidate: 0,
      }, 
       
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    } 
    const data = await res.json() 
    
    return data
  }  
  export const getFilteredCharaters = async (page: string,status: string, spacies:string, gender: string,name:string ) =>{  
    const res = await fetch(`https://rickandmortyapi.com/api/character/? 
    ${page === '' ? "" : `page=${page}`} 
    ${gender === 'Gender' ? "" : `&gender=${gender}`} 
    ${spacies === 'Species' ? "" : `&species=${spacies}`}
    ${status === 'Status' ? "" : `&status=${status}`}
    ${name === '' ? "" : `&name=${name}`}
    `, {
      next: {
        revalidate: 0,
      }, 
    })
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    } 
    const data:TResponse<Charackter> = await res.json() 
    console.log(data);
    
    return data
  }