'use client'
import React, { FC, useEffect } from 'react'
import s from '../../Charackters.module.css'  
import { Pagination } from 'antd'
import { getCharacters } from '@/app/utils/characterFunctions'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
type PaginationType = { 
    page: number, 
    allPage: number
}
const Paginations:FC<PaginationType> = ({page, allPage}) => { 
    const params = new URLSearchParams(window.location.search)  
    const onHandleChange = async(e:string) =>{  
        params.set('page', e.toString())
        const newURL = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({}, '', newURL);
    }
  return (
    <div className={s.characters__pagination}>
        <Pagination onChange={(e:any) => onHandleChange(e)} current={+page} total={allPage * 10} showSizeChanger={false}/> 
    </div>
  )
}

export default Paginations