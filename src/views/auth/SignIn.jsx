import React from "react";
import { useState } from "react";
import axios from "axios";
import InitObject from "../../Utils/globalvariables";
import { useNavigate } from "react-router-dom";
import logo from "./../../assets/img/logo/logo-04.png";
import bgImage from "./../../assets/img/bg/loginBg.jpg";
import { toast } from "react-toastify";
import Input from "Common/Input";
import useAutoFocus from "Hooks/useAutoFocus";

function SignIn() {
  const navigate = useNavigate();
  // const [response, setResponse] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginmessage, setLoginMessage] = useState("");

  const userName = useAutoFocus();
  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    let api_address = InitObject.baseurl + "api/user_login/";
    axios
      .post(api_address, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
         if (response.data.isSuccess !== true) {
           toast.error("رمز عبور یا نام کاربری اشتباه است");
        } else {
          navigate("/main", { state: { userinfo: response.data } });
          toast.success("ورود با موفقیت انجام شد");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const contextClass = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };


  return (
    <>
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="absolute h-screen w-screen bg-cover bg-center blur-sm"
      ></div>
      <div className="flex h-screen items-center justify-center">
        <main className="z-10 mr-auto ml-auto box-border block w-full max-w-md p-2">
          <div className="flex flex-col items-center rounded-md bg-white dark:bg-navy-700 dark:text-white p-10">
            <img src={logo} alt="کمان" className="w-56 object-fill" />
            <h4 className="my-4 text-lg font-medium text-navy-500 dark:text-white">
              ورود به حساب کاربری
            </h4>
            <form className="w-full" >
            <Input
              id="name"
              name="user_name"
              inputType="text"
              Label=" * نام کاربری"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              />
            <Input
              id="password"
              name="user_password"
              inputType="password"
              Label="* کلمه عبور"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              />
            <button className="btns" type="submit" onClick={handleSubmit}>
              ورود
            </button>

              </form>
            <p className="text-slate-500 mt-5 font-[IRANSans] text-gray-700">
              © کپی رایت کمان {1900 + new Date().getYear()}
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

export default SignIn;
