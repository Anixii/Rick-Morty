'use client'
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import FilterBySpacies from './FilterBySpacies'
import FilterByName from './FilterByName' 
import s from '../../Charackters.module.css'   
import {genderOptions,  spaciesOption, statusOptions} from '../../utils/options'
import Paginations from './Pagination'
import { getCharacters } from '@/app/utils/characterFunctions'
type CharactersInfoType = { 
  characters: Array<Charackter>, 
  allPage: number
}
const CharactersInfo:FC<CharactersInfoType> = ({characters, allPage}) => { 
  const [character, setCharacter] = useState<Array<Charackter>>(characters) 
  const [currentPage, setCurrentPage] = useState<number>(1) 
  const [nameValue, setNameValue] = useState('')
  const onHandleChange = async(e:number) =>{ 
    setCurrentPage(e)
    const data = await getCharacters({
      params:{ 
        page: currentPage.toString()
      }, 
    })
    setCharacter(data.results)
    window.scrollTo(0,0)
  } 
  
  const onHandleFilterByName = (e:any) =>{ 
    const newCharakters = characters.filter(c =>  c.name.toLowerCase().includes(nameValue.toLowerCase()))
    setNameValue(e.target.value)
    setCharacter(newCharakters)
  }
  return (
    <> 
    <div className={s.characters__search}>
              <div className={s.characters__filter}>
                <FilterByName onHandleChange={onHandleFilterByName} />
              </div>
              <div className={s.characters__filter}>
                <FilterBySpacies defaultValue="Spacies" options={spaciesOption} />
              </div>
              <div className={s.characters__filter}>
                <FilterBySpacies defaultValue="Gender" options={genderOptions}/>
              </div>
              <div className={s.characters__filter}>
                <FilterBySpacies defaultValue="Status" options={statusOptions}/>
              </div>
            </div>

            <div className={s.characters__list}>
              {character?.map((item) => (
                <>
                  <div key={item.id} className={s.character}>
                    <div className={s.character__img}>
                      <Image
                        width={200}
                        height={200}
                        alt={item.name}
                        src={item.image}
                      />
                    </div>
                    <div className={s.character__text}>
                      <div className={s.character__name}>{item.name}</div>
                      <div className={s.character__status}>
                        <div className={s.character__indicator} style={item.status === 'Alive' ? {backgroundColor: 'green'} : item.status === 'Dead' ? {backgroundColor:'red'} : {backgroundColor:'gray'}}></div>
                        {item.status} - {item.species}
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div> 

            <Paginations onHandleChange={onHandleChange} page={currentPage} allPage={allPage}/>
    </>
  )
}

export default CharactersInfo