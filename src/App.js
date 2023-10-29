import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './components/card.js'

// create an array of images outside the components
const cardImages = [
  { "src": "/images/duck-1.png", matched: false},
  { "src": "/images/duck-2.png", matched: false},
  { "src": "/images/duck-3.png", matched: false},
  { "src": "/images/duck-4.png", matched: false},
  { "src": "/images/duck-5.png", matched: false},
  { "src": "/images/duck-6.png", matched: false}

]


function App() {
  
  // Use setCards to update cards from an empty array
  // allowss us to store shuffled cards per game
  const [cards, setCards] = useState([])

  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  // handle a choice
  const handleChoice = (card) => {
    // decideing whether to updates choiceone or choicetwo
    if(choiceOne == null){
      setChoiceOne(card);
    } else {
      setChoiceTwo(card) 
    }   
  }

  // useEffect
  useEffect(() => {
    if(choiceOne && choiceTwo){

      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
            return prevCards.map(card => {
              if(card.src === choiceOne.src || card.src === choiceTwo.src ){
                return {...card, matched: true};
              } else{
                return card
              }
            })
        })
        resetChoices()
      } else {
        resetChoices()
      }
    }

  }, [choiceOne, choiceTwo])



  // reset choice
  const resetChoices = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
  }
  
  // shuffle cards
  const shuffleCards = () => {
    // an array with two cardImage arrays inside
    const shuffledCards = [...cardImages, ...cardImages]
      // Custom shuffle: Assigns random values and sorts based on comparison to 0.5
      .sort(() => Math.random() - 0.5)
      // adds a random id to each object in each element
      .map((card) => ({...card, id: Math.random()}))

      // update cards variable
      setCards(shuffledCards)
  }
console.log(cards)
  return(
    <div className="App"> 
      <h1>Ducky Matching</h1>
      <button onClick={shuffleCards}> New Game</button>
      <div className="card-grid">
        {
          cards.map(card => (
            <Card 
            card = {card} 
            key = {card.id} 
            handleChoice={handleChoice}
            //true or false based on these three things
            flipped={card === choiceOne || card === choiceTwo || card.matched} 
            />
          ))
        }          
      </div>
    </div>
  )
}

export {App};
