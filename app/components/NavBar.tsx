'use client'
import React, { useState } from "react";
import s from "./Header.module.css";
import Link from "next/link"; 
import Burger from '../assets/img/menu_24px.svg'
import Image from "next/image"; 
import close from '../assets/img/close_24px.svg'
const NavBar = () => {
    const [isToggle, setToggle] = useState(false)
    return (
    <>
      <ul className={s.nav__list}>
        <li className={s.nav__item}>
          <Link href={"/"}>Characters</Link>
        </li>
        <li className={s.nav__item}>
          <Link href={"/locations"}>Locations</Link>
        </li>
        <li className={s.nav__item}> 
        <Link href={"/episodes"}>Episodes</Link>
        </li> 
      </ul>   
        <div className={s.burger_menu} onClick={() => setToggle(!isToggle)}><Image alt='burger-menu' src={isToggle? close : Burger}/></div>
        {isToggle &&  
        <div className={s.burger}> 
            <ul className={s.burger__list}> 
                <li className={s.burger__item}><Link className={isToggle ? 'toggled' : ''} href={"/"}>Characters</Link></li>
                <li className={s.burger__item}><Link href={"/locations"}>Locations</Link></li>
                <li className={s.burger__item}><Link href={"/episodes"}>Episodes</Link> </li>
            </ul>
        </div>}

    </>
  );
};

export default NavBar;
