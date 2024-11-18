import React, { useEffect, useState } from "react";
import "./Signin.css";

import Axios from "axios";

import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";

import img_back1 from "../../image/hero-shape-2.svg";

import login_img from "../../image/login.svg";
import sign_img from "../../image/sign.svg";

export default function Signin() {
  useEffect(() => {
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".signin");

    if (sign_up_btn && sign_in_btn && container) {
      sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
      });

      sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
      });
    } else {
      console.error("Elements not found!");
    }
  }, []); // تأكد من وضع مصفوفة التبعية فارغة لتشغيلها مرة واحدة عند التحميل

  //----------------------------------------------------------

  const Navigate = useNavigate();

  const [Cook, setCookies] = useCookies("token");

  const [emailup, setemailup] = useState("");
  const [passwordup, setpasswordup] = useState("");

  const [erroremailup, errorsetemailup] = useState("");
  const [errorpasswordup, errorsetpasswordup] = useState("");

  const [errorup, errorsetup] = useState("");

  const login = async (e) => {
    e.preventDefault();
    await Axios.post(
      `http://${process.env.REACT_APP_BASE_URL}/api/v2/auth/login`,
      {
        email: emailup,
        password: passwordup,
      }
    )
      .then((res) => {
        console.log("استجابة الخادم:", res.data);

        setemailup("");
        setpasswordup("");

        errorsetemailup("");
        errorsetpasswordup("");

        errorsetup("");

        setCookies("token", res.data.token);
        window.localStorage.setItem("user", JSON.stringify(res.data.data));
        window.localStorage.setItem("token", res.data.token);

        Navigate("/");

        window.location.reload();
      })
      .catch((error) => {
        console.log(error);

        const errors = error.response.data.errors;

        if (errors !== undefined) {
          errors.map((err) => {
            if (err.path === "email") {
              const e_error = errors.filter((e) => e.path === "email");
              errorsetemailup(e_error[0].msg);
            }

            if (err.path === "password") {
              const p_error = errors.filter((e) => e.path === "password");
              errorsetpasswordup(p_error[0].msg);
            }
          });

          errorsetup("");
        } else {
          errorsetup(error.response.data.message);
          errorsetemailup("");
          errorsetpasswordup("");
        }
      });
  };

  // ----------------------------------------------

  const [emailin, setemailin] = useState("");
  const [passwordin, setpasswordin] = useState("");
  const [namein, setnamein] = useState("");
  const [passwordConfirmin, setpasswordConfirmin] = useState("");

  const [erroremailin, errorsetemailin] = useState("");
  const [errorpasswordin, errorsetpasswordin] = useState("");
  const [errornamein, errorsetnamein] = useState("");
  const [errorpasswordConfirmin, errorsetpasswordConfirmin] = useState("");

  const [errorin, errorsetin] = useState("");

  const Signup = async (e) => {
    e.preventDefault();
    await Axios.post(
      `http://${process.env.REACT_APP_BASE_URL}/api/v2/auth/sign_up`,
      {
        name: namein,
        email: emailin,
        password: passwordin,
        passwordConfirm: passwordConfirmin,
      }
    )
      .then((res) => {
        setemailin("");
        setpasswordin("");
        setnamein("");
        setpasswordConfirmin("");

        errorsetemailin("");
        errorsetpasswordin("");
        errorsetnamein("");
        errorsetpasswordConfirmin("");

        // setCookies("token",res.data.token)
        // window.localStorage.setItem("code" , JSON.stringify(res.data.data) )
        localStorage.setItem("code", JSON.stringify(res.data.data));
        // window.localStorage.setItem("token" , res.data.token)

        Navigate("/verify_signin");
      })
      .catch((error) => {
        console.log(error.response.data.errors);

        const errors = error.response.data.errors;

        if (errors !== undefined) {
          errors.map((err) => {
            if (err.path === "email") {
              const e_error = errors.filter((e) => e.path === "email");
              errorsetemailin(e_error[0].msg);
            }

            if (err.path === "password") {
              const p_error = errors.filter((e) => e.path === "password");
              errorsetpasswordin(p_error[0].msg);
            }

            if (err.path === "name") {
              const p_error = errors.filter((e) => e.path === "name");
              errorsetnamein(p_error[0].msg);
            }

            if (err.path === "passwordConfirm") {
              const p_error = errors.filter(
                (e) => e.path === "passwordConfirm"
              );
              errorsetpasswordConfirmin(p_error[0].msg);
            }
          });

          errorsetup("");
        } else {
          errorsetup(error.response.data.message);
          errorsetemailup("");
          errorsetpasswordup("");
        }
      });
  };

  return (
    <div className="signin">
      <img className="back1" src={img_back1} />
      <div className="forms-container">
        <div className="signin-signup">
          <div className="sign-in-form form">
            <h2 className="title">تسجيل الدخول</h2>
            <p style={{ top: "100px" }}>{errorup}</p>
            <div className="input-field">
              <p>{erroremailup}</p>
              <span className="material-symbols-outlined">person</span>
              <input
                type="email"
                placeholder="بريد الكتروني"
                value={emailup}
                onChange={(e) => setemailup(e.target.value)}
              />
            </div>
            <div className="input-field">
              <p>{errorpasswordup}</p>
              <span className="material-symbols-outlined">lock</span>
              <input
                type="password"
                placeholder="كلمة السر"
                value={passwordup}
                onChange={(e) => setpasswordup(e.target.value)}
              />
            </div>
            <p className="for_pass" onClick={() => Navigate("/forgot_passord")}>
            هل نسيت كلمة السر ?
            </p>
            <input
              onClick={login}
              type="submit"
              value="تسجيل الدخول"
              className="btn solid"
            />
          </div>

          <div className="sign-up-form form">
            <h2 className="title">اشتراك</h2>
            <div className="input-field">
              <p>{errornamein}</p>
              <span className="material-symbols-outlined">person</span>
              <input
                type="text"
                placeholder="اسم المستخدم"
                value={namein}
                onChange={(e) => setnamein(e.target.value)}
              />
            </div>
            <div className="input-field">
              <p>{erroremailin}</p>
              <span className="material-symbols-outlined">email</span>
              <input
                type="email"
                placeholder="بريد الكتروني"
                value={emailin}
                onChange={(e) => setemailin(e.target.value)}
              />
            </div>
            <div className="input-field">
              <p>{errorpasswordin}</p>
              <span className="material-symbols-outlined">lock</span>
              <input
                type="password"
                placeholder="كلمة السر"
                value={passwordin}
                onChange={(e) => setpasswordin(e.target.value)}
              />
            </div>
            <div className="input-field">
              <p>{errorpasswordConfirmin}</p>
              <span class="material-symbols-outlined">lock_reset</span>
              <input
                type="password"
                placeholder="تاكيد كلمة السر"
                value={passwordConfirmin}
                onChange={(e) => setpasswordConfirmin(e.target.value)}
              />
            </div>
            <input
              onClick={Signup}
              type="submit"
              className="btn"
              value="اشتراك"
            />
          </div>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>مرحباً بكم في B2U</h3>
            <p>
              مرحبًا بك في B2U، دليل الأعمال المثالي الخاص بك! تواصل مع أفضل
              الشركات واكتشف خدمات لا مثيل لها. ليس لديك حساب؟ أنشئ حسابًا وافتح
              فرصًا لا حصر لها.
            </p>
            <button className="btn transparent" id="sign-up-btn">
              اشتراك
            </button>
          </div>
          <img src={login_img} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>مرحباً بكم في B2U</h3>
            <p>
              احصل على إمكانية الوصول إلى رؤى تجارية حصرية وتواصل مع شركات من
              الدرجة الأولى. سواء كنت تتطلع إلى توسيع شبكتك أو استكشاف فرص
              جديدة، فإن منصتنا مصممة لمساعدتك على النجاح. سجّل الدخول الآن لبدء
              رحلتك مع B2U.
            </p>
            <button  className="btn transparent" id="sign-in-btn">
            تسجيل الدخول
            </button>
          </div>
          <img src={sign_img} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
