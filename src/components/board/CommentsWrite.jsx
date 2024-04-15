import React, {useRef} from 'react'
import {db} from '../../firebase'
import {doc, updateDoc, arrayUnion} from 'firebase/firestore'

const CommentsWrite = ({id, no}) => {
  const nameRef = useRef();
  const passwordRef = useRef();
  const contentRef = useRef();

  const commentHandler = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, id, no), {
      comments: arrayUnion({
        name: nameRef.current.value,
        password: passwordRef.current.value,
        content: contentRef.current.value,
        date: new Date().toLocaleDateString(),
        hour: new Date().toLocaleTimeString(),
        replies: []
      })
    });
    alert("작성되었습니다.");
    window.location.href = `/board/detail?id=${id}&no=${no}`;
  };

  return (
    <div className='border-2 border-slate-600 p-4 mb-[20px] rounded-md'>
        <form onSubmit={commentHandler} className=''>
            <input type="text" ref={nameRef} placeholder="이름" className="w-[150px] border border-slate-700 text-center mr-5" />
            <input type="password" ref={passwordRef} placeholder="비밀번호" className="w-[150px] border border-slate-700 text-center" />
            <input type="text" ref={contentRef} placeholder="댓글을 입력해주세요" className="w-[800px] h-[50px] mt-[20px] border border-slate-700 text-center" />
            <button type="submit" className="border bg-sky-700 p-2 ml-2 text-white rounded-md w-[80px] h-[50px]">등록</button>
        </form>
    </div>
  )
}

export default CommentsWrite