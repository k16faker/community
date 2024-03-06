import React from "react";
import { useSearchParams } from "react-router-dom";
import DetailWr from "../components/board/DetailWr";


const DetailPage = () => {
  let [searchParams, setSearchParams] = useSearchParams({
    id: "all",
    no: "all",
  });

  const id = searchParams.get("id");
  const no = searchParams.get("no");

  return (
    <div className="w-[1000px] mx-auto mt-[50px]">
        <DetailWr id={id} no={no} />
    </div>
  );
};

export default DetailPage;
