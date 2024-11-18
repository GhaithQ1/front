import React, { useState, useEffect, useRef } from 'react';
import Axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import "./Get_company.css";
import StarRating from '../StarRating/StarRating';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import user_img from "../../image/user.png"

import Loading from '../Loading/Loading';

import { format } from 'date-fns';

export default function Get_company() {
  const [company, setcompany] = useState([]);
  const [id_company, setid_company] = useState();
  const [cookies] = useCookies(['token']);
  const delete_but = useRef(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [result, setresult] = useState([]);

  console.log(process.env.REACT_APP_BASE_URL);
  const Navigate = useNavigate()

  useEffect(() => {
    Axios.get(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company`)
      .then(res => {
        setcompany(res.data.data);
        setresult(res.data.results);
        setloading(false)
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, [result]);

  const delete_company = () => {
    setloading(true)
    Axios.delete(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/delete_company_id/${id_company}`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then(res => {
        setDeleteVisible(false);
        setcompany(prevCompanies => prevCompanies.filter(company => company._id !== id_company)); // تحديث الحالة
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

  if(loading){
    return (
      <Loading/>
    )
  }

  return (
    <div className='Get_company'>
      <h2>قائمة الشركات</h2>

      <div className='delete' ref={delete_but} style={{ display: deleteVisible ? 'flex' : 'none' }}>
        <div className='del'>
          <p>هل تريد حقًا حذف هذه الشركة؟</p>
          <div className='but_del'>
            <button className="button" onClick={delete_company}>حذف</button>
            <button className="button" onClick={clos_delete}>رجوع</button>
          </div>
        </div>
      </div>
        <h2 style={{textAlign:"left"}}>عدد الشركات :{result}</h2>
      {company.map((com) => (
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
            <p>عدد المقيمين : <span>{com.ratingsQuantity || 'N/A'}</span></p>
            <p>الفئة : <span>{com.categorey?.name || 'لا يوجد فئة'}</span></p>
            <p> <span>{com.email? com.email : 'لا يوجد فئة'}</span> :بريد الكتروني </p>
            <p>البلد : <span>{com.Country? com.Country : 'لا يوجد فئة'}</span></p>
            <StarRating rating={com.ratingsAverage || 0} />
          </div>
          <div className='icon_company'>
            <FontAwesomeIcon onClick={() => Navigate(`/admin/update_company/${com._id}`)} icon={faPenToSquare} />
            <FontAwesomeIcon onClick={() => open_delete(com._id)} icon={faTrashCan} />
          </div>
          <div className='type'>
            <p>نوع الاشتراك : {com.subscription.type}</p>
            <p>تاريخ الاشتراك : {format(new Date(com.subscription.startDate), 'dd/MM/yyyy')}</p>
            <p>تاريخ الانت : {format(new Date(com.subscription.endDate), 'dd/MM/yyyy')}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
