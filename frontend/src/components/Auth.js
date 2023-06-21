import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Perform login logic with the entered email and password
        console.log('Login:', email, password);
    };

    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
        <div className="card text-center" style={{ width: '400px' }}>
            <div className="card-body">
            <h2 className="card-title mb-4">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <button type="submit" className="btn btn-primary btn-lg btn-block">
                Login
                </button>
            </form>
            <p className="mt-3">
                Don't have an account?{' '}
                <Link to="/register">Register here</Link>
            </p>
            </div>
        </div>
    </div>
    );
};

export default LoginPage;
