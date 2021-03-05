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
  cardSideBackImage: string;
  set: string;
}

const Card: FC<CardPreset> = (props: any) => {
  return (
    <div
      className="card"
      style={{
        width: props.width,
        height: props.height,
      }}
    >
      <div
        className={`card__wrapper ${props.flipped || props.solved ? "flipped" : ""}`}
        onClick={() => (props.disabled ? null : props.handleClick(props.id))}
      > 
        <img
          className={"card__side_back"}
          src={props.cardSideBackImage}
          alt="card"
        />
        <img
          className={"card__side_front"}
          src={`assets/images/${props.set}/${props.type}.jpg`}
          alt="card"
        />
      </div>
    </div>
  );
};

export default Card;
