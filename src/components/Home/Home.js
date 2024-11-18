import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import "./Home.css";

import { MyContext } from "../Context";

import { useNavigate } from "react-router-dom";

import img_back1 from "../../image/hero-shape-2.svg";
import img_back2 from "../../image/timeline.svg";
import img_plan from "../../image/ssssss.jpg";
import img_plan1 from "../../image/sssss.jpg";
import hero_image from "../../image/hero-image.svg";
import hero_image2 from "../../image/hero_image2.svg";
import img_sup1 from "../../image/img_sup1.svg";
import img_sup2 from "../../image/img_sup2.svg";
import img_cat from "../../image/img_cat.svg";
import img_servces1 from "../../image/app.svg";
import img_servces2 from "../../image/dm.svg";
import img_servces3 from "../../image/seo.svg";
import img_servces4 from "../../image/web.svg";

import Loading from "../Loading/Loading";
export default function Home() {
  const { id_C, setid_C } = useContext(MyContext);

  const Navigate = useNavigate();

  const [category, setCategory] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    Axios.get(
      `http://${process.env.REACT_APP_BASE_URL}/api/v2/company/get_Categorey`
    )
      .then((res) => {
        setCategory(res.data.data);
        setloading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  // useEffect(() => {
  //   const logosSlides = document.querySelectorAll(".logos-slide");
  //   logosSlides.forEach((slide) => {
  //     const copy = slide.cloneNode(true);
  //     document.querySelector(".logos").appendChild(copy);
  //   });
  // }, []); // يتم التنفيذ مرة واحدة بعد تحميل المكون

  const logosSlides = document.querySelectorAll(".logos-slide");
  logosSlides.forEach((slide) => {
    const copy = slide.cloneNode(true);
    document.querySelector(".logos").appendChild(copy);
  });

  // ==============================================================

  const [company, setcompany] = useState([]);

  useEffect(() => {
    Axios.get(`http://${process.env.REACT_APP_BASE_URL}/api/v2/company`)
      .then((res) => {
        setcompany(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  // =====================================================

  const id_category = (id) => {
    setid_C(id);
    Navigate("/companys");
  };

  // ========================================

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="Home">
      <div className="bac">
        <img src={img_back2} alt="" />
        <img src={img_back1} alt="" />
        <img src={hero_image2} alt="" />
        <div className="container">
          <div className="hero">
            <div className="about">
              <h1>
                BEST <span> TO YOU</span>
              </h1>
              <h2>استكشف وتواصل مع أفضل الشركات في السوق!</h2>
              <p>
                نحن هنا لنساعدك في العثور على الشركات والخدمات التي تلبي جميع
                احتياجاتك. انضم إلينا للاستفادة من مجموعة واسعة من الميزات التي
                تجعل تجربة البحث والتواصل مع الشركات أكثر سهولة وفعالية. يمكنك
                إنشاء ونشر إعلانات مخصصة تستهدف جمهورك بدقة، قراءة تقييمات
                وتعليقات حقيقية من مستخدمين آخرين لاتخاذ قرارات مستنيرة،
                واستعراض صور ومعلومات مفصلة عن المنتجات والخدمات قبل اتخاذ
                قراركلا تفوت الفرصة للانضمام إلى مجتمعنا المتنامي من الشركات
                والعملاء. اشترك الآن واستفد من خدمات تسويقية فعالة ومتطورة
                تساعدك على تحقيق أهدافك وزيادة نجاحك في السوق.
              </p>
              <button className="button" onClick={() => Navigate("/companys")}>
                جميع الشركات
              </button>
            </div>
            <div className="camp">
              <img style={{ width: "80%" }} src={hero_image} />
            </div>
          </div>
        </div>
      </div>

      <div className="servces">
        <div className="container">
          <div className="container-fluid">
            <h1 className="text-center mt-5 display-3 fw-bold">خدماتنا</h1>

            <div className="gred_servces">
              <div className="col-12 col-sm-6 col-md-3 m-auto">
                <div className="card_servces shadow">
                  <img src={img_servces1} alt="pro" className="card-img-top" />
                  <div className="card-body">
                    <h3 className="text-center">التسجيل وإدارة الحسابات</h3>
                    <hr className="mx-auto w-75" />
                    <p>
                      يمكن للشركات بسهولة التسجيل على منصتنا وإنشاء حسابات إدارة
                      شاملة. يمكنهم تحديث معلوماتهم وإضافة تفاصيل الاتصال والصور
                      والشعارات الخاصة بهم، بالإضافة إلى تحديث العروض والخدمات
                      المقدمة بشكل دوري.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-3 m-auto">
                <div className="card_servces shadow">
                  <img src={img_servces2} alt="pro" className="card-img-top" />
                  <div className="card-body">
                    <h3 className="text-center">الإعلانات المخصصة</h3>
                    <hr className="mx-auto w-75" />
                    <p>
                      نمنح الشركات القدرة على إنشاء ونشر إعلانات مخصصة تستهدف
                      جمهورهم المستهدف. يمكنهم الاختيار من بين أنواع متعددة من
                      الإعلانات مثل إعلانات المنتجات، الخدمات، العروض الترويجية،
                      والخصومات، مما يزيد من رؤية وتفاعل العملاء مع علامتهم
                      التجارية.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-3 m-auto">
                <div className="card_servces shadow">
                  <img src={img_servces3} alt="pro" className="card-img-top" />
                  <div className="card-body">
                    <h3 className="text-center">الدعم الفني والاستشارات</h3>
                    <hr className="mx-auto w-75" />
                    <p>
                      نقدم للشركات دعمًا فنيًا شاملاً واستشارات مخصصة لتحسين
                      تواجدهم الرقمي. سواء كنت تحتاج إلى مساعدة في تحسين موقعك
                      الإلكتروني، أو استراتيجيات التسويق الرقمي، فريقنا من
                      الخبراء مستعد دائمًا لتقديم الإرشادات اللازمة.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-3 m-auto">
                <div className="card_servces shadow">
                  <img src={img_servces4} alt="pro" className="card-img-top" />
                  <div className="card-body">
                    <h3 className="text-center">التقييمات والتعليقات</h3>
                    <hr className="mx-auto w-75" />
                    <p>
                      يمكن للعملاء تقييم الشركات وكتابة التعليقات حول خدماتهم
                      ومنتجاتهم. تساعد هذه الميزة في بناء الثقة بين العملاء
                      والشركات وتتيح للشركات تحسين خدماتها بناءً على ملاحظات
                      العملاء.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="category">
        <div className="container">
          <h1>جميع الفئات</h1>
          <div className="cats">
            {category.map((cat) => (
              <div className="cat" key={cat.id}>
                <img className="img_cacts" src={img_cat} />
                <div className="contantcat">
                  <img
                    className="img2"
                    src={`http://${cat.Categoreyimage}`}
                    alt=""
                  />
                  <div className="namecat">
                    <h2>{cat.name}</h2>
                  </div>
                </div>
                <p>{cat.description}</p>
                <button className="button" onClick={() => id_category(cat._id)}>
                  زيارة الفئة
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="slider">
        <div className="container">
          <div className="logos">
            {company
              ? company.map((com) => {
                  return (
                    <div className="logos-slide">
                      <img src={`http://${com.logoImage}`} alt="Logo 1" />
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>

      <div className="plans">
        <img src={img_sup1} />
        <img src={img_sup2} />
        <div className="container">
          <div class="container__right">
            <div class="images">
              <img src={img_plan} alt="tent-1" class="tent-1" />
              <img src={img_plan1} alt="tent-2" class="tent-2" />
            </div>
            <div class="content">
              <h2> انضم اليوم</h2>
              <h3>ابدأ رحلتك التجارية معنا الآن</h3>
              <p>
                انضم إلى مجتمع الأعمال الخاص بنا اليوم واستمتع بفوائد الاشتراك
                في منصتنا. أنشئ حسابًا لشركتك وعرض خدماتك لمجموعة واسعة من
                العملاء. وسّع نطاق عملك وتفاعل مع شركاء جدد في الصناعة. اختر خطة
                الاشتراك التي تناسب احتياجاتك بشكل أفضل وابدأ في تعزيز حضورك عبر
                الإنترنت بدعم كامل من فريقنا.
              </p>


              <button class="button" onClick={() => Navigate("/company_requests")}>
              اشتراك
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
