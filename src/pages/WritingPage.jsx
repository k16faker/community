import React, { useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

const WritingPage = (props) => {

  const navigate = useNavigate();

  let nameRef = useRef();
  let passwordRef = useRef();
  let titleRef = useRef();
  let tagRef = useRef();
  let contentRef = useRef();

  let [searchParams] = useSearchParams();
  let id = searchParams.get("id");
  console.log(id);
  let randomNum = Math.random().toString();



  async function uploadData(event) {
    event.preventDefault();
    let name = nameRef.current.value;
    let password = passwordRef.current.value;
    let title = titleRef.current.value;
    let tag = tagRef.current.value;
    let content = contentRef.current.value;

    await setDoc(doc(db, id, randomNum), {
      name: name,
      password: password,
      title: title,
      tag: tag,
      content: content,
      forDiv: randomNum,
      good: 0,
      bad: 0,
      dateForSort: new Date(),
      date: new Date().toLocaleDateString(),
      hour: new Date().toLocaleTimeString(),
    });
    alert("작성 완료");
    navigate(`/board/list?id=${id}`);
  }

  return (
    <section className="mt-[50px] w-full">
      <form
        className="grid w-[1000px] mx-auto border-2 border-slate-700 p-2"
        onSubmit={uploadData}
      >
        <section className="w-3/4 my-[20px]">
          <div className="w-full my-2">
            <input
              type="text"
              placeholder="이름"
              className="w-[200px] border border-slate-700 text-center"
              ref={nameRef}
            />
            <input
              type="password"
              placeholder="비밀번호"
              className="w-[200px] ml-[20px] border border-slate-700 text-center"
              ref={passwordRef}
            />
          </div>
          <input
            type="text"
            placeholder="제목"
            className="w-full my-2 border border-slate-700 text-center"
            ref={titleRef}
          />
          <select ref={tagRef}>
            <option>말머리</option>
            <option>자유</option>
            <option>질문</option>
            <option>정보</option>
          </select>
        </section>
        <textarea
          placeholder="내용"
          rows={20}
          className="mt-[5px] mb-[20px] border border-slate-700 text-center"
          ref={contentRef}
        ></textarea>
        <button>작성</button>
      </form>
    </section>
  );
};

export default WritingPage;
