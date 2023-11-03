import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gameConfig from '../config/game.config';

import { Toast } from './utils';
import {
  readZTPBalance,
  readAZetaBalance,
  enterJackPotContract,
  readRoundStatus,
} from '../helpers/contractFunctions/jackpot';
const query_url = gameConfig.serverUrl;
const P_PHASE_INITIAL_BONUS = Number(process.env.REACT_APP_P_PHASE_INITIAL_BONUS);
const P_PHASE_BONUS_DIVISION = Number(process.env.REACT_APP_P_PHASE_BONUS_DIVISION);

export const getRoundStatus = createAsyncThunk('jackpot/getRoundStatus', async () => {
  const res = await readRoundStatus();
  return res;
});

export const getBalance = createAsyncThunk('jackpot/getBalance', async (userAddress) => {
  // const res = await readZTPBalance(userAddress);
  const res = await readAZetaBalance(userAddress);
  return res;
});

export const getPastJackpotActivities = createAsyncThunk('jackpot/getPastJackpotActivities', async () => {
  let potCount;
  while (true) {
    try {
      potCount = await window.PotContract.methods.roundIds().call();
      break;
    } catch (e) {
      await new Promise((f) => setTimeout(f, 6000));
    }
  }
  console.warn('This is the current round: ', potCount);
  const { winners, entries } = await getPastRoundInfo(parseInt(potCount), potCount > 10 ? 10 : potCount);
  return { entries, winners, round: Number(potCount) };
});

const getPastRoundInfo = async (from, round) => {
  let response = await fetch(query_url + '/pot/winners/' + parseInt(from - round) + '/' + from, {
    method: 'POST',
    headers: {
      Accepted: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const { winners } = await response.json();

  response = await fetch(query_url + '/pot/entries/ ' + parseInt(from - round) + '/' + from, {
    method: 'POST',
    headers: {
      Accepted: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const { entries } = await response.json();
  return { entries, winners };
};

export const enterJackPot = createAsyncThunk('jackpot/enterJackPot', async ({ amount, token, account }) => {
  const res = enterJackPotContract(amount, token, account);

  return res;
});

const initialState = {
  entries: [],
  winners: [],
  entriesLoading: false,
  currentRound: 0,
  roundDuration: 120,
  entryCount: 0,
  minEntranceAmount: 0,
  roundLiveTime: 0,
  roundStartTime: 0,
  roundStatus: 0,
  totalAmount: 0,
  balance: 0,
};

export const jackpotSlice = createSlice({
  name: 'jackpot',
  initialState,
  reducers: {
    addEntries: (state, { payload: entries }) => {
      entries.forEach((entry) => {
        console.log({ entries });
        if (state.entries.findIndex((item) => item.count == entry.returnValues.enteryCount) == -1)
          state.entries.push({
            count: Number(entry.returnValues.entryId),
            round: Number(entry.returnValues.roundId),
            address: entry.returnValues.player,
            token: 'AZETA',
            value: entry.returnValues.amount,
            usdvalue: Number(entry.returnValues.amount),
            txHash: entry.transactionHash,
            block: entry.blockNumber,
          });
      });
    },
    addWinners: (state, { payload: winners }) => {
      winners.forEach((winner) => {
        if (state.winners.findIndex((item) => item.round == winner.returnValues.roundId) == -1)
          state.winners.push({
            amount: winner.returnValues.user,
            amountwon: winner.returnValues.reward,
            block: winner.blockNumber,
            participant: 0,
            plspbonus: 0,
            round: Number(winner.returnValues.roundId),
            txHash: winner.transactionHash,
            value: winner.returnValues.total,
            winner: winner.returnValues.winner.toLowerCase(),
          });
      });
      state.currentRound += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPastJackpotActivities.pending, (state) => {
      state.entriesLoading = true;
    });
    builder.addCase(getPastJackpotActivities.fulfilled, (state, { payload: { entries, winners, round } }) => {
      state.entriesLoading = false;
      entries.forEach((entry) => {
        if (state.entries.findIndex((item) => item.count == entry.count) == -1) state.entries.push(entry);
      });
      winners.forEach((winner) => {
        if (state.winners.findIndex((item) => item.round == winner.round) == -1) state.winners.push(winner);
      });
      state.currentRound = round;
    });
    builder.addCase(getPastJackpotActivities.rejected, (state) => {
      state.entriesLoading = false;
      Toast.fire({
        icon: 'error',
        title: 'Failed to get Jackpot activities.',
      });
    });
    builder.addCase(getRoundStatus.pending, (state) => {});
    builder.addCase(
      getRoundStatus.fulfilled,
      (
        state,
        {
          payload: {
            entryCount,
            minEntranceAmount,
            roundDuration,
            roundLiveTime,
            roundStartTime,
            roundStatus,
            totalAmount,
          },
        }
      ) => {
        state.entryCount = entryCount;
        state.minEntranceAmount = minEntranceAmount;
        state.roundDuration = roundDuration;
        state.roundLiveTime = roundLiveTime;
        state.roundStartTime = roundLiveTime;
        state.roundStatus = roundStatus;
        state.totalAmount = totalAmount;
      }
    );
    builder.addCase(getRoundStatus.rejected, (state, { error }) => {
      console.log({ error });
    });

    builder.addCase(getBalance.pending, (state) => {
      state.balance = 0;
    });

    builder.addCase(getBalance.fulfilled, (state, { payload }) => {
      state.balance = payload;
    });

    builder.addCase(getBalance.rejected, (state, { error }) => {
      console.log({ error });
    });
  },
});

export const { addEntries, addWinners } = jackpotSlice.actions;
export default jackpotSlice.reducer;
