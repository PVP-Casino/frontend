/* eslint-disable react-hooks/rules-of-hooks */
import { ethers } from 'ethers';
import JackpotAbi from '../../abis/pot.json';
import PLQPAbi from '../../abis/plqp.json';
import ERC20Abi from '../../abis/erc20.json';
import config from '../../config/game.config';
import { formatFortuneHistoryItem } from '../../reducers/utils';
import { useProvider, useWeb3 } from './index';
import { toFloat } from '../utils';

export const useJackpotContract = (provider = false) => {
  const web3 = provider ? useProvider() : useWeb3();
  const JackpotContract = new web3.eth.Contract(JackpotAbi, config.potAddress);
  return JackpotContract;
};

export const useAZETAContract = (provider = false) => {
  const web3 = provider ? useProvider() : useWeb3();
  const PLQPContract = new web3.eth.Contract(ERC20Abi, config.zetapAddress);
  return PLQPContract;
};

export const readZTPBalance = async (address) => {
  const PLQPcontract = useAZETAContract();
  const result = await PLQPcontract.methods.balanceOf(address).call();
  const decimal = await PLQPcontract.methods.decimals().call();
  return ethers.utils.formatUnits(result, decimal);
};

export const readAZetaBalance = async (address) => {
  const ethBalance = await window.__web3.eth.getBalance(address);
  console.log({ ethBalance });
  return Number.parseFloat(ethers.utils.formatEther(ethBalance));
};

export const readRoundStatus = async () => {
  const web3 = useWeb3();
  const JackpotContract = useJackpotContract();

  const {
    _entryCount,
    _minEntranceAmount,
    _roundDuration,
    _roundLiveTime,
    _roundStartTime,
    _roundStatus,
    _totalAmount,
  } = await JackpotContract.methods.getRoundStatus().call();
  const blockNumber = await web3.eth.getBlockNumber();

  //   console.log({
  //     _entryCount,
  //     _minEntranceAmount,
  //     _roundDuration,
  //     _roundLiveTime,
  //     _roundStartTime,
  //     _roundStatus,
  //     _totalAmount,
  //     blockNumber,
  //   });

  return {
    entryCount: Number(_entryCount),
    minEntranceAmount: Number(ethers.utils.formatUnits(_minEntranceAmount, 18)),
    roundDuration: Number(_roundDuration),
    roundLiveTime: Number(_roundLiveTime),
    roundStartTime: Number(_roundStartTime),
    roundStatus: Number(_roundStatus),
    totalAmount: Number(ethers.utils.formatUnits(_totalAmount, 18)),
    blockNumber,
  };
};

export const enterJackPotContract = async (amount, token, account) => {
  console.log({ amount, account });
  const jackpotContract = useJackpotContract(true);
  const gas = await jackpotContract.methods
    .enterPot(ethers.utils.parseEther(amount.toString()).toString())
    .estimateGas({ from: account, value: ethers.utils.parseEther(amount.toString()).toString() });

  const res = await jackpotContract.methods.enterPot(ethers.utils.parseEther(amount.toString()).toString()).send({
    from: account,
    value: ethers.utils.parseEther(amount.toString()).toString(),
    gas,
    gasPrice: config.gasPrice,
  });
  return res;
};
