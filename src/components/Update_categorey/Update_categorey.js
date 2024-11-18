import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import { useCookies } from 'react-cookie';
// import "./Update_company.css"; // تأكد من تعديل المسار إذا كان مختلفًا
// import "../styles/Admin.css"; 

import "./Update_category.css"

export default function Update_category() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [categoryImagePreview, setCategoryImagePreview] = useState("");

  const [name_err, setName_err] = useState('');
  const [description_err, setDescription_err] = useState('');
  const [categoryImage_err, setCategoryImage_err] = useState('');
  const [api_err, setApi_err] = useState('');

  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputFileRef = useRef(null);

  useEffect(() => {
    Axios.get(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_Categorey_id/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
    .then(res => {
      setName(res.data.data.name);
      setDescription(res.data.data.description);
      setCategoryImagePreview(res.data.data.Categoreyimage); // Assuming category image URL is stored here
    })
    .catch(error => {
      console.error('Error fetching category data', error);
    });
  }, [id, cookies.token]);

  const handleCategoryImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCategoryImage(file); 
      setCategoryImagePreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!categoryImage) {
      const jsonData = {
        name,
        description,
      };
  
      Axios.put(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/update_Categorey/${id}`, jsonData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log("Category updated successfully", res.data);
        navigate("/admin/get_Categorey");
      })
      .catch(error => {
        handleApiError(error);
      });
  
    } else {
      let formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('Categoreyimage', categoryImage);
  
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      Axios.put(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/update_Categorey/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(res => {
        console.log("Category updated successfully", res.data);
        navigate("/admin/get_Categorey");
      })
      .catch(error => {
        handleApiError(error);
      });
    }
  };
  
  
  
  

  const handleApiError = (error) => {
    console.error('Error updating category', error);
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
          case 'Categoreyimage':
            setCategoryImage_err(err.msg);
            break;
          default:
            break;
        }
      });
    } else {
      setApi_err("حدث خطأ غير معروف");
    }
  };

  const resetErrors = () => {
    setName_err('');
    setDescription_err('');
    setCategoryImage_err('');
    setApi_err('');
  };

  return (
    <div className='Update_category'>
      <h2>Update Category</h2>
      <p>{api_err}</p>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className='inputs'>
          <div className="coolinput">
            <p>{name_err}</p>
            <label htmlFor="name" className="text">اسم الفئة:</label>
            <input
              type="text"
              id="name"
              placeholder="اسم الفئة"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

          <div className="img_upd_">
            <div className="img_upd_1">
              <p>{categoryImage_err}</p>
              <label htmlFor="categoryImage" className="text">صورة الفئة:</label>
              {categoryImagePreview && <img src={`http://${categoryImagePreview}`} alt="Category" />}
              <div
                className='img_upd'
                onClick={() => inputFileRef.current.click()}
                style={{ backgroundImage: `url(${categoryImage ? URL.createObjectURL(categoryImage) : ''})` }}
              >
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

          <button className="button" type="submit">تعديل</button>
        </div>
      </form>
    </div>
  );
}
