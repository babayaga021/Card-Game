// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
import React, { useState } from "react";
import CardDeck from "./components/CardDeck";
import Scoreboard from "./components/Scoreboard";

const App = () => {
    const [bestScore, setBestScore] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);

    return (
        <div className="App">
            <Scoreboard currentScore={currentScore} bestScore={bestScore} />
            <CardDeck setScore={setCurrentScore} setBestScore={setBestScore} />
        </div>
    );
};

export default App;

import React from "react";

const Scoreboard = ({ currentScore, bestScore }) => {
    return (
        <div className="scoreboard">
            <h2>Current Score: {currentScore}</h2>
            <h2>Best Score: {bestScore}</h2>
        </div>
    );
};

export default Scoreboard;

import React from "react";

const Card = ({ id, image, onClick, text }) => {
    return (
        <div className="card" onClick={() => onClick(id)}>
            <img src={image} alt="card" />
            <p>{text}</p>
        </div>
    );
};

export default Card; 

import React, { useState, useEffect } from "react";
import Card from "./Card";

const CardDeck = ({ setScore, setBestScore }) => {
    const [cards, setCards] = useState([]);
    const [clickedCards, setClickedCards] = useState([]);
    const [currentScore, setCurrentScore] = useState(0);

    useEffect(() => {
        fetch("https://api.example.com/cards") // Replace with the actual API URL
            .then((response) => response.json())
            .then((data) => {
                setCards(data);
            });
    }, []);

    const shuffleCards = () => {
        setCards((prevCards) => [...prevCards].sort(() => Math.random() - 0.5));
    };

    const handleCardClick = (id) => {
        if (clickedCards.includes(id)) {
            setCurrentScore(0);
            setClickedCards([]);
        } else {
            setCurrentScore(currentScore + 1);
            setClickedCards([...clickedCards, id]);

            if (currentScore + 1 > setBestScore) {
                setBestScore(currentScore + 1);
            }
        }

        shuffleCards();
    };

    return (
        <div className="card-deck">
            {cards.map((card) => (
                <Card
                    key={card.id}
                    id={card.id}
                    image={card.image}
                    text={card.text}
                    onClick={handleCardClick}
                />
            ))}
        </div>
    );
};

export default CardDeck;

