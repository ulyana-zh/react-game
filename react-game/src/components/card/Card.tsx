import React, { FC } from "react";
import "./card.css";

export interface CardPreset {
  id: number;
  key: number;
  type: string;
  width: number;
  height: number;
  flipped: boolean;
  handleClick: (id: number) => void;
  disabled: boolean;
  solved: boolean;
}

const Card: FC<CardPreset> = ({
  disabled,
  width,
  height,
  id,
  type,
  flipped,
  handleClick,
}) => {
  return (
    <div
      className="card"
      style={{
        width: width,
        height: height,
      }}
    >
      <div
        className={`card__wrapper ${flipped ? "flipped" : ""}`}
        onClick={() => (disabled ? null : handleClick(id))}
      >
        <img
          className={"card__side_back"}
          src={"assets/images/back.png"}
          alt="card"
        />
        <img
          className={"card__side_front"}
          src={"assets/images/front.png"}
          alt="card"
        />
      </div>
    </div>
  );
};

export default Card;
