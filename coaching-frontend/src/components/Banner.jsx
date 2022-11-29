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
        <div style={{backgroundColor:"#fbf8e6"}} className="py-3">
            <div className="d-flex justify-content-evenly align-items-center">
                <div className='col-5'>
                    <p className="display-3 fw-bold">
                    Learn the future!!
                    </p>
                    <p className="lead fs-2" style={{fontFamily:"Poppins"}}>
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
                        <button onClick={() => navigate("/courses")} style={{fontFamily:"Poppins"}} className="btn btn-dark shadow-sm btn-lg">
                            Start applying in Courses
                        </button>
                    }
                </div>
                <img src="https://files.codingninjas.in/438375-17407.webp" className='img-fluid' alt="banner" />
            </div>
        </div>

        <div className="d-flex justify-content-center">
           <div className="col-6 mt-5">
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