import React, { FC } from 'react'
interface defineCharacterType { 
    params: { 
        id: string | number
    }
}  
async function getData(id:string | number) {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {next: { 
      revalidate: 60
    }})
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    return await res.json()
  } 
export async function generateStaticParams() {
    const character:TResponse<Charackter>= await fetch(`https://rickandmortyapi.com/api/character/`).then((res) => res.json())
   
    return character.results.map((post) => ({
      id: post.id.toString(),
    }))
  }
const DefineCharacter:FC<defineCharacterType> = async({params}) => { 
    const data:Charackter = await getData(params.id) 
    console.log(data);
    
    return (
    <>   
    Hello
        {data.name}{ data.gender}
    </>
  )
}

export default DefineCharacter