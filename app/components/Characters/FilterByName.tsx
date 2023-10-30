'use client'  
import s from '../../Charackters.module.css' 
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { FC } from 'react'
interface FilterByNameType { 
  onHandleChange: (e:any) => void
}
const FilterByName:FC<FilterByNameType> = ({onHandleChange}) => {
  return (
    <> 
        <Input onChange={onHandleChange} placeholder='Filter by Name...' className={s.input__by_name} prefix={<SearchOutlined/>}/>
    </>
  )
}

export default FilterByName