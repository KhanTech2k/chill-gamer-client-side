import React, { useContext, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const ReviewDetails = () => {
    const review = useLoaderData();
    const { user } = useContext(AuthContext);
    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch('http://localhost:5000/watchlist')
                .then((res) => res.json())
                .then((data) => {
                    const userWatchlist = data.filter(
                        (item) => item.userEmail === user.email
                    );
                    setWatchList(userWatchlist);
                })
                .catch((error) =>
                    console.error("Error fetching watchlist:", error)
                );
        }
    }, [user?.email]);
    console.log("Logged-in User Email:", user?.email);

    const handleWatchList = () => {
        const watchItem = {
            reviewId: review._id,
            gameTitle: review.gameTitle,
            reviewDescription: review.reviewDescription,
            rating: review.rating,
            genre: review.genre,
            reviewerEmail: review.email,
            userEmail: user.email,
            username: user.displayName || "Anonymous",
        };

        const isDuplicate = watchList.some(
            (item) =>
                item.reviewId === watchItem.reviewId && item.userEmail === watchItem.userEmail
        );

        if (isDuplicate) {
            Swal.fire({
                title: "Already Added",
                text: "This game is already in your watchlist!",
                icon: "info",
            });
            return;
        }

        fetch("http://localhost:5000/watchlist", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(watchItem),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    Swal.fire({
                        title: "Success",
                        text: "Successfully added to the watchlist!",
                        icon: "success",
                    });
                    setWatchList((prev) => [...prev, watchItem]); 
                }
            })
            .catch((error) => {
                console.error("Error adding to watchlist:", error);
                Swal.fire({
                    title: "Error",
                    text: "Failed to add to the watchlist. Please try again.",
                    icon: "error",
                });
            });
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
                    <button onClick={handleWatchList} className="btn btn-primary mt-4">
                        Add to Watchlist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewDetails;
