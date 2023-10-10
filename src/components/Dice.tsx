const dice = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

export interface DiceProps {
  value: number;
  selected: boolean;
  lastRoll: boolean;
  onClick: () => void;
}
export const Dice = ({ value, selected, lastRoll, onClick }: DiceProps) => {
  return (
    <div
      className={
        "dice" + (selected ? " selected" : "") + (lastRoll ? " lastRoll" : "")
      }
      onClick={onClick}
    >
      {dice[value]}
    </div>
  );
};
