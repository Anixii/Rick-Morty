'use client'
import { Select } from 'antd'
import s from '../../Charackters.module.css' 
import React, {FC} from 'react'
type FilterType = { 
  defaultValue: string,  
  value: string
  options: Array<OptionType>
  onSelectChange:(value:string) => void
} 
type OptionType = { 
  value: string, 
  label:string
}
const FilterBySpacies:FC<FilterType> = ({defaultValue, options, onSelectChange,value}) => {
  return (
    <> 
    <Select allowClear={true} onChange={onSelectChange} value={value} defaultValue={defaultValue} options={options} className={s.select__filter}/>
    </>
  )
}

export default FilterBySpacies