import React from 'react'
import s from './Header.module.css' 
import logo from '../assets/img/logo-black 1.png'
import Image from 'next/image'
import Link from 'next/link'
import NavBar from './NavBar'

const Header = () => {
  return (
    <> 
        <header className={s.header}> 
            <div className={s.header__container}> 
                <div className={s.header__logo}>
                    <Image alt='Logo' src={logo}/>
                </div> 
                <NavBar/>
            </div>
        </header>
    </>
  )
}

export default Header