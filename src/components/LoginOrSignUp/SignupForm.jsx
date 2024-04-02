import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const SignupForm = () => {
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login");
  };

  const { user, signUp} = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password, nickname);
      if(email === "" || password === "" || nickname === ""){
        alert("모든 항목을 입력해주세요.");
        return;
      };
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  

  return (
    <section className="w-[800px] mx-auto mt-[100px]  text-center">
      <form onSubmit={signUpHandler} className="w-[500px] mx-auto border-2 border-purple-700 py-4">
        <div>
          <div className="p-1">
            <input
            onChange={(e) => setNickname(e.target.value)}
              className="border border-black p-1 w-[250px]"
              type="text"
              placeholder="닉네임"
            />
          </div>
          <div className="p-1">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="border border-black p-1 w-[250px]"
              type="email"
              placeholder="이메일"
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
            회원가입
          </button>
        </div>
        <p className="hover:cursor-pointer" onClick={goLogin}>
          로그인
        </p>
      </form>
    </section>
  );
};

export default SignupForm;
