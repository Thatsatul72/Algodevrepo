import React, { useState } from 'react';
import { createProblem, updateProblem } from '../api';

const ProblemForm = ({ token, problem, onSave }) => {
    const [title, setTitle] = useState(problem ? problem.title : '');
    const [description, setDescription] = useState(problem ? problem.description : '');
    const [difficulty, setDifficulty] = useState(problem ? problem.difficulty : 'easy');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear any previous errors

        if (!title || !description || !difficulty) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const problemData = { title, description, difficulty };
            if (problem) {
                console.log('Updating problem with ID:', problem._id);
                await updateProblem(problem._id, problemData, token);
                console.log('Problem updated successfully');
            } else {
                console.log('Creating new problem with data:', problemData);
                await createProblem(problemData, token);
                console.log('Problem created successfully');
            }
            onSave(); // Notify parent component that save operation is complete
        } catch (err) {
            console.error('Error during problem creation/update:', err);
            if (err.response) {
                console.error('Response data:', err.response.data);
                console.error('Response status:', err.response.status);
                console.error('Response headers:', err.response.headers);
                setError(err.response.data.message || 'An error occurred');
            } else if (err.request) {
                console.error('Request data:', err.request);
                setError('No response from server');
            } else {
                console.error('Error message:', err.message);
                setError(err.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{problem ? 'Edit Problem' : 'Add Problem'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                required
            >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <button type="submit">{problem ? 'Update' : 'Create'}</button>
        </form>
    );
};

export default ProblemForm;
