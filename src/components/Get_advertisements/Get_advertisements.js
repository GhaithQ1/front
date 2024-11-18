import React, { useState, useEffect, useRef } from 'react';
import Axios from "axios";
import "./Get_advertisements.css";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import Loading from '../Loading/Loading';

export default function Get_advertisements() {
  const [advertisement, setadvertisement] = useState([]);
  const [id_advertisement, setid_advertisement] = useState();
  const [cookies] = useCookies(['token']);
  const delete_but = useRef(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const [result, setresult] = useState([]);

  useEffect(() => {
    Axios.get(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_all_company_advertisements`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then(res => {
        setadvertisement(res.data.data);
        setresult(res.data.nam);
        console.log(res.data.data);
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, []);

  const delete_advertisement = () => {
    setLoading(true)
    Axios.delete(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/delete_company_advertisements_admin/${id_advertisement}`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then(res => {
        setadvertisement(prevCompanies => prevCompanies.filter(advertisement => advertisement._id !== id_advertisement)); // تحديث الحالة
        setDeleteVisible(false);
        setLoading(false)
      })
      .catch(error => {
        console.error('Error deleting data', error);
      });
  };

  const open_delete = (id) => {
    setDeleteVisible(true);
    setid_advertisement(id);
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
    <div className='Get_advertisement'>
      <h2>قائمة الإعلانات</h2>

      <div className='delete' ref={delete_but} style={{ display: deleteVisible ? 'flex' : 'none' }}>
        <div className='del'>
          <p>هل تريد حقًا حذف هذا الإعلان؟</p>
          <div className='but_del'>
            <button className="button" onClick={delete_advertisement}>حذف</button>
            <button className="button" onClick={clos_delete}>رجوع</button>
          </div>
        </div>
      </div>
      <h2 style={{ textAlign: "left"}}>عدد الاعلانات :{result}</h2>
      <div class="advertisement">
        {advertisement.map((com) => (
          <div class="adver">
            <div class="company" style={{padding:"0"}}>
              <img src={`http://${com.Company ? com.Company.companyImage : null}`} alt="" />
              <div class="name">
                <h1>{com.Company ? com.Company.name : null}</h1>
                <span>{com.createdAt ? format(new Date(com.createdAt), 'dd/MM/yyyy') : null}</span>
              </div>
            </div>
            <div class="advercompany">
              <div class="des">
                <h2>{com.title ? com.title : null}</h2>
                <p>
                  {com.description ? com.description : null}
                </p>
              </div>
              <div class="imagescomapny">
                {
                  com.Image ? com.Image.map((img)=>{
                    return(
                      <img src={`http://${img}`} alt="" />
                    )
                  }): null
                }
              </div>
              <div class="likes">
              <FontAwesomeIcon onClick={()=>open_delete(com._id)} icon={faTrashCan} />
                <span>likes: {com.likes ? com.likes.length : null}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}
