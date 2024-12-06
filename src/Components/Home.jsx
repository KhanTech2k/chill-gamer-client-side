import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import darazbanner from "../assets/daraz-banner.jpg";
import pickaboobanner from "../assets/pickaboo-banner.jpg";
import ajkerdeal from "../assets/Ajker-deal.jpg";
import Foodpanda from "../assets/Foodpanda.png";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "animate.css";

const Home = () => {
    const reviews = useLoaderData();
    console.log(reviews)
    const highestRatedReviews = reviews
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 6);

    return (
        <div>
            <div className="w-full mx-auto my-10 animate__animated animate__fadeInDown">
                <Carousel
                    infiniteLoop
                    useKeyboardArrows
                    autoPlay
                    showThumbs={false}
                    showStatus={false}
                    showIndicators={true}
                    swipeable
                    emulateTouch
                    interval={3000}
                    transitionTime={500}
                    thumbWidth={80}
                    stopOnHover
                    renderArrowPrev={(clickHandler) => (
                        <button
                            className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg z-10 animate__animated animate__fadeInLeft"
                            onClick={clickHandler}
                        >
                            &lt;
                        </button>
                    )}
                    renderArrowNext={(clickHandler) => (
                        <button
                            className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg z-10 animate__animated animate__fadeInRight"
                            onClick={clickHandler}
                        >
                            &gt;
                        </button>
                    )}
                >
                    <div className="w-9/12 mx-auto object-cover">
                        <img
                            src={darazbanner}
                            alt="image 1"
                            className="w-full h-[350px] rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="w-9/12 mx-auto object-cover">
                        <img
                            src={pickaboobanner}
                            alt="image 2"
                            className="w-full h-[350px] rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="w-9/12 mx-auto object-cover">
                        <img
                            src={ajkerdeal}
                            alt="image 3"
                            className="w-full h-[350px] rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="w-9/12 mx-auto object-cover">
                        <img
                            src={Foodpanda}
                            alt="image 4"
                            className="w-full h-[350px] rounded-lg shadow-lg"
                        />
                    </div>
                </Carousel>
            </div>

            {/* Highest Rated Games Section */}
            <div className="mt-8">
                <h2 className="text-3xl font-bold text-center mb-6">Highest Rated Games</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {highestRatedReviews.map((review) => (
                        <div
                            key={review._id}
                            className="border border-gray-200 shadow-lg rounded-lg p-4 bg-white"
                        >
                            <img
                                src={review.gameCover}
                                alt={review.gameTitle}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-semibold">{review.gameTitle}</h3>
                            <p className="text-gray-600">Genre: {review.genre}</p>
                            <p className="text-gray-600">Year: {review.publishingYear}</p>
                            <p className="text-indigo-600 font-bold">Rating: {review.rating}/10</p>
                            <Link
                                to={`/allReviews/reviewDetails/${review._id}`}
                                className="btn btn-primary mt-4"
                            >
                                Explore Details
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
