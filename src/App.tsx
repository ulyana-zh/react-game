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
  // const [playMusic] = useSound(musicUrl, { volume: musicVolume, loop: true });
  const [background, setBackground] = useStickyState(
    "linear-gradient(to bottom, #0a081d, #191638, #151527')",
    "background"
  );
  const [cardsImage, setCardsImage] = useStickyState(
    "assets/images/1.png",
    "cardsImage"
  );

  let timer: any;

  const [set, setSet] = useStickyState("set1", "cardsSet");
  const [moves, setMoves] = useStickyState(0, "moves");
  const [cards, setCards] = useStickyState(initialStateCarts, "cards");
  const [seconds, setSeconds] = useStickyState(0, "seconds");
  const [isAutoplay, setAutoplay] = useState(false);

  let hours: any = Math.floor((seconds / 3600) % 24);
  let min: any = Math.floor((seconds / 60) % 60);
  let sec: any = Math.floor(seconds % 60);
  if (sec.toString().length === 1) sec = `0${sec}`;
  if (min.toString().length === 1) min = `0${min}`;
  if (hours.toString().length === 1) hours = `0${hours}`;

  const autoplay = () => {
    setSolved([]);
    setAutoplay(true);
    const typesSet = new Set();
    cards.forEach((card: any) => typesSet.add(card.type));
    const types = Array.from(typesSet);
    const result = types.map((type) =>
      cards.filter((card: any) => card.type === type)
    );
    for (let i = 0; i < result.length; i++) {
      timer = setTimeout(() => {
        setSolved((solved: any) => {
          return [...solved, result[i][0].id, result[i][1].id];
        });
      }, 1000 * i);
    }
  };

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
    let timer = setTimeout(() => setSeconds(seconds + 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds, setSeconds]);

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
      setAutoplay(false);
    }
  }, [solved.length]);

  const handleClick = (id: number) => {
    console.log(id)
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
    clearTimeout(timer);
    setAutoplay(false);
    setCards(initCards());
    setMoves(0);
    setSeconds(0);
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
      play();
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
              <div>
                <Button
                  onClick={handleClickMenuButton}
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "10px", marginBottom: '5px' }}
                >
                  Menu
                </Button>
                <Button
                  onClick={handleClickNewGame}
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "10px", marginBottom: '5px' }}
                  disabled={isAutoplay}
                >
                  New Game
                </Button>
                <Button
                  onClick={handle.enter}
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "10px", marginBottom: '5px' }}
                >
                  FullScreen
                </Button>
                <Button
                  onClick={autoplay}
                  variant="contained"
                  color="primary"
                  style={{ marginRight: "10px", marginBottom: "5px" }}
                  disabled={isAutoplay}
                >
                  Autoplay
                </Button>
              </div>
              <div className="controls__bottom">
                <span>Moves: {moves}</span>
                <span>
                  {hours}:{min}:{sec}
                </span>
              </div>
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
              Ctrl+V - Sound and Music off <br />
              Ctrl+B - Sound and Music on
            </p>
          </div>
          <Footer />
        </div>
      </FullScreen>
    </div>
  );
}

export default App;
