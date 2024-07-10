import axios from 'axios';

const API_URL = 'http://localhost:9001/api';

export const register = (userData) => {
    return axios.post(`${API_URL}/auth/register`, userData);
};

export const login = (userData) => {
    return axios.post(`${API_URL}/auth/login`, userData);
};

export const getProblems = () => {
    return axios.get(`${API_URL}/problems`);
};

export const getProblemById = (id) => {
    return axios.get(`${API_URL}/problems/${id}`);
};

export const createProblem = (problemData, token) => {
    return axios.post(`${API_URL}/problems`, problemData, {
        headers: { Authorization: token }
    });
};

export const updateProblem = (id, problemData, token) => {
    return axios.put(`${API_URL}/problems/${id}`, problemData, {
        headers: { Authorization: token }
    });
};

export const deleteProblem = (id, token) => {
    return axios.delete(`${API_URL}/problems/${id}`, {
        headers: { Authorization: token }
    });
};
