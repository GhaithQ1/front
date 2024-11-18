import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import "./Profile.css";
import Loading from "../Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import user_img from "../../image/user.png"
import { useNavigate } from "react-router-dom"

export default function Profile() {
  const [loading, setloading] = useState(true);
  const [cookies , setCookies ] = useCookies(["token"]);
  const [user, setuser] = useState({});

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);


  const [nameerr, setNameerr] = useState("");
  const [phoneerr, setPhoneerr] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const updateUser = (event) => {
    event.preventDefault();

    if (profileImage) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("profilImage", profileImage);

      Axios.put(
        `http://${process.env.REACT_APP_BASE_URL}/api/v2/auth/update_date_user_my`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then((res) => {
          console.log("Profile updated successfully:", res);
          setnone(false)
          window.location.reload()
        })
        .catch((err) => {
          console.error("Error:", err.response.data.errors);
          
          const errors = err.response.data.errors

          errors.map((err)=>{
            
            if(err.path === 'name'){
              const e_error = errors.filter((e)=> e.path ===  'name')
              setNameerr(e_error[0].msg)
            }

            if(err.path === 'phone'){
              const pp_error = errors.filter((e)=> e.path ===  'phone')
              setPhoneerr(pp_error[0].msg)
            }
          })
        
        });
    } else {
      const data = {
        name: name,
        phone: phone,
      };

      Axios.put(
        `http://${process.env.REACT_APP_BASE_URL}/api/v2/auth/update_date_user_my`,
        data,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          console.log("Profile updated successfully:", res);
          setnone(false)
          window.location.reload()
        })
        .catch((err) => {
          console.error("Error:", err.response.data.errors);

          const errors = err.response.data.errors

          errors.map((err)=>{
            
            if(err.path === 'name'){
              const e_error = errors.filter((e)=> e.path ===  'name')
              setNameerr(e_error[0].msg)
            }

            if(err.path === 'phone'){
              const pp_error = errors.filter((e)=> e.path ===  'phone')
              setPhoneerr(pp_error[0].msg)
            }
          })

        });
    }
  };

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
        setName(res.data.data.name || "");
        setPhone(res.data.data.phone || "");
        setloading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [cookies.token]);

  // ========================================================================

  const [nome, setnone] = useState(false);

  // ======================================================

  const Navigate = useNavigate()

  const log_out = ()=>{
    // إزالة العناصر من الكوكيز والتخزين المحلي
    setCookies("token", "");
    window.localStorage.removeItem("user");

    // الانتقال إلى الصفحة الرئيسية
    Navigate("/");

  }

  // ======================================================

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="wrapper">
        <div className="form_user">
          <form className={nome ? "formUsers":"formUser"} onSubmit={updateUser}>
            <FontAwesomeIcon
              style={{ fontSize: "25px", color: "black", cursor: "pointer",marginLeft: "auto" }}
              icon={faXmark}
              onClick={()=>setnone(false)}
            />
            <div className="form-group">
              <p>{nameerr}</p>
              <label htmlFor="name">الاسم</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <p>{phoneerr}</p>
              <label htmlFor="phone">رقم الهاتف</label>
              <input
                type="number"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="profileImage">صورة الملف الشخصي</label>
              <img src={user.profilImage ? `http://${user.profilImage}` : ""} />
              <div className="image-upload-box">
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {previewImage ? (
                  <div className="image-preview">
                    <img src={previewImage} alt="Profile Preview" />
                  </div>
                ) : (
                  <FontAwesomeIcon icon={faPlus} className="plus-icon" />
                )}
              </div>
            </div>

            <button className="button" type="submit">تحديث الملف الشخصي</button>
          </form>
        </div>
        <div className="user-card">
          <div className="user-card-img">
          <img src={user.profilImage ? `http://${user.profilImage}` : user_img} />
          </div>
          <div className="user-card-info">
            <h2>{user.name}</h2>
            <p>
              <span>بريد الكتروني:</span>
              {user.email}
            </p>
            <p>
              <span>رقم هاتف:</span>
              {user.phone}
            </p>
            <p>
              <span>نقاطي:</span>
              {user.points}
            </p>
            <button className="button" onClick={log_out}>تسجيل الخروج</button>
          </div>
          
          <FontAwesomeIcon
            style={{
              fontSize: "25px",
              color: "#2196F3",
              position: "absolute",
              right: "20px",
              bottom: "20px",
              cursor: "pointer",
            }}
            icon={faPenToSquare}
            onClick={()=>setnone(true)}
          />
        </div>
      </div>
    </div>
  );
}
