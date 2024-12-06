import React, { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const loadedReviews = useLoaderData();
    const [reviews, setReviews] = useState(loadedReviews)

    // Filter reviews based on email match
    const userReviews = reviews.filter(review => review.email === user?.email);

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://chill-gamer-server-jet.vercel.app/review/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const remaingReviews = reviews.filter(review => review._id !== id);
                            setReviews(remaingReviews)
                        }
                    })
            }
        });
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            userReviews.map((review, index) => <tr key={review._id}>
                                <th>{index + 1}</th>
                                <td>{review.gameTitle}</td>
                                <td>{review.reviewDescription}</td>
                                <td>Blue</td>
                                <td>
                                    <button onClick={() => handleDelete(review._id)} className='btn'>X</button>
                                    <Link to={`updateReview/${review._id}`}>
                                        <button className="btn btn-primary">E</button>
                                    </Link>

                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyReviews;
