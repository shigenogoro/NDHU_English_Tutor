import React, { useState, useEffect } from "react";

const HOME_URL = "http://localhost:5173";

const Navbar = ({ onLoginClick, isLoggedIn, onLogout }) => {
    const [userName, setUserName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const storedUserName = localStorage.getItem("username");
        const storedRole = localStorage.getItem("role");
        setUserName(storedUserName || "");
        setIsAdmin(storedRole === 'true'); // Update admin state
    }, [isLoggedIn]); // Re-run effect when isLoggedIn changes

    const handleLogout = () => {
        onLogout();
        setDropdownOpen(false);
    };

    return (
        <nav className="w-full flex flex-wrap dark:bg-zinc-800 justify-between sticky top-0 z-10">
            <div className="w-1/5 ml-6 my-4">
                <h1 className="text-xl font-bold text-white"><a href={`${HOME_URL}`}>NDHU English Tutor</a></h1>
            </div>
            <div className="flex items-center ml-auto mr-6 relative">
                {isLoggedIn ? (
                    <ul className="flex list-none m-0 p-0">
                        {isAdmin ? (
                            <>
                                <li className="mx-4 text-white hover:text-gray-300 cursor-pointer">
                                    <a href="/upload-recipe">Upload Problems</a>
                                </li>
                                <li
                                    className="mx-4 text-white hover:text-gray-300 cursor-pointer"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="mx-4 text-white hover:text-gray-300 cursor-pointer">
                                    <a href="/upload-recipe">Lessons</a>
                                </li>
                                <li className="mx-4 text-white hover:text-gray-300 cursor-pointer">
                                    <a href="/bookmarks">Vocabulary</a>
                                </li>
                                <li className="mx-4 text-white hover:text-gray-300 cursor-pointer">
                                    <a href="/shoppinglist-page">Practices</a>
                                </li>
                                <li className="relative mx-4 text-white">
                                    <button
                                        onClick={() => setDropdownOpen((prev) => !prev)}
                                        className="hover:text-gray-300 cursor-pointer"
                                    >
                                        Hi, {userName || "Guest"}
                                    </button>
                                    {dropdownOpen && (
                                        <ul className="absolute right-0 bg-white dark:bg-gray-700 rounded-md shadow-lg mt-2">
                                            <li
                                                className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                                            >
                                                Profile
                                            </li>
                                            <li
                                                className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </li>
                                        </ul>
                                    )}
                                </li>
                            </>
                        )}
                    </ul>
                ) : (
                    <button
                        onClick={onLoginClick}
                        className="mx-4 text-white hover:text-gray-300 cursor-pointer"
                    >
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
