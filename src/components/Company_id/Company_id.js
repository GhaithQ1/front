import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import StarRating from "../StarRating/StarRating";
import "./Company_id.css";

import Loading from "../Loading/Loading";

import img_hero1 from "../../image/hero1.jpg";

import { useCookies } from "react-cookie";

import user_img from "../../image/user.png"
import { format } from 'date-fns';
export default function Company_id() {
  const { id } = useParams();

  // حالات الـ state للمعلومات
  const [company, setCompany] = useState(null); // قيم مبدئية لـ company كـ null
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true); // حالة تحميل البيانات

  const [loading_com, setLoading_com] = useState(true);


  const [sss , setssss] = useState(false)

  // تحميل البيانات من الخادم
  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const companyResponse = await Axios.get(
          `http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_company_id/${id}`
        );
        setCompany(companyResponse.data.data);
        // console.log(companyResponse.data.data);

        const adsResponse = await Axios.get(
          `http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_all_company_advertisements_id/${id}`
        );
        setAdvertisements(adsResponse.data.data);
      } catch (error) {
        // console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id , loading_com]); // اعادة تحميل البيانات عند تغيير id

  // ===============================================================

  const [cookies] = useCookies(["token"]);
  const [comments, setcomments] = useState("");
  const [commentserr, setcommentserr] = useState("");

  const create_comment = (id) => {
    setLoading_com(false)
    Axios.post(
      `http://${process.env.REACT_APP_BASE_URL}/api/v2/company/create_company_comments/${id}`,
      {
        comment: comments,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    )
      .then((res) => {
        console.log(res.data);
        setLoading_com(true)
        setcomments("")
      })
      .catch((error) => {

        console.log(error.response)
        if (error.response.data.message) {
          if(error.response.data.message === "jwt must be provided"){
            setcommentserr("يجب تسجيل الدخول اولا")
          }else{
            setcommentserr(error.response.data.message);
          }
          
        }

        if (error.response.data.errors) {
          setcommentserr(error.response.data.errors[0].msg);
          // error.response.data.errors[0]
        }
        setLoading_com(true)
      });
  };

  // =============================================================



  const  rat = (num , id)=>{
    
    Axios.post(
      `http://${process.env.REACT_APP_BASE_URL}/api/v2/company/create_company_Reviews/${id}`,
      {
        rating: num,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    ).then((res)=>{
      console.log(res)

    }).catch((err)=>{
      console.log(err)
    })


  }

  // -----------------------------------------------------------

  const [user, setuser] = useState({});

  useEffect(() => {
    Axios.get(
      `http://${process.env.REACT_APP_BASE_URL}/api/v2/auth/get_date_my`,
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    )
      .then((res) => {
        setuser(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [cookies.token]);

  // التحقق من حالة تحميل البيانات
  if (loading) {
    return <Loading />; // عرض شاشة التحميل
  }

  return (
    <div className="company">
      <div className="container">
        <div className="profilcom">
          <div className="test">
            <div className="info">
              <div className="infosection">
                <h1>{company ? company.name : "No Company Name"}</h1>
                <h2>:معلومات عن الشركة</h2>
                <ul>
                  <li> {company ? company.email : "N/A"} : بريد إلكتروني</li>
                  <li>رقم الهاتف : {company ? company.phone : "N/A"}</li>
                  <li>البلد : {company ? company.Country : "N/A"}</li>
                  <li>المدينة : {company ? company.city : "N/A"}</li>
                  <li>الشارع : {company ? company.street : "N/A"}</li>
                  <li>
                   عدد المقيمين : {company ? company.ratingsQuantity : "0"}
                  </li>
                  <li>
                    الفئة :{" "}
                    {company.categorey ? company.categorey.name : "categorey"}
                  </li>
                </ul>
              </div>
              <div className="icon">
                <div className="stars">
                  <StarRating rating={company ? company.ratingsAverage : 0} />
                </div>
                <div className="media">
                  <a href={company ? company.facebook : ""}>
                    <FontAwesomeIcon className="faFacebook" icon={faFacebook} />
                  </a>
                  <a href={company ? company.linkedIn : ""}>
                    <FontAwesomeIcon className="faLinkedin" icon={faLinkedin} />
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
              alt="Company Image"
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
            <p style={{whiteSpace:"pre-line"}}>{company ? company.description : "لا يوجد وصف متاح"}</p>
          </div>
          <div class="dec">
            <div className="scrol">
              {loading_com? 
              company
              ? company.comments.map((comm) => {
                  return (
                    <div className="comment">
                      <img
                        src={
                          comm.user_comment.profilImage
                            ? `http://${comm.user_comment.profilImage}`
                            : user_img
                        }
                      />
                      <div className="commint_text">
                        <p>
                          {comm.user_comment ? comm.user_comment.name : null}
                        </p>
                        <span>{comm.comment ? comm.comment : null}</span>
                      </div>
                    </div>
                  );
                })
              : null
              : <Loading/>}
            </div>
            <div class="radio">


            <input value="5" name="rating" type="radio" id="rating-5" />
              <label  title="5 star" htmlFor="rating-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                  onClick={()=>rat(5 , company._id)}
                >
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                </svg>
              </label>



            <input value="4" name="rating" type="radio" id="rating-4" />
              <label  title="4 stars" htmlFor="rating-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                  onClick={()=>rat(4 , company._id)}
                >
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                </svg>
              </label>

            <input value="3" name="rating" type="radio" id="rating-3" />
              <label  title="3 stars" htmlFor="rating-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                  onClick={()=>rat(3 , company._id)}
                >
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                </svg>
              </label>


            <input value="2" name="rating" type="radio" id="rating-2" />
              <label  title="2 stars" htmlFor="rating-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                  onClick={()=>rat(2 , company._id)}
                >
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                </svg>
              </label>

              <input value="1" name="rating" type="radio" id="rating-1" />
              <label  title="1 stars" htmlFor="rating-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                  onClick={()=>rat(1 , company._id)}
                >
                  <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                </svg>
              </label>

             

            

             

              
            </div>
            <div className="create_comment">
              <img src={user.profilImage ? `http://${user.profilImage}` : user_img} />
              <input
                type="text"
                placeholder="اكتب تعليق"
                value={comments}
                onChange={(e) => setcomments(e.target.value)}
              />
              <FontAwesomeIcon
                onClick={(id) => create_comment(company._id)}
                style={{
                  position: "absolute",
                  fontSize: "20px",
                  left: "30px",
                  top: "30px",
                  cursor: "pointer",
                }}
                icon={faPaperPlane}
              />
              <p>{commentserr}</p>
            </div>
          </div>
        </div>

        <div className="add">
          {advertisements.map((adv, index) => (
            <div key={index} className="adver">
              <div className="company_add">
                <img
                  src={
                    company ? `http://${company.logoImage}` : "defaultLogo.jpg"
                  }
                  alt="Company Logo"
                />
                <div className="name">
                  <h1>{company ? company.name : "No Company Name"}</h1>
                  <span>{adv.createdAt ? format(new Date(adv.createdAt), 'dd/MM/yyyy') : "No Date"}</span>
                </div>
              </div>
              <div className="advercompany">
                <div className="des">
                  <h2>{adv.title ? adv.title : "No Title"}</h2>
                  <p style={{whiteSpace:"pre-line"}}>{adv.description ? adv.description : "No Description"}</p>
                </div>
                <div className="imagescomapny">
                  {adv.Image && adv.Image.length > 0 ? (
                    adv.Image.map((img, index) => (
                      <img
                        key={index}
                        src={`http://${img}`}
                        alt="Advertisement"
                      />
                    ))
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className="likes">
                  <span>Likes {adv.likes ? adv.likes.length : 0}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
