import React, { useEffect, useRef, useState, useContext, useMemo, useCallback } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from 'uuid';
import { AuthenticationContext, server } from '../App'
import axios from 'axios';
import swal from 'sweetalert';
import Dropzone, { useDropzone } from 'react-dropzone'
const ManageCourses = () => {
    const { userData, setCourses, courses } = useContext(AuthenticationContext)
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [duration, setDuration] = useState("")
    const [instructor, setInstructor] = useState("")
    const [description, setDescription] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [image, setImage] = useState("")
    const [myFiles, setMyFiles] = useState([])
    const [status, setStatus] = useState("")
    const storage = getStorage();
    const [linkarray, setLinkarray] = useState([]);

    const close = useRef()

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/courses")
            .then((res) => {
                setCourses(res.data)
            })
    }, [])


    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const focusedStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };


    function Basic(props) {

        const onDrop = useCallback(acceptedFiles => {
            setMyFiles([...myFiles, ...acceptedFiles])
        }, [myFiles])

        const handleValidation = (meta) => {
            return myFiles.find(e => e.name === meta.name && e.size === meta.size && e.type === meta.type)

        }
        const {
            getRootProps,
            getInputProps,
            isFocused,
            isDragAccept,
            isDragReject,
            acceptedFiles,

        } = useDropzone({
            onDrop,
            validator: handleValidation,
            accept: {
                "video/*": ['.mp4', '.mkv', ".mpg", '.m4p', '.m4v', '.avi', '.mov', '.flv', '.mpeg']
            },
            multiple: true

        });


        const removeFile = file => {
            console.log(file)
            const newFiles = [...myFiles]
            console.log(myFiles)
            newFiles.splice(newFiles.indexOf(file), 1)
            setMyFiles(newFiles)
        }

        const files = myFiles.map((file, i) => (
            <div className="container mx-0 rounded-2 mb-1" key={file.path} style={{ backgroundColor: "#F5F5F5" }}>
                <div className="d-flex justify-content-between">
                    <div>
                        <p className='my-0 mt-1' style={{ fontFamily: "Poppins", fontSize: "12px" }}>
                            {i + 1} - {file.name}
                        </p>
                        <p className='my-0 fw-light' style={{ fontFamily: "Poppins", fontSize: "11px" }}>
                            Size - {(file.size * 0.000001).toFixed(3)} MBs
                        </p>
                    </div>
                    <button onClick={() => removeFile(file)} className="btn-link btn px-0" style={{ fontFamily: "Poppins", fontSize: "11px" }}>
                        DELETE
                    </button>
                </div>
            </div>
        ));

        const style = useMemo(() => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {})
        }), [
            isFocused,
            isDragAccept,
            isDragReject
        ]);

        return (
            <div className="container-fluid mx-0 px-0">
                <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <p className='m-0'>Drag and drop folder to upload.</p>
                </div>

                {
                    files.length > 0
                    &&
                    <aside>
                        <h4 className='fs-6 fw-light' style={{ fontFamily: "Poppins" }}>Files</h4>
                        {files}
                    </aside>
                }
            </div>
        );
    }


    function clearData() {
        setName("")
        setPrice("")
        setDuration("")
        setInstructor("")
        setDescription("")
        setError("")
        setImage("")
        temparray = [] //not working as of now.
    }


    function addImage() {
        setIsLoading(true)
        if (name == "" || price == "" || duration == "" || instructor == "" || description == "" || image == "" || myFiles.length === 0) {
            setError("No blank field should be left.");
            setIsLoading(false)
            return
        }
        setStatus("Uploading Course Thumbnail...")
        const uuID = uuid()
        const storageRef = ref(storage, `courses-thumbnail/${userData?.user.id}-${uuID}`)
        uploadBytes(storageRef, image, {
            contentType: 'image/jpeg',
        })
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then((url) => {
                        addCourse(url);
                        setStatus("Uploading Course Videos...")

                    })
                    .catch(() => {
                        setIsLoading(false)
                        setError("There was an error in uploading image. Please try again.")
                    })
            })
            .catch(() => {
                setIsLoading(false)
                setError("There was an error in uploading image. Please try again.");
            })
    }

    let temparray = []
    function uploadVideos(imageUrl) {
        const loop = new Promise((resolve, reject) => {

            myFiles.forEach((file, i) => {
                // const storageRef = ref(storage, `courses-videos/${name}/${file.name}`)
                // uploadBytes(storageRef, file, {
                //     contentType: file.type,
                // })
                //     .then((snapshot) => {
                //         getDownloadURL(snapshot.ref)
                //             .then((url) => {
                //                 temparray.push({
                //                     video_serial: i,
                //                     video_name: file.name,
                //                     url: url
                //                 })
                //                 console.log("here")
                //             })
                //             .then(() => {
                //                 console.log(myFiles.length,i)
                //                 if(temparray.length === myFiles.length){
                //                     console.log(temparray,"final")
                //                     resolve()
                //                 }
                //             })
                //             .catch(() => {
                //                 setIsLoading(false)
                //                 setError("There was an error in uploading image. Please try again.")
                //             })
                //     })
                //     .catch(() => {
                //         setIsLoading(false)
                //         setError("There was an error in uploading image. Please try again.");
                //     })
                let video_url = URL.createObjectURL(file)
                temparray.push({
                    video_url: video_url,
                    video_name: file.name,
                    video_serial: i
                })

            });
        })

        loop.then(() => {
            setStatus("Uploading Course Details (Final Step)...")
            addCourse(imageUrl, temparray)
        })
    }

    function addVideo() {
        console.log(image)
        axios.post("http://127.0.0.1:8000/api/upload/video", {
            video: myFiles[0]
        },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )
            .then((res) => console.log(res))
            .catch((err) => console.log(err.response.data))
    }

    function addCourse(imageUrl) {
        setStatus("Uploading Course Videos and Details (Final Step)...")
        myFiles.forEach((file, i) => {
            temparray.push({
                video_url: myFiles[i],
                video_name: file.name,
                video_serial: i
            })
        })
        axios.post("http://127.0.0.1:8000/api/courses/store", {
            course_name: name,
            price: price,
            image: imageUrl,
            video: temparray,
            instructor: instructor,
            description: description,
            duration: duration,
        },
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        )
            .then((res) => {
                setIsLoading(false)
                console.log(res.data)
                if (res.status === 200) {
                    clearData()
                    swal({
                        title: "Course Inserted Successfully.",
                        icon: "success"
                    })
                    setCourses(res.data)
                }
                else {
                    setError("Some error occured. Please try again.");
                }
            })
            .catch((err) => {
                setIsLoading(false)
                console.log(err)
                setError("Some error occured. Please try again.");
            })
    }

    function deleteCourse(id) {
        axios.delete(`http://127.0.0.1:8000/api/courses/delete/${id}`)
            .then((res) => {
                setCourses(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="card border-0 mt-3">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <div className="left">
                    <p className="fs-5 fw-semibold text-secondary" style={{ fontFamily: "Poppins" }}>
                        All Courses
                    </p>
                    <div className="input-group">
                        <input type="text" name="" id="" className="form-control form-control-sm shadow-sm rounded-pill" />
                        <button className="btn btn-dark btn-sm shadow rounded-pill ms-1">
                            <i class="bi bi-binoculars-fill"></i>
                        </button>
                    </div>
                </div>

                <button data-bs-target="#addcourse" data-bs-toggle="modal" className="btn btn-success btn-sm rounded-3">
                    <span style={{ fontFamily: "Poppins" }}>Add New</span>
                </button>
            </div>

            <div className="card-body table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                ID
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Image
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Name
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Price
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Duration
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Instructor
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Creation Date
                            </th>
                            <th className="text-secondary" style={{ fontFamily: "Poppins", fontWeight: "400", fontSize: "15px", textAlign: "center" }}>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            courses.map((course) => (
                                <tr>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{course?.id}</td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">
                                        <img className='rounded-2' src={course?.image} style={{ width: "40px", height: "40px" }} alt="" />
                                    </td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{course?.course_name}</td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">Rs. {course?.price}/-</td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{course?.duration}</td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{course?.instructor}</td>
                                    <td style={{ fontFamily: "Poppins", fontWeight: "300", fontSize: "14px", textAlign: "center" }} className="align-middle">{new Date(course?.created_at).toLocaleDateString()}</td>
                                    <td className='align-middle' align='center'>
                                        <button className="btn btn-dark btn-sm shadow-sm rounded-pill">
                                            <i class="bi bi-box-arrow-in-right"></i>
                                        </button>
                                        <button onClick={() => deleteCourse(course.id)} className="btn btn-danger btn-sm shadow-sm rounded-pill ms-1">
                                            <i class="bi bi-trash-fill"></i>
                                        </button>
                                        <button className="btn btn-success btn-sm shadow-sm rounded-pill ms-1">
                                            <i class="bi bi-pen-fill"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


            <div className="modal border-0 fade" id='addcourse'>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="mb-2 col">
                                <label htmlFor="">
                                    <span className="fw-light" style={{ fontFamily: "Poppins", fontSize: "15px" }}>Course Name</span>
                                </label>
                                <input value={name} onChange={(e) => setName(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px" }} type="text" name="" className="form-control form-control-sm shadow-sm" />
                            </div>
                            <div className="row">
                                <div className="mb-2 col">
                                    <label htmlFor="">
                                        <span className="fw-light" style={{ fontFamily: "Poppins", fontSize: "15px" }}>Course Price</span>
                                    </label>
                                    <input value={price} onChange={(e) => setPrice(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px" }} type="text" name="" className="form-control form-control-sm shadow-sm" />
                                </div>
                                <div className="mb-2 col">
                                    <label htmlFor="">
                                        <span className="fw-light" style={{ fontFamily: "Poppins", fontSize: "15px" }}>Course Thumbnail</span>
                                    </label>
                                    <input accept="image/*" onChange={(e) => setImage(e.target.files[0])} type="file" name="" className="form-control form-control-sm shadow-sm" />

                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-2 col">
                                    <label htmlFor="">
                                        <span className="fw-light" style={{ fontFamily: "Poppins", fontSize: "15px" }}>Course Instructor</span>
                                    </label>
                                    <input value={instructor} onChange={(e) => setInstructor(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px" }} type="text" name="" className="form-control form-control-sm shadow-sm" />
                                </div>
                                <div className="mb-2 col">
                                    <label htmlFor="">
                                        <span className="fw-light" style={{ fontFamily: "Poppins", fontSize: "15px" }}>Course Duration</span>
                                    </label>
                                    <input value={duration} onChange={(e) => setDuration(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px" }} type="text" name="" className="form-control form-control-sm shadow-sm" />
                                </div>
                            </div>
                            <div className="mb-2 col">
                                <label htmlFor="">
                                    <span className="fw-light" style={{ fontFamily: "Poppins", fontSize: "15px" }}>Course Videos</span>
                                </label>
                                {/* <input type={"file"} webkitdirectory="" directory="" className="form-control form-control-sm shadow-sm" /> */}
                                <Basic />
                            </div>

                            <div className="mb-2 col">
                                <label htmlFor="">
                                    <span className="fw-light" style={{ fontFamily: "Poppins", fontSize: "15px" }}>Course Description</span>
                                </label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ fontFamily: "Poppins", fontSize: "15px", height: "150px" }} type="text" name="" className="form-control form-control-sm shadow-sm" >

                                </textarea>
                            </div>
                            <div className="mb-2 col">
                                <button onClick={addImage} disabled={isLoading} className="btn btn-dark rounded-3 btn-lg w-100">
                                    {
                                        isLoading
                                            ?
                                            <>
                                                <div class="spinner-border" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                                <p style={{ fontFamily: "Poppins", fontSize: "10px", color: "#0096FF" }} className='m-0'>{status}</p>
                                            </>
                                            :
                                            <>
                                                <p style={{ fontFamily: "Poppins" }} className='m-0'>Add Course</p>

                                            </>
                                    }
                                </button>

                                <button data-bs-dismiss="modal" data-bs-target="#addcourse" className="btn btn-danger rounded-3 w-100 mt-2">
                                    <p style={{ fontFamily: "Poppins" }} className='m-0'>Close</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageCourses