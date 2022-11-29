import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../App';
import * as empty from '../assets/empty.json'

const Profile = () => {

    const [selected, setSelected] = useState("d")
    const { userData, enrollments, setEnrollments } = useContext(AuthenticationContext)
    const navigate = useNavigate()

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: empty,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    useEffect(() => {
        console.log(enrollments)
    },[enrollments])

    useEffect(() => {
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
    }, [])
    return (
        <div className="container mt-5 mb-3">
            <p className="display-5 text-center mb-4" style={{ fontFamily: "Poppins", fontWeight: "700" }}>
                Your Profile
            </p>
            <div onClick={() => navigate("/apply")} className="card btn text-start stretched bg-dark shadow rounded-4 text-white col-4">
                <div className="card-body">
                    <div className="badge bg-light text-dark rounded-pill d-flex float-end align-items-center justify-content-between">
                        <i class="bi bi-bell-fill"></i>
                        Complete Profile
                    </div>
                    <div className="d-flex align-items-center">
                        <img className='shadow-lg' src="https://www.pngkey.com/png/detail/121-1219231_user-default-profile.png" style={{ borderRadius: "50%", width: "70px", height: "70px" }} alt="" />
                        <div className="ms-4">
                            <p className="fs-4 mb-0" style={{ fontFamily: "Poppins", fontWeight: "500" }}>{userData?.user.name}</p>
                            <p className="fs-6 mb-0" style={{ fontFamily: "Poppins", fontWeight: "300" }}>{userData?.user.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm rounded-4 border-0 mt-4" style={{ backgroundColor: "#eee", minHeight: "45vh",overflowY:"auto" }}>
                <div className="card-body">
                    {
                        enrollments === undefined || enrollments === null || enrollments.length === 0
                            ?

                            <>
                                <Lottie options={defaultOptions}
                                    height={300}
                                    width={300}
                                />
                                <p className='text-center mt-2 fs-3 fw-bold' style={{ fontFamily: "Poppins" }}>NO COURSES FOUND!!</p>
                            </>
                            :
                            <>
                                {enrollments.map((e) => (
                                    <div className="card border-0 px-3 rounded-2 shadow-sm my-2">
                                        <div className="card-body  row align-items-center">
                                            <div className="col-lg-4 d-flex align-items-center">
                                                <img className='rounded-2' src={e.course.image} style={{ width: "60px", height: "60px" }} alt="" />
                                                <div className="ms-2">
                                                    <p className="m-0 fw-semibold ms-2" style={{ fontFamily: "Poppins", fontSize: "14px" }}>
                                                        {e.course.course_name}
                                                    </p>
                                                    <p className="m-0 text-muted ms-2" style={{ fontFamily: "Poppins", fontSize: "10px" }}>
                                                        Duration - {e.course.duration}
                                                    </p>
                                                    <p className="m-0 text-muted ms-2" style={{ fontFamily: "Poppins", fontSize: "10px" }}>
                                                        Instructor - {e.course.instructor}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 middle">
                                                <p className="m-0 text-muted ms-2" style={{ fontFamily: "Poppins", fontSize: "10px" }}>
                                                    Description:- 
                                                    <br />
                                                    {e.course.description}
                                                </p>
                                            </div>
                                            <div className="col-lg-2"></div>
                                            <div className="col-lg-2 right">
                                                <button onClick={() => navigate(`/my-courses/${e.course.id}`)} className='btn btn-dark rounded-3 w-100 stretched-link ' style={{fontFamily:"Poppins"}}>
                                                    Open Course
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile