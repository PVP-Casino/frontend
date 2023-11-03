import { ethers } from 'ethers';
import { wheelUnits } from '../constants/fortune';
function isInBet(number, bet) {
  if (number == 0) {
    if (bet.betType == 5) {
      return bet.number == 0;
    } else {
      return false;
    }
  }

  if (bet.betType == 5) {
    return bet.number == number; /* bet on number */
  } else if (bet.betType == 4) {
    if (bet.number == 0) return number % 2 == 0; /* bet on even */
    if (bet.number == 1) return number % 2 == 1; /* bet on odd */
  } else if (bet.betType == 3) {
    if (bet.number == 0) return number <= 18; /* bet on low 18s */
    if (bet.number == 1) return number >= 19; /* bet on high 18s */
  } else if (bet.betType == 2) {
    if (bet.number == 0) return number <= 12; /* bet on 1st dozen */
    if (bet.number == 1) return number > 12 && number <= 24; /* bet on 2nd dozen */
    if (bet.number == 2) return number > 24; /* bet on 3rd dozen */
  } else if (bet.betType == 1) {
    if (bet.number == 0) return number % 3 == 0; /* bet on top row */
    if (bet.number == 1) return number % 3 == 1; /* bet on middle row */
    if (bet.number == 2) return number % 3 == 2; /* bet on bottom row */
  } else if (bet.betType == 0) {
    if (bet.number == 0) {
      /* bet on black */
      if (number <= 10 || (number >= 19 && number <= 28)) {
        return number % 2 == 0;
      } else {
        return number % 2 == 1;
      }
    } else {
      /* bet on red */
      if (number <= 10 || (number >= 19 && number <= 28)) {
        return number % 2 == 1;
      } else {
        return number % 2 == 0;
      }
    }
  }
  return false;
}

export const getMaximumReward = (bets) => {
  let maxReward = 0;
  const betRewards = [2, 3, 3, 2, 2, 36];

  for (let i = 0; i < 38; i++) {
    let reward = 0;

    for (let j = 0; j < bets.length; j++) {
      if (isInBet(i, bets[j])) {
        reward += bets[j].amount * betRewards[bets[j].betType];
      }
    }
    if (maxReward < reward) {
      maxReward = reward;
    }
  }
  return maxReward;
};

export const ceilDecimal = (value, decimal) => {
  const k = Math.pow(10, decimal);
  return Math.ceil(value * k) / k;
};

export const getRouletteNumberColor = (n) => {
  if (n == 0 || n == 37) return 'green';
  if (n <= 10 || (n >= 19 && n <= 28)) {
    return n % 2 == 0 ? 'black' : 'red';
  } else {
    return n % 2 == 1 ? 'black' : 'red';
  }
};

export const getFortuneNumberColor = (n) => {
  if (n === '0 x') return 'red';
  if (n === '50x' || n === '100x' || n === '1000x') return 'black';
  return 'white';
};
/**
 *
 * @param {array} bets
 * @returns positive if given bets are restricted
 * 1 - can't bet black and red together
 * 2 - can't bet 3 rows together
 * 3 - can't bet 3 sections together
 * 4 - can't bet 2 halfs together
 * 5 - can't bet even and odd together
 * 0 - valid bets
 */
export const isRestrictedBet = (bets) => {
  const betCount = [0, 0, 0, 0, 0];

  for (let i = 0; i < bets.length; i++) {
    if (bets[i].betType < 5) {
      betCount[bets[i].betType]++;
    }
  }
  if (betCount[0] >= 2) return 1;
  if (betCount[1] >= 3) return 2;
  if (betCount[2] >= 3) return 3;
  if (betCount[3] >= 2) return 4;
  if (betCount[4] >= 2) return 5;
  return 0;
};

export const toUSDFormat = (number, digit = 2) => {
  if (number)
    return number.toLocaleString('en-US', {
      maximumFractionDigits: digit,
    });
  return 0;
};

export const convertFortuneNumber = (nonce) => {
  for (let i = 0; i < wheelUnits.length; i++) {
    const unitType = wheelUnits[i];
    for (let j = 0; j < unitType.units.length; j++) {
      const unitRange = unitType.units[j];
      if (nonce >= unitRange.from && nonce <= unitRange.to) {
        if (unitType.type == 'lose') return '0 x';
        else return unitType.type;
      }
    }
  }
};

export const allowOnlyNumber = (e) => {
  if ((e.keyCode >= 65 && e.keyCode <= 97) || e.keyCode == 189) {
    e.preventDefault();
  }
};

export const toFloat = (number, units = 18) => {
  if (number) return Number(ethers.utils.formatUnits(number, units));
  return 0;
};

export const getTotalBetAmount = (bets) => {
  return bets.reduce((sum, bet) => sum + bet.amount, 0);
};

export const convertTime = (currentTime, roundDuration, roundLiveTime) => {
  let day, hour, min, sec;
  const timeLeft = roundDuration - (currentTime - parseInt(roundLiveTime));
  // console.log(timeLeft);
  if (roundLiveTime > 0) {
    if (timeLeft >= 0) {
      day = Math.floor(timeLeft / (24 * 3600));

      hour = Math.floor((timeLeft % (24 * 3600)) / 3600);
      min = Math.floor((timeLeft % 3600) / 60);
      sec = Math.floor(timeLeft % 60);
    } else if (timeLeft < 0) {
      min = 0;
      hour = 0;
      sec = 0;
    } else {
      day = Math.floor(timeLeft / (24 * 3600));
      hour = Math.floor((timeLeft % (24 * 3600)) / 3600);
      min = Math.floor((timeLeft % 3600) / 60);
      sec = Math.floor((timeLeft % 3600) % 60);
    }
  } else {
    day = Math.floor(roundDuration / (24 * 3600));
    hour = Math.floor((roundDuration % (24 * 3600)) / 3600);
    min = Math.floor((roundDuration % 3600) / 60);
    sec = Math.floor((roundDuration % 3600) % 60);
  }
  if (day > 1) {
    return `${day} day${day > 1 ? 's' : ''} ${hour} hour${hour > 1 ? 's' : ''}`;
  } else if (day === 1) {
    return `${day} day ${hour} hour${hour > 1 ? 's' : ''}`;
  } else if (hour > 0) {
    return `${hour} hour${hour > 1 ? 's' : ''} ${min} min${min > 1 ? 's' : ''}`;
  } else if (min >= 0) {
    return `${min} min${min > 1 ? 's' : ''} ${sec} sec${sec > 1 ? 's' : ''}`;
  } else {
    return ` ${sec}sec`;
  }
};

export const preFillZero = (value, count) => {
  let result = value;
  for (let i = count - 1; i > 0; i--) {
    if (Number(result) < Math.pow(10, i)) {
      result = `0${result}`;
    }
  }
  return result;
};
