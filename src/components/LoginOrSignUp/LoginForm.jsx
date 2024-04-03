import React, {useState} from "react";

import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const goSignup = () => {
    navigate("/signup");
  };

  const { user, logIn } = UserAuth();
  const [error, setError] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await logIn(email, password);
      if(email === "" || password === ""){
        setError("모든 항목을 입력해주세요.");
        return;
      };
      setError("로그인이 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    
  };


  return (
    <section className="w-[800px] mx-auto mt-[100px]  text-center">
      <form onSubmit={loginHandler} className="w-[500px] mx-auto border-2 border-purple-700 py-4">
        <div>
          <div className="p-1">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="border border-black p-1 w-[250px]"
              type="text"
              placeholder="아이디"
            />
          </div>
          <div className="p-1">
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border border-black p-1 w-[250px]"
              type="password"
              placeholder="비밀번호"
            />
          </div>
        </div>
        <div className="p-1">
          <button
            className="border border-black p-1 w-[250px] bg-purple-900 text-white"
            type="submit"
          >
            로그인
          </button>
        </div>
        <p className="hover:cursor-pointer" onClick={goSignup}>회원가입</p>
      </form>
    </section>
  );
};

export default LoginForm;
