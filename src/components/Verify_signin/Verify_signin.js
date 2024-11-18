import React, { useEffect, useState } from "react";
import "../Signin/Signin.css";

import Axios from "axios";

import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";

import img_back1 from "../../image/hero-shape-2.svg";

import login_img from "../../image/login.svg";
import sign_img from "../../image/sign.svg";

export default function Verify_signin() {
  const [Cook, setCookies] = useCookies("token");

  const [verify, setverify] = useState("");
  const [verifyerr, setverifyerr] = useState("");

  const Navigate = useNavigate();

  const code = () => {
    console.log("Verification code sent:", verify); // طباعة الرمز للتأكد من صحته
    console.log(typeof verify); // طباعة الرمز للتأكد من صحته

    const code = JSON.parse(window.localStorage.getItem("code"));

    Axios.post(`http://${process.env.REACT_APP_BASE_URL}/api/v2/auth/verify`, {
      verificationCode: verify,
      tempUser: code,
    })
      .then((res) => {
        console.log(res);
        setverifyerr(""); // مسح أي رسالة خطأ سابقة
        setCookies("token", res.data.token);
        window.localStorage.setItem("user", JSON.stringify(res.data.data));
        window.localStorage.setItem("token", res.data.token);
        Navigate("/"); // التوجيه إلى الصفحة الرئيسية
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        if (error.response?.data?.message) {
          setverifyerr(error.response.data.message); // عرض رسالة الخطأ المناسبة
        } else {
          setverifyerr("An unknown error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className="signin sign-up-mode">
      <img className="back1" src={img_back1} />
      <div className="forms-container">
        <div className="signin-signup">
          <div className="sign-up-form form">
            <h2 className="title">اشتراك</h2>
            <span style={{ marginBottom: "10px" }}>
              لقد تم إرسال الرمز إليك.
            </span>
            <div className="input-field">
              <p>{verifyerr}</p>
              <span className="material-symbols-outlined">code</span>
              <input
                type="text"
                placeholder="ضع الرمز"
                value={verify}
                onChange={(e) => setverify(e.target.value)}
              />
            </div>
            <input onClick={code} type="submit" className="btn" value="ارسال" />
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
            <button  className="btn transparent" id="sign-up-btn">
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
          </div>
          <img src={sign_img} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
