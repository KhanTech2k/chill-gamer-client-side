import React, { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import pubgBanner from "../assets/pubg.jpg";
import callOfDutyBanner from "../assets/CallOfDuty.jpeg";
import fortniteBanner from "../assets/Fortnite.jpg";
import leagueOfLegendsBanner from "../assets/LeagueofLegends.jpg";
import { Carousel } from "react-responsive-carousel";
import Slider from "react-slick";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";
import { Typewriter } from "react-simple-typewriter";
import UpcomingGames from "./upcomingGames";
import { IoLogoGameControllerB, IoMdStar } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";

const Home = () => {
    const loadedReviews = useLoaderData();
    const [reviews, setReviews] = useState(loadedReviews)
    const highestRatedReviews = reviews.sort((a, b) => b.rating - a.rating).slice(0, 6);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setReviews(reviews);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [reviews]);

    const settings = {
        dots: true,
        infinite: true,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const newReleases = reviews.filter((review) => review.publishingYear >= 2024);
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full border-indigo-600 border-t-transparent"></div>
            </div>
        );
    }

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
                    <div className="w-full lg:w-9/12 mx-auto object-cover">
                        <img
                            src={pubgBanner}
                            alt="image 1"
                            className="w-full h-[350px] rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="w-full lg:w-9/12 mx-auto object-cover">
                        <img
                            src={fortniteBanner}
                            alt="image 2"
                            className="w-full h-[350px] rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="w-full lg:w-9/12 mx-auto object-cover">
                        <img
                            src={callOfDutyBanner}
                            alt="image 3"
                            className="w-full h-[350px] rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="w-full lg:w-9/12 mx-auto object-cover">
                        <img
                            src={leagueOfLegendsBanner}
                            alt="image 4"
                            className="w-full h-[350px] rounded-lg shadow-lg"
                        />
                    </div>
                </Carousel>
            </div>
            <div className="mt-8 p-4">
                <h2 className="text-3xl font-extrabold text-center mb-6">
                    Highest Rated Games
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {highestRatedReviews.map((review) => (
                        <div
                            key={review._id}
                            className="border border-gray-200 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform transition duration-300 hover:-translate-y-2"
                        >
                            <img
                                src={review.gameCover}
                                alt={review.gameTitle}
                                className="w-full h-72 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">
                                    {review.gameTitle}
                                </h3>
                                <p className="mb-1 flex justify-start items-center gap-2">
                                    <span className="text-xl">
                                        <IoLogoGameControllerB></IoLogoGameControllerB></span> Genre:
                                    <span className="font-medium">{review.genre}</span>
                                </p>
                                <p className="mb-1 flex justify-start items-center gap-2">
                                    <span className="text-xl text-[#4A90E2]"><FaRegCalendarAlt></FaRegCalendarAlt></span> Publishing Year:{" "}
                                    <span className="font-medium">{review.publishingYear}</span>
                                </p>
                                <p className="text-indigo-600 font-bold text-lg flex justify-start items-center gap-1">
                                    <span className="text-2xl text-[#FFD700]"> <IoMdStar></IoMdStar></span>Rating:{review.rating}/10
                                </p>
                                <Link
                                    to={`/allReviews/reviewDetails/${review._id}`}
                                    className="inline-block mt-4 px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition"
                                >
                                    Explore Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-12 px-8">
                <h2 className="text-3xl font-extrabold text-center mb-6">
                    <Typewriter
                        words={["New Releases"]}
                        loop={false}
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h2>
                <Slider {...settings}>
                    {newReleases.map((review) => (
                        <div
                            key={review._id}
                            className="px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            <div className="border border-gray-200 shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform transition duration-300 hover:-translate-y-2">
                                <img
                                    src={review.gameCover}
                                    alt={review.gameTitle}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        {review.gameTitle}
                                        <div className="badge ml-4 bg-green-900 text-white">NEW</div>
                                    </h3>
                                    <p className="mb-1 flex justify-start items-center gap-2">
                                        <span className="text-xl">
                                            <IoLogoGameControllerB></IoLogoGameControllerB></span> Genre:
                                        <span className="font-medium">{review.genre}</span>
                                    </p>
                                    <p className="mb-1 flex justify-start items-center gap-2">
                                        <span className="text-xl text-[#4A90E2]"><FaRegCalendarAlt></FaRegCalendarAlt></span> Publishing Year:{" "}
                                        <span className="font-medium">{review.publishingYear}</span>
                                    </p>
                                    <Link
                                        to={`/allReviews/reviewDetails/${review._id}`}
                                        className="inline-block mt-4 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition"
                                    >
                                        Explore Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div>
                <UpcomingGames></UpcomingGames>
            </div>
        </div>
    );
};

export default Home;
