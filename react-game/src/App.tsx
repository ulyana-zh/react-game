import React, { useState, useEffect } from "react";
import Field from "./components/field/Field";
import initCards from "./cards";
import { CardPreset } from "./components/card/Card";

function App() {
  const [cards, setCards] = useState<any>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [size, setSize] = useState(0);
  const [solved, setSolved] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    resizeField();
    setCards(initCards());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeField);
    return () => window.removeEventListener("resize", resizeField);
  }, []);

  const handleClick = (id: number) => {
    setDisabled(true);

    if (!flipped.length) {
      setFlipped([id]);
      setDisabled(false);
    } else {
      if (flipped.includes(id)) return;
      setFlipped([id, flipped[0]]);
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id]);
        flipCard();
      } else {
        setTimeout(() => {
          flipCard();
        }, 1000);
      }
    }
  };

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
      {console.log(cards)}
      <Field
        size={size}
        cards={cards}
        flipped={flipped}
        handleClick={handleClick}
        disabled={disabled}
        solved={solved}
      />
    </div>
  );
}

export default App;
