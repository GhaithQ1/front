import React, { useState, useRef, useEffect } from "react";

import "./Create_company.css"; // تأكد من تعديل المسار إذا كان مختلفًا
import { useCookies } from "react-cookie";
import Axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Create_company() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage1(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange2 = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage2(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [user, setuser] = useState([]);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    Axios.get(`http://${process.env.REACT_APP_BASE_URL}/api/v2/user`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((res) => {
        setuser(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  const [Categorey, setCategorey] = useState([]);

  useEffect(() => {
    Axios.get(
      `http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_Categorey`
    )
      .then((res) => {
        setCategorey(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  const Navigate = useNavigate();

  const [name_c, setname_c] = useState("");
  const [description, setDescription] = useState("");
  const [companyImage, setCompanyImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [user_c, setUser_c] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [email, setEmail] = useState("");
  const [categorey_c, setCategorey_c] = useState("");
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [subscription, setSubscription] = useState("");

  const inputFileRef1 = useRef(null);
  const inputFileRef2 = useRef(null);

  const [name_err, setName_err] = useState("");
  const [description_err, setDescription_err] = useState("");
  const [companyImage_err, setCompanyImage_err] = useState("");
  const [logoImage_err, setLogoImage_err] = useState("");
  const [user_err, setUser_err] = useState("");
  const [phone_err, setPhone_err] = useState("");
  const [linkedIn_err, setLinkedIn_err] = useState("");
  const [facebook_err, setFacebook_err] = useState("");
  const [instagram_err, setInstagram_err] = useState("");
  const [email_err, setEmail_err] = useState("");
  const [categorey_err, setCategorey_err] = useState("");
  const [type_err, setType_err] = useState("");
  const [country_err, setCountry_err] = useState("");
  const [city_err, setCity_err] = useState("");
  const [street_err, setStreet_err] = useState("");
  const [subscription_err, setSubscription_err] = useState("");
  const [api_err, setapi_err] = useState("");

  const handleCompanyImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCompanyImage(file); // تعيين الملف الفعلي
    }
  };

  const handleLogoImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogoImage(file); // استخدام الملف الفعلي
    }
  };

  const Create_companys = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name_c);
    formData.append("description", description);
    if (companyImage) {
      formData.append("companyImage", companyImage); // تأكد من أنه من نوع File
    }
    if (logoImage) {
      formData.append("logoImage", logoImage); // تأكد من أنه من نوع File
    }
    formData.append("user", user_c);
    formData.append("phone", phone);
    formData.append("linkedIn", linkedIn);
    formData.append("facebook", facebook);
    formData.append("instagram", instagram);
    formData.append("email", email);
    formData.append("categorey", categorey_c);
    formData.append("type", type);
    formData.append("Country", country);
    formData.append("city", city);
    formData.append("street", street);
    formData.append("subscriptionType", subscription);

    // طباعة محتويات formData للتأكد من القيم
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    Axios.post(
      `http://${process.env.REACT_APP_BASE_URL}/api/v2/company`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          // لا تحتاج إلى 'Content-Type': 'multipart/form-data' هنا
        },
      }
    )
      .then((res) => {
        console.log("Company created successfully", res.data);
        // إعادة تعيين الأخطاء
        setName_err("");
        setDescription_err("");
        setCompanyImage_err("");
        setLogoImage_err("");
        setUser_err("");
        setPhone_err("");
        setLinkedIn_err("");
        setFacebook_err("");
        setInstagram_err("");
        setEmail_err("");
        setCategorey_err("");
        setType_err("");
        setCountry_err("");
        setCity_err("");
        setStreet_err("");
        setSubscription_err("");

        setName_err("");
        setDescription_err("");
        setCompanyImage_err("");
        setLogoImage_err("");
        setUser_err("");
        setPhone_err("");
        setLinkedIn_err("");
        setFacebook_err("");
        setInstagram_err("");
        setEmail_err("");
        setCategorey_err("");
        setType_err("");
        setCountry_err("");
        setCity_err("");
        setStreet_err("");
        setSubscription_err("");
        setapi_err("");

        Navigate("/admin/get_company");
      })
      .catch((error) => {
        console.error("Error creating company", error);
        setName_err("");
        setDescription_err("");
        setCompanyImage_err("");
        setLogoImage_err("");
        setUser_err("");
        setPhone_err("");
        setLinkedIn_err("");
        setFacebook_err("");
        setInstagram_err("");
        setEmail_err("");
        setCategorey_err("");
        setType_err("");
        setCountry_err("");
        setCity_err("");
        setStreet_err("");
        setSubscription_err("");
        if (error.response && error.response.data.errors) {
          const errors = error.response.data.errors || [];
          // إعادة تعيين الأخطا

          errors.forEach((err) => {
            if (err.path === "name") {
              const e_error = errors.filter((e) => e.path === "name");
              setName_err(e_error[0].msg);
            }
            if (err.path === "description") {
              const e_error = errors.filter((e) => e.path === "description");
              setDescription_err(e_error[0].msg);
            }
            if (err.path === "companyImage") {
              const e_error = errors.filter((e) => e.path === "companyImage");
              setCompanyImage_err(e_error[0].msg);
            }
            if (err.path === "logoImage") {
              const e_error = errors.filter((e) => e.path === "logoImage");
              setLogoImage_err(e_error[0].msg);
            }
            if (err.path === "user") {
              const e_error = errors.filter((e) => e.path === "user");
              setUser_err(e_error[0].msg);
            }
            if (err.path === "phone") {
              const e_error = errors.filter((e) => e.path === "phone");
              setPhone_err(e_error[0].msg);
            }
            if (err.path === "linkedIn") {
              const e_error = errors.filter((e) => e.path === "linkedIn");
              setLinkedIn_err(e_error[0].msg);
            }
            if (err.path === "facebook") {
              const e_error = errors.filter((e) => e.path === "facebook");
              setFacebook_err(e_error[0].msg);
            }
            if (err.path === "instagram") {
              const e_error = errors.filter((e) => e.path === "instagram");
              setInstagram_err(e_error[0].msg);
            }
            if (err.path === "email") {
              const e_error = errors.filter((e) => e.path === "email");
              setEmail_err(e_error[0].msg);
            }
            if (err.path === "categorey") {
              const e_error = errors.filter((e) => e.path === "categorey");
              setCategorey_err(e_error[0].msg);
            }
            if (err.path === "type") {
              const e_error = errors.filter((e) => e.path === "type");
              setType_err(e_error[0].msg);
            }
            if (err.path === "Country") {
              const e_error = errors.filter((e) => e.path === "Country");
              setCountry_err(e_error[0].msg);
            }
            if (err.path === "city") {
              const e_error = errors.filter((e) => e.path === "city");
              setCity_err(e_error[0].msg);
            }
            if (err.path === "street") {
              const e_error = errors.filter((e) => e.path === "street");
              setStreet_err(e_error[0].msg);
            }
            if (err.path === "subscriptionType") {
              const e_error = errors.filter(
                (e) => e.path === "subscriptionType"
              );
              setSubscription_err(e_error[0].msg);
            }
          });
        } else {
          setapi_err(
            error.response ? error.response.data.message : "حدث خطأ غير معروف"
          );

          console.log(api_err)
        }
      });
  };




  const arabCountries = [
    "السعودية",
    "الإمارات العربية المتحدة",
    "مصر",
    "العراق",
    "الأردن",
    "الكويت",
    "لبنان",
    "الجزائر",
    "السودان",
    "المغرب",
    "عمان",
    "فلسطين",
    "اليمن",
    "ليبيا",
    "تونس",
    "البحرين",
    "موريتانيا",
    "الصومال",
    "جيبوتي",
    "القدس",
    "جزر القمر",
    "سوريا",
];

  return (
    <div className="update_company">
      <h2>انشاء شركة</h2>

      {/* <p>{api_err}</p> */}

      <div className="inputs">
        <form onSubmit={Create_companys} encType="multipart/form-data">
          <div className="inputs">
            <div className="coolinput">
              <p>{name_err}</p>
              <label htmlFor="input" className="text">
                الاسم:
              </label>
              <input
                type="text"
                placeholder="الاسم"
                className="input"
                value={name_c}
                onChange={(e) => setname_c(e.target.value)}
              />
            </div>

            <div className="coolinput">
              <p>{email_err}</p>
              <label htmlFor="input" className="text">
                بريد الكتروني:
              </label>
              <input
                type="text"
                placeholder="بريد الكتروني"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="img_upd_">
              <div className="img_upd_1">
                <p>{companyImage_err}</p>
                <label htmlFor="companyImage" className="text">
                  صورة الشركة:
                </label>
                <div
                  className="img_upd"
                  onClick={() => inputFileRef1.current.click()}
                  style={{
                    backgroundImage: `url(${
                      companyImage ? URL.createObjectURL(companyImage) : ""
                    })`,
                  }}
                >
                  {!companyImage && <span>+</span>}
                  <input
                    type="file"
                    ref={inputFileRef1}
                    style={{ display: "none" }}
                    onChange={handleCompanyImageChange}
                  />
                </div>
              </div>

              <div className="img_upd_1">
                <p>{logoImage_err}</p>
                <label htmlFor="logoImage" className="text">
                  شعار الشركة:
                </label>
                <div
                  className="img_upd"
                  onClick={() => inputFileRef2.current.click()}
                  style={{
                    backgroundImage: `url(${
                      logoImage ? URL.createObjectURL(logoImage) : ""
                    })`,
                  }}
                >
                  {!logoImage && <span>+</span>}
                  <input
                    type="file"
                    ref={inputFileRef2}
                    style={{ display: "none" }}
                    onChange={handleLogoImageChange}
                  />
                </div>
              </div>
            </div>

            <div className="coolinput">
              <p>{description_err}</p>
              <label htmlFor="input" className="text">
                الوصف:
              </label>
              <textarea
                placeholder="الوصف"
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="coolinput">
              <p>{user_err}</p>
              <label htmlFor="input" className="text">
                المستخدم:
              </label>
              <select
                className="input"
                value={user_c}
                onChange={(e) => setUser_c(e.target.value)}
              >
                <option value="" hidden>
                  اختيار المستخدم
                </option>
                {user.map((use) => {
                  return (
                    <option
                      key={use._id}
                      value={use._id}
                    >{`${use.name} / ${use.email}`}</option>
                  );
                })}
              </select>
            </div>

            <div className="coolinput">
              <p>{categorey_err}</p>
              <label htmlFor="input" className="text">
                {" "}
                الفئة:
              </label>
              <select
                className="input"
                value={categorey_c}
                onChange={(e) => setCategorey_c(e.target.value)}
              >
                <option value="" hidden>
                  اختيار الفئة
                </option>
                {Categorey.map((cat) => {
                  return (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="coolinput">
              <p>{phone_err}</p>
              <label htmlFor="input" className="text">
                رقم الهاتف:
              </label>
              <input
                type="text"
                placeholder="رقم الهاتف"
                className="input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="coolinput">
              <p>{linkedIn_err}</p>
              <label htmlFor="input" className="text">
                LinkedIn:
              </label>
              <input
                type="text"
                placeholder="LinkedIn"
                className="input"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
              />
            </div>

            <div className="coolinput">
              <p>{facebook_err}</p>
              <label htmlFor="input" className="text">
                Facebook:
              </label>
              <input
                type="text"
                placeholder="Facebook"
                className="input"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>

            <div className="coolinput">
              <p>{instagram_err}</p>
              <label htmlFor="input" className="text">
                Instagram:
              </label>
              <input
                type="text"
                placeholder="Instagram"
                className="input"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>

            <div className="coolinput">
              <p>{country_err}</p>
              <label htmlFor="input" className="text">
                البلد:
              </label>
              {/* <input
                type="text"
                placeholder="البلد"
                className="input"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              /> */}
              <select
                className="input"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="" hidden>
                  اختيار البلد
                </option>
                {
                  arabCountries.map((co)=>{
                    return(
                      <option value={co}>{co}</option>
                    )
                  })
                }
              </select>
            </div>

            <div className="coolinput">
              <p>{city_err}</p>
              <label htmlFor="input" className="text">
                المدينة:
              </label>
              <input
                type="text"
                placeholder="المدينة"
                className="input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="coolinput">
              <p>{street_err}</p>
              <label htmlFor="input" className="text">
                الشارع:
              </label>
              <input
                type="text"
                placeholder="الشارع"
                className="input"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>

            {/* <div className="coolinput">
              <p>{type_err}</p>
              <label htmlFor="input" className="text">
                Type:
              </label>
              <select
                className="input"
                value={type}
                onChange={(e) => setType(e.target.value)}>
                  
                <option value="" hidden>
                  Select plan
                </option>
                <option value="basic plan">Basic plan</option>
                <option value="advanced plan">Advanced plan</option>
                <option value="premium plan">Premium plan</option>
              </select>
            </div> */}

            <div className="coolinput">
              <p>{subscription_err}</p>
              <label htmlFor="input" className="text">
                نوع الاشتراك:
              </label>
              <select
                className="input"
                value={subscription}
                onChange={(e) => setSubscription(e.target.value)}
              >
                <option value="" hidden>
                  اختيار نوع الاشتراك
                </option>
                <option value="سنوي">سنوي</option>
                <option value="ثلاث شهور">ثلاث شهور</option>
                <option value="شهري">شهري</option>
              </select>
            </div>
          </div>
            <p style={{"color" : "red"}}>{api_err}</p>
          <button className="button" type="submit">انشاء</button>
        </form>
      </div>
    </div>
  );
}
