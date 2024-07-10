import React from 'react';
import Auth from '../components/Auth';

const RegisterPage = ({ onLogin }) => {
    return (
        <div>
            <h1>Register</h1>
            <Auth onLogin={onLogin} />
        </div>
    );
};

export default RegisterPage;
