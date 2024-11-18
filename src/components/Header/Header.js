import React from "react";

import Axios from "axios";

import "./Header.css";

import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import user_img from "../../image/user.png"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCardClip,
  faBuilding,
  faRightFromBracket,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const Navigate = useNavigate();

  const [cookies, setCookies] = useCookies(["token"]);

  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
    if (!isToggled) {
      document.body.classList.add("root_da");
    } else {
      document.body.classList.remove("root_da");
    }
  };

  // ======================================================

  const [user, setuser] = useState({});

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
        setuser(res.data.data);
        // console.log(res.data.data);
      })
      .catch((error) => {
        // console.error("Error fetching data", error);
      });
  }, [cookies.token]);

  // =========================================================

  const log_out = () => {
    // إزالة العناصر من الكوكيز والتخزين المحلي
    setCookies("token", "");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token")

    // الانتقال إلى الصفحة الرئيسية
    Navigate("/");
  };

  // ============================================================

  const [mnuo, setmnuo] = useState(false);

  const list = () => {
    if (mnuo) {
      setmnuo(false);
    } else setmnuo(true);
  };

  // ========================================================


  const [company, setcompany ] =useState(false)

  useEffect(() => {
    Axios.get(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_Company_requests_my`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then(res => {
        setcompany(res.data.data);
        // console.log(res.data.data)
      })
      .catch(error => {
        // console.error('Error fetching data', error);
      });
  }, []);



  // ==========================

  return (
    <header>
      <h1>
        B<span>2</span>U
      </h1>
      <FontAwesomeIcon
        onClick={list}
        className="show"
        style={{ fontSize: "20px", cursor: "pointer" }}
        icon={faBars}
      />
      <div className={mnuo ? "menu menus" : "menu"}>
        <ul>
          <li>
            <NavLink onClick={list} to="/">
              الصفحة الرئيسية
            </NavLink>
          </li>
          <li>
            <NavLink onClick={list} to="/companys">
              الشركات
            </NavLink>
          </li>
          <li>
            <NavLink onClick={list} to="/advertisements">
              الاعلانات
            </NavLink>
          </li>
          <li>
            <NavLink onClick={list} href="#">
              من نحن
            </NavLink>
          </li>
          <li>
            <NavLink onClick={list} to="/contact_Us">
              تواصل معنا
            </NavLink>
          </li>
        </ul>

        <label className="switch">
          <span className="sun" onClick={handleToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g fill="#ffd43b">
                <circle r="5" cy="12" cx="12"></circle>
                <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path>
              </g>
            </svg>
          </span>
          <span className="moon" onClick={handleToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
            </svg>
          </span>
          <input type="checkbox" className="input" />
          <span className="sliderr" onClick={handleToggle}></span>
        </label>

        {cookies.token ? (
          <NavLink className="profil" to="/profile">
            <p>{user.name ? user.name : null}</p>
            <img src={user.profilImage ? `http://${user.profilImage}` : user_img} />
            <div className="menuoo">
              <Link onClick={list} to={"/profile"}>
                <FontAwesomeIcon
                  style={{ paddingRight: "10px" }}
                  icon={faIdCardClip}
                />
                ملفي الشخصي
              </Link>
              <Link onClick={list} to={company ? "/my_reqeusts" : "/my_company"}>
                <FontAwesomeIcon
                  style={{ paddingRight: "10px" }}
                  icon={faBuilding}
                />
                شركتي
              </Link>
              {user ? (
                user.role === "admin" ? (
                  <Link onClick={list} to={"/admin"}>
                    <FontAwesomeIcon
                      style={{ paddingRight: "10px" }}
                      icon={faBuilding}
                    />
                    لوحة التحكم
                  </Link>
                ) : null
              ) : null}
              <Link
                to={"/"}
                onClick={() => {
                  log_out();
                  list();
                }}
              >
                <FontAwesomeIcon
                  style={{ paddingRight: "10px" }}
                  icon={faRightFromBracket}
                />
                تسيجيل الخروج
              </Link>
            </div>
          </NavLink>
        ) : (
          <NavLink className="singin" to="/signin">
            <p>تسجيل الدخول</p>
            <span className="material-symbols-outlined">Login</span>
          </NavLink>
        )}
      </div>
    </header>
  );
}
