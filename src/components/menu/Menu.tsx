import React from "react";
import './menu.css';
import SoundSlider from './SoundSlider';
import BackgroundChoose from './BackgroundChoose';
import { CardsChoose, CardsSetChoose } from './CardsChoose';

const ModalWindow: any = (
    props: any
) => {
    return (
        <div className="modal-window">
            <SoundSlider
            type={'Music'}
            value={props.musicValue}
            handleChange={props.handleChangeMusicValue} />
            <SoundSlider type={'Sound'}
            value={props.soundValue}
            handleChange={props.handleChangeSoundValue} />
            <p className='label'>Background</p>
            <BackgroundChoose handleChange={props.handleChange}/>
            <p className='label'>Cards face</p>
            <CardsChoose handleCardsChoose={props.handleCardsChoose} />
            <p className='label'>Cards set</p>
            <CardsSetChoose handleCardsSetChoose={props.handleCardsSetChoose} />
        </div>
    )
}

export default ModalWindow;