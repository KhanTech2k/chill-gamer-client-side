import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const GameWatchlist = () => {
    const allWatchlistData = useLoaderData();
    const { user } = useContext(AuthContext);
    const [userWatchlist, setUserWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            if (user?.email) {
                const filteredData = allWatchlistData.filter(
                    (item) => item.userEmail === user.email
                );
                setUserWatchlist(filteredData);
            }
            setLoading(false);
        }, 500);
    }, [allWatchlistData, user?.email]);

    const handleDeleteWatchlist = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://chill-gamer-server-jet.vercel.app/watchlist/${id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success",
                            });
                            const updatedWatchlist = userWatchlist.filter((item) => item._id !== id);
                            setUserWatchlist(updatedWatchlist);
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: "Failed to delete the item.",
                                icon: "error",
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error deleting the item:", error);
                        Swal.fire({
                            title: "Error",
                            text: "There was an issue deleting the item.",
                            icon: "error",
                        });
                    });
            }
        });
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full border-indigo-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <Helmet>
                <title>My Watchlist | ChillGamers</title>
            </Helmet>
            <h2 className="text-4xl text-center font-bold mb-8 ">My Watchlist</h2>
            <div className="overflow-x-auto shadow-xl rounded-lg">
                <table className="table table-auto w-full text-center border-collapse shadow-lg">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="py-3 px-5 text-lg font-semibold">No.</th>
                            <th className="py-3 px-5 text-lg font-semibold">Game Title</th>
                            <th className="py-3 px-5 text-lg font-semibold">Rating</th>
                            <th className="py-3 px-5 text-lg font-semibold">Reviewer Email</th>
                            <th className="py-3 px-5 text-lg font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userWatchlist.map((review, index) => (
                            <tr key={review._id} className="hover:bg-gray-100 transition duration-200">
                                <th className="py-3 px-5 text-lg font-semibold">{index + 1}</th>
                                <td className="py-3 px-5 text-lg font-semibold">{review.gameTitle}</td>
                                <td className="py-3 px-5 text-lg font-semibold">{review.rating}/10</td>
                                <td className="py-3 px-5 text-lg font-semibold">{review.reviewerEmail}</td>
                                <td className="py-3 px-5 text-lg font-semibold">
                                    <button
                                        onClick={() => handleDeleteWatchlist(review._id)}
                                        className="btn px-5 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GameWatchlist;