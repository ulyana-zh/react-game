import React, { useState, useEffect } from "react";
import useSound from 'use-sound';
import Button from '@material-ui/core/Button';

import Field from "./components/field/Field";
import initCards from "./cards";
import { CardPreset } from "./components/card/Card";
//import Win from './components/win/Win';
import Menu from './components/menu/Menu';

function App() {
  const buttonSoundUrl = 'assets/sounds/Bulle.wav'

  const [cards, setCards] = useState<any>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [size, setSize] = useState(0);
  const [solved, setSolved] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [play] = useSound(buttonSoundUrl);

  useEffect(() => {
    resizeField();
    setCards(initCards());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeField);
    return () => window.removeEventListener("resize", resizeField);
  }, []);

  useEffect(() => {
    if (solved.length === 16) {  
      setIsStart(false);
    }
  })

  const handleClick = (id: number) => {
    setDisabled(true);
    play();

    if (!flipped.length) {
      setDisabled(false);
      setFlipped([id]);
    } else {
      if (flipped.includes(id)) return;
      setFlipped([id, flipped[0]]);
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id]);
        flipCard();
      } else {
        setTimeout(() => {
          flipCard();
        }, 700);
      }
    }
  };

  const handleClickNewGame = () => {
    setCards(initCards());
    setDisabled(false);
    setFlipped([]);
    setSolved([]);
    setIsStart(true);
    setTimeout(() => {
      setIsStart(false);
    }, 2000)
  }

  const flipCard = () => {
    setFlipped([]);
    setDisabled(false);
  };

  const isMatch = (id: number) => {
    const clickedCard = cards.find((card: CardPreset) => card.id === id);
    const flippedCard = cards.find(
      (card: CardPreset) => flipped[0] === card.id
    );
    return flippedCard.type === clickedCard.type;
  };

  const resizeField = () => {
    setSize(
      Math.min(
        document.documentElement.clientWidth,
        document.documentElement.clientHeight
      )
    );
  };

  return (
    <div>
      <Button variant="contained" color="primary">Menu</Button>
      <Button onClick={handleClickNewGame} variant="contained" color="primary">New Game</Button>
      <Button variant="contained" color="primary">Sound on</Button>
      <div className='field__container'>
      {solved.length === 2 && 
        <Menu />
      }
      <Field
        size={size}
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled={disabled}
        solved={solved}
        isStart={isStart}
      />
      </div>

    </div>
  );
}

export default App;
