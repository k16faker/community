import React from "react";

import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const goSignup = () => {
    navigate("/signup");
  };
  return (
    <section className="w-[800px] mx-auto mt-[100px]  text-center">
      <form className="w-[500px] mx-auto border-2 border-purple-700 py-4">
        <div>
          <div className="p-1">
            <input
              className="border border-black p-1 w-[250px]"
              type="text"
              placeholder="아이디"
            />
          </div>
          <div className="p-1">
            <input
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
