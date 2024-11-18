import React from "react";

import Axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import "./Contact_Us.css";

export default function Contact_Us() {
  const [email, setemail] = useState("");
  const [subject, setsubject] = useState("");
  const [message, setmessage] = useState("");

  const [emailerr, setemailerr] = useState("");
  const [subjecterr, setsubjecterr] = useState("");
  const [messageerr, setmessageerr] = useState("");

  const [reset, setreset] = useState("");

  const resetEmail = () => {
    Axios.post(
      `http://${process.env.REACT_APP_BASE_URL}/api/v2/auth/receiveAndSendEmailMe`,
      {
        email,
        subject,
        message,
      }
    )
      .then((res) => {
        console.log(res.data.message);

        setemailerr("");
        setsubjecterr("");
        setmessageerr("");

        setemail("");
        setsubject("");
        setmessage("");

        if (res.data.message) {
          setreset(res.data.message);
        }
      })
      .catch((error) => {
        setemailerr("");
        setsubjecterr("");
        setmessageerr("");

        console.error("Error fetching data", error.response.data.errors);
        const err = error.response.data.errors;
        err.map((er) => {
          if (er.path === "email") {
            // setemailerr(er.msg)

            const e_error = err.filter((e) => e.path === "email");
            setemailerr(e_error[0].msg);
          }
          if (er.path === "subject") {
            setsubjecterr(er.msg);
          }
          if (er.path === "message") {
            setmessageerr(er.msg);
          }
        });
      });
  };

  return (
    <div class="contactus">
      <div class="container">
        <div className="contact">
          <div className="contactdes">
            <h1>اتصل بنا:</h1>
            <p>
              نحن هنا لمساعدتك! إذا كانت لديك أي أسئلة أو تعليقات أو كنت بحاجة
              إلى مساعدة بشأن خدماتنا، فلا تتردد في التواصل معنا.
            </p>
          </div>
          <div className="contacticon">
            <div className="icons localicon">
              <div className="ic">
                <FontAwesomeIcon className="icon" icon={faLocationDot} />
              </div>
              <span>Damascus, Syria</span>
            </div>
            <div className="icons">
              <div className="ic">
                <FontAwesomeIcon className="icon" icon={faPhone} />
              </div>
              <span>093479264</span>
            </div>
            <div className="icons">
              <div className="ic">
                <FontAwesomeIcon className="icon" icon={faEnvelope} />
              </div>
              <span>b2u2424@gmail.com</span>
            </div>
          </div>
          <div className="contactdes">
            <h1>نموذج الاتصال:</h1>
            <p>
            يمكنك أيضًا ملء النموذج وسنقوم بالرد عليك في أقرب وقت ممكن.
            </p>
            <p style={{ paddingTop: "10px" }}>
            إذا كان لديك أي استفسارات، لا تتردد في التواصل معنا!فنحن هنا لمساعدتك بكل سرور! 🌟
            </p>
          </div>
        </div>

        <div class="formss">
          {reset !== "" ? <p>{reset}</p> : null}
          <div className="coolinput">
            <p>{emailerr}</p>
            <label htmlFor="email" className="text">
            بريد إلكتروني:
            </label>
            <input
              type="email"
              id="email"
              placeholder="بريدك الإلكتروني"
              className="input"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>

          <div className="coolinput">
            <p>{subjecterr}</p>
            <label htmlFor="title" className="text">
            عنوان:
            </label>
            <input
              type="text"
              id="title"
              placeholder="ضع عنوانا للرسالة"
              className="input"
              value={subject}
              onChange={(e) => setsubject(e.target.value)}
            />
          </div>

          <div className="coolinput">
            <p>{messageerr}</p>
            <label htmlFor="description" className="text">
            وصف:
            </label>
            <textarea
              id="description"
              placeholder="وصف"
              className="input"
              value={message}
              onChange={(e) => setmessage(e.target.value)}
            />
          </div>
          <button className="button" onClick={resetEmail}>ارسال </button>
        </div>
      </div>
    </div>
  );
}
