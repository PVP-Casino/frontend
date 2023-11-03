import './index.css';
import PotAbi from './abis/pot.json';
import PLSPAbi from './abis/PLSP.json';

import App from './App';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import Web3 from 'web3';
import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import coinbaseWalletModule from '@web3-onboard/coinbase';
import walletConnectModule from '@web3-onboard/walletconnect';
import trustModule from '@web3-onboard/trust';

import gameConfig from './config/game.config';

const query_url = gameConfig.serverUrl;
const pot_contract_address = gameConfig.potAddress;
const plsp_contract_address = gameConfig.plqpAddress;
const REACT_APP_PLSP = process.env.REACT_APP_PLSP;

window.__web3 = new Web3(gameConfig.rpcUrl);
console.log(window.__web3);
window.PotContract = new window.__web3.eth.Contract(PotAbi, pot_contract_address);
// window.PLSPContract = new window.__web3.eth.Contract(PLSPAbi, plsp_contract_address);

const apiKey = '505ed458-e9c4-4b6a-ba08-77297d590856';

const injected = injectedModule();
const trust = trustModule();
const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();

const rpcUrl = 'https://zetachain-athens-evm.blockpi.network/v1/rpc/public';
const onboard = Onboard({
  // apiKey,
  wallets: [injected, trust, walletConnect, coinbaseWalletSdk],
  chains: [
    {
      id: '0x1b59',
      token: 'BNB',
      label: 'BSC mainnet',
      rpcUrl,
    },
  ],
  accountCenter: { desktop: { enabled: false }, mobile: { enabled: false } },
  theme: 'dark',
});

