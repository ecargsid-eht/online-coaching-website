import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthenticationContext } from '../App'

const SidePanel = () => {
    const { userData } = useContext(AuthenticationContext)
    return (
        <div className='col-9 bg-light pt-5' style={{minHeight:"100vh"}}>
            <div className="d-flex flex-column align-items-center">
                <img className='shadow-sm mb-2' src="https://www.pngkey.com/png/detail/121-1219231_user-default-profile.png" style={{borderRadius:"50%",width:"70px",height:"70px"}} alt="" />
                <p className="fs-5 fw-semibold" style={{fontFamily:"Poppins"}}>{userData?.user.name}</p>
            </div>

            <div className="list-group rounded-4 mx-3 mt-5">
                <Link to="/admin" className='list-group-item list-group-item-action border-0 py-3' style={{fontFamily:"Poppins",fontSize:"13px",fontWeight:"400",}}>
                    <i class="bi bi-house-door-fill me-2"></i>
                    Dashboard
                </Link>
                <Link to="/admin/manage-courses" className='list-group-item list-group-item-action border-0 py-3' style={{fontFamily:"Poppins",fontSize:"13px",fontWeight:"400"}}>
                    <i class="bi bi-book-half me-2"></i>
                    Manage Courses
                </Link>
                <Link to="/admin/manage-students" className='list-group-item list-group-item-action border-0 py-3' style={{fontFamily:"Poppins",fontSize:"13px",fontWeight:"400"}}>
                    <i class="bi bi-person-fill me-2"></i>
                    Manage Students
                </Link>
                <Link to="/admin/manage-enrollments" className='list-group-item list-group-item-action border-0 py-3' style={{fontFamily:"Poppins",fontSize:"13px",fontWeight:"400"}}>
                    <i class="bi bi-ui-checks me-2"></i>
                    Manage Enrollments
                </Link>
                <Link to="/admin/manage-alumni" className='list-group-item list-group-item-action border-0 py-3' style={{fontFamily:"Poppins",fontSize:"13px",fontWeight:"400"}}>
                    <i class="bi bi-mortarboard-fill me-2"></i>
                    Manage Aluminis
                </Link>
                <Link  className='list-group-item list-group-item-action border-0 py-3' style={{fontFamily:"Poppins",fontSize:"13px",fontWeight:"400"}}>
                    <i class="bi bi-ticket-detailed-fill me-2"></i>
                    Manage Coupons
                </Link>
            </div>
        </div>
    )
}

export default SidePanel