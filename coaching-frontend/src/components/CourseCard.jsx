import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthenticationContext } from '../App'

const CourseCard = ({course}) => {

    const navigate = useNavigate()
    const {enrollments} = useContext(AuthenticationContext)
    useEffect(() => {
        console.log(enrollments.some((e) => e.course_id === course.id))
    },[enrollments])

    return (
        <div className='card rounded-4 px-0 col-lg-3'>
            <img src={course.image} alt="" className="card-img-top" />
            <div className="card-body">
                <p className="fw-bold mb-1" style={{ fontFamily: "Poppins", textAlign: "left", fontSize: "22px",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"}}>{course.course_name}</p>
                <div className="d-flex align-items-center mb-2">
                    <i class="bi bi-calendar3"></i>
                    &nbsp;
                    &nbsp;
                    <p className="text-small text-secondary m-0" style={{ fontFamily: "Poppins" }}>{new Date(course.created_at).toLocaleDateString()}</p>
                </div>
                <div className="d-flex align-items-center mb-2">
                    <i class="bi bi-hourglass-split"></i>
                    &nbsp;
                    &nbsp;
                    <p className="text-small text-secondary m-0" style={{ fontFamily: "Poppins" }}>{course.duration}</p>
                </div>
                <div className="d-flex align-items-center mb-2">
                    <i class="bi bi-currency-rupee"></i>
                    &nbsp;
                    &nbsp;
                    <p className="text-small text-secondary m-0" style={{ fontFamily: "Poppins" }}>Rs. {course.price}</p>
                </div>

                <div className='mt-3 row'>
                    {
                        enrollments.some((e) => e.course_id === course.id) 
                        ?
                        <button onClick={() => navigate(`/my-courses/${course.id}`)} className="btn btn-dark btn-sm rounded-3 shadow-sm py-2 fw-bold col" style={{ fontFamily: "Poppins" }}>Open Course</button>
                        :
                        <>
                        <button data-bs-toggle="modal" data-bs-target="#detailsModal" className="btn btn-outline-dark  btn-sm rounded-3 shadow-sm py-2 fw-bold col" style={{ fontFamily: "Poppins" }}>CHECK DETAILS</button>
                            <button onClick={() => navigate("/checkout",{state:{course: course}})} className="btn btn-dark btn-sm rounded-3  shadow-sm ms-2 py-2 fw-bold col" style={{ fontFamily: "Poppins" }}>ENROLL NOW</button>
                        </>

                    }
                </div>
            </div>

            <div className="modal fade" id='detailsModal'>
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="d-flex justify-content-between align-items-center ">
                                <div className="col-5 me-3">
                                    <img src="https://masai-website-images.s3.ap-south-1.amazonaws.com/fswd_ft_40c99104e4.webp" className='img-fluid' alt="" />
                                </div>


                                <div className="col-7 px-4">
                                    <p className="fs-2 fw-bold text-decoration-underline" style={{fontFamily:"Poppins", textUnderlineOffset: 4}}>Course Details</p>
                                    <p className="lead" style={{ fontFamily: "Poppins",fontSize:"20px" }}>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste neque illo culpa nostrum? Assumenda ducimus iusto soluta, corrupti sunt facere, quis id eius quas similique amet? Iste alias consequatur corrupti.
                                    </p>
                                    <p className=" mb-3" style={{ fontFamily: "Poppins",fontSize:"17px" }}>
                                        Course Start Date - 16th October 22
                                    </p>
                                    <p className="" style={{ fontFamily: "Poppins",fontSize:"17px" }}>
                                        Course Duration - 35 weeks    
                                    </p>

                                    <button className="btn btn-dark btn-lg float-end rounded-3" style={{fontFamily:"Poppins"}}>ENROLL NOW</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard