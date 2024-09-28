import React from 'react'
import "./Login.scss"
import env from '../Config/env'

const Login = () => {
    return (
        <>
            <div className="login-container d-flex">
                <div className="login-image-container">
                    <img src={env.baseUrl + '/images/admin-login-img.png'} alt="Login illustration" className="login-image" />
                </div>

                <div className="login-form-container">

                    <form>
                        <div className="row">
                            <div className="col-md-6 offset-lg-3">
                                <h2 className="login-title">Log In</h2>
                                <p>Enter your email and password to login to our dashboard.</p>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter your password" />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Sign In</button>
                                <div className="login-links mt-3">
                                    <a href="/signup" className="me-3">Sign Up</a>
                                    <a href="/forgot-password">Forgot Password?</a>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>

            </div>
        </>
    )
}

export default Login