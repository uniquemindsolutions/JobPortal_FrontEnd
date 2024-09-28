import React, { useEffect, useState } from 'react'
import './register.scss'
import { env } from 'process'

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

// Define the structure of the response (this depends on your API)
interface RegisterResponse {
    success: boolean;
    message: string;
}
const RegisterAdmin = () => {
    const [formData, setFormData] = useState<RegisterData>({
        name: '',
        email: '',
        password: ''
    });
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Submit registration data to the API
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Send form data to API
            });

            const result: RegisterResponse = await response.json();
            console.log("===== result", result)

            if (!response.ok) {
                throw new Error(result.message || 'Registration failed.');
            }
            

            setResponseMessage(result.message);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <main>
            <div className="login-container d-flex">
                <div className="login-image-container">
                    {/* <img src={env.baseUrl + '/images/admin-login-img.png'} alt="Login illustration" className="login-image" /> */}
                </div>

                <div className="login-form-container">

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 offset-lg-3">
                                <h2 className="login-title">Register</h2>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="email" placeholder="Enter your Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required />
                                </div>
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
                                {/* <button type="submit" className="btn btn-primary w-100">Sign In</button> */}
                                <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                                    {loading ? 'Registering...' : 'Register'}
                                </button>
                                <div className="login-links mt-3">
                                    {/* <a href="/signup" className="me-3">Sign Up</a> */}
                                    <a href="/forgot-password"><small>Forgot Password?</small></a>
                                </div>

                                <div className="text-end mt-4">
                                    {responseMessage && <div>{responseMessage}</div>}
                                    {error && <div style={{ color: 'red' }}>{error}</div>}
                                </div>

                            </div>
                        </div>

                    </form>
                </div>

            </div>
        </main>
    )
}

export default RegisterAdmin