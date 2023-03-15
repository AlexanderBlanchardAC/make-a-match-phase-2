import React from 'react';
import "./playingCard.css";
import backCover from "../assets/images/backCover.jpg";

const PlayingCard = ({ playingCard, handleAttempt, disabled, flipped }) => {

   const handleCardClicked = () => {
    if (!disabled){
      handleAttempt(playingCard)
    }
   }

   //cards flipped to front are the two choices a user has clicked on and any pairs found
  return (
    <div className="playingCard" key={playingCard.id}>
    
    <div className={flipped ? "flipped" : ""}>
    {playingCard.image ?  (<img className="front" src={playingCard.image} alt="playing card front" /> ): (<div className='text front'>{playingCard.text}</div>) }
      <img 
        className="back" 
        src={backCover} 
        alt="playing card back cover" 
        onClick={handleCardClicked} /> 
      </div>
    </div>
  )
}

export default PlayingCard;
