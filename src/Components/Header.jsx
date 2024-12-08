import React, { useContext } from 'react';
import NavBar from './NavBar';
import { AuthContext } from '../Providers/AuthProvider';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import DarkMode from './DarkMode';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);

    return (
        <div className=" py-6 shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between items-center lg:px-10 py-6">
                <h2 className="text-3xl font-bold tracking-wide">
                    Chill<span className="text-[#F5B041]">GAMER</span>
                </h2>
                <NavBar></NavBar>
                <div className="space-x-6 flex items-center">
                    {user && user.displayName ? (
                        <div className="flex flex-row items-center gap-4 text-white">
                            <a
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={user.displayName}
                                data-tooltip-place="top"
                            >
                                <img
                                    className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                                    src={user.photoURL}
                                    alt="User"
                                />
                            </a>
                            <Link to='/'><button
                                onClick={logOut}
                                className="px-4 py-2 rounded bg-[#F5B041] text-white font-semibold hover:bg-[#F39C12] transition duration-200"
                            >
                                Logout
                            </button></Link>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link to="/login">
                                <button className="px-4 py-2 rounded bg-[#5DADE2] text-white font-semibold hover:bg-[#3498DB] transition duration-200">
                                    Log In
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="px-4 py-2 rounded bg-[#28B463] text-white font-semibold hover:bg-[#1D8348] transition duration-200">
                                    Register
                                </button>
                            </Link>
                        </div>
                    )}
                    <DarkMode></DarkMode>
                </div>
                <Tooltip id="my-tooltip" />
            </div>
        </div>
    );
};

export default Header;