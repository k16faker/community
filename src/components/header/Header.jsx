

import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='w-full h-[105px] items-center'>
      <section className='flex w-[1160px] mx-auto p-[15px] items-center'>
        <Link to='/'><h1 className='text-3xl font-mono font-bold'>My-Community</h1></Link>
        <input type="search" placeholder="Search" className='border-2 border-purple-800 rounded ml-[160px] w-[250px] h-[30px] text-center'/>
      </section>
      <nav className='flex w-[1160px] mx-auto p-[15px] items-center text-white bg-blue-900'>
        <ul className='flex w-[1160px] justify-between'>
          <Link to='/'><li>게시판 목록</li></Link>
          <li>로그인</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header