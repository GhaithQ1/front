import React from "react";

import "./Not404.css";

import { useNavigate } from "react-router-dom";

export default function Notfind() {
  const Navigate = useNavigate();

  return (
    <div className="Not404">
      <div class="error-container">
        <h1> 404 </h1>
        <p>عفواً، الصفحة التي تبحث عنها ليست موجودة هنا.</p>
        <a onClick={()=> Navigate("/")} >العودة إلى الصفحة الرئيسية</a>
      </div>
    </div>
  );
}
