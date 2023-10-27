import Image from 'next/image'
import React, { FC } from 'react'
import FilterBySpacies from './FilterBySpacies'
import FilterByName from './FilterByName' 
import s from '../../Charackters.module.css'   
import {genderOptions,  spaciesOption, statusOptions} from '../../utils/options'
type CharactersInfoType = { 
  characters: TResponse<Charackter>
}
const CharactersInfo:FC<CharactersInfoType> = ({characters}) => { 

  return (
    <> 
    <div className={s.characters__search}>
              <div className={s.characters__filter}>
                <FilterByName />
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
              {characters?.results.map((item) => (
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
    </>
  )
}

export default CharactersInfo