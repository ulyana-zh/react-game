const shuffle = (array: any) => {
  const copyArray = array.slice(0);
  for (let i: number = 0; i < array.length - 1; i++) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let temp = copyArray[i];
    copyArray[i] = copyArray[randomIndex];
    copyArray[randomIndex] = temp;
  }

  return copyArray;
};

const initCards = () => {
  let id = 0;
  let array = [];
  const cards: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];

  for (let i = 0; i < cards.length; i++) {
    array.push({
      id: id++,
      type: cards[i],
    });
    array.push({
      id: id++,
      type: cards[i],
    });
  }

  return shuffle(array);
};

export default initCards;
