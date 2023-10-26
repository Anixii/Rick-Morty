'use client'  
import s from '../../Charackters.module.css' 
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react'

const FilterByName = ({}) => {
  return (
    <> 
        <Input  placeholder='Filter by Name...' className={s.input__by_name} prefix={<SearchOutlined/>}/>
    </>
  )
}

export default FilterByName