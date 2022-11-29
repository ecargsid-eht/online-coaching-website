import React, { useEffect, useRef, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { AuthenticationContext, server } from '../App'
import axios from 'axios';
import swal from 'sweetalert';

const ManageStudents = () => {
    const {userData} = useContext(AuthenticationContext)
    const [students,setStudents] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")


    useEffect(() => { 
        axios.get("http://127.0.0.1:8000/api/students")
            .then((res) => {
                console.log(res.data)
                setStudents(res.data)
            })
    }, [])

    function deleteStudent(id){
        axios.delete(`http://127.0.0.1:8000/api/students/delete/${id}`)
        .then((res) => {
            console.log(res.data)
            setStudents(res.data)
        })
        .catch((err) => {
            console.log(err.data)
        })
    }



    return (
        <div className="card border-0 mt-3">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <div className="left">
                    <p className="fs-5 fw-semibold text-secondary" style={{ fontFamily: "Poppins" }}>
                        All Students
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
                                ID
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Image
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Name
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Email
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Contact
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Is Admin
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Gender
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                State
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                City
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Education
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students?.map((student) => (
                                <tr>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{student?.id}</td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">
                                        <img className='rounded-2' src={student?.image || "https://www.pngkey.com/png/detail/121-1219231_user-default-profile.png"} style={{ width: "40px", height: "40px" }} alt="" />
                                    </td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{student?.user.name}</td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{student?.user.email}</td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{student?.user.contact}</td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{student?.user.isAuthenticated === 0 ? "False" : "True"}</td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{student?.gender  || "NULL"}</td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{student?.state  || "NULL"}</td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{student?.city  || "NULL"}</td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{student?.education || "NULL"}</td>
                                    {
                                        userData?.user.email !== student?.user.email
                                        ?
                                        <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className='align-middle'>
                                            <button onClick={() => deleteStudent(student?.user.id)} className="btn btn-danger btn-sm shadow-sm rounded-pill ms-1">
                                                <i class="bi bi-trash-fill"></i>
                                            </button>
                                        </td>
                                        :
                                        <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className='align-middle text-success'>
                                            <div className="badge badge-success bg-success" >
                                            It's you
                                            </div>
                                        </td>
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default ManageStudents