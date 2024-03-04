
import { useParams, useNavigate } from "react-router-dom"



const BoardPage = () => {
    const { topic } = useParams();
    const navigate = useNavigate();


    
  return (
    <div>
        <h1>its a board page</h1>
    </div>
  )
}

export default BoardPage