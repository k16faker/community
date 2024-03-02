import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"



const BoardPage = () => {
    const { topic } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(topic != 'kids') {
            alert('Invalid topic');
            navigate('/');
        }
    }, [] );
  return (
    <div>
        <p>{topic}</p>
    </div>
  )
}

export default BoardPage