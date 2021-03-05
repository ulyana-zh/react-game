import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import "./index.css";
import Button from "@material-ui/core/Button";
import Footer from "./components/footer/Footer";
import Field from "./components/field/Field";
import initCards from "./cards";
import { CardPreset } from "./components/card/Card";
import Menu from "./components/menu/Menu";
import Win from "./components/win/Win";

export function useStickyState(defaultValue: any, key: any) {
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

function App() {
  const initialStateCarts = initCards();
  const handle = useFullScreenHandle();
  const buttonSoundUrl = "assets/sounds/Bulle.wav";
  const musicUrl = "assets/sounds/music.mp3";
  const [size, setSize] = useState(0);
  const [flipped, setFlipped] = useStickyState([], "flipped");
  const [solved, setSolved] = useStickyState([], "solved");
  const [disabled, setDisabled] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isMenu, setMenu] = useState(false);

  const [musicValue, setMusicValue] = useStickyState(0, "musicValue");
  const [soundValue, setSoundValue] = useStickyState(50, "soundValue");
  const [soundVolume, setSoundVolume] = useStickyState(0.5, "soundVolume");
  const [musicVolume, setMusicVolume] = useStickyState(0.5, "musicVolume");

  const [isMusicOn, setIsMusicOn] = useState(false);
  const [play] = useSound(buttonSoundUrl, { volume: soundVolume });
  const [playMusic] = useSound(musicUrl, { volume: musicVolume });
  const [background, setBackground] = useStickyState(
    "linear-gradient(to bottom, #0a081d, #191638, #151527')",
    "background"
  );
  const [cardsImage, setCardsImage] = useStickyState(
    "assets/images/1.png",
    "cardsImage"
  );
  const [set, setSet] = useStickyState("set1", "cardsSet");
  const [moves, setMoves] = useStickyState(0, "moves");
  const [cards, setCards] = useStickyState(initialStateCarts, "cards");

  const handleChangeMusicValue = (event: any, newValue: any) => {
    setMusicValue(newValue);
    setMusicVolume(newValue / 100);
  };

  const handleChangeSoundValue = (event: any, newValue: any) => {
    setSoundValue(newValue);
    setSoundVolume(newValue / 100);
  };

  const handleChangeBackground = (event: any) => {
    if (event.currentTarget.value === "blue") {
      setBackground("linear-gradient(to bottom, #0a081d, #191638, #151527)");
    }
    if (event.currentTarget.value === "red") {
      setBackground("linear-gradient(to right, #41295a, #2f0743)");
    }
    if (event.currentTarget.value === "yellow") {
      setBackground("linear-gradient(to right, #6441a5, #2a0845)");
    }
  };

  const handleCardsChoose = (event: any) => {
    if (event.currentTarget.value === "neon") {
      setCardsImage("assets/images/react.jpg");
    }
    if (event.currentTarget.value === "react") {
      setCardsImage("assets/images/1.png");
    }
  };

  const handleCardsSetChoose = (event: any) => {
    if (event.currentTarget.value === "space") {
      setBackground(background);
      setSet("set1");
    }
    if (event.currentTarget.value === "fruits") {
      setSet("set2");
    }
  };

  useEffect(() => {
    resizeField();
    setCards(cards);
    document.body.style.background = background;
  });

  useEffect(() => {
    window.addEventListener("resize", resizeField);
    return () => window.removeEventListener("resize", resizeField);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  const handleKeyPress = (event: any) => {
    if (event.code === "KeyZ" && event.ctrlKey) {
      setMenu(!isMenu);
    }
    if (event.code === "KeyX" && event.ctrlKey) {
      handleClickNewGame();
    }
    if (event.code === "KeyC" && event.ctrlKey) {
      handle.enter();
    }
    if (event.code === "KeyV" && event.ctrlKey) {
      handleChangeSoundValue(event, 0);
      handleChangeMusicValue(event, 0);
    }
    if (event.code === "KeyB" && event.ctrlKey) {
      handleChangeSoundValue(event, 50);
      handleChangeMusicValue(event, 50);
    }
  };

  useEffect(() => {
    if (solved.length === 16) {
      setIsStart(false);
    }
  }, [solved.length]);

  const handleClick = (id: number) => {
    setDisabled(true);
    setMoves(moves + 1);
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
    setMoves(0);
    setDisabled(false);
    setFlipped([]);
    setSolved([]);
    setIsStart(true);
    setMenu(false);
    setTimeout(() => {
      setIsStart(false);
    }, 2000);
  };

  const handleClickMenuButton = () => {
    setMenu(!isMenu);
    if (!isMusicOn) {
      playMusic();
      setIsMusicOn(true);
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
    if (document.documentElement.clientWidth < 570) {
      setSize(
        Math.min(
          document.documentElement.clientWidth * 1.3,
          document.documentElement.clientHeight * 1.3
        )
      );
    } else {
      setSize(
        Math.min(
          document.documentElement.clientWidth,
          document.documentElement.clientHeight
        )
      );
    }
  };

  return (
    <div className="game">
      <FullScreen handle={handle}>
        <div className="wrapper">
          <div className="game__field">
            <div className="controls">
              <Button
                onClick={handleClickMenuButton}
                variant="contained"
                color="primary"
              >
                Menu
              </Button>
              <Button
                onClick={handleClickNewGame}
                variant="contained"
                color="primary"
              >
                New Game
              </Button>
              <Button
                onClick={handle.enter}
                variant="contained"
                color="primary"
              >
                FullScreen
              </Button>
              <span>Moves: {moves}</span>
            </div>
            <div className="field__container">
              {isMenu && (
                <Menu
                  musicValue={musicValue}
                  soundValue={soundValue}
                  handleChangeMusicValue={handleChangeMusicValue}
                  handleChangeSoundValue={handleChangeSoundValue}
                  handleChange={handleChangeBackground}
                  handleCardsChoose={handleCardsChoose}
                  handleCardsSetChoose={handleCardsSetChoose}
                />
              )}
              {solved.length === 16 && <Win />}
              <Field
                size={size}
                cards={cards}
                flipped={flipped}
                handleClick={handleClick}
                disabled={disabled}
                solved={solved}
                isStart={isStart}
                cardSideBackImage={cardsImage}
                set={set}
              />
            </div>
            <p className="keys">
              Hot Keys: <br />
              <br />
              Ctrl+Z - Menu <br />
              Ctrl+X - New Game <br />
              Ctrl+C - Full Screen <br />
              Ctrl+V - Sound and Music on <br />
              Ctrl+B - Sound and Music off
            </p>
          </div>
          <Footer />
        </div>
      </FullScreen>
    </div>
  );
}

export default App;
