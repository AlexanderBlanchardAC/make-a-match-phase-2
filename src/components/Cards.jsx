//cards array will not be recreated when component is reevaluated by creating outside of component

import React, { useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
// import EachCard from "./PlayingCard";
import userEvent from "@testing-library/user-event";

const playingCardImgs = [
  { src: "/img/cello1.png", name: "cello", matchFound: false },
  { src: "/img/clarinet1.png", name: "clarinet", matchFound: false },
  { src: "/img/drums1.png", name: "drums", matchFound: false },
  { src: "/img/guitar1.png", name: "guitar", matchFound: false },
  { src: "/img/microphone1.png", name: "microphone", matchFound: false },
  { src: "/img/piano1.png", name: "piano", matchFound: false },
];

const Cards = () => {
  const [playingCards, setPlayingCards] = useState([]);
  const [userAttempts, setUserAttempts] = useState(0);
  const [selection1, setSelection1] = useState(null);
  const [selection2, setSelection2] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //duplicate cards
  const sortPlayingCards = () => {
    const duplicateShuffledPlayingCards = [
      ...playingCardImgs,
      ...playingCardImgs,
    ]
      //negative - items remain in same order, positive odd swaps positions
      .sort(() => Math.random() - 0.5)
      //function for each item in shuffled array
      //map over each individual card, copy properties and add is.
      .map((playingCard) => ({ ...playingCard, id: nanoid() }));
    //when game is restarted, previous selections deleted
    setSelection1(null);
    setSelection2(null);

    setPlayingCards(duplicateShuffledPlayingCards);
    setUserAttempts(0);
  };

  //handle selected card
  const handleCardSelected = (playingCard) => {
    //has no value - must be selection 1 - update selection 1
    //does have value - update selection 2
    //selection1 null?
    selection1 ? setSelection2(playingCard) : setSelection1(playingCard);
    //above check may not update until after we have checked both selections for value, so we cannot compare values within this function.
  };

  //compare two cards
  //useEffect mounts once and then again when a dependency changes( dependencies, selection1 and selection 2)
  useEffect(() => {
    //do both selections have values?
    if (selection1 && selection2) {
      setDisabled(true);
      if (selection1.src === selection2.src) {
        //using previous state of playing card to be updated
        setPlayingCards((prevPlayingCards) => {
          //return a new array
          return prevPlayingCards.map((playingCard) => {
            //if card matches, update matchFound to true
            if (playingCard.src === selection1.src) {
              return { ...playingCard, matchFound: true };
              //if they do not match, return playing card
            } else {
              return playingCard;
            }
          });
        });
        resetUserAttempts();
      } else {
        setTimeout(() => resetUserAttempts(), 1500);
      }
    }
  }, [selection1, selection2]);
  //start game automatically cannot go in this use effect as game would restart every time cards were chosen

  const resetUserAttempts = () => {
    setSelection1(null);
    setSelection2(null);
    setUserAttempts((prevUserAttempts) => prevUserAttempts + 1);
    setDisabled(false);
  };

  //start game automatically
  useEffect(() => {
    sortPlayingCards();
  }, []);

  //map through each card and create a div for each. On each card set matching image and back image.

  //use props to pass playingCard into each card
  return (
    <div>
      <h2>Musical Match</h2>
      <button onClick={sortPlayingCards}>New Game</button>

      <div className="cardContainerGrid">
        {/* {playingCards.map((playingCard) => (
          // <EachCard
          //   key={playingCard.id}
          //   playingCard={playingCard}
          //   handleCardSelected={handleCardSelected}
          //   flipped={
          //     playingCard === selection1 ||
          //     playingCard === selection2 ||
          //     playingCard.matchFound
          //   }
          //   disabled={disabled}
          // />
        ))} */}
      </div>
      <p>Tries: {userAttempts}</p>
    </div>
  );
};

export default Cards;