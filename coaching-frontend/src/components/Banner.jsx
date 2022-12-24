import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthenticationContext } from '../App'

const Banner = () => {
    const [emailaddress,setEmailAddress] = useState("")
    const {userData} = React.useContext(AuthenticationContext)
    const [error,setError] = useState("")
    const navigate = useNavigate()
function sendToRegister(){
    if(emailaddress === ""){
        setError("Please enter your email address to continue.")
    }
    else{
        navigate("/register",{state:{emailaddress:emailaddress}})
    }
}
  return (
    <>
        <div style={{backgroundColor:"#fbf8e6"}}>
            <div className="container-md d-flex justify-content-evenly align-items-center">
                <div className='col-lg-5'>
                    <p className="display-3 fw-bold mt-3 mt-md-2 mt-lg-0">
                    Learn the future!!
                    </p>
                    <p className="lead" style={{fontFamily:"Poppins"}}>
                    If you have the courage and the commitment to learn coding, then <span className='fw-bold'>'EdTech'</span> will empower you.
                    </p>

                    {
                        userData === null
                        ?
                        <div className="w-100 mb-0 position-relative">
                            <input value={emailaddress} onChange={e => setEmailAddress(e.target.value)}  type="email" name="" className='form-control border-0 shadow-sm form-control-lg' style={{fontFamily:"Poppins"}} placeholder='Enter email address to get started.' id="" />
                            <button onClick={sendToRegister} type='button' style={{position:"absolute",bottom:3,right:3}} className='btn btn-dark py-2'>
                                <p style={{fontFamily:"Poppins",padding:0,margin:0}}>Get Started</p>
                            </button>
                        </div>
                        :
                        <button onClick={() => navigate("/courses")} style={{fontFamily:"Poppins"}} className="btn btn-dark shadow-sm btn-lg d-none d-lg-block">
                            Start applying in Courses
                        </button>
                    }
                </div>
                <div className="d-lg-block d-none">
                    <img src="https://files.codingninjas.in/438375-17407.webp" className='img-fluid' alt="banner" />
                </div>
            </div>
        </div>

        <div className="container">
           <div className="col-lg-7 mx-auto mt-5">
                <p className="lead fs-4" style={{fontFamily:"Poppins",textAlign:"center"}}>
                    “When to use iterative development? You should use iterative development only on projects that you want to succeed.”
                </p>
                <figcaption className='lead text-center fs-4'>
                    - Martin Fowler
                </figcaption>
           </div>
        </div>
    </>
  )
}

export default Banner