import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className='space-x-5 py-4 flex justify-center items-center flex-wrap'>
            <NavLink to='/' className='flex justify-center items-center gap-1'> Home</NavLink>
            <NavLink to='/allReviews' className='flex justify-center items-center gap-1'> All Reviews</NavLink>
            <NavLink to='addreview' className='flex justify-center items-center gap-1'> Add Review</NavLink>
            <NavLink to='/myreviews' className='flex justify-center items-center gap-1'>My Reviews</NavLink>
            <NavLink to='/watchlist' className='flex justify-center items-center gap-1'>Game WatchList</NavLink>
        </div>
    );
};

export default NavBar;