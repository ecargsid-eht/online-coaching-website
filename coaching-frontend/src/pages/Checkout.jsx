import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthenticationContext } from '../App'
import {v4 as uuid} from 'uuid'

const Checkout = () => {
    const [name, setName] = useState("")
    const [course,setCourse] = useState({})
    const [contact, setContact] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

    const { userData } = useContext(AuthenticationContext)
    useEffect(() => {
        if(location !== undefined){
            setCourse(location.state?.course)
        }
        if (userData === undefined || userData === null){
            navigate("/login");
            return
        }
        setName(userData?.user.name)
        setEmail(userData?.user.email)
        setContact(userData?.user.contact)
    }, [])

    function checkoutOrder(){
        let orderId
        axios.get("http://127.0.0.1:8000/api/razorpay-payment",{
            params:{
                amount:course.price * 100
            }
        })
        .then((res) => {
            console.log(res.data);
            orderId = res.data
            
            var options = {
                "key": "rzp_test_3OntfWePzzIh5K", // Enter the Key ID generated from the Dashboard
                "amount": course.price * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "EdTech",   
                "description": "Thank you for your purchase.",
                "image": "https://example.com/your_logo",
                "order_id":orderId,
                "handler": function (response){
                    console.log(response)
                    axios.post("http://127.0.0.1:8000/api/enrollments/store",{
                        student_id:userData?.id,
                        course_id:course.id,
                        payment_id:response.razorpay_payment_id,
                        price_paid:course.price
                    })
                    .then((res) => {
                        console.log(res.data)
                        if(res.status === 200){
                            navigate("/profile",{status:{success:"New Course has been placed."}})
                        }
                    })
                },
                "prefill": {
                    "name": userData?.user.name,
                    "email": userData?.user.email,
                    "contact": userData?.user.contact
                },
                "theme": {
                    "color": "#2d2d2d"
                }
            };
            var rzp = new window.Razorpay(options);
            rzp.open()
        })
        
    }
    return (
        <div className='container mt-5'>
            <p className="display-5 text-center" style={{ fontFamily: "Poppins", fontWeight: "700" }}>
                Checkout
            </p>

            <div className="col-9 mx-auto">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <p className="fs-4 fw-bold text-center" style={{ fontFamily: "Poppins" }}>
                            Your Billing Details
                        </p>
                        <hr />
                        <div className="row mx-auto">
                            <div className="col-lg-1"></div>
                            <div className="card mx-0 border-0 col-lg-6" >
                                <div className="card-body">

                                    <div className="mb-3 col">
                                        <label htmlFor="">
                                            <span className="fw-light" style={{ fontFamily: "Poppins", fontSize: "15px" }}>Full Name</span>
                                        </label>
                                        <input value={name} onChange={(e) => setName(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px" }} type="text" name="" className="form-control form-control-lg shadow-sm" />
                                    </div>
                                    <div className="row">
                                        <div className="mb-3 col-lg-7">
                                            <label htmlFor="">
                                                <span className="fw-light" style={{ fontFamily: "Poppins", fontSize: "15px" }}>Email</span>
                                            </label>
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px" }} type="text" name="" className="form-control form-control-lg shadow-sm" />
                                        </div>
                                        <div className="mb-3 col-lg-5">
                                            <label htmlFor="">
                                                <span className="fw-light" style={{ fontFamily: "Poppins", fontSize: "15px" }}>Contact</span>
                                            </label>
                                            <input value={contact} onChange={(e) => setContact(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px" }} type="text" name="" className="form-control form-control-lg shadow-sm" />
                                        </div>
                                    </div>

                                    <div className="card border-0 mb-3 shadow-sm" style={{backgroundColor:"#f8f8f8"}}>
                                        <div className="card-body pt-2">
                                            <p className="fs-6 mb-2 fw-bold" style={{ fontFamily: "Poppins" }}>
                                                Your Order
                                            </p>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <img className='rounded-2' src={course.image} style={{ width: "40px", height: "40px" }} alt="" />
                                                        <div className="">
                                                            <p className="m-0 fw-semibold ms-2" style={{fontFamily:"Poppins",fontSize:"14px"}}>
                                                                {course.course_name}
                                                            </p>
                                                            <p className="m-0 text-muted ms-2" style={{fontFamily:"Poppins",fontSize:"10px"}}>
                                                                Duration - {course.duration}
                                                            </p>
                                                            <p className="m-0 text-muted ms-2" style={{fontFamily:"Poppins",fontSize:"10px"}}>
                                                                Instructor - {course.instructor}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p className="m-0 fw-normal" style={{fontFamily:"Poppins",fontSize:"13px"}}>
                                                        Rs. {course.price}
                                                    </p>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <button onClick={checkoutOrder} className='btn btn-dark rounded-3 w-100' style={{fontFamily:"Poppins"}}>
                                            Checkout Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card ms-4 px-1 col-lg-3 border-0 shadow-sm align-self-center" style={{backgroundColor:"#f8f8f8"}}>
                                <div className="card-body">
                                    <p className="fs-5 mb-1 fw-bold" style={{ fontFamily: "Poppins" }}>
                                        Summary
                                    </p>

                                    <hr className='mt-1' />

                                    <div className="d-flex mb-2 justify-content-start">
                                        <p className="text-muted mb-1" style={{ fontFamily: "Poppins",fontSize:"12px",fontWeight:"400" }}>
                                            Original price :
                                        </p>
                                        <p className="text-muted mb-1 ms-auto " style={{ fontFamily: "Poppins",fontSize:"12px",fontWeight:"400" }}>
                                            Rs. {course.price} /-
                                        </p>
                                    </div>
                                    <div className="d-flex mb-2 justify-content-start">
                                        <p className="text-muted mb-1" style={{ fontFamily: "Poppins",fontSize:"12px",fontWeight:"400" }}>
                                            Discounted amount :
                                        </p>
                                        <p className="mb-1 ms-auto text-success" style={{ fontFamily: "Poppins",fontSize:"12px",fontWeight:"400" }}>
                                           -  Rs. 0 /-
                                        </p>
                                    </div>

                                    <hr />

                                    <div className="d-flex mb-4 justify-content-start">
                                        <p className="mb-1" style={{ fontFamily: "Poppins",fontSize:"12px",fontWeight:"400" }}>
                                           Total :
                                        </p>
                                        <p className="mb-1 ms-auto" style={{ fontFamily: "Poppins",fontSize:"12px",fontWeight:"400" }}>
                                           Rs. {course.price} /-
                                        </p>
                                    </div>

                                    <p className="mb-0" style={{ fontFamily: "Poppins",fontSize:"13px",fontWeight:"400" }}>
                                        PAYMENT GATEWAY:-
                                    </p>
                                    
                                    <img className='rounded-2' src={"https://www.j2store.org/images/extensions/payment_plugins/Razorpay.png"} style={{ height: "40px" }} alt="" />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Checkout