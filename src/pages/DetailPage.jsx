import React, {useEffect} from "react";
import { Link, useSearchParams } from "react-router-dom";
import DetailWr from "../components/board/DetailWr";
import List from "../components/board/List";


const DetailPage = () => {
  let [searchParams] = useSearchParams({
    id: "all",
    no: "all",
  });

  const id = searchParams.get("id");
  const no = searchParams.get("no");

  useEffect(() => {
    window.scrollTo(0, 0);
  },[no]);

  return (
    <div className="w-[1000px] mx-auto mt-[50px]">
      <div>
        <Link to={`/board/list?id=${id}`}><p className="text-2xl font-bold pl-[15px]">{`${id} 게시판`}</p></Link>
      </div>
        <DetailWr id={id} no={no} />
        <List id={id} />
    </div>
  );
};

export default DetailPage;
