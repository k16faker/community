import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../../firebase";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

const Modify = () => {
  let [searchParams] = useSearchParams({
    id: "all",
    no: "all",
  });

  const id = searchParams.get("id");
  const no = searchParams.get("no");
  
  const [detail, setDetail] = useState({});

  const titleRef = useRef();
  const tagRef = useRef();
  const contentRef = useRef();

  const getDetail = async () => {
    const docRef = doc(db, id, no);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDetail(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const modifyHandler = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, id, no), {
      title: titleRef.current.value,
      tag: tagRef.current.value,
      content: contentRef.current.value,
    });
    alert("수정되었습니다.");
    window.location.href = `/board/detail?id=${id}&no=${no}`;
  };

  const titleChange = (e) => {
    setDetail({
      ...detail,
      title: e.target.value,
    });
  };

  const tagChange = (e) => {
    setDetail({
      ...detail,
      tag: e.target.value,
    });
  };

  const contentChange = (e) => {
    setDetail({
      ...detail,
      content: e.target.value,
    });
  };

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <section className="mt-[50px] w-full">
      <form className="grid w-[1000px] mx-auto border-2 border-slate-700 p-2" onSubmit={modifyHandler}>
        <section className="w-3/4 my-[20px]">
          <input
            type="text"
            placeholder="제목"
            value={detail.title}
            onChange={titleChange}
            ref={titleRef}
            className="w-full my-2 border border-slate-700 text-center"
            required
          />
          <select value={detail.tag} ref={tagRef} onChange={tagChange}>
            <option>자유</option>
            <option>질문</option>
            <option>정보</option>
          </select>
        </section>
        <textarea
          placeholder="내용"
          value={detail.content}
          onChange={contentChange}
          ref={contentRef}
          rows={20}
          className="mt-[5px] mb-[20px] border border-slate-700 text-center"
          required
        ></textarea>
        <button className="w-[80px] mx-auto px-2 py-1 bg-sky-700 rounded-md text-white hover:scale-110 transition-all">
          작성
        </button>
      </form>
    </section>
  );
};

export default Modify;
