import React, { FC } from "react";
import Card, { CardPreset } from "../card/Card";
import "./field.css";

export interface FieldPreset {
  size: number;
  cards: CardPreset[];
  flipped: number[];
  handleClick: (id: number) => void;
  disabled: boolean;
  solved: number[];
}

const Field: FC<FieldPreset> = ({
  size,
  cards,
  flipped,
  handleClick,
  disabled,
  solved,
}) => {
  return (
    <div className="field">
      {cards.map((card: CardPreset) => (
        <Card
          id={card.id}
          key={card.id}
          type={card.type}
          width={size / 5.5}
          height={size / 5.5}
          flipped={flipped.includes(card.id)}
          handleClick={handleClick}
          disabled={disabled || solved.includes(card.id)}
          solved={solved.includes(card.id)}
        />
      ))}
    </div>
  );
};

export default Field;
