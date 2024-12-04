import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    const data = useLoaderData()
    return (
        <div>
            home
            <h3>Data: {data.length}</h3>
        </div>
    );
};

export default Home;