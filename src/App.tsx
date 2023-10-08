import "./App.css";
import { Dice } from "./components/Dice.tsx";
import { useState } from "react";

function App() {
  const [dicedCount, setDicedCount] = useState(3);
  const [diceValues, setDiceValues] = useState([
    { index: 0, value: 1, fixed: false },
    { index: 1, value: 2, fixed: false },
    { index: 2, value: 3, fixed: false },
    { index: 3, value: 4, fixed: false },
    { index: 4, value: 5, fixed: false },
  ]);

  const resetDice = () => {
    const values = [...diceValues];
    values.forEach((el, index) => {
      el.fixed = false;
      el.value = index + 1;
    });
    setDiceValues(values);
    setDicedCount(3);
    doDice();
  };

  const onClickHandler = (index: number) => {
    const values = [...diceValues];
    values[index].fixed = !values[index].fixed;
    setDiceValues(values);
  };

  const doDice = () => {
    if (dicedCount === 0) {
      resetDice();
      return;
    }

    const values = [...diceValues];
    values.forEach((el) => {
      if (!el.fixed) {
        el.value = Math.floor(Math.random() * 6 + 1);
      }
    });
    setDiceValues(values);
    setDicedCount(dicedCount - 1);
  };

  return (
    <>
      <main>
        {diceValues.map((el, index) => {
          return (
            <Dice
              index={index}
              value={el.value}
              fixed={el.fixed}
              onClickHandler={onClickHandler}
              key={index}
            />
          );
        })}
      </main>
      <button onClick={doDice} className={"action"}>
        {dicedCount === 0 ? "Reset" : "Würfeln! (" + dicedCount + "x)"}
      </button>
    </>
  );
}

export default App;
