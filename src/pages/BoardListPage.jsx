

import React from 'react'

import { Link, useSearchParams } from "react-router-dom"
import List from '../components/board/List'



const BoardListPage = () => {


  // let [data, setData] = useState([]);
  let [searchParams] = useSearchParams();
  let id = searchParams.get("id");

  // const fetchData = async (collectionName, order, sort) => {
  //   const q = query(collection(db, collectionName), orderBy(order, sort));
  //   const dataSnapShot = await getDocs(q);
  //   const data = dataSnapShot.docs.map((doc) => {
  //     return { ...doc.data(), id: doc.id };
  //   });
  //   console.log(data);
  //   setData(data);
  // };

  // useEffect(() => {
  //   fetchData(id, "dateForSort", "desc");
  // }, [id]);

  




  return (
    <div className='w-[1000px] mx-auto mt-[50px]'>
      <List id={id} />
      <div className='w-full'>
        <Link to={`/board/writing?id=${id}`}><button className='border mt-[20px] mx-auto w-[80px] h-[40px] border-blue-900 text-white bg-blue-900'>글쓰기</button></Link>
      </div>
    </div>
  )
}

export default BoardListPage