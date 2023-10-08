import { useEffect, useState } from "react";

const dice = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

export interface DiceProps {
  index: number;
  value: number;
  fixed: boolean;
  onClickHandler: (index: number) => void;
}
export const Dice = ({
  index,
  value,
  fixed = false,
  onClickHandler,
}: DiceProps) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.floor(Math.random() * 6 + 1);
      if (newValue !== internalValue) {
        setInternalValue(newValue);
      }
    }, 200);
    setTimeout(() => {
      clearInterval(interval);
      setInternalValue(value);
    }, 1000);
  }, [value]);

  return (
    <div
      className={"dice" + (fixed ? " fixed" : "")}
      onClick={() => onClickHandler(index)}
    >
      {dice[internalValue - 1]}
    </div>
  );
};
