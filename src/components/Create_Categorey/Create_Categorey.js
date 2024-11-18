
import React, { useState, useRef } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'; // للتوجيه بعد الإضافة الناجحة
import "./Create_Categorey.css";

import { useCookies } from "react-cookie";

export default function Create_Categorey() {
  // الحالات (states)
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);

  const [cookies] = useCookies(["token"]);
  
  // حالات للأخطاء
  const [name_err, setName_err] = useState('');
  const [description_err, setDescription_err] = useState('');
  const [categoryImage_err, setCategoryImage_err] = useState('');
  const [api_err, setApi_err] = useState('');

  // مرجع لمدخل الصورة
  const inputFileRef = useRef(null);

  const navigate = useNavigate(); // لاستخدام التوجيه بعد إضافة الفئة بنجاح

  // دالة التعامل مع تغيير الصورة
  const handleCategoryImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCategoryImage(file);
    }
  };

  // دالة التحقق من الأخطاء
  const resetErrors = () => {
    setName_err('');
    setDescription_err('');
    setCategoryImage_err('');
    setApi_err('');
  };

  // دالة الإرسال (Submit)
  const handleSubmit = (event) => {
    event.preventDefault();
    resetErrors();

    // // تحقق من صحة البيانات المدخلة
    // if (!name || !description) {
    //   if (!name) setName_err('يرجى إدخال اسم الفئة');
    //   if (!description) setDescription_err('يرجى إدخال وصف الفئة');
    //   return;
    // }

    // إعداد بيانات النموذج لإرسالها
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    
    // إضافة الصورة إذا تم تحديدها
    if (categoryImage) {
      formData.append('Categoreyimage', categoryImage);
    }

    // إرسال البيانات إلى الـ API
    Axios.post(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/create_Categorey`, formData, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((res) => {
        console.log("تم إضافة الفئة بنجاح", res.data);
        navigate('/admin/get_Categorey'); // التوجيه إلى قائمة الفئات بعد الإضافة الناجحة
      })
      .catch((error) => {
        console.error('خطأ في إضافة الفئة', error);
        if (error.response && error.response.data) {
          const errors = error.response.data.errors || [];
          resetErrors();

          // معالجة الأخطاء من الـ API
          errors.forEach((err) => {
            switch (err.path) {
              case 'name':
                setName_err(err.msg);
                break;
              case 'description':
                setDescription_err(err.msg);
                break;
              case 'Categoreyimage':
                setCategoryImage_err(err.msg);
                break;
              default:
                break;
            }
          });
        } else {
          setApi_err( error.response.data.error);
        }
      });
  };

  return (
    <div className='Create_Categorey'>
      <h2>انشاء فئة</h2>
      <p>{api_err}</p>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className='inputs'>

          <div className="coolinput">
            <p>{name_err}</p>
            <label htmlFor="name" className="text">الاسم:</label>
            <input
              type="text"
              id="name"
              placeholder="الاسم"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* إدخال الوصف */}
          <div className="coolinput">
            <p>{description_err}</p>
            <label htmlFor="description" className="text">الوصف:</label>
            <textarea
              id="description"
              placeholder="الوصف"
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* إدخال الصورة */}
          <div className="img_upd_">
            <div className="img_upd_1">
              <label htmlFor="categoryImage" className="text">صورة الفئة</label>
              <div
                className='img_upd'
                onClick={() => inputFileRef.current.click()}
                style={{ backgroundImage: `url(${categoryImage ? URL.createObjectURL(categoryImage) : ''})` }}
              >
                <p>{categoryImage_err}</p>
                {!categoryImage && <span>+</span>}
                <input
                  type="file"
                  ref={inputFileRef}
                  style={{ display: 'none' }}

                  onChange={handleCategoryImageChange}
                />
              </div>
            </div>
          </div>

          {/* زر الإرسال */}
          <button className="button" type="submit">انشاء</button>
        </div>
      </form>
    </div>
  );
};
