import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import SimpleWr from "./SimpleWr";
import { Link } from "react-router-dom";

const List = ({ id }) => {
  let [data, setData] = useState([]);

  const fetchData = async (collectionName, order, sort) => {
    const q = query(collection(db, collectionName), orderBy(order, sort));
    const dataSnapShot = await getDocs(q);
    const data = dataSnapShot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setData(data);
  };

  useEffect(() => {
    fetchData(id, "dateForSort", "desc");
  }, [id]);

  const handleClick = () => {
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };



  return (
    <ul>
        {data.map((doc) => (
          <li key={doc.id}>
            <Link to={`/board/detail?id=${id}&no=${doc.forDiv}`}onClick={handleClick} >
              <SimpleWr title={doc.title} date={doc.date} writer={doc.name} hour={doc.hour} /> 
            </Link>
          </li>
        ))}
      </ul>
  );
};

export default List;
