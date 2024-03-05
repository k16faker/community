

import React, {useEffect, useState} from 'react'

import { Link, useSearchParams } from "react-router-dom"
import { db } from "../firebase"
import {onSnapshot, collection, query, getDocs, orderBy} from "firebase/firestore"
import SimpleWr from '../components/board/SimpleWr'



const BoardListPage = () => {


  let [data, setData] = useState([]);
  let [searchParams] = useSearchParams();
  let id = searchParams.get("id");

  const fetchData = async (collectionName, order, sort) => {
    const q = query(collection(db, collectionName), orderBy(order, sort));
    const dataSnapShot = await getDocs(q);
    const data = dataSnapShot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    fetchData(id, "dateForSort", "desc");
  }, [id]);

  




  return (
    <div className='w-[1000px] mx-auto mt-[50px]'>
      <ul>
        {data.map((doc) => (
          <li key={doc.id}>
            <Link to={'/'}>
              <SimpleWr title={doc.title} date={doc.date} writer={doc.name} /> 
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <Link to={`/board/writing?id=${id}`}>글쓰기</Link>
      </div>
    </div>
  )
}

export default BoardListPage