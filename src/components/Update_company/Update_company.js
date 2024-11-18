import React, { useState, useRef, useEffect } from 'react';

import "./Update_company.css"; // تأكد من تعديل المسار إذا كان مختلفًا
import { useCookies } from "react-cookie";
import Axios from "axios";

import { useNavigate } from "react-router-dom"

import { useParams } from 'react-router-dom';


export default function Update_company() {
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
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    Axios.get(`http://${process.env.REACT_APP_BASE_URL}/api/v2/user`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then(res => {
        setuser(res.data.data);
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, []);

  const [Categorey, setCategorey] = useState([]);

  useEffect(() => {
    Axios.get(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_Categorey`)
      .then(res => {
        setCategorey(res.data.data);
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, []);

  const Navigate = useNavigate()


  const [name_c, setname_c] = useState("");
  const [description, setDescription] = useState("");
  const [companyImage, setCompanyImage] = useState( null);
  const [logoImage, setLogoImage] = useState(null);
  const [phone, setPhone] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  const inputFileRef1 = useRef(null);
  const inputFileRef2 = useRef(null);

  const [name_err, setName_err] = useState("");
  const [description_err, setDescription_err] = useState("");
  const [companyImage_err, setCompanyImage_err] = useState("");
  const [logoImage_err, setLogoImage_err] = useState("");
  const [phone_err, setPhone_err] = useState("");
  const [linkedIn_err, setLinkedIn_err] = useState("");
  const [facebook_err, setFacebook_err] = useState("");
  const [instagram_err, setInstagram_err] = useState("");
  const [email_err, setEmail_err] = useState("");
  const [country_err, setCountry_err] = useState("");
  const [city_err, setCity_err] = useState("");
  const [street_err, setStreet_err] = useState("");
  const [api_err, setapi_err] = useState("");

  const { id } = useParams(); // الحصول على الـ id من الـ URL

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



   const [bag_img_logo , setbag_img_logo] = useState()
   const [bag_img_com , setbag_img_com] = useState()

  useEffect(() => {
    Axios.get(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_company_id/${id}`)
      .then(res => {
        console.log(res.data.data);
        setname_c(res.data.data.name)
        setDescription(res.data.data.description)
        setEmail(res.data.data.email)
        setPhone(res.data.data.phone)
        setLinkedIn(res.data.data.linkedIn)
        setFacebook(res.data.data.facebook)
        setInstagram(res.data.data.instagram)
        setCountry(res.data.data.Country)
        setCity(res.data.data.city)
        setStreet(res.data.data.street)
        setbag_img_logo(res.data.data.logoImage)
        setbag_img_com(res.data.data.companyImage)
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, []);








  const Create_companys = (event) => {
    event.preventDefault();
  
    // تحقق مما إذا كانت كلتا الصورتين null
    if (companyImage === null && logoImage === null) {
      const jsonData = {
        name: name_c,
        description: description,
        phone: phone,
        linkedIn: linkedIn,
        facebook: facebook,
        instagram: instagram,
        email: email,
        Country: country,
        city: city,
        street: street,
      };
  
      // طباعة jsonData للتأكد من القيم
      console.log('Sending JSON:', jsonData);
  
      Axios.put(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/update_company_id/${id}`, jsonData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json', // تأكد من تحديد Content-Type
        },
      })
        .then(res => {
          console.log("Company updated successfully", res.data);
          resetErrors();
          Navigate("/admin/get_company");
        })
        .catch(handleError);
    } else {
      // إعداد FormData إذا كانت هناك صورة واحدة على الأقل
      const formData = new FormData();
      formData.append('name', name_c);
      formData.append('description', description);
      
      if (companyImage) {
        formData.append('companyImage', companyImage); // تأكد من أنه من نوع File
      }
      if (logoImage ) {
        formData.append('logoImage', logoImage); // تأكد من أنه من نوع File
      }
  
      formData.append('phone', phone);
      formData.append('linkedIn', linkedIn);
      formData.append('facebook', facebook);
      formData.append('instagram', instagram);
      formData.append('email', email);
      formData.append('Country', country);
      formData.append('city', city);
      formData.append('street', street);
  
      // طباعة محتويات formData للتأكد من القيم
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
  
      Axios.put(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/update_company_id/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`
          // لا تحتاج إلى 'Content-Type': 'multipart/form-data' هنا
        },
      })
        .then(res => {
          console.log("Company updated successfully", res.data);
          resetErrors();
          Navigate("/admin/get_company");
        })
        .catch(handleError);
    }
  };
  
  const resetErrors = () => {
    setName_err("");
    setDescription_err("");
    setCompanyImage_err("");
    setLogoImage_err("");
    setPhone_err("");
    setLinkedIn_err("");
    setFacebook_err("");
    setInstagram_err("");
    setEmail_err("");
    setCountry_err("");
    setCity_err("");
    setStreet_err("");
  };
  
  const handleError = (error) => {
    console.error('Error creating company', error);
    if (error.response && error.response.data) {
      const errors = error.response.data.errors || [];
      resetErrors();
  
      errors.forEach(err => {
        switch (err.path) {
          case 'name':
            setName_err(err.msg);
            break;
          case 'description':
            setDescription_err(err.msg);
            break;
          case 'companyImage':
            setCompanyImage_err(err.msg);
            break;
          case 'logoImage':
            setLogoImage_err(err.msg);
            break;
          case 'phone':
            setPhone_err(err.msg);
            break;
          case 'linkedIn':
            setLinkedIn_err(err.msg);
            break;
          case 'facebook':
            setFacebook_err(err.msg);
            break;
          case 'instagram':
            setInstagram_err(err.msg);
            break;
          case 'email':
            setEmail_err(err.msg);
            break;
          case 'country':
            setCountry_err(err.msg);
            break;
          case 'city':
            setCity_err(err.msg);
            break;
          case 'street':
            setStreet_err(err.msg);
            break;
          default:
            break;
        }
      });
    } else {
      setapi_err(error.response ? error.response.data.message : "حدث خطأ غير معروف");
    }
  };
  
  console.log(typeof logoImage)

  return (
    <div className='update_company'>
      <h2>Create company</h2>

      <p>{api_err}</p>

      <div className='inputs'>
        <form onSubmit={Create_companys} encType="multipart/form-data">
          <div className='inputs'>
            <div className="coolinput">
              <p>{name_err}</p>
              <label htmlFor="input" className="text">الاسم:</label>
              <input type="text" placeholder="الاسم" className="input" value={name_c} onChange={(e) => setname_c(e.target.value)} />
            </div>

            <div className="coolinput">
              <p>{email_err}</p>
              <label htmlFor="input" className="text">بريد الكتروني:</label>
              <input type="text" placeholder="بريد الكتروني" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className='img_upd_'>
              <div className='img_upd_1'>
                <p>{companyImage_err}</p>
                <label htmlFor="companyImage" className="text">صورة الشركة:</label>
                <img src={`http://${bag_img_com}`}/>
                <div className='img_upd' onClick={() => inputFileRef1.current.click()} style={{ backgroundImage: `url(${companyImage ? URL.createObjectURL(companyImage) : ''})` }}>
                  {!companyImage && <span>+</span>}
                  <input type="file" ref={inputFileRef1} style={{ display: 'none' }} onChange={handleCompanyImageChange} />
                </div>
              </div>

              <div className='img_upd_1'>
                <p>{logoImage_err}</p>
                <label htmlFor="logoImage" className="text">شعار الشركة:</label>
                <img src={`http://${bag_img_logo}`}/>
                <div className='img_upd' onClick={() => inputFileRef2.current.click()} style={{ backgroundImage: `url(${logoImage ? URL.createObjectURL(logoImage) : ''})` }}>
                  {!logoImage && <span>+</span>}
                  <input type="file" ref={inputFileRef2} style={{ display: 'none' }} onChange={handleLogoImageChange} />
                </div>
              </div>
            </div>

            <div className="coolinput">
              <p>{description_err}</p>
              <label htmlFor="input" className="text">الوصف:</label>
              <textarea placeholder="الوصف" className="input" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

            <div className="coolinput">
              <p>{phone_err}</p>
              <label htmlFor="input" className="text">رقم الهاتف:</label>
              <input type="text" placeholder="رقم الهاتف" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="coolinput">
              <p>{linkedIn_err}</p>
              <label htmlFor="input" className="text">LinkedIn:</label>
              <input type="text" placeholder="LinkedIn" className="input" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} />
            </div>

            <div className="coolinput">
              <p>{facebook_err}</p>
              <label htmlFor="input" className="text">Facebook:</label>
              <input type="text" placeholder="Facebook" className="input" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
            </div>

            <div className="coolinput">
              <p>{instagram_err}</p>
              <label htmlFor="input" className="text">Instagram:</label>
              <input type="text" placeholder="Instagram" className="input" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
            </div>

            <div className="coolinput">
              <p>{country_err}</p>
              <label htmlFor="input" className="text">البلد:</label>
              <input type="text" placeholder="البلد" className="input" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>

            <div className="coolinput">
              <p>{city_err}</p>
              <label htmlFor="input" className="text">المدينة:</label>
              <input type="text" placeholder="المدينة" className="input" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>

            <div className="coolinput">
              <p>{street_err}</p>
              <label htmlFor="input" className="text">الشارع:</label>
              <input type="text" placeholder="الشارع" className="input" value={street} onChange={(e) => setStreet(e.target.value)} />
            </div>

          
          </div>

          <button className="button" type="submit">تعديل</button>
        </form>
      </div>
    </div>
  );
}
