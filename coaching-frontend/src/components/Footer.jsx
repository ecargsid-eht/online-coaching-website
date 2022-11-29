import React from 'react'

const Footer = () => {
  return (
    <div className='bg-dark w-100 text-white py-3'>
        <div className="container d-flex">
            <p className="text-small text-light my-auto" style={{fontFamily:"Poppins",fontSize:"12px"}}>
                &copy; EdTech School | All rights reserved.
            </p>

            <div className="ms-auto text-small my-auto">
                <a href="" className="btn btn-link"  style={{fontFamily:"Poppins",fontSize:"12px",color:"#eee"}}>Privacy Policy</a>
                <span style={{fontFamily:"Poppins",fontSize:"12px",color:"#eee"}}>&</span>
                <a href="" className="btn btn-link"  style={{fontFamily:"Poppins",fontSize:"12px",color:"#eee"}}>Terms & Conditions</a>
            </div>
        </div>
    </div>
  )
}

export default Footer