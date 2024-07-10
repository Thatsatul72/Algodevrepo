import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProblemById } from '../api';

const ProblemPage = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await getProblemById(id);
                setProblem(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProblem();
    }, [id]);

    if (!problem) return <div>Loading...</div>;

    return (
        <div>
            <h1>{problem.title}</h1>
            <p>{problem.description}</p>
            <p>Difficulty: {problem.difficulty}</p>
        </div>
    );
};

export default ProblemPage;
