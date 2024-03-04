

import React from 'react'

import { useParams, useNavigate, useSearchParams } from "react-router-dom"



const BoardListPage = () => {


  let [searchParams] = useSearchParams();
  let id = searchParams.get("id");

  console.log(id);


  return (
    <div>BoardListPage</div>
  )
}

export default BoardListPage