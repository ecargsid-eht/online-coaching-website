import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player/lazy'
function MyCourse() {
  const { course_id } = useParams()
  const [course, setCourse] = useState(null)
  const [video,setVideo] = useState("")

  useEffect(() => {
    setVideo(course?.course_videos[0].video_url)
  },[course])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/courses/" + course_id)
      .then((res) => {
        setCourse(res.data)
      })
  }, [course_id])

  function handleVideo(url){
    setVideo("")
    fetch(url)
    .then((r) => r.blob())
    .then(blob => {
      let objectURL = URL.createObjectURL(blob);
      setVideo(objectURL)
    })
  }



  return (
    <div className="container-fluid ps-0">
      <div className="row">
        <div className="col-3" >
          <div className="col-11 bg-light" style={{ minHeight: "100vh" }}>
            <div className="list-group mx-3 pt-5">
              {
                course?.course_videos?.map((video) => (
                  <Link to="" onClick={() => setVideo(video.video_url)} className='list-group-item rounded-3 list-group-item-action border-0 py-3 my-1' style={{ fontFamily: "Poppins", fontSize: "13px", fontWeight: "400", }}>
                    {/* <i class="bi bi-house-door-fill me-2"></i> */}
                    {video.video_serial}. {video.video_name}
                  </Link>
                ))
              }
            </div>
          </div>
        </div>

        <div className="col-8 mt-3 mb-3 mx-auto" style={{
              aspectRatio:"16/9",
              borderRadius:"10px"
            }}>
          <ReactPlayer
            // Disable download button
            config={{ file: { attributes: { controlsList: 'nodownload' } } }}

            // Disable right click
            onContextMenu={e => e.preventDefault()}

            // Your props
            url={video}
            className="react-player"
            playing
            controls
            style={{
              overflow:"hidden",
              borderRadius:"20px",
              backgroundColor:'gray',
            }}
            // onReady={() => {
            //   URL.revokeObjectURL(video)
            // }}
            width="100%"
            height="80vh"
          />
        </div>
      </div>
    </div>
  )
}

export default MyCourse