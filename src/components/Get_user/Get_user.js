import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from "react-cookie";
import Axios from "axios";
import "./Get_user.css";

import user_img from "../../image/user.png"

import Loading from '../Loading/Loading';

export default function Get_user() {
  const [user, setuser] = useState([]);
  const [cookies] = useCookies(['token']);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const [loading, setloading] = useState(true);
  const [result, setresult] = useState([]);

  const [user_searsh, setuser_searsh] = useState("");

  useEffect(() => {
    Axios.get(`http://${process.env.REACT_APP_BASE_URL}/api/v2/user?name=${user_searsh}`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then(res => {
        setuser(res.data.data);
        setresult(res.data.count);
        // console.log(res.data.data)
        setloading(false)
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, [user_searsh]);

  const deleteUser = () => {
    setloading(true)
    Axios.delete(`http://${process.env.REACT_APP_BASE_URL}/api/v2/user/${idToDelete}`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then(res => {
        setuser(prevUsers => prevUsers.filter(u => u._id !== idToDelete));
        setDeleteVisible(false);
        setloading(false)
      })
      .catch(error => {
        console.error('Error deleting user', error);
      });
  };

  const openDeleteModal = (id) => {
    setIdToDelete(id);
    setDeleteVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteVisible(false);
  };


  if(loading){
    return (
      <Loading/>
    )
  }

  return (
    <div className='Get_user'>
      <div className='h2_s'>
        <h2>قائمة المستخدمين</h2>
        <div className="coolinput">
          <label htmlFor="input" className="text">بحث:</label>
          <input type="text" onChange={(e)=>setuser_searsh(e.target.value)} placeholder="البحث عن مستخدم" className="input" />
        </div>
      </div>
      <h2 style={{textAlign: "left"}}>عدد المستخدمين :{result}</h2>
      <div className='all_user'>
        {user.map((u) => (
          <div className='user1' key={u._id}>
            <div><img src={u.profilImage?  `http://${u.profilImage}` : user_img} alt="User" /></div>
            <p>{u.name}</p>
            <p>{u.email}</p>
            <p>{u.phone}</p>
            <p>{u.role}</p>
            <p>
              <FontAwesomeIcon 
                icon={faTrashCan} 
                onClick={() => openDeleteModal(u._id)} 
              />
            </p>
          </div>
        ))}
      </div>

      {deleteVisible && (
        <div className='delete' style={{ display: 'flex' }}>
          <div className='del'>
            <p>هل تريد حقًا حذف هذا المستخدم؟</p>
            <div className='but_del'>
              <button className="button" onClick={deleteUser}>حذف</button>
              <button className="button" onClick={closeDeleteModal}>رجوع</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
