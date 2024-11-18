import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import "./My_company.css";
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
import { format } from 'date-fns';
import img_plan from "../../image/ssssss.jpg";
import img_plan1 from "../../image/sssss.jpg";

import Loading from "../Loading/Loading";
import user_img from "../../image/user.png"
import img_hero1 from "../../image/hero1.jpg";

export default function My_company() {
  const Navigate = useNavigate();

  const [loading, setloading] = useState(true);

  const [cookies] = useCookies(["token"]);
  const [company, setCompany] = useState(null);
  const [companyNot, setCompanyNot] = useState("");

  const [advercompany, setadvercompany] = useState([]);

  useEffect(() => {
    Axios.get(
      `http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_company_my`,
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    )
      .then((res) => {
        setCompany(res.data.data);
        console.log(res.data.data);
        Axios.get(
          `http://${
            process.env.REACT_APP_BASE_URL
          }/api/v2/company/get_company_advertisements_my/${
            res.data.data ? res.data.data._id : null
          }`,
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        )
          .then((res) => {
            // setloading(true)
            setadvercompany(res.data.data);
            setloading(false);
          })
          .catch((error) => {
            console.error("Error fetching data", error);
            setloading(false);
          });
        setloading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error.response.data.message);

        setCompanyNot(error.response.data.message);

        setloading(false);
      });
  }, []);

  // ==============================================

  if (loading) {
    return <Loading />;
  }

  return (
    <div class="company shit">
      {company ? (
        <div class="container">
          <div class="profilcom">
            <div class="test">
              <div class="info">
                <div class="infosection">
                  <h1>
                    معلومات:
                    <FontAwesomeIcon
                      onClick={() => Navigate("/update_company_me")}
                      style={{
                        marginLeft: "20px",
                        cursor: "pointer",
                        color: "#2196F3",
                        fontSize: "25px",
                      }}
                      icon={faPenToSquare}
                    />
                  </h1>
                  <ul>
                    <li>بريد الكتروني : {company ? company.email : "N/A"}</li>
                    <li>رقم الهاتف : {company ? company.phone : "N/A"}</li>
                    <li>البلد : {company ? company.Country : "N/A"}</li>
                    <li>المدينة : {company ? company.city : "N/A"}</li>
                    <li>الشارع : {company ? company.street : "N/A"}</li>
                    <li>
                      متوسط التقييم : {company ? company.ratingsQuantity : "0"}
                    </li>
                    <li>
                      الفئة :{" "}
                      {company.categorey ? company.categorey.name : "categorey"}
                    </li>
                    <li>
                      نوع الاشتراك :{" "}
                      {company ? company.subscription?.type : "N/A"}
                    </li>
                    {/* <li>Subscription type : {company ? company.subscription?.type : "N/A"}</li> */}
                    <li>
                      تاريخ الاشتراك :{" "}
                      {company.subscription.startDate ? format(new Date(company.subscription.startDate), 'dd/MM/yyyy') : "N/A"}
                    </li>
                    <li>
                      تاريخ انتهاء الصلاحية :{" "}
                      {company.subscription.endDate ?format(new Date(company.subscription.endDate), 'dd/MM/yyyy'): "N/A"}
                    </li>
                  </ul>
                </div>
                <div class="icon">
                  <div class="stars">
                    <StarRating rating={company ? company.ratingsAverage : 0} />
                  </div>
                  <div class="media">
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
            <div class="dec decr_cpma">
              <h1>الوصف:</h1>
              <p>
                {company ? company.description : "No Description Available"}
              </p>
            </div>
            <div class="dec">
              <div className="scrol">
                {company
                  ? company.comments.map((comm) => {
                      return (
                        <div className="comment">
                          <img
                            src={
                              comm.user_comment.profilImage
                                ? `http://${comm.user_comment.profilImage}`
                                :user_img
                            }
                          />
                          <div className="commint_text">
                            <p>
                              {comm.user_comment.name
                                ? comm.user_comment.name
                                : "ureueng ngui B2U"}
                            </p>
                            <span>{comm.comment ? comm.comment : null}</span>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
          <h1>اعلاناتي</h1>
          <div class="add">
            {advercompany
              ? advercompany.map((adv) => {
                  return (
                    <div class="adver" key={adv._id}>
                      <div class="company_add">
                        <img
                          src={
                            adv.Company ? `http://${adv.Company.logoImage}` : ""
                          }
                          alt=""
                        />
                        <div class="name">
                          <h1>{adv.Company ? adv.Company.name : null}</h1>
                          <span>{adv.createdAt ? format(new Date(adv.createdAt), 'dd/MM/yyyy') : null}</span>
                        </div>
                      </div>
                      <div class="advercompany">
                        <div class="des">
                          <h2>{adv.title ? adv.title : null}</h2>
                          <p style={{whiteSpace:"pre-line"}}>{adv.description ? adv.description : null}</p>
                        </div>
                        <div class="imagescomapny">
                          {adv.Image
                            ? adv.Image.map((img, index) => {
                                return (
                                  <img
                                    key={index}
                                    src={`http://${img}`}
                                    alt="Advertisement"
                                  />
                                );
                              })
                            : null}
                        </div>
                        <div class="likes">
                          <span>Likes {adv.likes ? adv.likes.length : 0}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
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
                <div class="images">
                  <img src={img_plan} alt="tent-1" class="tent-1" />
                  <img src={img_plan1} alt="tent-2" class="tent-2" />
                </div>
                <div class="content">
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
