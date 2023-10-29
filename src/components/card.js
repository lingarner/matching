import React from "react";
import './card.css';

function Card({card, handleChoice, flipped}){

    const handleClick = () => {
        handleChoice(card)
    }

    return(
        <div className="card" key={card.key}>
            <div className={flipped ? "flipped" : ""}>
            <img src={card.src} className="front" alt="front card" />
            <img src='/images/background.png' className="back" alt="back card" onClick={(handleClick)}/>
            </div>
        </div>
)}

export default Card;