

import React, {useEffect, useState} from 'react'
import { db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'


const Header = () => {
  const navigate = useNavigate();


  const { user, logOut } = UserAuth();
  const [nickname, setNickname] = useState('')

  //if user.email is exist, then bring the user's nickname on firestore and set it to nickname state
  useEffect(() => {
    if (user?.email) {
      const getUser = async () => {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setNickname(docSnap.data().nickname);
        }
      }
      getUser();
    }
  }, [user]);

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
          <p>{`어서오세요, ${nickname} 님`}</p>
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