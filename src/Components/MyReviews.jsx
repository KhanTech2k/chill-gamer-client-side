import React, { useContext, useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const loadedReviews = useLoaderData();
    const [reviews, setReviews] = useState(loadedReviews);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loadedReviews.length > 0) {
            setTimeout(() => {
                setReviews(loadedReviews);
                setLoading(false);
            }, 500);
        }
    }, [loadedReviews]);

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
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full border-indigo-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className='mt-8'>
            <h2 className='text-center text-4xl font-bold  mb-8'>My Reviews</h2>
            <div className="overflow-x-auto shadow-xl rounded-lg">
                <table className="table table-auto w-full text-center border-collapse">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="py-3 px-5 text-lg font-semibold">No.</th>
                            <th className="py-3 px-5 text-lg font-semibold">Game Title</th>
                            <th className="py-3 px-5 text-lg font-semibold">Genre</th>
                            <th className="py-3 px-5 text-lg font-semibold">Rating</th>
                            <th className="py-3 px-5 text-lg font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userReviews.map((review, index) => <tr key={review._id} className="hover:bg-gray-100 transition duration-200">
                                <th className="py-3 px-5 text-lg font-semibold">{index + 1}</th>
                                <td className="py-3 px-5 text-lg font-semibold">{review.gameTitle}</td>
                                <td className="py-3 px-5 text-lg font-semibold">{review.genre}</td>
                                <td className="py-3 px-5 text-lg font-semibold">{review.rating}/10</td>
                                <td className="py-3 px-5 text-lg font-semibold">
                                    <Link to={`updateReview/${review._id}`} className="inline-block mb-2">
                                        <button className="btn btn-primary px-5 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200">Edit</button>
                                    </Link>
                                    <button onClick={() => handleDelete(review._id)} className="btn px-5 py-2 rounded-md ml-2 text-white bg-red-600 hover:bg-red-700 transition duration-200">Delete</button>
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
