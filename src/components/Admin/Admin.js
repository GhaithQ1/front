import React, { useEffect, useRef , useState} from 'react';
import "./Admin.css"; // تأكد من أنك قد قمت بإضافة الأنماط المناسبة هنا
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faUserTie,faMoon,faRightFromBracket, faLayerGroup, faStore, faUserPlus, faTableCellsRowUnlock, faClone, faBusinessTime, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet , useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

import user_img from "../../image/user.png"

import Axios from "axios";

export default function Admin() {
    const toggleRef = useRef(null);
    const sidebarRef = useRef(null);
    const headerRef = useRef(null);
    const mainRef = useRef(null);
    const themeButtonRef = useRef(null);

    // وظيفة عرض/إخفاء السايدبار
    const showSidebar = () => {
        const sidebar = sidebarRef.current;
        const header = headerRef.current;
        const main = mainRef.current;

        if (sidebar && header && main) {
            sidebar.classList.toggle('show-sidebar');
            header.classList.toggle('left-pd'); // تأكد من وجود هذه الأنماط في CSS
            main.classList.toggle('left-pd'); // تأكد من وجود هذه الأنماط في CSS
        }
    };

    useEffect(() => {
        const toggle = toggleRef.current;

        if (toggle) {
            toggle.addEventListener('click', showSidebar);
        }

        return () => {
            if (toggle) {
                toggle.removeEventListener('click', showSidebar);
            }
        };
    }, []);

   
    const toggles = () => {
      document.body.classList.toggle("root_da");
     }

    //  ==================================================

    const Navigate = useNavigate()

    const [cookies, setCookies] = useCookies(['token']);

    const [name , setname] = useState(null)
    const [email , setemail] = useState(null)
    const [img , setimg] = useState(null)

    
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
        console.log(res.data.data);
        setname(res.data.data.name)
        setemail(res.data.data.email)
        setimg(res.data.data.profilImage)
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [cookies.token]);


//   ===============================================


const log_out = ()=>{
    // إزالة العناصر من الكوكيز والتخزين المحلي
    setCookies("token", "");
    window.localStorage.removeItem("user");

    // الانتقال إلى الصفحة الرئيسية
    Navigate("/");

  }




    // ======================================================

    return (
        <div>
            <header className="header" id="header" ref={headerRef}>
                <div className="header__container">
                    <a href="/" className="header__logo">
                        <span>الصفحة الرئيسية</span>
                    </a>
                    <button className="header__toggle" id="header-toggle" ref={toggleRef}>
                        <FontAwesomeIcon icon={faBarsStaggered} />
                    </button>
                </div>
            </header>

            <nav className="sidebar" id="sidebar" ref={sidebarRef}>
                <div className="sidebar__container">
                    <div className="sidebar__user">
                        <div className="sidebar__img">
                            <img src={img ? `http://${img}` : user_img } alt="image" />
                        </div>
                        <div className="sidebar__info">
                            <h3>{name ? name : ""}</h3>
                            <span>{email ? email : ""}</span>
                        </div>
                    </div>

                    <div className="sidebar__content">
                        <h3 className="sidebar__title">: ادارة الموقع</h3>
                        <div className="sidebar__list">
                            <NavLink to="get_company" className="sidebar__link">
                                <FontAwesomeIcon icon={faShop} />
                                <span>جميع الشركات</span>
                            </NavLink>
                            <NavLink to="get_user" className="sidebar__link">
                                <FontAwesomeIcon icon={faUserTie} />
                                <span>جميع المستخدمين</span>
                            </NavLink>
                            <NavLink to="get_Categorey" className="sidebar__link">
                                <FontAwesomeIcon icon={faLayerGroup} />
                                <span>جميع الفئات</span>
                            </NavLink>
                            <NavLink to="get_advertisements" className="sidebar__link">
                                <FontAwesomeIcon icon={faClone} />
                                <span>جميع الاعلانات</span>
                            </NavLink>
                            <NavLink to="get_Company_requests" className="sidebar__link">
                                <FontAwesomeIcon icon={faBusinessTime} />
                                <span>جميع طلبات الانضمام</span>
                            </NavLink>
                            <NavLink to="create_company" className="sidebar__link">
                                <FontAwesomeIcon icon={faStore} />
                                <span>انشاء شركة</span>
                            </NavLink>
                            <NavLink to="create_user" className="sidebar__link">
                                <FontAwesomeIcon icon={faUserPlus} />
                                <span>انشاء مستخدم</span>
                            </NavLink>
                            <NavLink to="create_Categorey" className="sidebar__link">
                                <FontAwesomeIcon icon={faTableCellsRowUnlock} />
                                <span>انشاء فئة</span>
                            </NavLink>
                        </div>
                    </div>

                    <div className="sidebar__actions">
                        < button className="sidebar__link" ref={themeButtonRef} onClick={toggles}>
                        <FontAwesomeIcon style={{fontSize: "20px"}} icon={faMoon} />
                            <span>سمة</span>
                        </button>
                        <button className="sidebar__link" onClick={log_out}>
                        <FontAwesomeIcon style={{fontSize: "20px"}} icon={faRightFromBracket} />
                            <span>تسجيل الخروج</span>
                        </button>
                    </div>
                </div>
            </nav>

            <main className="main containers" id="main" ref={mainRef}>
                <Outlet />
            </main>
        </div>
    );
}