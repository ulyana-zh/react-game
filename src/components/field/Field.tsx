import React, { FC, useEffect, useState } from "react";
import Card, { CardPreset } from "../card/Card";
import "./field.css";

export interface FieldPreset {
  size: number;
  cards: CardPreset[];
  flipped: number[];
  handleClick: (id: number) => void;
  disabled: boolean;
  solved: number[];
  isStart: boolean;
  cardSideBackImage: string;
  set: string;
}

const Field: FC<FieldPreset> = ({
  size,
  cards,
  flipped,
  handleClick,
  disabled,
  solved,
  isStart,
  cardSideBackImage,
  set
}) => {
  const [startFlip, setStartFlip] = useState<any>(true);

  useEffect(() => {
    
    setTimeout(() => {
      setStartFlip(false);
    }, 2000) 
  }, []);

  return (
    <div className="field">
      {cards.map((card: CardPreset) => (
        <Card
          id={card.id}
          key={card.id}
          type={card.type}
          width={size / 6.5}
          height={size / 6.5}
          flipped={isStart || startFlip || flipped.includes(card.id)}
          handleClick={handleClick}
          disabled={disabled || solved.includes(card.id)}
          solved={solved.includes(card.id)}
          cardSideBackImage={cardSideBackImage}
          set={set}
        />
      ))}
    </div>
  );
};

export default Field;
