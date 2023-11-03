export const defaultFortuneInfo = {
  minBet: 0,
  maxBet: 0,
  profit: 0,
  liquidity: 0,
  owner: '',
  tokenAddress: '',
  tokenName: '',
  fee: 0,
  tokenId: 0,
  initialMaxBet: 0,
  price: 0,
};

export const wheelUnits = [
  {
    type: 'lose',
    units: [
      { index: 1, from: 0, to: 5499 },
      { index: 3, from: 5500, to: 7499 },
      { index: 5, from: 7500, to: 9499 },
      { index: 7, from: 9500, to: 11499 },
      { index: 9, from: 11500, to: 13499 },
      { index: 11, from: 13500, to: 15499 },
      { index: 13, from: 15500, to: 20999 },
      { index: 15, from: 21000, to: 26499 },
      { index: 17, from: 26500, to: 28499 },
      { index: 19, from: 28500, to: 30499 },
      { index: 21, from: 30500, to: 32499 },
      { index: 23, from: 32500, to: 34499 },
      { index: 25, from: 34500, to: 39999 },
      { index: 27, from: 40000, to: 45499 },
      { index: 29, from: 45500, to: 47499 },
      { index: 31, from: 47500, to: 49499 },
      { index: 33, from: 49500, to: 51499 },
      { index: 35, from: 51500, to: 53499 },
      { index: 37, from: 53500, to: 55499 },
      { index: 39, from: 55500, to: 60999 },
      { index: 41, from: 61000, to: 66499 },
      { index: 43, from: 66500, to: 68499 },
      { index: 45, from: 68500, to: 70499 },
      { index: 47, from: 70500, to: 72499 },
      { index: 49, from: 72500, to: 74499 },
      { index: 51, from: 74500, to: 80000 },
    ],
  },
  {
    type: '2x',
    units: [
      { from: 80001, to: 81241, index: 4 },
      { from: 81242, to: 82482, index: 10 },
      { from: 82483, to: 83723, index: 16 },
      { from: 83724, to: 84964, index: 18 },
      { from: 84965, to: 86205, index: 22 },
      { from: 86206, to: 87446, index: 30 },
      { from: 87447, to: 88687, index: 38 },
      { from: 88688, to: 89928, index: 46 },
      { from: 89929, to: 91173, index: 48 },
    ],
  },
  {
    type: '5x',
    units: [
      { from: 91174, to: 92807, index: 8 },
      { from: 92808, to: 94441, index: 20 },
      { from: 94442, to: 96075, index: 32 },
      { from: 96076, to: 97709, index: 44 },
      { from: 97710, to: 99344, index: 50 },
    ],
  },
  {
    type: '10x',
    units: [
      { from: 99345, to: 99469, index: 2 },
      { from: 99470, to: 99594, index: 28 },
      { from: 99595, to: 99719, index: 38 },
      { from: 99720, to: 99844, index: 44 },
    ],
  },
  {
    type: '25x',
    units: [
      { from: 99845, to: 99869, index: 6 },
      { from: 99870, to: 99894, index: 12 },
      { from: 99895, to: 99919, index: 26 },
      { from: 99920, to: 99944, index: 36 },
    ],
  },
  {
    type: '50x',
    units: [
      { index: 26, from: 99945, to: 99970 },
      { index: 52, from: 99971, to: 99994 },
    ],
  },
  { type: '100x', units: [{ index: 14, from: 99995, to: 99999 }] },
  { type: '1000x', units: [{ index: 40, from: 100000, to: 100000 }] },
];

export const changeEvenLoses = [1, 15, 27, 41];
export const changeOddLoses = [13, 25, 39];
