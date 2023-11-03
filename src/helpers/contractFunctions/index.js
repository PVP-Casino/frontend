import Web3 from 'web3';
import { ethers } from 'ethers';
import ERC20Abi from '../../abis/erc20.json';
import gameConfig from '../../config/game.config';

export const useWeb3 = () => window.__web3;
export const useProvider = () => new Web3(window.___provider);

export const getTokenBalance = async (tokenAddress, userAddress) => {
  const web3 = window.__web3;
  const tokenContract = new web3.eth.Contract(ERC20Abi, tokenAddress);
  const balance = await tokenContract.methods.balanceOf(userAddress).call();
  const decimal = await tokenContract.methods.decimals().call();
  return ethers.utils.formatUnits(balance, decimal);
};

export const getBNBBalance = async (userAddress) => {
  const web3 = window.__web3;
  const balance = await web3.eth.getBalance(userAddress);
  return ethers.utils.formatEther(balance);
};

export const approveToken = async (tokenAddress, amount, to, account) => {
  const web3 = new Web3(window.___provider);
  const tokenContract = new web3.eth.Contract(ERC20Abi, tokenAddress);
  const allowanceBN = await tokenContract.methods.allowance(account, to).call();
  const decimals = await tokenContract.methods.decimals().call();
  const allowance = Number(ethers.utils.formatUnits(allowanceBN, decimals));
  console.log({ amount });
  if (allowance < amount) {
    await tokenContract.methods
      .approve(to, ethers.utils.parseUnits(amount.toString(), decimals).toString())
      .send({ from: account });
  }
};
