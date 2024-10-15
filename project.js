const prompt = require("prompt-sync")();
// END of imports ------------------------------------------------------------
// ******************************************************************************************************
// Globals------------------------------
const ROWS = 3;
const COLS = 3;

SYMBOL_COUNTS = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

// Functions ----------------------------------------------------------------------******************

const getDeposit = () => {
  while (true) {
    const getDepositAmount = prompt("Enter Deposit Amount: ");
    const depositToNumber = parseFloat(getDepositAmount);

    if (isNaN(depositToNumber) || depositToNumber <= 0) {
      console.log("Please Enter a valid deposit amount");
    } else {
      return depositToNumber;
    }
  }
};

const getNumberOfLines = () => {
  while (true) {
    const Lines = prompt("Enter Lines that you wanna bet on (1-3): ");
    const numberOfLines = parseFloat(Lines);

    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Please Enter a valid number of lines");
    } else {
      return numberOfLines;
    }
  }
};

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter bet line: ");
    const betNumber = parseFloat(bet);

    if (isNaN(betNumber) || betNumber <= 0 || betNumber > balance / lines) {
      console.log("Please Enter a valid bet per line");
    } else {
      return betNumber;
    }
  }
};
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOL_COUNTS)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }

  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbol = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbol.length);
      const selectedSymbols = reelSymbol[randomIndex];
      reels[i].push(selectedSymbols);
      reelSymbol.slice(randomIndex, 1);
    }
  }
  return reels;
};

const transpose = (reels) => {
  const transposed = [];

  for (let i = 0; i < ROWS; i++) {
    transposed.push([]);
    for (let j = 0; j < COLS; j++) {
      transposed[i].push(reels[j][i]);
    }
  }
  return transposed;
};

const printRows = (transposedReels) => {
  for (const row of transposedReels) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const checkWinnings = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;
    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }
  return winnings;
};
// END of functions -----------------------------------------------------------------------------
reels = spin();
let balance = getDeposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
const rows = transpose(reels);
printRows(rows);
const winnings = checkWinnings(rows, bet, numberOfLines);
console.log("You won, $" + winnings.toString());
