import React, { useEffect, useState } from 'react';
import { getProblems, deleteProblem } from '../api.js';

const ProblemList = ({ token }) => {
    const [problems, setProblems] = useState([]);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await getProblems();
                setProblems(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProblems();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteProblem(id, token);
            setProblems(problems.filter(problem => problem._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Problems</h2>
            <ul>
                {problems.map(problem => (
                    <li key={problem._id}>
                        {problem.title} - {problem.difficulty}
                        {token && <button onClick={() => handleDelete(problem._id)}>Delete</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProblemList;
