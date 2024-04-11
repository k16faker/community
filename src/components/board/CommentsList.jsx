import React, {useEffect, useState} from 'react'
import { db } from '../../firebase';
import {doc, getDoc} from 'firebase/firestore'

const CommentsList = ({id, no}) => {
    const [comments, setComments] = useState([]);
    const getComments = async () => {
        const docRef = doc(db, id, no);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          setComments(docSnap.data().comments);
        } else {
          console.log("No such document!");
        }
    };

    useEffect(() => {
        getComments();
    }, []);

  return (
    <div className='my-5'>
        {comments?.map((comment, index) => {
            return (
                <div key={index} className='flex border border-slate-700 justify-between p-2'>
                    <div className='flex flex-1'>
                        <p className='mr-[15px]'>{comment.name}</p>
                        <p>{comment.content}</p>
                    </div>
                    <div className='flex'>
                        <p>{comment.date}</p>
                        <p>{comment.hour}</p>
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default CommentsList