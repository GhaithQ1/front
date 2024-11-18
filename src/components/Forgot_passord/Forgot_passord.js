import React, { useEffect , useState} from 'react';
import "../Signin/Signin.css";

import Axios from "axios";

import { useCookies } from "react-cookie"

import { useNavigate } from "react-router-dom"

import img_back1 from "../../image/hero-shape-2.svg";

import login_img from "../../image/login.svg";
import sign_img from "../../image/sign.svg";



export default function Forgot_passord() {

    const [email, setemail] = useState("")
    const [emailerr, setemailerr] = useState("")

    const Navigate = useNavigate()

    const code = ()=>{
        Axios.post(`http://${process.env.REACT_APP_BASE_URL}/api/v2/auth/forgotpassord` , {email})
      .then(res => {
        console.log(res.data.data);
        setemailerr("")
        Navigate("/verifyResetPassword")
      })
      .catch(error => {
        console.error('Error fetching data', error.response.data.errors);

        const err = error.response.data.errors

        if(err){
            setemailerr(err[0].msg)
        }

        
      });
    }

  return (
    <div className="signin">
        <img className='back1' src={img_back1}/>
      <div className="forms-container">
        <div className="signin-signup">

          <div className="sign-in-form form">
            <h2 className="title">هل نسيت كلمة السر</h2>
            <div className="input-field">
                <p>{emailerr}</p>
                <span className="material-symbols-outlined">
                person
                </span>
              <input type="email" placeholder="بريد الكتروني" value={email} onChange={(e)=>setemail(e.target.value)}/>
            </div>
            <input onClick={code} type="submit" value="ارسال الرمز" className="btn solid" />
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
  )
}
