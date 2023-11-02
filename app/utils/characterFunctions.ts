export const getCharacters = async () =>{ 
    const res = await fetch(`https://rickandmortyapi.com/api/character/`, {
      next: {
        revalidate: 0,
      }, 
       
    });
    
    if (!res.ok) {
      return 'No data'
    } 
    const data = await res.json() 
    
    return data
  }  
export const getEpisodes = async () =>{ 
    const res = await fetch(`https://rickandmortyapi.com/api/episode/`, {
      next: {
        revalidate: 0,
      }, 
       
    });
    
    if (!res.ok) {
      return 'No data'
    } 
    const data = await res.json() 
    
    return data
  }   
export const getLocations = async () =>{ 
    const res = await fetch(`https://rickandmortyapi.com/api/location/`, {
      next: {
        revalidate: 0,
      }, 
       
    });
    
    if (!res.ok) {
      return 'No data'
    } 
    const data = await res.json() 
    
    return data
  }   
  export const getFilteredEpisode = async (page: any,) =>{  
    const res = await fetch(`https://rickandmortyapi.com/api/episode/? 
    ${page === '' ? "" : `&page=${page}`} 
    `, {
      next: {
        revalidate: 0,
      }, 
    }) 
    const data:TResponse<Episode> = await res.json()  
    return data
  }
  export const getFilteredCharaters = async (page: string,status: string, spacies:string, gender: string,name:string ) =>{  
    const res = await fetch(`https://rickandmortyapi.com/api/character/? 
    ${page === '' ? "" : `&page=${page}`} 
    ${gender === 'Gender' ? "" : `&gender=${gender}`} 
    ${spacies === 'Species' ? "" : `&species=${spacies}`}
    ${status === 'Status' ? "" : `&status=${status}`}
    ${name === '' ? "" : `&name=${name}`}
    `, {
      next: {
        revalidate: 0,
      }, 
    })
    // if (!res.ok) {
    //   throw new Error('Fetch data')
    // } 
    const data:TResponse<Charackter> = await res.json() 
    return data
  } 

export const getLastEnpoint = (url:any) =>{ 
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1]; 
    return lastPart - 1
  }