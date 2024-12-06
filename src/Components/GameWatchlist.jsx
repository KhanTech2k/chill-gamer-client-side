import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const GameWatchlist = () => {
    const allWatchlistData = useLoaderData();
    const { user } = useContext(AuthContext);
    const [userWatchlist, setUserWatchlist] = useState([]);

    useEffect(() => {
        if (user?.email) {
            const filteredData = allWatchlistData.filter(
                (item) => item.userEmail === user.email
            );
            setUserWatchlist(filteredData);
        }
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
                fetch(`http://localhost:5000/watchlist/${id}`, {
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

                        // Filter out the deleted item from the state
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

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* Head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Game Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Table rows */}
                        {userWatchlist.map((review, index) => (
                            <tr key={review._id}>
                                <th>{index + 1}</th>
                                <td>{review.gameTitle}</td>
                                <td>{review.reviewDescription}</td>
                                <td>
                                    <button onClick={() => handleDeleteWatchlist(review._id)} className="btn btn-danger">
                                        X
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