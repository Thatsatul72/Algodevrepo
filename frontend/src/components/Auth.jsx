import React, { useState } from 'react';
import { login, register } from '../api';

const Auth = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear any previous errors
        if (!username || !password) {
            setError('Please fill in both username and password');
            return;
        }
        
        try {
            const response = isRegistering
                ? await register({ username, password })
                : await login({ username, password });

            console.log('Response data:', response.data);

            const token = response.data.token;
            onLogin(token);
        } catch (err) {
            console.error('Error:', err);
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Response data:', err.response.data);
                console.error('Response status:', err.response.status);
                console.error('Response headers:', err.response.headers);
                setError(err.response.data.message || 'An error occurred');
            } else if (err.request) {
                // The request was made but no response was received
                console.error('Request data:', err.request);
                setError('No response from server');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', err.message);
                setError(err.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Already have an account?' : 'Create an account'}
            </button>
        </form>
    );
};

export default Auth;
