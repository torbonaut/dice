type ScoreCategory =
  | "Ones"
  | "Twos"
  | "Threes"
  | "Fours"
  | "Fives"
  | "Sixes"
  | "ThreeOfAKind"
  | "FourOfAKind"
  | "FullHouse"
  | "SmallStraight"
  | "LargeStraight"
  | "Yahtzee"
  | "Chance";

const sumDice = (dice: number[]): number =>
  dice.reduce((sum, num) => sum + num, 0);

export const matchRules = (dice: number[]): [ScoreCategory, number][] => {
  const counts: Record<number, number> = {};
  dice.forEach((num) => {
    counts[num] = (counts[num] || 0) + 1;
  });

  const result: [ScoreCategory, number][] = [];

  // Check for Ones, Twos, Threes, Fours, Fives, Sixes
  for (let i = 1; i <= 6; i++) {
    const count = counts[i] || 0;
    switch (i) {
      case 1:
        result.push([`Ones`, i * count]);
        break;
      case 2:
        result.push([`Twos`, i * count]);
        break;
      case 3:
        result.push([`Threes`, i * count]);
        break;
      case 4:
        result.push([`Fours`, i * count]);
        break;
      case 5:
        result.push([`Fives`, i * count]);
        break;
      case 6:
        result.push([`Sixes`, i * count]);
        break;
    }
  }

  // Check for Three of a Kind
  for (const num in counts) {
    if (counts[num] >= 3) {
      result.push(["ThreeOfAKind", sumDice(dice)]);
      break;
    }
  }

  // Check for Four of a Kind
  for (const num in counts) {
    if (counts[num] >= 4) {
      result.push(["FourOfAKind", sumDice(dice)]);
      break;
    }
  }

  // Check for Full House
  let hasThree = false;
  let hasTwo = false;
  for (const num in counts) {
    if (counts[num] === 3) {
      hasThree = true;
    }
    if (counts[num] === 2) {
      hasTwo = true;
    }
  }
  if (hasThree && hasTwo) {
    result.push(["FullHouse", 25]);
  }

  // Check for Small Straight
  if (
    [1, 2, 3, 4].every((num) => counts[num] >= 1) ||
    [2, 3, 4, 5].every((num) => counts[num] >= 1) ||
    [3, 4, 5, 6].every((num) => counts[num] >= 1)
  ) {
    result.push(["SmallStraight", 30]);
  }

  // Check for Large Straight
  if (
    [1, 2, 3, 4, 5].every((num) => counts[num] >= 1) ||
    [2, 3, 4, 5, 6].every((num) => counts[num] >= 1)
  ) {
    result.push(["LargeStraight", 40]);
  }

  // Check for Yahtzee
  for (const num in counts) {
    if (counts[num] === 5) {
      result.push(["Yahtzee", 50]);
    }
  }

  // Check for Chance
  result.push(["Chance", sumDice(dice)]);

  // Sort by points (highest first)
  result.sort((a, b) => b[1] - a[1]);

  return result;
};
