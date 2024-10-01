import React, { useState } from 'react'
import "./Login.scss"
import env from '../Config/env'
import { useNavigate } from 'react-router-dom';

interface LoginData {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;  // This is commonly returned by APIs for authentication
    user: {
        id: number;
        name: string;
        email: string;
    };
}
const Login = () => {
    const [formData, setFormData] = useState<LoginData>({ email: '', password: '' });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);

    const navigate = useNavigate(); // Initialize useNavigate for redirection

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        try {
            const response = await fetch('http://127.0.0.1:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),  // Send email and password as JSON
            });
            console.log("API success");
    
            navigate('dashboard');
            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials.');
            }
    
            const result = await response.json(); // Parse the JSON response
            console.log(result);  // Log the result to inspect the response
    
            // Check if result.user exists and has the email property
            if (result.user && result.user.email) {
                setResponseMessage(`Welcome ${result.user.email}!`);
                alert("responce test")
                // Optionally, save the token in localStorage or context for further authentication
                localStorage.setItem('token', result.token);
    
                // You can also store user information if needed
                localStorage.setItem('user', JSON.stringify(result.user));
    
                // Redirect or update UI on successful login
                navigate('/dashboard');
            } else {
                throw new Error('User information is missing from the response.');
            }
        } catch (error) {
            console.log("Login test");
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <div className="login-container d-flex">
                <div className="login-image-container">
                    <img src={env.baseUrl + '/images/admin-login-img.png'} alt="Login illustration" className="login-image" />
                </div>

                <div className="login-form-container">

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 offset-lg-3">
                                <h2 className="login-title">Log In</h2>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter your email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Enter your password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required />
                                </div>
                                <button className='btn btn-outline-success px-5' type="submit" disabled={loading}>
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>

                                <a className='float-end text-decoration-none' href="/forgot-password"><small>Forgot Password?</small></a>
                                
                                <div className="login-links mt-5">
                                  If not an Account?  <a href="/register" className="me-3">Sign Up</a>
                                </div>
                                {/* Display success or error messages */}
                                {responseMessage && <div>{responseMessage}</div>}
                                {error && <div style={{ color: 'red' }}>{error}</div>}
                            </div>
                        </div>

                    </form>
                </div>

            </div>
        </>
    )
}

export default Login