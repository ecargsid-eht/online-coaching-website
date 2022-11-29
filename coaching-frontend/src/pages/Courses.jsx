import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { AuthenticationContext } from '../App'
import CourseCard from '../components/CourseCard'

const Courses = () => {
    const {courses,setCourses} = useContext(AuthenticationContext)
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/courses")
            .then((res) => {
                setCourses(res.data)
            })
    }, [])
  return (
    <div className="container mt-5 mb-3">
        <p className="display-5 text-center" style={{fontFamily:"Poppins",fontWeight:"700"}}>
            Our Courses
        </p>
        <p className="fs-4 text-secondary text-center" style={{fontFamily:"Poppins"}}>
            Start your career on the right foot by getting skilled and become job-ready!
        </p>

        <div className="text-center">
            <div className="input-group w-50 mx-auto">
                <input type="text" id="" placeholder='Search any course...' className="form-control form-control-sm shadow-sm" />
                <button className="btn btn-dark btn-sm shadow-sm" style={{fontFamily:"Poppins"}}>Search</button>
            </div>
        </div>
        <div className="course-card mt-5">
            <div className="d-flex flex-wrap gap-3 justify-content-center" >
                {
                    courses?.map((course,i) => (
                        <CourseCard key={i} course={course}  />
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Courses