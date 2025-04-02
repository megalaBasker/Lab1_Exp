import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaMusic, FaHeart, FaPlay, FaPause } from "react-icons/fa";
import Header from "./Header"; 
import "../App.css"; 

const Dashboard = () => {
    const [songs, setSongs] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [view, setView] = useState("home"); 
    const audioRef = useRef(null);

    useEffect(() => {
        axios.get("http://localhost:5000/songs")
            .then(res => {
                setSongs(res.data);
                if (res.data.length > 0) {
                    setCurrentSong(res.data[0]); 
                }
            })
            .catch(err => console.error("Error fetching songs:", err));
    }, []);

    useEffect(() => {
        if (view === "favorites" && favorites.length > 0) {
            setCurrentSong(favorites[0]); 
            setIsPlaying(true);
            if (audioRef.current) {
                audioRef.current.src = `http://localhost:5000${favorites[0].filePath}`;
                audioRef.current.play();
            }
        }
    }, [view, favorites]);

    const playSong = (song) => {
        if (currentSong && song.title === currentSong.title) {
            togglePlayPause();
            return;
        }

        setCurrentSong(song);
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.src = `http://localhost:5000${song.filePath}`;
            audioRef.current.play();
        }
    };

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleFavorite = (song) => {
        setFavorites((prevFavorites) =>
            prevFavorites.some((fav) => fav.title === song.title)
                ? prevFavorites.filter((fav) => fav.title !== song.title) 
                : [...prevFavorites, song] 
        );
    };


    const displayedSongs = view === "home" ? songs : favorites;

    return (
        <div className="dashboard-container">
            <Header setView={setView} activeView={view} />

            {currentSong && (
                <div className="music-player">
                    <FaMusic className="music-icon" />
                    <h2 className="song-title">{currentSong.title}</h2>
                    <audio ref={audioRef} className="audio-control" controls onEnded={() => setIsPlaying(false)}>
                        <source src={`http://localhost:5000${currentSong.filePath}`} type="audio/mpeg" />
                    </audio>
                    <button onClick={togglePlayPause} className="play-btn">
                        {isPlaying ? <FaPause /> : <FaPlay />} {isPlaying ? "Pause" : "Play"}
                    </button>
                </div>
            )}

            <div className="song-list">
                {displayedSongs.length === 0 ? (
                    <p className="no-favorites">No favorites yet! </p>
                ) : (
                    displayedSongs.map((song) => (
                        <div key={song.title} className="song-card" onClick={() => playSong(song)}>
                            <div className="song-info">
                                <FaMusic className="song-icon" />
                                <p className="song-text">{song.title}</p>
                            </div>
                            <button
                                className={`heart-btn ${favorites.some((fav) => fav.title === song.title) ? "favorited" : ""}`}
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    toggleFavorite(song);
                                }}
                            >
                                <FaHeart />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