export default function Index(props) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showChain, setShowChain] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [page, setPage] = useState(0);
  const [PULSEPOT, SETPULSEPOT] = useState({
    PotContractAddress: '',
    userInfo: {
      account: '',
      code: 'Please connect your wallet',
      [REACT_APP_PLSP]: 0,
      staked: 0,
      referrerEarnings: 0,
      ['p_phase' + REACT_APP_PLSP]: 0,
      BNBP_balance: 0,
      BNBP_stake: 0,
      act_ref_users: 0,
    },
    potInfo: {
      potRound: 0,
      stake: 0,
      totalStake: 0,
      totalUserBalance: 0,
      burn: 0,
      airdrop: 0,
      lottery: 0,
      duration: 180,
      ['p_phase' + REACT_APP_PLSP]: 0,
      p_phase_bonus: 0,
      p_phase_UW: 0,
    },
    tokens: [],
    [REACT_APP_PLSP]: 300000000000,
    BNBP_MARKET_PRICE: 0.0,
    provider: null,
  });

  const clearAccount = () => {
    SETPULSEPOT((prevState) => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        account: '',
      },
    }));
  };

  const updateAccount = async (provider) => {
    try {
      const networkId = await provider.request({
        method: 'eth_chainId',
      });
      if (Number(networkId) != gameConfig.chainID) {
        clearAccount();
        return;
      }

      const accounts = await provider.request({
        method: 'eth_requestAccounts',
      });
      if (accounts[0] == undefined) {
        localStorage.setItem('isWalletConnected', false);
      } else {
        localStorage.setItem('isWalletConnected', true);
      }
      SETPULSEPOT((prevState) => ({
        ...prevState,
        userInfo: {
          ...prevState.userInfo,
          account: accounts[0] == undefined ? '' : accounts[0],
        },
      }));
    } catch (error) {
      console.error(error);
      clearAccount();
    }
  };
  const subscribeProvider = (provider) => {
    if (!provider.on) {
      return;
    }

    localStorage.setItem('isWalletConnected', true);
    provider.on('accountsChanged', (accounts) => {
      updateAccount(provider);
    });

    provider.on('chainChanged', async (networkId) => {
      if (Number(networkId) != gameConfig.chainID) {
        clearAccount();
        if (await switchNetwork(provider)) {
          updateAccount(provider);
        }
      } else {
        updateAccount(provider);
      }
    });

    provider.on('disconnect', (error) => {
      localStorage.setItem('isWalletConnected', false);
    });
  };

  const connectWallet = async () => {
    try {
      const wallets = await onboard.connectWallet();
      const provider = wallets[0].provider;
      const web3 = new Web3(provider);
      window.___provider = provider;
      // Get the accounts
      // updateAccount();
      subscribeProvider(provider);

      if (await switchNetwork(provider)) {
        updateAccount(provider);
      } else {
        clearAccount();
      }
    } catch (error) {
      clearAccount();
    }
  };

  const switchNetwork = async (provider) => {
    // const currentChainId = await getNetworkId();
    const chainId = gameConfig.chainID;
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: Web3.utils.toHex(chainId) }],
      });

      return true;
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code == 4902 || switchError.code == -32603) {
        try {
          await addNetwork(provider);
          return true;
        } catch (error) {
          alert(error);
          return false;
        }
      }
      return false;
    }
  };

  const addNetwork = async (provider) => {
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: Web3.utils.toHex(gameConfig.chainID),
          chainName: gameConfig.chainName,
          nativeCurrency: {
            name: 'aZETA',
            symbol: gameConfig.symbol,
            decimals: 18,
          },
          rpcUrls: [gameConfig.rpcUrl],
          blockExplorerUrls: [gameConfig.explorerUrl],
        },
      ],
    });
  };
  const setDarkMode = (darkMode) => {
    return;
    darkMode = true;
    try {
      if (darkMode == true) {
        document.body.style.backgroundColor = '#2d2e36';
        document.body.style.color = '#c5c5c5';
        setIsDarkMode(true);
        localStorage.setItem('isDarkMode', true);
      } else {
        document.body.style.backgroundColor = '#f7f8fa';
        document.body.style.color = '#303030';
        setIsDarkMode(false);
        localStorage.setItem('isDarkMode', false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    let pageId = window.location.href.split('/')[window.location.href.split('/').length - 1];
    const pathName = window.location.pathname;
    switch (pathName) {
      case '/jackpot':
        setPage(1);
        break;
      case '/powerball/bnbp':
        setPage(16);
        break;
      case '/powerball/volt':
        setPage(16);
        break;
      case '/roulette-room':
        setPage(2);
        break;
      case '/roulette/1':
        setPage(2);
        break;
      case '/roulette/2':
        setPage(2);
        break;
      case '/roulette/3':
        setPage(2);
        break;
      case '/roulette/4':
        setPage(2);
        break;
      case '/roulette/5':
        setPage(2);
        break;
      case '/roulette/6':
        setPage(2);
        break;
      case '/fortunewheel/1':
        setPage(3);
        break;
      case '/fortunewheel/2':
        setPage(3);
        break;
      case '/fortunewheel/3':
        setPage(3);
        break;
      case '/fortunewheel/4':
        setPage(3);
        break;
      case '/fortunewheel/5':
        setPage(3);
        break;
      case '/sports':
        setPage(4);
        break;
      case '/pricecalls':
        setPage(5);
        break;
      case '/swap':
        setPage(6);
        break;
      case '/stake':
        setPage(7);
        break;
      case '/tokenomics':
        setPage(8);
        break;
      case '/about':
        setPage(9);
        break;
      case '/pphase':
        setPage(11);
        break;
      case '/rules':
        setPage(12);
        break;
      case '/tokens':
        setPage(13);
        break;
      case '/referral':
        setPage(14);
        break;
      case '/faqs':
        setPage(15);
        break;
      case '/powerballroom':
        setPage(16);
        break;
      default:
        setPage(0);
        break;
    }
  }, [page]);

  useEffect(() => {
    setDarkMode(localStorage.getItem('isDarkMode') == 'true');
    const getInfo = async () => {
      //Get neccesary information from the database
      let data;
      try {
        const response = await fetch(query_url + '/pot/', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        data = await response.json();
        if (data.error) {
          return;
        }
        SETPULSEPOT((prevState) => ({
          ...prevState,
          tokens: data.tokens,
          potInfo: {
            ...prevState.potInfo,
            ['p_phase' + REACT_APP_PLSP]: data.totalPlspClaimed,
            p_phase_bonus: data.bnbp_bonus,
            p_phase_UW: data.pphase_UW,
          },
          [REACT_APP_PLSP]: parseFloat(
            data.tokens.filter((token) => token.name == REACT_APP_PLSP).map((token) => token.price)
          ).toFixed(2),
        }));
      } catch (error) {
        alert('There was an error connecting to network');
        console.log(error);
      }
    };

    const getPrice = async () => {
      try {
        let data;
        const response = await fetch(
          'https://api.dexscreener.com/latest/dex/tokens/' + '0x4D9927a8Dc4432B93445dA94E4084D292438931F',
          {}
        );
        data = await response.json();
        if (data.pairs)
          SETPULSEPOT((prevState) => ({
            ...prevState,
            BNBP_MARKET_PRICE: parseFloat(data.pairs[0].priceUsd).toFixed(2),
          }));
      } catch (error) {
        console.log('Failed to fetch: ', error);
      }
    };
    getPrice();
    try {
      setTimeout(() => {
        if (localStorage.getItem('isWalletConnected') == 'true') {
          connectWallet();
        } else {
        }
      }, 2000);
    } catch (error) {}
    getInfo();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path='/*'
            element={
              <Provider store={store}>
                <App
                  page={page}
                  setPage={setPage}
                  potAddress={pot_contract_address}
                  isDarkMode={isDarkMode}
                  setDarkMode={setDarkMode}
                  PULSEPOT={PULSEPOT}
                  connectWallet={connectWallet}
                  setShowToken={setShowToken}
                  showToken={showToken}
                  setShowChain={setShowChain}
                  showChain={showChain}
                  setShowMenu={setShowMenu}
                  showMenu={showMenu}
                />
              </Provider>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
