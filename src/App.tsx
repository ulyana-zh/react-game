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

function App() {
  const handle = useFullScreenHandle();
  const buttonSoundUrl = "assets/sounds/Bulle.wav";
  const musicUrl = "assets/sounds/music.mp3";

  const [cards, setCards] = useState<any>([]);
  const [size, setSize] = useState(0);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isMenu, setMenu] = useState(false);
  const [moves, setMoves] = useState(0);
  const [musicValue, setMusicValue] = useState<number>(0);
  const [soundValue, setSoundValue] = useState<number>(50);
  const [soundVolume, setSoundVolume] = useState(0.5);
  const [musicVolume, setMusicVolume] = useState(0);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [play] = useSound(buttonSoundUrl, { volume: soundVolume });
  const [playMusic] = useSound(musicUrl, { volume: musicVolume });
  //const [playMusic] = useSound(musicUrl, { volume: musicVolume, loop: true });
  const [background, setBackground] = useState(() => {
    document.body.style.background =
      "linear-gradient(to bottom, #0a081d, #191638, #151527)";
  });
  const [cardsImage, setCardsImage] = useState("assets/images/1.png");
  const [set, setSet] = useState("set1");

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
      setBackground(() => {
        document.body.style.background =
          "linear-gradient(to bottom, #0a081d, #191638, #151527)";
      });
    }
    if (event.currentTarget.value === "red") {
      setBackground(() => {
        document.body.style.background =
          "linear-gradient(to right, #41295a, #2f0743)";
      });
    }
    if (event.currentTarget.value === "yellow") {
      setBackground(() => {
        document.body.style.background =
          "linear-gradient(to right, #6441a5, #2a0845)";
      });
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
    setCards(initCards());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeField);
    return () => window.removeEventListener("resize", resizeField);
  }, []);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  });

  const handleKeyPress = (event: any) => {
    if (event.key === "1") {
      setMenu(!isMenu);
    }
    if (event.key === "2") {
      handleClickNewGame();
    }
    if (event.key === "3") {
      handle.enter();
    }
    if (event.key === "s") {
      handleChangeSoundValue(event, 0);
      handleChangeMusicValue(event, 0);
    }
    if (event.key === "w") {
      handleChangeSoundValue(event, 50);
      handleChangeMusicValue(event, 50);
      if (!isMusicOn) {
        playMusic();
        setIsMusicOn(true);
      }
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
              1 - Menu <br />
              2 - New Game <br />
              3 - Full Screen <br />
              w - Sound and Music on <br />s - Sound and Music off
            </p>
          </div>
          <Footer />
        </div>
      </FullScreen>
    </div>
  );
}

export default App;
