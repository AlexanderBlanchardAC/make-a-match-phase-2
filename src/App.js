import React, { useEffect, useState } from "react";
import "./App.css";
import { FiPlay } from "react-icons/fi";
import bug from "./assets/images/bug.jpg";
import cup from "./assets/images/cup.jpg";
import mop from "./assets/images/mop.jpg";
import pig from "./assets/images/pig.jpg";
import socks from "./assets/images/socks.jpg";
import pins from "./assets/images/pins.jpg";
import backCover from "./assets/images/backCover.jpg";
import PlayingCard from "./components/PlayingCard.jsx";
import useSound from "use-sound";
import correct from "./assets/sounds/correctSound.mp3";
import incorrect from "./assets/sounds/incorrectSounds.mp3";

const cardImgArr = [
  { index: 0, id: 0, image: bug, text: "", matchFound: false }, 
  { index: 1, id: 1, image: cup, text: "", matchFound: false },
  { index: 2, id: 2, image: mop, text: "", matchFound: false },
  { index: 3, id: 3, image: pig, text: "", matchFound: false },
  { index: 4, id: 8, image: socks, text: "", matchFound: false},
  { index: 5, id: 10, image: pins, text: "", matchFound: false}
]

const cardTextArr = [
  { index: 0, id: 4, image: null, text: "bug", matchFound: false },
  { index: 1, id: 5, image: null, text: "cup", matchFound: false },
  { index: 2, id: 6, image: null, text: "mop", matchFound: false },
  { index: 3, id: 7, image: null, text: "pig", matchFound: false },
  { index: 4, id: 9, image: null, text: "socks", matchFound: false},
  { index: 5, id: 11, image: null, text: "pins", matchFound: false}
]

function App() {

  const [ playingCards, setPlayingCards ] = useState([]);
  const [ attempts, setAttempts ] = useState(0);
  const [ cardOne, setCardOne ] = useState(null);
  const [ cardTwo, setCardTwo ] = useState(null);
  const [ disabled, setDisabled ] = useState(false);
  const [playCorrect] = useSound(correct);
  const [playIncorrect] = useSound(incorrect);

  //shuffle playing cards

  const shufflePlayingCards = () => {
    const shuffledPlayingCards = [...cardImgArr, ...cardTextArr]
      .sort(() => Math.random() - 0.5)
      .map((playingCard) => ({ ...playingCard }))
      setCardOne(null)
      setCardTwo(null)
      setPlayingCards(shuffledPlayingCards)
      setAttempts(0)
  }
 

  const handleAttempt = (playingCard) => {
    cardOne ? setCardTwo(playingCard) : setCardOne(playingCard)
    
  }

  useEffect(() => {
    //if card one and two have been chosen
    if(cardOne && cardTwo) {
      //stop more cards from being clicked
      setDisabled(true)
      //if cards one and two match
      if(cardOne.index === cardTwo.index) {
        //play correct sound
        playCorrect()
        //mark paired cards as match found and reset playing cards - will use match found to set flipped status
       setPlayingCards(prevPlayingCards => {
        return prevPlayingCards.map(playingCard => {
          if (playingCard.index === cardOne.index) {
            return { ...playingCard, matched: true }
          } else {
            return playingCard
          }
        })
       })
        resetAttempts()
      } else {
        //play incorrect sound
        playIncorrect()
        setTimeout(() =>{
          resetAttempts()
        }, 3000)
        
      }
    }
  }, [cardOne, cardTwo])


//try next two cards and track number of attempts
  const resetAttempts = () => {
    setCardOne(null)
    setCardTwo(null)
    setAttempts(prevAttempts => prevAttempts + 1)
    setDisabled(false)
  }
  

//start game on page load
  useEffect(() => {
    shufflePlayingCards()
  }, [])


  return (
    <div className="App">
     <h2>Make a Match</h2>
     <button onClick={shufflePlayingCards}><FiPlay /></button>

     <div className="playingCardContainer">
      {playingCards.map(playingCard => (
       <PlayingCard 
        key={playingCard.id} 
        playingCard={playingCard}
        handleAttempt={handleAttempt}
        flipped={playingCard === cardOne || playingCard === cardTwo || playingCard.matched}
        disabled={disabled} 
        />
        ))}
     </div>
     <p className="matchAttempts">Tries: {attempts} </p>
    </div>
  );
}

export default App