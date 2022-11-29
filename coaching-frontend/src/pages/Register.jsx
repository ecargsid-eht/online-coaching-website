import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import { useLocation, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'

const Register = () => {
    const location = useLocation()
    useEffect(() => {
        console.log(location)
        if (location !== undefined) {
            console.log(location)
            setEmail(location.state?.emailaddress)
        }
    }, [])
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [email, setEmail] = useState("")
    const [state,setState] = useState("")
    const [city,setCity] = useState("")
    const [gender,setGender] = useState("male")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    function clearData() {
        setName("")
        setContact("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }

    function registerUser() {
        setIsLoading(true)
        if (password !== confirmpassword) {
            setIsLoading(false)
            setError("Password and confirm password do not match.")
            return
        }
        if (password.length < 6) {
            setIsLoading(false)
            setError("Password should be atleast 6 characters long.")
            return
        }
        if(contact.length !== 10){
            setIsLoading(false)
            console.log("Phone number problem")
            setError("Phone number should be valid and unique.")
            return
        }
        if (contact.length === 10) {
            
            axios.post("http://127.0.0.1:8000/api/register", {
                name: name,
                email: email,
                contact: contact,
                password: password
            })
            .then((res) => {
                console.log(res.data)
                if (res.status === 200) {
                    createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        sendEmailVerification(userCredential.user)
                        .then(() => {
                            setIsLoading(false)
                            swal({
                                icon: "success",
                                title: "Registration Successful",
                                text: "Your registration has successfully been initiated. Please visit your email and confirm the registration."
                            })
                            clearData()
                            navigate("/")
                        })
                    })
                    .catch((err) => {
                        setIsLoading(false)
                        if (err.code === 'auth/email-already-in-use') {
                            setError("Email already in use.")
                            return
                        }
                    })
                }
                else {
                    setIsLoading(false)
                    setError("Some error occured. Please check ")
                }
            })
            .catch((er) => {
                setIsLoading(false)
                setError("Some error occured. Please check the caption before filling form.")
            })
        }
    }
    return (
        <div className='container mb-2'>
            <div className="row col-9 mt-3 mx-auto">
                <div className="card mt-5 shadow border-0" style={{ borderRadius: "20px" }}>
                    <div className="card-body">
                        {
                            error !== ""
                            &&
                            <div className="alert bg-danger text-white text-small py-2 d-flex" style={{ fontFamily: "Poppins" }}>
                                <i class="bi bi-exclamation-triangle-fill"></i>
                                &nbsp;&nbsp;
                                {error}
                            </div>
                        }
                        <p className="display-6" style={{ textDecoration: "underline", textDecorationThickness: 2, textUnderlineOffset: 5 }}>Register Now</p>

                        <div className="row">
                            <div className="col-7">
                                <div className="row">
                                    <div className="mb-2 col">
                                        <label htmlFor="">
                                            <span className="lead">Name</span>
                                        </label>
                                        <input value={name} onChange={(e) => setName(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px" }} type="text" name="" className="form-control form-control-lg shadow-sm" />
                                    </div>
                                    <div className="mb-2 col">
                                        <label htmlFor="">
                                            <span className="lead">Contact</span>
                                        </label>
                                        <input value={contact} onChange={(e) => setContact(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px" }} type="contact" name="" className="form-control form-control-lg shadow-sm" />
                                        <p className="text-small text-secondary m-0" style={{ fontFamily: "Poppins", fontSize: "12px" }}>Contact number should be unique.</p>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="">
                                        <span className="lead">Email</span>
                                    </label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px" }} type="email" name="" className="form-control form-control-lg shadow-sm" />
                                    <p className="text-sm text-secondary m-0" style={{ fontFamily: "Poppins", fontSize: "12px" }}>Email address should be unique.</p>
                                </div>
                                
                                <div className="mb-2">
                                    <label htmlFor="">
                                        <span className="lead">Password</span>
                                    </label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px" }} type="password" name="" className="form-control form-control-lg shadow-sm" />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="">
                                        <span className="lead">Confirm Password</span>
                                    </label>
                                    <input value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px" }} type="password" name="" className="form-control form-control-lg shadow-sm" />
                                </div>
                                <div className="mb-1">
                                    <button onClick={registerUser} disabled={isLoading} className="btn btn-dark rounded-3 btn-lg w-100">
                                        {
                                            isLoading
                                            ?
                                            <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                            :
                                            <p style={{ fontFamily: "Poppins" }} className='m-0'>Register</p>
                                        }
                                    </button>
                                </div>
                                <div className="mb-2">
                                    <button onClick={() => navigate("/login")} className="btn btn-link">Already registered? Sign in</button>
                                </div>
                            </div>

                            <div className="col-3 ms-5">
                                <img src={require('./registerimage.png')} width={"300px"} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register