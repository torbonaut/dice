import { useEffect, useState } from "react";

const dice = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

export interface DiceProps {
  value: number;
  selected: boolean;
  onClick: () => void;
}
export const Dice = ({ value, selected = false, onClick }: DiceProps) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.floor(Math.random() * 6);
      setInternalValue(newValue);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setInternalValue(value);
    }, 1000);
  }, [value]);

  return (
    <div className={"dice" + (selected ? " fixed" : "")} onClick={onClick}>
      {dice[internalValue]}
    </div>
  );
};
