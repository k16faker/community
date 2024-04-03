import React from "react";

import { Link, useSearchParams } from "react-router-dom";
import List from "../components/board/List";

const BoardListPage = () => {
  // let [data, setData] = useState([]);
  let [searchParams] = useSearchParams();
  let id = searchParams.get("id");

  return (
    <div className="w-[1160px] mx-auto mt-[50px]">
      <section className="w-[1160px]">
        <List id={id} />
      </section>
      <div className="w-full">
        <Link to={`/board/writing?id=${id}`} className="ml-[720px]">
          <button className="border mt-[20px] mx-auto w-[80px] h-[40px] border-blue-900 text-white bg-blue-900">
            글쓰기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BoardListPage;
