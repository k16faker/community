import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";

const DetailWr = ({ id, no }) => {

  const { location } = useLocation();
  const [detail, setDetail] = useState({});

  const getDetail = async () => {
    const docRef = doc(db, id, no);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDetail(docSnap.data());
    } else {
      console.log("No such document!");
    };
  };

  const goodUpdateHandler = async () => {
    if(localStorage.getItem(`good${no}`)) {
      return alert("이미 좋아요를 누르셨습니다.")
    };
    await updateDoc(doc(db, id, no), {
      good: detail.good + 1,
    });
    localStorage.setItem(`good${no}`, "true");
    getDetail();
  };

  const badUpdateHandler = async () => {
    if(localStorage.getItem(`bad${no}`)) {
      return alert("이미 싫어요를 누르셨습니다.")
    };
    await updateDoc(doc(db, id, no), {
      bad: detail.bad + 1,
    });
    localStorage.setItem(`bad${no}`, "true");
    getDetail();
  }


  useEffect(() => {
    getDetail();
  }, [location]);

  return (
    <div className="w-[1000px] mt-[20px] mb-[50px]">
      <section className="grid w-full">
        <h1 className="border-b-2 border-t-2 border-slate-300 py-3 text-xl pl-[15px]">{detail.title}</h1>
        <div className="flex w-[340px] border-b-2 border-slate-300 pb-3 justify-between mt-[10px] px-[15px]">
          <div className="w-[80px] border-r-2 text-center border-slate-500">
            <p className="">{detail.name}</p>
          </div>
          <div className="flex w-[200px] justify-between">
            <p>{detail.date}</p>
            <p>{detail.hour}</p>
          </div>
        </div>
      </section>
      <article className="w-full mt-[30px] border-b-2 border-slate-300 pb-[30px]">
        <p>{detail.content}</p>
        <div className="flex w-[200px] mx-auto justify-between mt-[100px]">
          <div>
            <button onClick={goodUpdateHandler} className="border rounded-full p-2 w-[80px] bg-sky-700 text-white">좋아요</button>
            <p className="w-[15px] mx-auto">{detail.good}</p>
          </div>
          <div>
            <button onClick={badUpdateHandler} className="border rounded-full p-2 w-[80px] bg-red-500 text-white">싫어요</button>
            <p className="w-[15px] mx-auto">{detail.bad}</p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default DetailWr;
