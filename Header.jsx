import React from "react";
import "../App.css";

const Header = ({ setView, activeView }) => {
    return (
        <div className="header">
            <button className={activeView === "home" ? "active" : ""} onClick={() => setView("home")}>
                Home
            </button>
            <button className={activeView === "favorites" ? "active" : ""} onClick={() => setView("favorites")}>
                Favorites
            </button>
        </div>
    );
};

export default Header;
