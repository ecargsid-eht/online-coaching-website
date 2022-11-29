import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ManageEnrollments = () => {
    const [allEnrollments,setAllEnrollments] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/enrollments/get-status")
        .then((res) => {
            setAllEnrollments(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])
    return (
        <div className="card border-0 mt-3">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <div className="left">
                    <p className="fs-5 fw-semibold text-secondary" style={{ fontFamily: "Poppins" }}>
                        All Enrollments
                    </p>
                    <div className="input-group">
                        <input type="text" name="" id="" className="form-control form-control-sm shadow-sm rounded-pill" />
                        <button className="btn btn-dark btn-sm shadow rounded-pill ms-1">
                            <i class="bi bi-binoculars-fill"></i>
                        </button>
                    </div>
                </div>

            </div>

            <div className="card-body table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Enrollment ID
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Student ID
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Student Image
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Student Name
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Course ID
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Course Image
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Course Name
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allEnrollments.map((enrollment) => (
                                <tr>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{enrollment?.id}</td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{enrollment?.student.id}</td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">
                                        <img className='rounded-2' src={enrollment?.student.user.image || "https://www.pngkey.com/png/detail/121-1219231_user-default-profile.png" } style={{ width: "40px", height: "40px" }} alt="" />
                                    </td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{enrollment?.student.user.name}</td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{enrollment?.course.id}</td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">
                                    <img className='rounded-2' src={enrollment?.course.image || "https://www.pngkey.com/png/detail/121-1219231_user-default-profile.png" } style={{ width: "40px", height: "40px" }} alt="" />
                                    </td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{enrollment?.course.course_name}</td>
                            
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className='align-middle'>
                                        <button className="btn btn-danger btn-sm shadow-sm rounded-pill ms-1">
                                            <i class="bi bi-trash-fill"></i>
                                        </button>
                                    </td>
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default ManageEnrollments