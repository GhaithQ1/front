import React, { useState, useEffect } from 'react';
import "./Get_Categorey.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Axios from "axios";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Loading from '../Loading/Loading';

export default function Get_Categorey() {
  const [Categorey, setCategorey] = useState([]);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [loading, setloading] = useState(true);
  const [idToDelete, setIdToDelete] = useState(null);

  const [cookies] = useCookies(['token']);
  const [result, setresult] = useState([]);

  const Navigate = useNavigate()

  useEffect(() => {
    Axios.get(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_Categorey`)
      .then(res => {
        setCategorey(res.data.data);
        setresult(res.data.result);
        setloading(false)
      })
      .catch(error => {
        console.error('Error fetching data', error);
      });
  }, []);

  const deleteCategory = () => {
    setloading(true)
    Axios.delete(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/delete_Categorey/${idToDelete}`,{
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then(res => {
        setCategorey(prevCategories => prevCategories.filter(cat => cat._id !== idToDelete));
        setDeleteVisible(false);
        setloading(false)
      })
      .catch(error => {
        console.error('Error deleting category', error);
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
    <div className='Get_Categorey'>
      <h2>قائمة الفئات</h2>
      <h2 style={{textAlign: "left" , paddingBottom:"10px"}}>عدد الفئات :{result}</h2>
      <div className='All_Categorey'>
        {Categorey.map((cat) => (
          <div className='Categorey' key={cat._id}>
            <div className='img_cat'>
              <img src={`http://${cat.Categoreyimage}`} alt={cat.name} />
            </div>
            <h2>{cat.name}</h2>
            <p>{cat.description}</p>
            <div className='icon_company'>
              <FontAwesomeIcon onClick={() => Navigate(`/admin/update_categorey/${cat._id}`)} icon={faPenToSquare} />
              <FontAwesomeIcon icon={faTrashCan} onClick={() => openDeleteModal(cat._id)} />
            </div>
          </div>
        ))}
      </div>

      {deleteVisible && (
        <div className='delete' style={{ display: 'flex' }}>
          <div className='del'>
            <p>هل تريد حقًا حذف هذه الفئة؟</p>
            <div className='but_del'>
              <button className="button" onClick={deleteCategory}>حذف</button>
              <button className="button" onClick={closeDeleteModal}>رجوع</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
