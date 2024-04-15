import React, { useEffect, useState, useRef } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

const CommentsList = ({ id, no }) => {
  const nameRef = useRef();
  const passwordRef = useRef();
  const contentRef = useRef();

  const [comments, setComments] = useState([]);
  const [repliesShown, setRepliesShown] = useState(
    Array(comments.length).fill(false)
  );

  const getComments = async () => {
    const docRef = doc(db, id, no);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setComments(docSnap.data().comments);
      setRepliesShown(Array(docSnap.data().comments.length).fill(false));
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const repliesHandler = (index) => {
    setRepliesShown((prevRepliesShown) =>
      prevRepliesShown.map((value, i) => (i === index ? !value : value))
    );
  };

  const addReply = async (commentIndex, replyName, replyContent) => {
    try {
      const docRef = doc(db, id, no);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      const newReply = {
        name: replyName,
        content: replyContent,
        date: new Date().toISOString().slice(0, 10), // 날짜 형식 예시
        hour: new Date().toLocaleTimeString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        }), // 시간 형식 예시
      };

      const updatedComments = data.comments.map((comment, index) => {
        if (index === commentIndex) {
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }
        return comment;
      });

      await updateDoc(docRef, { comments: updatedComments });
        alert("대댓글 추가 성공");
    } catch (error) {
      console.error("대댓글 추가 실패:", error);
    }
  };

  return (
    <div className="my-[30px] border-t">
      {comments?.map((comment, index) => (
        <div key={index}>
          <div
            onClick={() => repliesHandler(index)}
            className="flex border-b border-slate-700 justify-between p-2"
          >
            <div className="flex flex-1">
              <p className="mr-[15px]">{comment.name}</p>
              <p>{comment.content}</p>
            </div>
            <div className="flex">
              <p className="mr-2">{comment.date}</p>
              <p className="mr-2">{comment.hour}</p>
              <p className="px-[3px] border rounded-xl bg-slate-800 text-white hover:cursor-pointer">
                x
              </p>
            </div>
          </div>
          {repliesShown[index] && (
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addReply(
                    index,
                    nameRef.current.value,
                    contentRef.current.value
                  );
                  nameRef.current.value = "";
                  contentRef.current.value = "";
                }}
                className="mt-[20px] border-2 border-slate-700 rounded-xl p-2"
              >
                <input
                  type="text"
                  ref={nameRef}
                  placeholder="이름"
                  className="w-[150px] border border-slate-700 text-center mr-5"
                />
                <input
                  type="password"
                  ref={passwordRef}
                  placeholder="비밀번호"
                  className="w-[150px] border border-slate-700 text-center"
                />
                <input
                  type="text"
                  ref={contentRef}
                  placeholder="대댓글을 입력해주세요"
                  className="w-[800px] h-[50px] mt-[20px] border border-slate-700 text-center"
                />
                <button
                  type="submit"
                  className="border bg-sky-700 p-2 ml-2 text-white rounded-md w-[80px] h-[50px]"
                >
                  등록
                </button>
              </form>
              <div>
                {comment.replies.map((reply, replyIndex) => (
                  <div
                    key={replyIndex}
                    className="flex border-b border-slate-700 justify-between p-2"
                  >
                    <div className="flex flex-1">
                      <p className="mr-[15px]">{reply.name}</p>
                      <p>{reply.content}</p>
                    </div>
                    <div className="flex">
                      <p className="mr-2">{reply.date}</p>
                      <p className="mr-2">{reply.hour}</p>
                      <p className="px-[3px] border rounded-xl bg-slate-800 text-white hover:cursor-pointer">
                        x
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
