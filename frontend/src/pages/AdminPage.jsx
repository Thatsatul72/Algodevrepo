import React, { useState } from 'react';
import ProblemList from '../components/ProblemList';
import ProblemForm from '../components/ProblemForm';

const AdminPage = ({ token }) => {
    const [editingProblem, setEditingProblem] = useState(null);

    return (
        <div>
            <h1>Admin Page</h1>
            <ProblemForm token={token} problem={editingProblem} onSave={() => setEditingProblem(null)} />
            <ProblemList token={token} />
        </div>
    );
};

export default AdminPage;
