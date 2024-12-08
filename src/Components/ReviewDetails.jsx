import React, { useContext, useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const ReviewDetails = () => {
    const review = useLoaderData();
    const { user } = useContext(AuthContext);
    const [watchList, setWatchList] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch('https://chill-gamer-server-jet.vercel.app/watchlist')
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

    const handleWatchList = () => {
        const watchItem = {
            reviewId: review._id,
            gameTitle: review.gameTitle,
            reviewDescription: review.reviewDescription,
            rating: review.rating,
            genre: review.genre,
            reviewerEmail: review.email,
            reviewerName: review.name,
            userEmail: user.email,
            username: user.displayName || "Anonymous",
        };

        const isDuplicate = watchList.find(
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

        fetch("https://chill-gamer-server-jet.vercel.app/watchlist", {
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
        <div className="container mx-auto p-6">
            <Helmet><title>Review Details | ChillGamers</title></Helmet>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                <img
                    src={review.gameCover}
                    alt={review.gameTitle}
                    className="w-full h-96 object-cover"
                />
                <div className="p-6">
                    <h2 className="text-3xl font-semibold text-gray-800">{review.gameTitle}</h2>
                    <p className="text-xl text-gray-600">Genre: {review.genre}</p>
                    <p className="text-xl font-semibold text-gray-900">Rating:{review.rating}/10</p>
                    <p className="text-lg text-gray-600 mt-4">Description: {review.reviewDescription}</p>
                    <div className="mt-6">
                        <p className="text-lg font-semibold text-gray-800">Reviewed by:{review.name}</p>
                        <p className="text-lg text-gray-500">Reviewer Email: {review.email}</p>
                    </div>
                    <button
                        onClick={handleWatchList}
                        className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Add to Watchlist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewDetails;