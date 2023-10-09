import "./App.css";
import { Dice } from "./components/Dice.tsx";
import { useState } from "react";

const INITIAL_DICE_VALUES = [
  { value: 0, selected: false },
  { value: 0, selected: false },
  { value: 0, selected: false },
  { value: 0, selected: false },
  { value: 0, selected: false },
];

function App() {
  const [dicedCount, setDicedCount] = useState(3);
  const [diceValues, setDiceValues] = useState(INITIAL_DICE_VALUES);

  const onClickHandler = (index: number): void => {
    if (dicedCount === 0 || dicedCount === 3) {
      return;
    }

    const values = [...diceValues];
    values[index].selected = !values[index].selected;
    setDiceValues(values);
  };

  const rollDice = () => {
    const values = [...diceValues];
    values.forEach((el) => {
      if (dicedCount === 3) {
        el.selected = false;
      }

      if (!el.selected) {
        el.value = Math.floor(Math.random() * 6);
      }
    });
    values.sort((a, b) => a.value - b.value);
    console.log(values);
    setDiceValues(values);

    setDicedCount((current) => (current === 1 ? 3 : current - 1));
  };

  return (
    <>
      <main>
        {diceValues.map((el, index) => {
          return (
            <Dice
              value={el.value}
              selected={el.selected}
              onClick={() => onClickHandler(index)}
              key={index}
            />
          );
        })}
      </main>
      <button
        onClick={rollDice}
        className={"action" + (dicedCount === 3 ? " first" : "")}
      >
        {"roll the dice! (" + dicedCount + "x)"}
      </button>
    </>
  );
}
export default App;
