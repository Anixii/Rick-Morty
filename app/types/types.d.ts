type TResponse<T> ={  
    info : TInfo 
    results: Array<T> 
    error? : boolean | string
}
type TInfo = { 
    count: number,
    pages: number,
    next: string | null,
    prev: null | string
} 

type Charackter = { 
    id: string | number, 
    name: string, 
    status: string, 
    species:string, 
    type: string, 
    gender: string, 
    origin: { 
        name: string 
        url:string
    }, 
    location: { 
        name: string
        url:string
    }, 
    image: string, 
    episode: Array<string>
    created: string
} 
type TLocation = { 
    id: string | number, 
    name: string,  
    type: string, 
    dimension: string, 
    residents: Array<string> 
    created: string
} 
type Episode = {
    id: string | number, 
    name: string,   
    air_date: string 
    episode:string 
    characters: Array<string> 
    created: string
} 
type CharackterParamsFilter = { 
    params: { 
        page:string
    }, 
    filter?:any
}