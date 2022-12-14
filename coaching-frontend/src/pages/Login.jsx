import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import { sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthenticationContext } from '../App'

const Login = () => {
    const [email, setEmail] = useState("")
    const { user } = useContext(AuthenticationContext)
    const { setUser } = useContext(AuthenticationContext)
    const { userData } = useContext(AuthenticationContext)
    const { setUserData } = useContext(AuthenticationContext)

    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    function clearData() {
        setEmail("")
        setPassword("")
    }

    function loginUser() {
        setIsLoading(true)
        axios.post("http://127.0.0.1:8000/api/login", {
            email: email,
            password: password
        })
            .then((res) => {
                console.log(res.data,"user")
                if (res.status === 200) {
                    console.log(res.data)
                    signInWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            setIsLoading(false)
                            if (userCredential.user.emailVerified) {
                                sessionStorage.setItem("key",res.data.authorisation.token)
                                setUserData(res.data.user[0])
                                navigate("/")
                                clearData()
                            }
                            else {
                                sendEmailVerification(userCredential.user)
                                    .then(() => {
                                        setError("Email verification link has been sent on your email. Click the link to verify your account.")
                                        sessionStorage.removeItem("user")
                                        return
                                    })
                            }
                        })
                        .catch((err) => {
                            setIsLoading(false)
                            setError("Some error occured. Please try again.")
                            return
                        })

                }
                else {
                    setIsLoading(false)
                    setError("Some error occured. Please try again later.")
                    return
                }
            })
            .catch((err) => {
                setIsLoading(false)
                if (err.response.data.email !== undefined) {
                    if (err.response.data.email[0] === 'The email must be a valid email address.') {
                        setError("The email address is invalid.")
                    }
                }
                if (err.response.data.status === 'error') {
                    setError("Email or password is incorrect.")
                }
            })
    }

    return (
        <div className='container mb-3'>
            <div className="row col-6 mt-3 mx-auto">
                <div className="card mt-5 shadow border-0" style={{ borderRadius: "20px" }}>
                    <div className="card-body">
                        {
                            error !== ""
                            &&
                            <div className="alert bg-danger text-white text-small py-2 d-flex" style={{ fontFamily: "Poppins" }}>
                                <i className="bi bi-exclamation-triangle-fill"></i>
                                &nbsp;&nbsp;
                                {error}
                            </div>
                        }
                        <p className="display-6" style={{ textDecoration: "underline", textDecorationThickness: 2, textUnderlineOffset: 5 }}>Login Now</p>

                        <div className="row">
                            <div className="col-6">

                                <div className="mb-3">
                                    <label htmlFor="">
                                        <span className="lead">Email</span>
                                    </label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "18px" }} type="email" name="" className="form-control form-control-lg shadow-sm" />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">
                                        <span className="lead">Password</span>
                                    </label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "18px" }} type="password" name="" className="form-control form-control-lg shadow-sm" />
                                </div>

                                <div className="mb-1">
                                    <button onClick={loginUser} disabled={isLoading} className="btn btn-dark rounded-3 btn-lg w-100">
                                        {
                                            isLoading
                                                ?
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                :
                                                <p style={{ fontFamily: "Poppins" }} className='m-0'>Login</p>
                                        }
                                    </button>
                                </div>
                                <div className="mb-3">
                                    <button onClick={() => navigate("/register")} className="btn btn-link">New user? Register Here</button>
                                </div>
                            </div>

                            <div className="col-3">
                                <img src={require('./registerimage.png')} width={"300px"} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login