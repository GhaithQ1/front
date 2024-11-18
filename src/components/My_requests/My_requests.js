import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import "../My_company/My_company.css";
import "./My_requests.css";
import "../Home/Home.css";
import StarRating from "../StarRating/StarRating";
import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import img_plan from "../../image/ssssss.jpg";
import img_plan1 from "../../image/sssss.jpg";

import Loading from "../Loading/Loading";

import img_hero1 from "../../image/hero1.jpg";

export default function My_reqeusts() {
  const Navigate = useNavigate();

  const [loading, setloading] = useState(true);

  const [cookies] = useCookies(["token"]);
  const [company, setCompany] = useState(null);
  const [companyNot, setCompanyNot] = useState("");

  useEffect(() => {
    Axios.get(
      `http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_Company_requests_my`,
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    )
      .then((res) => {
        setCompany(res.data.data);
        console.log(res.data.data);
        setloading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);

        setCompanyNot(error.response.data.message);

        setloading(false);
      });
  }, []);

  // ==============================================

  console.log(company);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="company shit">
      
      {company ? (
        <div className="container">
          <h2 className="rep_h2_">طلب الانضمام قيد الامراجعة</h2>
          <div className="profilcom">
            <div className="test">
              <div className="info">
                <div className="infosection">
                  <h1>{company ? company.name : "No Company Name"}</h1>
                  <h2>معلومات:</h2>
                  <ul>
                    <li>بريد الكتروني : {company ? company.email : "N/A"}</li>
                    <li>رقم هاتف : {company ? company.phone : "N/A"}</li>
                    <li>البلد : {company ? company.Country : "N/A"}</li>
                    <li>المدينة : {company ? company.city : "N/A"}</li>
                    <li>الشارع : {company ? company.street : "N/A"}</li>
                    <li>
                      متوسط التقييم : {company ? company.ratingsQuantity : "0"}
                    </li>
                    <li>
                      الفئة :{company.categorey ? company.categorey.name : "categorey"}
                      {company.categorey ? company.categorey.name : "categorey"}
                    </li>
                    {/* <li>Subscription type : {company ? company.subscription?.type : "N/A"}</li> */}
                    {/* <li>
                      تاريخ الاشتراك :{" "}
                      {company ? company.subscription?.startDate : "N/A"}
                    </li> */}
                    <li>
                        نوع الاشتراك :{" "}
                      {company ? company.subscription : "N/A"}
                    </li>
                  </ul>
                </div>
                <div className="icon">
                  <div className="stars">
                    <StarRating rating={company ? company.ratingsAverage : 0} />
                  </div>
                  <div className="media">
                    <a href={company ? company.facebook : ""}>
                      <FontAwesomeIcon
                        className="faFacebook"
                        icon={faFacebook}
                      />
                    </a>
                    <a href={company ? company.linkedIn : ""}>
                      <FontAwesomeIcon
                        className="faLinkedin"
                        icon={faLinkedin}
                      />
                    </a>
                    <a href={company ? company.instagram : ""}>
                      <FontAwesomeIcon
                        className="faInstagram"
                        icon={faInstagram}
                      />
                    </a>
                  </div>
                </div>
              </div>
              <img
                src={
                  company && company.companyImage
                    ? `http://${company.companyImage}`
                    : "defaultImage.jpg"
                }
                alt=""
              />
              <img
                className="img_lo"
                src={
                  company && company.logoImage
                    ? `http://${company.logoImage}`
                    : "defaultLogo.jpg"
                }
                alt="Company Logo"
              />
            </div>
          </div>
          <div className="dec_com">
            <div className="dec">
              <h1>وصف:</h1>
              <p>
                {company ? company.description : "No Description Available"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2 style={{ textAlign: "center", marginTop: "50px" }}>
            {companyNot}
          </h2>
          <div className="plans">
            <div className="container">
              <div class="container__right">
                <div className="images">
                  <img src={img_plan} alt="tent-1" className="tent-1" />
                  <img src={img_plan1} alt="tent-2" className="tent-2" />
                </div>
                <div className="content">
                  <h2> انضم اليوم</h2>
                  <h3>ابدأ رحلتك التجارية معنا الآن</h3>
                  <p>
                    انضم إلى مجتمع الأعمال لدينا اليوم واستمتع بفوائد الاشتراك
                    في منصتنا. أنشئ حسابًا لشركتك وعرض خدماتك على مجموعة واسعة
                    من العملاء. وسّع نطاق عملك وتفاعل مع شركاء جدد في الصناعة.
                    اختر خطة الاشتراك التي تناسب احتياجاتك بشكل أفضل وابدأ في
                    تعزيز حضورك عبر الإنترنت مع الدعم الكامل من فريقنا.
                  </p>
                  <button className="button" onClick={() => Navigate("/company_requests")}>
                    اشتراك
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
