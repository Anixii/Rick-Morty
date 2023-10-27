type TResponse<T> ={  
    info : TInfo 
    results: Array<T>
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
    origin: TLocation, 
    locations: TLocation, 
    image: string, 
    episode: Array<TEpisode>
    created: string
} 
type TLocation = { 
    id: string | number, 
    name: string,  
    type: string, 
    dimension: string, 
    residents: Array<Charackter> 
    created: string
} 
type Episode = { 
    id: string | number, 
    name: string,   
    air_date: string 
    Episode:string 
    character: Array<Charackter> 
    created: string
} 
type CharackterParamsFilter = { 
    params: { 
        page:string
    }, 
    filter?:any
}