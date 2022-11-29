import React from 'react'
import {Link} from 'react-router-dom'
function MyCourse() {
  return (
    <div className="container-fluid ps-0">
      <div className="row">
        <div className="col-3" >
          <div className="col-11 bg-light" style={{minHeight:"100vh"}}>
         

          <div className="list-group rounded-4 mx-3 pt-5">
            <Link to="/admin" className='list-group-item list-group-item-action border-0 py-3' style={{ fontFamily: "Poppins", fontSize: "13px", fontWeight: "400", }}>
              <i class="bi bi-house-door-fill me-2"></i>
              Dashboard
            </Link>
            <Link to="/admin/manage-courses" className='list-group-item list-group-item-action border-0 py-3' style={{ fontFamily: "Poppins", fontSize: "13px", fontWeight: "400" }}>
              <i class="bi bi-book-half me-2"></i>
              Manage Courses
            </Link>
            <Link to="/admin/manage-students" className='list-group-item list-group-item-action border-0 py-3' style={{ fontFamily: "Poppins", fontSize: "13px", fontWeight: "400" }}>
              <i class="bi bi-person-fill me-2"></i>
              Manage Students
            </Link>
            <Link to="/admin/manage-enrollments" className='list-group-item list-group-item-action border-0 py-3' style={{ fontFamily: "Poppins", fontSize: "13px", fontWeight: "400" }}>
              <i class="bi bi-ui-checks me-2"></i>
              Manage Enrollments
            </Link>
            <Link to="/admin/manage-alumni" className='list-group-item list-group-item-action border-0 py-3' style={{ fontFamily: "Poppins", fontSize: "13px", fontWeight: "400" }}>
              <i class="bi bi-mortarboard-fill me-2"></i>
              Manage Aluminis
            </Link>
            <Link className='list-group-item list-group-item-action border-0 py-3' style={{ fontFamily: "Poppins", fontSize: "13px", fontWeight: "400" }}>
              <i class="bi bi-ticket-detailed-fill me-2"></i>
              Manage Coupons
            </Link>
          </div>
          </div>
        </div>

        <div className="col-1"></div>
        <div className="col-8 mt-3 mb-3">
          Video
        </div>
      </div>
    </div>
  )
}

export default MyCourse