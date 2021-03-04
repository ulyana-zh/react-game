import React from "react";
import './menu.css';
import SoundSlider from './SoundSlider';

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
        </div>
    )
}

export default ModalWindow;