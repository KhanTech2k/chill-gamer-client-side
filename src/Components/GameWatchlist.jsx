import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

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

    return (
        <div>
            <h2>Watchlist for {user?.displayName || "Anonymous"}</h2>
            <p>Total Items in Watchlist: {userWatchlist.length}</p>
        </div>
    );
};

export default GameWatchlist;
