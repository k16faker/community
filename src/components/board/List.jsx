// import React, { useState, useEffect } from "react";
// import { db } from "../../firebase";
// import { collection, query, getDocs, orderBy } from "firebase/firestore";
// import SimpleWr from "./SimpleWr";
// import { Link } from "react-router-dom";

// const List = ({ id }) => {
//   let [data, setData] = useState([]);
//   let [goodSortData, setGoodSortData] = useState([]);

//   const fetchData = async (collectionName, order, sort) => {
//     const q = query(collection(db, collectionName), orderBy(order, sort));
//     const dataSnapShot = await getDocs(q);
//     const data = dataSnapShot.docs.map((doc) => {
//       return { ...doc.data(), id: doc.id };
//     });
//     const dataForSort = data;
//     dataForSort.sort((a, b) => b.good - a.good);
//     setData(data);
//     setGoodSortData(dataForSort);
//   };

//   useEffect(() => {
//     fetchData(id, "dateForSort", "desc");
//   }, [id]);

//   const handleClick = () => {
//     setTimeout(() => {
//       window.location.reload();
//     }, 0);
//   };

//   return (
//     <ul className="w-[800px]">
//       {data.map((doc) => (
//         <li key={doc.id}>
//           <Link
//             to={`/board/detail?id=${id}&no=${doc.forDiv}`}
//             onClick={handleClick}
//           >
//             <SimpleWr
//               title={doc.title}
//               date={doc.date}
//               writer={doc.name}
//               hour={doc.hour}
//             />
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default List;


//글 리스트 나열 페이지

import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import SimpleWr from "./SimpleWr";
import { Link } from "react-router-dom";

const List = ({ id }) => {
  const [data, setData] = useState([]);
  const [tagForFilter, setTagForFilter] = useState("전체"); // 태그 필터링을 위한 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // 페이지당 항목 수

  useEffect(() => {
    fetchData(id, "dateForSort", "desc");
  }, [id]);

  const fetchData = async (collectionName, order, sort) => {
    const q = query(collection(db, collectionName), orderBy(order, sort));
    const dataSnapShot = await getDocs(q);
    const newData = dataSnapShot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setData(newData);
  };

  // 태그 필터링을 위한 데이터를 계산하는 함수
  const dataForFilter = data.filter((item) => {
    if (tagForFilter === "전체") {
      return item;
    } else {
      return item.tag === tagForFilter;
    }
  });

  // 현재 페이지의 데이터를 계산하는 함수
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataForFilter.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 이벤트 처리 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-[800px]">
      <ul className="flex">
        <li className="border px-2 py-1 hover:cursor-pointer" onClick={()=>setTagForFilter("전체")}>전체</li>
        <li className="border px-2 py-1 hover:cursor-pointer" onClick={()=>setTagForFilter("자유")}>자유</li>
        <li className="border px-2 py-1 hover:cursor-pointer" onClick={()=>setTagForFilter("질문")}>질문</li>
        <li className="border px-2 py-1 hover:cursor-pointer" onClick={()=>setTagForFilter("정보")}>정보</li>
      </ul>
      <ul>
        {currentItems.map((doc, index) => (
          <li key={doc.id}>
            <Link
              to={`/board/detail?id=${id}&no=${doc.forDiv}`}
            >
              <SimpleWr
                title={doc.title}
                date={doc.date}
                writer={doc.name}
                hour={doc.hour}
                tag={doc.tag}
              />
            </Link>
          </li>
        ))}
      </ul>
      {/* 페이지 네이션 버튼 */}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={dataForFilter.length}
        paginate={paginate}
      />
    </div>
  );
};

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex w-[200px] mx-auto mt-[30px]">
        {pageNumbers.map((number) => (
          <li key={number} className="ml-4 border p-2 rounded-full">
            <a
              onClick={(e) => {
                e.preventDefault();
                paginate(number);
              }}
              href="/"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default List;
