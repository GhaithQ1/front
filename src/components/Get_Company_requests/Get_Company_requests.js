import React, { useState, useEffect, useRef } from 'react';
import Axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import "./Get_Company_requests.css";
import StarRating from '../StarRating/StarRating';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Loading from '../Loading/Loading';
import user_img from "../../image/user.png"
export default function Get_Company_requests() {
  const [company, setcompany] = useState([]);
  const [id_company, setid_company] = useState();
  const [cookies] = useCookies(['token']);
  const delete_but = useRef(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [test, serTest] = useState(true);

  console.log(process.env.REACT_APP_BASE_URL);

  useEffect(() => {
    Axios.get(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_Company_requests`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then(res => {
        setcompany(res.data.data);
        setloading(false)
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, [test]);

  const delete_company = () => {
    setloading(true)
    Axios.delete(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/delete_Company_requests_admin/${id_company}`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then(res => {
        setcompany(prevCompanies => prevCompanies.filter(company => company._id !== id_company)); // تحديث الحالة
        setDeleteVisible(false);
        setloading(false)
      })
      .catch(error => {
        console.error('Error deleting data', error);
      });
  };

  const open_delete = (id) => {
    setDeleteVisible(true);
    setid_company(id);
  };

  const clos_delete = () => {
    setDeleteVisible(false);
  };

  // -----------------------------------------------------------

  const accept = (id)=>{
    setloading(true)
    // serTest(true)
    Axios.post(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/Accept_Company_requests_admin/${id}`, {} ,{
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
      
    }).then(res =>{
      setloading(false)
      serTest(false)
    })
  }


  // ===============================================================

  if(loading){
    return(
      <Loading/>
    )
  }

  return (
    <div className='Get_company'>
      <h2>قائمة طلبات الشركات</h2>

      <div className='delete' ref={delete_but} style={{ display: deleteVisible ? 'flex' : 'none' }}>
        <div className='del'>
          <p>هل تريد حقًا حذف هذه الشركة؟</p>
          <div className='but_del'>
            <button className="button" onClick={delete_company}>حذف</button>
            <button className="button" onClick={clos_delete}>رجوع</button>
          </div>
        </div>
      </div>

      {company.length > 0? company.map((com) => (
        <div className='Get_company_cart' key={com._id}>
          <div className='user_company'>
          <img src={com.user.profilImage ? `http://${com.user.profilImage}` : user_img} />
            <span>
              <p>{com.user?.name || 'Unknown'}</p>
              <p>{com.user?.email || 'Unknown'}</p>
            </span>
          </div>
          <div className='img_company'>
            <img src={`http://${com.logoImage || ''}`} alt="Company Logo"/>
            <img src={`http://${com.companyImage || ''}`} alt="Company"/>
          </div>
          <div className='text_company'>
            <h2>{com.name || 'Unnamed Company'}</h2>
            <p>{com.description || 'No description available'}</p>
            <p>رقم الهاتف : <span>{com.phone || 'N/A'}</span></p>
            <p>عدد المقييم : <span>{com.ratingsQuantity || 'N/A'}</span></p>
            <p>الفئة : <span>{com.categorey?.name || 'لا يوجد فئة'}</span></p>
            {/* <p>type : <span>{com.type || 'No type'}</span></p> */}
            <p>الاشتراك : <span>{com.subscription || 'لا يوجد اشتراك'}</span></p>
            <StarRating rating={com.ratingsAverage || 0} />
          </div>
          <div className='icon_company'>
            <FontAwesomeIcon style={{fontSize: "25px", marginRight:"10px"}} onClick={()=>accept(com._id)}  icon={faCalendarCheck} />
            <FontAwesomeIcon style={{fontSize: "25px"}}  className='del_r' onClick={() => open_delete(com._id)} icon={faTrashCan} />
          </div>
        </div>
      )) : <h2>لا يوجد طلبات انضمام</h2>}
    </div>
  );
}
