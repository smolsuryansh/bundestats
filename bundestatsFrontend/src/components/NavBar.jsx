import React, { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const NavBar = ({ onSearch, searchTerm }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const disableSearch = ["/standings", "/scorers"].includes(location.pathname);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleSearch = (event) => {
        const value = event.target.value;
        onSearch(value);
    };

    return (
        <div className="relative bg-black w-full flex items-center justify-between lg:px-6 px-4 h-[10vw] lg:h-[4vw] sm:h-[8vw]">

            <div className="lg:text-[1.8vw] sm:text-[2vw] text-[3vw] font-semibold text-white border-2 border-white rounded-lg">
                <a href="/" className="px-[0.5vw]">
                    Bunde<span className="text-[#f16f6d]">stats</span>
                </a>
            </div>

            {/* desktop nav */}
            <div
                className={`hidden lg:flex items-center justify-center gap-[2vw] lg:text-[1.1vw] text-[2vw]`}
            >
                <a href="/" className="text-white hover:text-[#f16f6d]">Teams</a>

                <a href="/standings" className="text-white hover:text-[#f16f6d]">Standings</a>

                <a href="/matches" className="text-white hover:text-[#f16f6d]">Matches</a>

                <a href="/scorers" className="text-white hover:text-[#f16f6d]">Top-Scorers</a>
            </div>

            {/* mobile search */}
            <div
                className='lg:hidden w-[54vw] flex items-center justify-center rounded-xl overflow-hidden'
            >
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    disabled={disableSearch}
                    className="bg-gray-800 text-white pl-[2vw] py-1 focus:outline-none disabled:cursor-not-allowed rounded-l-xl"
                />
                <button
                    onClick={() => console.log("Searching for: ", searchTerm)}
                    className="p-[1.2vw] py-2 bg-[#c56b6b] hover:bg-[#c1504d] focus:outline-none rounded-r-xl"
                >
                    <FaSearch className="text-white pr-[1vw] sm:pr-[0.1vw]" />
                </button>
            </div>

            <div className="lg:hidden text-white text-2xl cursor-pointer z-[99999]" onClick={toggleMenu}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </div>

            {/* hamboorgir menu */}
            <div
                className={`fixed top-0 left-0 w-full h-full bg-black text-white flex flex-col justify-center items-center gap-8 text-2xl z-50 transition-transform ${menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
                style={{ position: "fixed", top: 0, left: 0 }}
            >
                <a href="/" className="hover:text-[#f16f6d]" onClick={toggleMenu}>Teams</a>

                <a href="/standings" className="hover:text-[#f16f6d]" onClick={toggleMenu}>Standings</a>

                <a href="/matches" className="hover:text-[#f16f6d]" onClick={toggleMenu}>Matches</a>

                <a href="/scorers" className="hover:text-[#f16f6d]" onClick={toggleMenu}>Top-Scorers</a>
            </div>

            {/* desktop search */}
            <div className="hidden lg:flex items-center w-[12vw] lg:rounded-xl overflow-hidden">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    disabled={disableSearch}
                    className="w-full lg:px-4 lg:py-1 bg-gray-800 text-white focus:outline-none disabled:cursor-not-allowed"
                />
                <button
                    onClick={() => console.log("Searching for: ", searchTerm)}
                    className="lg:px-[0.8vw] lg:py-2 bg-[#c56b6b] hover:bg-[#c1504d] focus:outline-none"
                >
                    <FaSearch className="text-white" />
                </button>
            </div>

        </div>
    );
};

export default NavBar;
