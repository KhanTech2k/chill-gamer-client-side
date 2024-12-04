import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const AllReviews = () => {
    const reviews = useLoaderData()
    return (
        <div>
            All Reviews: {reviews.length}
            <div>
                {
                    reviews.map(review => <div key={review._id}>
                        <h2>Review: {review.gameTitle}</h2>
                        <div>
                            <Link to={`reviewDetails/${review._id}`}><button className='btn'>Explore Details</button></Link>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AllReviews;