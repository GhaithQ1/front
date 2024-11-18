import { useNavigate } from "react-router-dom";

import React, { useState, useRef, useEffect } from "react";
import "./Advertisements.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPlus,
  faTimes,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

import Loading from "../Loading/Loading";
import user_img from "../../image/user.png";

import { format } from "date-fns";

import { useCookies } from "react-cookie";

export default function Advertisements() {
  const maxFiles = 5;
  const [currentFiles, setCurrentFiles] = useState(
    new Array(maxFiles).fill(null)
  );
  const [isAdFormOpen, setIsAdFormOpen] = useState(false);
  const imageInputRefs = useRef([]);
  const uploadBoxRefs = useRef([]);

  const [loading, setLoading] = useState(true);

  const Navigate = useNavigate();

  const toggleAdForm = () => {
    setIsAdFormOpen(!isAdFormOpen);
  };

  const handleImageInputChange = (event, index) => {
    const file = event.target.files[0];

    if (file) {
      const newFiles = [...currentFiles];
      newFiles[index] = URL.createObjectURL(file); // إنشاء عنوان URL للملف الجديد
      setCurrentFiles(newFiles);

      // تحديث محتويات العنصر مباشرة ليعرض الصورة داخل input نفسه
      const inputContainer = uploadBoxRefs.current[index];
      inputContainer.style.backgroundImage = `url(${newFiles[index]})`;
      inputContainer.style.backgroundSize = "cover";
      inputContainer.style.backgroundPosition = "center";
    }
  };

  const removeImage = (index) => {
    const newFiles = [...currentFiles];
    newFiles[index] = null; // إزالة الصورة
    setCurrentFiles(newFiles);

    // تحديث محتويات العنصر لإزالة الصورة من input
    const inputContainer = uploadBoxRefs.current[index];
    inputContainer.style.backgroundImage = "none";

    // إعادة تعيين قيمة المدخل
    imageInputRefs.current[index].value = "";
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    imageInputRefs.current.forEach((inputRef, index) => {
      const file = inputRef.files[0];
      if (file) {
        formData.append(`image-${index}`, file);
      }
    });

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // يمكنك إضافة المزيد من المنطق هنا بعد رفع الملفات بنجاح
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [iconn, seticonn] = useState(false);

  // =============================================

  const [advertisement, setadvertisement] = useState([]);
  const [category_id, setcategory_id] = useState("");

  useEffect(() => {
    Axios.get(
      `http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_all_company_advertisements?categorey=${category_id}`
    )
      .then((res) => {
        setadvertisement(res.data.data);
        // console.log(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [advertisement]);

  const [cookies] = useCookies(["token"]);

  const [ss, setss] = useState(true);

  const likes = (id) => {
    Axios.post(
      `http://${process.env.REACT_APP_BASE_URL}/api/v2/company/likes_company_advertisements/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    )
      .then((res) => {
        // console.log(res)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const likes_h = (lik, adv) => {
    // استرجاع بيانات المستخدم من localStorage
    const userData = localStorage.getItem("user");

    // تحويل البيانات من JSON إلى كائن JavaScript
    const user = JSON.parse(userData);

    // الحصول على user._id
    const userId = user?._id;

    // التحقق مما إذا كان userId موجودًا ضمن قائمة الإعجابات
    const userHasLiked = lik.includes(userId);

    // إنشاء عنصر p مع الشرط للون
    return (
      <p
        style={{ color: userHasLiked ? "#3e7dff" : "#9b9b9d" }}
        onClick={() => likes(adv._id)}
      >
        <FontAwesomeIcon icon={faThumbsUp} /> Like
      </p>
    );
  };

  // ----------------------------------------------------------

  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [imgs, setimgs] = useState(false);

  const [titleerr, settitleerr] = useState("");
  const [descriptionerr, setdescriptionerr] = useState("");
  const [err, seterr] = useState("");

  const creat_Advertisements = (event) => {
    event.preventDefault();
    const formData = new FormData();

    // إضافة الصور إلى الـ FormData
    imageInputRefs.current.forEach((inputRef, index) => {
      const file = inputRef.files[0];
      if (file) {
        formData.append("Image", file); // تأكد من إرسال الحقل باسم "Image" وليس "Image[]"
      }
    });

    // إضافة البيانات الأخرى
    formData.append("title", title);
    formData.append("description", description);

    // إرسال الطلب
    Axios.post(
      `http://${process.env.REACT_APP_BASE_URL}/api/v2/company/create_company_advertisements_my`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "Content-Type": "multipart/form-data", // تأكد من إرسال البيانات كـ FormData
        },
      }
    )
      .then((res) => {
        console.log(res);
        setIsAdFormOpen(!isAdFormOpen);

        window.location.reload();
      })
      .catch((err) => {
        // console.error("Error creating advertisement with images:", err.response.data.message);

        const ree = err.response.data.errors;

        if (ree) {
          ree.map((r) => {
            if (r.path === "title") {
              settitleerr(r.msg);
            }
            if (r.path === "description") {
              setdescriptionerr(r.msg);
            }
          });
        }

        if (err.response.data.message) {
          if (err.response.data.message === "jwt must be provided") {
            seterr("يجب تسجيل الدخول اولا");
          } else {
            seterr(err.response.data.message);
          }
        }

        // if(err.response.data.message){
        //   seterr(err.response.data.message)
        // }
      });
  };

  // -----------------------------------

  const [category, setCategory] = useState([]);

  useEffect(() => {
    Axios.get(
      `http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_Categorey`
    )
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  // ========================================

  const [mycmpany, setmycmpany] = useState();

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
        setmycmpany(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  // --------------------------------------

  if (loading) {
    return <Loading />; // عرض شاشة التحميل
  }

  return (
    <div className="advertisements">
      {isAdFormOpen && (
        <div className="blor">
          <div className="createad">
            <div className="exit">
              <h1>إنشاء إعلان</h1>
              <FontAwesomeIcon
                style={{ color: "black", fontSize: "30px", cursor: "pointer" }}
                onClick={toggleAdForm}
                icon={faTimes}
              />
            </div>
            <div className="imgcomapny">
              <img
                src={mycmpany ? `http://${mycmpany.logoImage}` : ""}
                alt="Company"
              />
              <p>{mycmpany ? mycmpany.name : null}</p>
            </div>
            <p style={{ color: "red" }}>{titleerr}</p>

            <select onChange={(e) => settitle(e.target.value)}>
              <option hidden disabled selected>
                نوع الإعلان
              </option>
              <option value="إعلانات المنتجات">إعلانات المنتجات</option>
              <option value="إعلانات الخدمات">إعلانات الخدمات</option>
              <option value="إعلانات التخفيضات والخصومات">
                إعلانات التخفيضات والخصومات
              </option>
              <option value="إعلانات المناسبات والأحداث">
                إعلانات المناسبات والأحداث
              </option>
              <option value="إعلانات الوظائف">إعلانات الوظائف</option>
              <option value="إعلانات الشراكات والتعاون">
                إعلانات الشراكات والتعاون
              </option>
              <option value="إعلانات العلامة التجارية">
                إعلانات العلامة التجارية
              </option>
              <option value="إعلانات العروض المجانية">
                إعلانات العروض المجانية
              </option>
              <option value="إعلانات إطلاق المنتجات الجديدة">
                إعلانات إطلاق المنتجات الجديدة
              </option>
            </select>

            <p style={{ color: "red" }}>{descriptionerr}</p>
            <textarea
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              placeholder="اكتب وصفا هنا"
            ></textarea>
            <form
              id="uploadForm"
              className="createadimg"
              onSubmit={handleFormSubmit}
            >
              <div>
                {currentFiles.map((file, index) => (
                  <div key={index} className="upload-container">
                    <div
                      className="upload-box"
                      ref={(el) => (uploadBoxRefs.current[index] = el)}
                    >
                      <input
                        ref={(el) => (imageInputRefs.current[index] = el)}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageInputChange(e, index)}
                        style={{
                          opacity: 0,
                          position: "absolute",
                          zIndex: 10,
                          width: "100%",
                          height: "100%",
                        }}
                      />
                      {file && (
                        <div className="image-overlay">
                          <img src={file} alt={`Upload ${index + 1}`} />
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="remove-icon"
                            onClick={() => removeImage(index)}
                          />
                        </div>
                      )}
                      <FontAwesomeIcon icon={faPlus} className="plus-icon" />
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ color: "red" }}>{err}</p>
              <button type="submit" className="button" onClick={creat_Advertisements}>
                رفع
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="container">
        <div className="mains">
          <div className="menu-icon" id="menuIcon">
            <FontAwesomeIcon
              style={{ fontSize: "20px" }}
              onClick={() => seticonn(true)}
              icon={faBars}
            />
          </div>
          <div className={iconn ? "filter menu-show" : "filter"}>
            <div className="fex">
              <FontAwesomeIcon
                style={{
                  fontSize: "24px",
                  cursor: "pointer",
                  marginBottom: "15px",
                }}
                onClick={() => seticonn(false)}
                icon={faTimes}
              />
              <p
                className="active"
                onClick={() => {
                  setcategory_id("");
                  seticonn(false);
                }}
              >
                جميع الفئات
              </p>
              {category ? (
                category.map((cat) => {
                  return (
                    <p
                      key={cat._id}
                      onClick={() => {
                        setcategory_id(cat._id);
                        seticonn(false);
                      }}
                    >
                      {cat.name}
                    </p>
                  );
                })
              ) : (
                <p>لا يوجد فئة.</p>
              )}
            </div>
          </div>
          <div className="advertisement">
            <button id="show" className="button" onClick={toggleAdForm}>
              <img src={mycmpany ? `http://${mycmpany.logoImage}` : ""} />
              <p>أنشئ إعلانًا! فرصة رائعة لنشر إعلانك على موقعنا.</p>
            </button>

            {advertisement.length < 1 ? (
              <h2>لا يوجد اعلانات</h2>
            ) : (
              advertisement.map((adv) => {
                return (
                  <div className="adver" key={adv._id}>
                    <div style={{padding:"0"}} className="company">
                      <img
                        src={
                          adv.Company ? `http://${adv.Company.logoImage}` : ""
                        }
                        alt="Company"
                      />
                      <div className="name">
                        <h1>{adv.Company ? adv.Company.name : null}</h1>
                        <span>
                          {adv.createdAt
                            ? format(new Date(adv.createdAt), "dd/MM/yyyy")
                            : null}
                        </span>
                      </div>
                    </div>
                    <div className="advercompany">
                      <div className="des">
                        <h2>{adv.title ? adv.title : null}</h2>
                        <p style={{whiteSpace:"pre-line"}} >{adv.description ? adv.description : null}</p>
                      </div>
                      <div className="imagescomapny">
                        {adv.Image
                          ? adv.Image.map((img) => {
                              return (
                                <img key={img} src={`http://${img}`} alt="Ad" />
                              );
                            })
                          : null}
                        {/* <img src="hero2.jpg" alt="Ad" />
                        <img src="hero3.jpg" alt="Ad" /> */}
                      </div>
                      <div className="likes">
                        {likes_h(adv.likes, adv)}
                        {/* <p onClick={()=>likes(adv._id)}><FontAwesomeIcon icon={faThumbsUp} /> Like</p> */}
                        <span>Likes {adv.likes ? adv.likes.length : null}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
