'use client'
import React, { FC } from 'react'
import s from '../Charackters.module.css'  
import { Pagination } from 'antd'
type PaginationType = { 
    page: number, 
    allPage: number, 
    onHandleChange: (e:number) => void
}
const Paginations:FC<PaginationType> = ({page, allPage,onHandleChange}) => { 
  return (
    <div className={s.characters__pagination}>
        <Pagination onChange={(e:any) => onHandleChange(e)} current={+page} total={allPage * 10} showSizeChanger={false}/> 
    </div>
  )
}

export default Paginations