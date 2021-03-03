import React, { FC } from "react";
import './menu.css';
import SoundSlider from './SoundSlider';

const ModalWindow: FC = () => {
    return (
        <div className="modal-window">
            Congrats!
            <SoundSlider />
        </div>
    )
}

export default ModalWindow;