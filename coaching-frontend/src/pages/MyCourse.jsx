import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
function MyCourse() {
  const { course_id } = useParams()
  const [course, setCourse] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/courses/" + course_id)
      .then((res) => {
        setCourse(res.data)
      })
  }, [course_id])

  return (
    <div className="container-fluid ps-0">
      <div className="row">
        <div className="col-3" >
          <div className="col-11 bg-light" style={{ minHeight: "100vh" }}>
            <div className="list-group rounded-4 mx-3 pt-5">
              {
                course.course_videos.map((video) => (
                  <Link to="/admin" className='list-group-item list-group-item-action border-0 py-3' style={{ fontFamily: "Poppins", fontSize: "13px", fontWeight: "400", }}>
                    <i class="bi bi-house-door-fill me-2"></i>
                    Dashboard
                  </Link>
                ))
              }
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