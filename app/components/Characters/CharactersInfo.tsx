'use client'
import Image from 'next/image'
import React, { FC, use, useEffect, useState } from 'react'
import Filter from './FilterBySpacies'
import FilterByName from './FilterByName' 
import s from '../../Charackters.module.css'   
import {genderOptions,  spaciesOption, statusOptions} from '../../utils/options'
import Paginations from './Pagination'
import { getCharacters, getFilteredCharaters } from '@/app/utils/characterFunctions'
// type CharactersInfoType = { 
//   characters: Array<Charackter>, 
//   allPage: number
// }
const CharactersInfo:FC = () => { 
  const [character, setCharacter] = useState<Array<Charackter>>(characters) 
  const [filteredCharacter, setFilteredCharacter] = useState<Array<Charackter>>(characters)
  const [currentPage, setCurrentPage] = useState<number>(1) 
  const [nameValue, setNameValue] = useState<string>('')
  const [gender, setGender] = useState<string>('Gender')
  const [spacies, setSpacies] = useState<string>('Species')
  const [status, setStatus] = useState<string>('Status')
  const onHandleChange = async(e:number) =>{ 
    setCurrentPage(e)
    const data = await getFilteredCharaters(e.toString(), status,spacies,gender, nameValue)  
    setFilteredCharacter(data.results)
    window.scrollTo(0,0)
  } 
  const onHandleFilterByName = (e:any) =>{  
    const newCharakters = character.filter(c => c.name.toLowerCase().includes(nameValue.toLowerCase()))
    setNameValue(e.target.value)
    setFilteredCharacter(newCharakters)
  }  
  
  const onHandleSelectChangeSpecias = async(label:string,) =>{  
    setSpacies(label)
    const data = await getFilteredCharaters(currentPage.toString(), status,label,gender, nameValue)  
    setFilteredCharacter(data.results)
    setCharacter(data.results)
  }
  const onHandleSelectChangeGender = async(label:string,) =>{  
    setGender(label)
    const data = await getFilteredCharaters(currentPage.toString(), status,spacies,label,nameValue)  
    setFilteredCharacter(data.results)
    setCharacter(data.results)
  }
  const onHandleSelectChangeStatus = async(label:string,) =>{  
    setStatus(label)
    const data = await getFilteredCharaters(currentPage.toString(), label,spacies,gender,nameValue)  
    setFilteredCharacter(data.results)
    setCharacter(data.results)
  }
  return (
    <> 
    <div className={s.characters__search}>
              <div className={s.characters__filter}>
                <FilterByName onHandleChange={onHandleFilterByName} />
              </div>
              <div className={s.characters__filter}>
                <Filter key={spacies} onSelectChange={onHandleSelectChangeSpecias} value={spacies} defaultValue="Spacies" options={spaciesOption} />
              </div>
              <div className={s.characters__filter}>
                <Filter key={gender} onSelectChange={onHandleSelectChangeGender} value={gender} defaultValue="Gender" options={genderOptions}/>
              </div>
              <div className={s.characters__filter}>
                <Filter key={status} onSelectChange={onHandleSelectChangeStatus} value={status} defaultValue="Status" options={statusOptions}/>
              </div>
            </div>

            <div className={s.characters__list}>
              {filteredCharacter?.map((item, index) => (

                  <div key={index.toString() + item.id} className={s.character}>
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
              ))}
            </div> 

            <Paginations onHandleChange={onHandleChange} page={currentPage} allPage={allPage}/>
    </>
  )
}

export default CharactersInfo