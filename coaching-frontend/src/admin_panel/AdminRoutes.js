import React, { useEffect } from 'react'
import { redirect, Route, Routes, useLocation } from 'react-router-dom'
import NotFound from '../components/NotFound'
import SidePanel from '../components/SidePanel'
import Dashboard from './Dashboard'
import ManageAlumni from './ManageAlumni'
import ManageCourses from './ManageCourses'
import ManageEnrollments from './ManageEnrollments'
import ManageStudents from './ManageStudents'

const AdminRoutes = () => {
    const location = useLocation();
    useEffect(() => {
        console.log(location)
    },[])
  return (
    <div className="container-fluid ps-0">
        <div className="row">
            <div className="col-3">
                <SidePanel/>
            </div>
            <div className="col-9">
                <Routes>
                    <Route path="/" element={<Dashboard/>} />
                    <Route path="/manage-courses" element={<ManageCourses/>} />
                    <Route path="/manage-students" element={<ManageStudents/>} />
                    <Route path="/manage-enrollments" element={<ManageEnrollments/>} />
                    <Route path='/manage-alumni' element={<ManageAlumni/>} />
                    <Route path='*' element={<NotFound/>} />

                </Routes>
            </div>
        </div>
    </div>
  )
}

export default AdminRoutes