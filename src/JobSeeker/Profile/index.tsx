import React from 'react'

const Profiles = () => {
  return (
    <main>
        <div className="container mt-4">
            <div className="row">
                <div className="col-sm-3 col-lg-3">
                    <img className='img-fluid rounded' src={window.location.origin + '/images/avtar-pic.avif'}  />
                </div>
                <div className="col-sm-9 col-lg-8 offset-lg-1">
                    <div className="row">
                    <div className="col-sm-6 col-lg-6">
                    <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                // value={formData.address}
                                // onChange={handleInputChange}
                                placeholder="Address"
                            />
                    </div>
                    <div className="col-sm-6 col-lg-6">2</div>
                    <div className="col-sm-6 col-lg-6">3</div>
                    <div className="col-sm-6 col-lg-6">4</div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Profiles