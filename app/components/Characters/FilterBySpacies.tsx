'use client'
import { Select } from 'antd'
import s from '../../Charackters.module.css' 
import React, {FC} from 'react'
type FilterType = { 
  defaultValue: string, 
  options: Array<OptionType>
} 
type OptionType = { 
  value: string, 
  label:string
}
const FilterBySpacies:FC<FilterType> = ({defaultValue, options}) => {
  return (
    <> 
    <Select defaultValue={defaultValue} options={options} className={s.select__filter}/>
    </>
  )
}

export default FilterBySpacies