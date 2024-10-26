import React from 'react'

const CommonPopup = () => {
  return (
    <main>
        <div className="container">
            <div className="row">
                <div className="col-lg-6 offset-lg-3">
                    <div className="card">
                        <div className="card-body">
                            <h1 className='text-success'>Successfully Saved</h1>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 offset-lg-3">
                    <div className="card">
                        <div className="card-body">
                            <h1 className='text-warning'>Error: Your changes are not saved</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default CommonPopup;