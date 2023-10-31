import Image from 'next/image'
import React from 'react'
import  icon from './assets/img/404.webp'
import Link from 'next/link'
const Custom404 = () => {
  return ( 
    <>    
	<div className={'not__found'}> 
	<h1 className='not__found_title'>Oh No! It{"'"}s waba laba dub dub! </h1>
	<div className='not__found_subtitle'>Page not found</div> 
	<div className='not__found_error'><span className={'first_letter'}>4</span> <Image  alt='Error' src={icon}/> <span className={'second_letter'}>4</span></div> 
	<Link href={'/'}><button className={'not__found_btn'}>Home Page</button></Link>
	</div>
	</>
  )
}

export default Custom404