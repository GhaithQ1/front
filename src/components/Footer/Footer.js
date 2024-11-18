import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope, // استيراد faEnvelope من مكتبة solid
} from "@fortawesome/free-solid-svg-icons"; // استيراد الأيقونات من مكتبة solid

import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons"; // استيراد الأيقونات من مكتبة brands

import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="Footer">
      <div className="best">
        <button data-text="Awesome">
          <span className="actual-text">&nbsp;BEST TO YOU&nbsp;</span>
          <span aria-hidden="true" className="hover-text">
            &nbsp;BEST TO YOU&nbsp;
          </span>
        </button>
        <p>
          شركتي هي دليل أعمال موثوق به يوفر حلولًا مبتكرة وشاملة تهدف إلى ربط
          الشركات والعملاء بطرق فعّالة وميسّرة. من خلال نظام متكامل، نساعد
          الشركات على تعزيز تواجدها الرقمي والوصول إلى جمهورها المستهدف بدقة
          وفاعلية
        </p>
      </div>
      <nav>
        <h1 style={{color: "white"}}>: الفئات</h1>
        <Link to="/companys">الملابس والأزياء</Link>
        <Link to="/companys">الأجهرة الالكترونية</Link>
        <Link to="/companys">مستحضرات التجميل</Link>
        <Link to="/companys">المواد الغذائية والمأكولات</Link>
        <Link to="/companys">الديكور وأدوات المنزل</Link>
        <Link to="/companys">الشحن والتوصيل</Link>
      </nav>

      <nav>
        <h1 style={{color: "white"}}>: روابط</h1>
        <Link to="/">الصفحة الرئيسية</Link>
        <Link to="/companys">الشركات</Link>
        <Link to="/advertisements">الاعلانات</Link>
        <Link to="/">من نحن</Link>
        <Link to="/contact_Us"> تواصل معنا</Link>
      </nav>
      <div className="cosh">
        <h1 style={{color: "white"}}>: تواصل</h1>
        <p>
          <FontAwesomeIcon icon={faLocationDot} />
          <span>Damascus, Syria</span>
        </p>
        <p>
          <FontAwesomeIcon icon={faPhone} />
          <span>0964873645</span>
        </p>
        <p>
          <FontAwesomeIcon icon={faEnvelope} />
          <span>b2u2424@gmail.com</span>
        </p>
        <p className="icons">
          {/* إضافة أيقونات التواصل الاجتماعي مباشرة بدون روابط */}
          <FontAwesomeIcon className="icon" icon={faFacebookF} />
          <FontAwesomeIcon className="icon" icon={faTwitter} />
          <FontAwesomeIcon className="icon" icon={faInstagram} />
          <FontAwesomeIcon className="icon" icon={faLinkedinIn} />
          <FontAwesomeIcon className="icon" icon={faYoutube} />
        </p>
      </div>
    </div>
  );
}
