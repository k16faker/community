import React, { useEffect, useState, useRef } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

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

  const addReply = async (
    commentIndex,
    replyName,
    replyContent,
    replyPassword
  ) => {
    try {
      const docRef = doc(db, id, no);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      const newReply = {
        name: replyName,
        content: replyContent,
        password: replyPassword,
        date: new Date().toLocaleDateString(),
        hour: new Date().toLocaleTimeString(),
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
      window.location.href = `/board/detail?id=${id}&no=${no}`;
    } catch (error) {
      console.error("대댓글 추가 실패:", error);
    }
  };

  const deleteComment = async (commentIndex) => {
    try {
      const docRef = doc(db, id, no);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      const comment = data.comments[commentIndex];

      const password = prompt("비밀번호를 입력해주세요:", "");
      if (password === comment.password) {
        const updatedComments = data.comments.filter(
          (_, idx) => idx !== commentIndex
        );
        await updateDoc(docRef, { comments: updatedComments });
        alert("댓글 삭제 성공");
        window.location.reload();
      } else {
        alert("비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  const deleteReply = async (commentIndex, replyIndex) => {
    try {
      const docRef = doc(db, id, no);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      const reply = data.comments[commentIndex].replies[replyIndex];

      const password = prompt("비밀번호를 입력해주세요:", "");
      if (password === reply.password) {
        const updatedComments = data.comments.map((comment, idx) => {
          if (idx === commentIndex) {
            const updatedReplies = comment.replies.filter(
              (_, i) => i !== replyIndex
            );
            return { ...comment, replies: updatedReplies };
          }
          return comment;
        });

        await updateDoc(docRef, { comments: updatedComments });
        alert("대댓글 삭제 성공");
        window.location.reload();
      } else {
        alert("비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      console.error("대댓글 삭제 실패:", error);
    }
  };

  return (
    <div className="mb-[30px] border-t">
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
              <p
                className="px-[3px] border rounded-xl bg-slate-800 text-white hover:cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteComment(index);
                }}
              >
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
                    contentRef.current.value,
                    passwordRef.current.value
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
            </div>
          )}
          <div>
            {comment.replies?.map((reply, replyIndex) => (
              <div
                key={replyIndex}
                className="flex border-b border-slate-700 justify-between p-2 ml-[50px]"
              >
                <div className="flex flex-1">
                  <p>ㄴ</p>
                  <p className="mr-[15px] ml-[10px]">{reply.name}</p>
                  <p>{reply.content}</p>
                </div>
                <div className="flex">
                  <p className="mr-2">{reply.date}</p>
                  <p className="mr-2">{reply.hour}</p>
                  <p
                    onClick={() => deleteReply(index, replyIndex)}
                    className="px-[3px] border rounded-xl bg-slate-800 text-white hover:cursor-pointer"
                  >
                    x
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
