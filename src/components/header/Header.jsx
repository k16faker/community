

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'


const Header = () => {
  const navigate = useNavigate();


  const { user, logOut } = UserAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className='w-full h-[105px] items-center'>
      <section className='flex w-[1160px] mx-auto p-[15px] items-center'>
        <Link to='/'><h1 className='text-3xl font-mono font-bold'>My-Community</h1></Link>
        <input type="search" placeholder="Search" className='border-2 border-purple-800 rounded ml-[160px] w-[250px] h-[30px] text-center'/>
      </section>
      <nav className='flex w-[1160px] mx-auto p-[15px] items-center text-white bg-blue-900'>
        <ul className='flex w-[1160px] justify-between'>
          <Link to='/'><li>게시판 목록</li></Link>
          {user?.email ? (
            <li className='hover:cursor-pointer' onClick={handleLogOut}>로그아웃</li>
          ) : (
            <Link to='/login'><li>로그인</li></Link>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header