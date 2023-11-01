'use client'  
import s from '../../Charackters.module.css' 
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { FC } from 'react'
interface FilterByNameType { 
  onHandleChange: (e:any) => void, 
  placeholder: string
}
const FilterByName:FC<FilterByNameType> = ({onHandleChange,placeholder}) => {
  return (
    <> 
        <Input onChange={onHandleChange} placeholder={placeholder} className={s.input__by_name} prefix={<SearchOutlined/>}/>
    </>
  )
}

export default FilterByName