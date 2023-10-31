import React from 'react'
import s from '../../Charackters.module.css' 
import icon from '../../assets/img/pickle.png'
import Image from 'next/image'
const NoData = () => {
  return (
    <div className={s.error}> 
        <Image alt='Rick and Morty' className={s.error__img} src={icon}/>
        <div className={s.error__title}>Waba Laba Dub Dub! No Data!</div>
    </div>
  )
}

export default NoData