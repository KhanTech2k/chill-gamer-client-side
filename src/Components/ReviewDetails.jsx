import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const ReviewDetails = () => {
    const review = useLoaderData(); // Data fetched via loader
    const { user } = useContext(AuthContext);

    const handleAddToWatchlist = () => {
        const watchlistData = {
            reviewId: review._id,
            gameTitle: review.gameTitle,
            reviewDescription: review.reviewDescription,
            rating: review.rating,
            genre: review.genre,
            reviewerEmail: review.email,
            userEmail: user.email,
            username: user.displayName || "Anonymous",
        };

        fetch(`http://localhost:5000/watchlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(watchlistData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: "Added to Watchlist",
                        text: "This review has been added to your watchlist.",
                        icon: "success",
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Failed to add this review to your watchlist.",
                        icon: "error",
                    });
                }
            })
            .catch(() =>
                Swal.fire({
                    title: "Error",
                    text: "An error occurred. Please try again.",
                    icon: "error",
                })
            );
    };

    return (
        <div className="container mx-auto p-4">
            <div className="card shadow-lg">
                <img
                    src={review.gameCover}
                    alt={review.gameTitle}
                    className="card-img-top w-full h-64 object-cover"
                />
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold">{review.gameTitle}</h2>
                    <p className="text-lg mt-2">Genre: {review.genre}</p>
                    <p className="text-lg mt-2">Rating: {review.rating}</p>
                    <p className="text-lg mt-2">Description: {review.reviewDescription}</p>
                    <p className="text-lg mt-2">Reviewer: {review.reviewerName}</p>
                    <p className="text-lg mt-2">Email: {review.email}</p>
                    <button onClick={handleAddToWatchlist} className="btn btn-primary mt-4">
                        Add to Watchlist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewDetails;
