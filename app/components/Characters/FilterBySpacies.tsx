'use client'
import { Select } from 'antd'
import s from '../../Charackters.module.css' 
import React from 'react'

const FilterBySpacies = () => {
  return (
    <> 
    <Select defaultValue={'Spacies'} className={s.select__filter}/>
    </>
  )
}

export default FilterBySpacies