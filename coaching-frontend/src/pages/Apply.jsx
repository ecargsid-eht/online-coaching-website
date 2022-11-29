import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthenticationContext } from '../App'

const Apply = () => {
    const { userData,server } = useContext(AuthenticationContext)
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [email, setEmail] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [gender, setGender] = useState("male")
    const [education, setEducation] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        setName(userData?.user.name)
        setContact(userData?.user.contact)
        setEmail(userData?.user.email)
        setState(userData?.state)
        setCity(userData?.city)
        setGender(userData?.gender)
        setEducation(userData?.education)

    }, [userData])

    function changeDetails(){
        axios.put(server+"")
    }


    return (
        <div className='container mt-3 mb-3'>
            <p className="display-5 text-center mb-4" style={{ fontFamily: "Poppins", fontWeight: "700" }}>
                Edit Profile
            </p>
            <div className="row">
                <div className="col-lg-10 mx-auto">
                    <div className="card border-0 p-4 shadow-sm">
                        {
                            error !== ""
                            &&
                            <div className="alert bg-danger text-white text-small py-2 d-flex" style={{ fontFamily: "Poppins" }}>
                                <i class="bi bi-exclamation-triangle-fill"></i>
                                &nbsp;&nbsp;
                                {error}
                            </div>
                        }
                        <div className="d-flex border-1 align-items-center mb-4">
                            <img className='rounded-5' src="https://www.pngkey.com/png/detail/121-1219231_user-default-profile.png" style={{ borderRadius: "50%", width: "100px", height: "100px" }} alt="" />
                            <span className='mx-4' style={{ fontFamily: "Poppins", fontSize: "16px" }}>Click on 'Edit Image' to upload or change your profile picture.</span>
                            <button className='btn btn-outline-dark ms-auto me-3 btn-sm rounded-3' style={{ borderWidth: "1px", borderColor: "#eee" }}>
                                <span className='fs-6' style={{ fontFamily: "Poppins", fontWeight: "400" }}>Edit Image</span>
                            </button>
                        </div>

                        <div className="mb-3 col">
                            <label htmlFor="">
                                <span className="fw-light" style={{ fontFamily: "Poppins", fontSize: "15px" }}>Full Name</span>
                            </label>
                            <input value={name} onChange={(e) => setName(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px" }} type="text" name="" className="form-control form-control-lg shadow-sm" />
                        </div>

                        <div className="row">
                            <div className="mb-3 col">
                                <label htmlFor="">
                                    <span className="fw-light" style={{ fontFamily: "Poppins", fontSize: "15px" }}>Email</span>
                                </label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px" }} type="text" name="" className="form-control form-control-lg shadow-sm" />
                            </div>
                            <div className="mb-3 col">
                                <label htmlFor="">
                                    <span className="fw-light" style={{ fontFamily: "Poppins", fontSize: "15px" }}>Contact</span>
                                </label>
                                <input value={contact} onChange={(e) => setContact(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px" }} type="text" name="" className="form-control form-control-lg shadow-sm" />
                            </div>

                            <div className="mb-3 col">
                                <label htmlFor="">
                                    <span className="fw-light" style={{ fontFamily: "Poppins", fontSize: "15px" }}>Gender</span>
                                </label>

                                <select name="" id="" className="form-select shadow-sm">
                                    <option value="male" selected={gender === "male" ? true : false} onClick={() => setGender("male")}>Male</option>
                                    <option value="female" selected={gender === "female" ? true : false} onClick={() => setGender("male")}>Female</option>
                                    <option value="others" selected={gender === "others" ? true : false} onClick={() => setGender("male")}>Others</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="mb-3 col">
                                <label htmlFor="">
                                    <span className="fw-light" style={{ fontFamily: "Poppins", fontSize: "15px" }}>State</span>
                                </label>
                                <input value={state} onChange={(e) => setState(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px" }} type="text" name="" className="form-control form-control-lg shadow-sm" />
                            </div>
                            <div className="mb-3 col">
                                <label htmlFor="">
                                    <span className="fw-light" style={{ fontFamily: "Poppins", fontSize: "15px" }}>City</span>
                                </label>
                                <input value={city} onChange={(e) => setCity(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px" }} type="text" name="" className="form-control form-control-lg shadow-sm" />
                            </div>
                        </div>
                        <div className="mb-3 col">
                            <label htmlFor="">
                                <span className="fw-light" style={{ fontFamily: "Poppins", fontSize: "15px" }}>Education Details (In a few words.)</span>
                            </label>
                            <input value={city} onChange={(e) => setCity(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px" }} type="text" name="" className="form-control form-control-lg shadow-sm" />
                        </div>

                        <div className="mb-3 col">
                            <button onClick={changeDetails} disabled={isLoading} className="btn btn-dark rounded-3 btn-lg w-100">
                                {
                                    isLoading
                                        ?
                                        <div class="spinner-border" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                        :
                                        <p style={{ fontFamily: "Poppins" }} className='m-0'>Edit or Add Details</p>
                                }
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Apply