import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Home from "./pages/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import axios from "axios";
import Apply from "./pages/Apply";
import SidePanel from "./components/SidePanel";
import Dashboard from "./admin_panel/Dashboard";
import AdminRoutes from "./admin_panel/AdminRoutes";
import NotFound from "./components/NotFound";
import Checkout from "./pages/Checkout";
import MyCourse from "./pages/MyCourse";

export const AuthenticationContext = React.createContext();

function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [enrollments,setEnrollments] = useState([])
  const [alumni,setAlumni] = useState([])
  const [courses,setCourses] = useState([])
  const server = "http://127.0.0.1:8000/api/";

  function logout() {
    signOut(auth)
      .then(() => {
        axios
          .post(server + "logout",{}, {
            headers: {
              Authorization: "Bearer" + sessionStorage.getItem("key"),
            },
          })
          .then((res) => {
            sessionStorage.clear();
            setUserData(null)
          })
          .catch((err) => {
            console.log(err)
            sessionStorage.clear();
            setUserData(null)
          });

        sessionStorage.clear();
        setUserData(null)
      })
      .catch((err) => {
        console.log(err)
        sessionStorage.clear();
        setUserData(null)
      });
    navigate("/");
  }


  useEffect(() => {
    console.log("Bearer "+sessionStorage.getItem("key"))
    axios.post(server+"refresh",{},{
      headers:{
        "Authorization":"Bearer "+sessionStorage.getItem("key")
      }
    })
    .then((res) => {
      sessionStorage.setItem("key",res.data.authorisation.token)
      setUserData(res.data.user[0])
      console.log("user "+ JSON.stringify(res.data.user[0]))
    })
    .catch((e) => console.log(e))

    
  }, []);

  useEffect(() => {
    if(userData?.user.id !== undefined){
      axios.get("http://127.0.0.1:8000/api/enrollments", {
          params: {
              student_id: userData?.id
          }
      })
          .then((res) => {
              setEnrollments(res.data)
              console.log(res.data)
          })
          .catch((err) => {
              console.log(err)
          })
    }

    axios.get(server+"alumni")
    .then((res) => {
      console.log(res)
      setAlumni(res.data)
    })
    .catch((err) => console.log(err))
}, [userData])

  // getting data;



  return (
    <>
      <AuthenticationContext.Provider
        value={{
          userData,
          setUserData,
          logout,
          server,
          courses,
          setCourses,
          enrollments,
          setEnrollments,
          alumni,
          setAlumni
        }}
      >
        <div style={{ minHeight: "calc(100vh - 48px)" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path='/checkout' element={<Checkout/>} />
            <Route path="/apply" element={<Apply/>} />
            {userData === null ? (
              <>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </>
            ) : (
              <>
                <Route path="/profile" element={<Profile />} />
                <Route path="/my-courses/:course_id" element={<MyCourse/>} />
              </>
            )}

            {
              userData?.user.isAuthenticated === 1
              &&
              <Route path="/admin/*" element={<AdminRoutes/>} />
            }

            <Route path="*"  element={<NotFound/>}/>
          </Routes>
        </div>
        <Footer />
      </AuthenticationContext.Provider>
    </>
  );
}

export default App;
