import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const AllReviews = () => {
    const reviews = useLoaderData();
    const [filteredReviews, setFilteredReviews] = useState(reviews);
    const [sortOption, setSortOption] = useState("");
    const [filterGenre, setFilterGenre] = useState("");

    const applySorting = (reviewsToSort, option) => {
        return [...reviewsToSort].sort((a, b) => {
            if (option === "rating") {
                return b.rating - a.rating;
            } else if (option === "year") {
                return b.publishingYear - a.publishingYear;
            }
            return 0;
        });
    };

    const handleSort = (option) => {
        setSortOption(option);

        const sortedReviews = applySorting(filteredReviews, option);
        setFilteredReviews(sortedReviews);
    };

    const handleFilter = (genre) => {
        setFilterGenre(genre);

        let filtered;
        if (genre === "all") {
            filtered = reviews;
        } else {
            filtered = reviews.filter((review) => review.genre === genre);
        }

        const sortedFilteredReviews = applySorting(filtered, sortOption);
        setFilteredReviews(sortedFilteredReviews);
    };

    const genres = ["all", ...new Set(reviews.map((review) => review.genre))];

    return (
        <div>
            <h1 className="text-2xl font-bold">All Reviews</h1>
            <p>Total Reviews: {filteredReviews.length}</p>

            <div className="dropdown">
                <label>Sort by:</label>
                <select
                    value={sortOption}
                    onChange={(e) => handleSort(e.target.value)}
                    className="ml-2 p-2 border rounded"
                >
                    <option value="">Select</option>
                    <option value="rating">Rating</option>
                    <option value="year">Year</option>
                </select>
            </div>

            <div className="dropdown mt-4">
                <label>Filter by Genre:</label>
                <select
                    value={filterGenre}
                    onChange={(e) => handleFilter(e.target.value)}
                    className="ml-2 p-2 border rounded"
                >
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-6">
                {filteredReviews.map((review) => (
                    <div key={review._id} className="mb-4 p-4 border rounded shadow">
                        <h2 className="text-xl font-semibold">Review: {review.gameTitle}</h2>
                        <p>Rating: {review.rating}</p>
                        <p>Year: {review.publishingYear}</p>
                        <p>Genre: {review.genre}</p>
                        <Link to={`reviewDetails/${review._id}`}>
                            <button className="btn btn-primary mt-2">Explore Details</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllReviews;