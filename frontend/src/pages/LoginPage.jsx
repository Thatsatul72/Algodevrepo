import React from 'react';
import Auth from '../components/Auth';

const LoginPage = ({ onLogin }) => {
    return (
        <div>
            <h1>Login</h1>
            <Auth onLogin={onLogin} />
        </div>
    );
};

export default LoginPage;
