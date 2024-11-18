import './App.css';
import {Routes, Route , BrowserRouter} from "react-router-dom"
import { useState, useEffect } from "react";

import { useCookies } from "react-cookie"

import  Header  from './components/Header/Header';
import  Home  from './components/Home/Home';
import  Companys  from './components/Companys/Companys';
import  Advertisements  from './components/Advertisements/Advertisements';
import  Signin  from './components/Signin/Signin';

import Admin from './components/Admin/Admin';
import Create_Categorey from './components/Create_Categorey/Create_Categorey';
import Create_company from './components/Create_company/Create_company';
import Create_user from './components/Create_user/Create_user';
import Get_Categorey from './components/Get_Categorey/Get_Categorey';
import Get_company from './components/Get_company/Get_company';
import Get_user from './components/Get_user/Get_user';
import Get_advertisements from './components/Get_advertisements/Get_advertisements';
import Get_Company_requests from './components/Get_Company_requests/Get_Company_requests';
import Update_company from './components/Update_company/Update_company';
import Update_categorey from './components/Update_categorey/Update_categorey';
import Company_id from './components/Company_id/Company_id';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile/Profile';
import My_company from './components/My_company/My_company';
import Update_company_me from './components/Update_company_me/Update_company_me';
import Company_requests from './components/Company_requests/Company_requests';
import Forgot_passord from './components/Forgot_passord/Forgot_passord';
import Verify_signin from './components/Verify_signin/Verify_signin';
import VerifyResetPassword from './components/VerifyResetPassword/VerifyResetPassword';
import Notfind from './components/Not404/Notfind';
import My_reqeusts from './components/My_requests/My_requests';
import Contact_Us from './components/Contact_Us/Contact_Us';
import ResetPassword from './components/ResetPassword/ResetPassword';
import { MyContextProvider } from './components/Context';



function App() {

  const [Cook, setCookies] = useCookies("token");
  const [isAdmin, setIsAdmin] = useState(false); // لاحتساب حالة الأدمن
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setCookies("token", token);
      const userString = window.localStorage.getItem("user");
      if (userString) {
        try {
          const user = JSON.parse(userString);
          // تحقق إذا كان المستخدم "أدمن"
          if (user && user.role && user.role.toLowerCase() === 'admin') {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  }, [token, setCookies]);




  
  return (
    <MyContextProvider>
    <BrowserRouter >
        <Routes>
          <Route path='/' element={<><Header/> <Home/><Footer/></>}/>
          <Route path='/profile' element={<><Header/> <Profile/><Footer/></>}/>
          <Route path='/my_company' element={<><Header/> <My_company/><Footer/></>}/>
          <Route path='/update_company_me' element={<><Header/> <Update_company_me/><Footer/></>}/>
          <Route path='/company_requests' element={<><Header/> <Company_requests/><Footer/></>}/>
          <Route path='/my_reqeusts' element={<><Header/> <My_reqeusts/><Footer/></>}/>
          <Route path='/contact_Us' element={<><Header/> <Contact_Us/><Footer/></>}/>

          <Route path='/companys' element={<><Header/> <Companys/><Footer/></>}/>
          <Route path='/advertisements' element={<><Header/> <Advertisements/><Footer/></>}/>
          <Route path='/signin' element={ <Signin/>}/>
          <Route path='/forgot_passord' element={ <Forgot_passord/>}/>
          <Route path='/verify_signin' element={ <Verify_signin/>}/>
          <Route path='/verifyResetPassword' element={ <VerifyResetPassword/>}/>
          <Route path='/resetPassword' element={ <ResetPassword/>}/>
          <Route path='/company_id/:id' element={<><Header/> <Company_id/><Footer/></> }/>
          <Route path='/admin' element={isAdmin ? <Admin /> :  <Notfind/>}>
            <Route index element={<Get_company/>}/>
            <Route path='get_company' element={<Get_company/>}/>
            <Route path='get_Categorey' element={<Get_Categorey/>}/>
            <Route path='get_user' element={<Get_user/>}/>
            <Route path='create_Categorey' element={<Create_Categorey/>}/>
            <Route path='create_company' element={<Create_company/>}/>
            <Route path='create_user' element={<Create_user/>}/>
            <Route path='get_advertisements' element={<Get_advertisements/>}/>
            <Route path='get_Company_requests' element={<Get_Company_requests/>}/>
            <Route path='update_company/:id' element={<Update_company/>}/>
            <Route path='update_categorey/:id' element={<Update_categorey/>}/>
          </Route>
          <Route path="*" element={<Notfind/>} />
          
        </Routes>
    </BrowserRouter>
    </MyContextProvider>
  );
}

export default App;
