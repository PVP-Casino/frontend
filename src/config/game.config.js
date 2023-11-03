const gameConfig = {
  test: {
    chain: 'testnet',
    chainName: 'Zeta chain',
    symbol: 'aZETA',
    chainID: 7001,
    chainIDHex: 0x1b59,
    explorerUrl: 'https://zetachain-athens-3.blockscout.com/',
  },
  main: {
    chain: 'mainnet',
    chainName: 'zetachain',
    symbol: 'aZETA',
    tokenName: 'AZETA',
    chainID: 7001,
    chainIDHex: 0x1b59,
    explorerUrl: 'https://zetachain-athens-3.blockscout.com/',
    potAddress: '0xCF9cCe75058463471f74C20fb543bc0E4c0DCD2f',
    plqpAddress: '0x9d978E8b5D6889D5844E49D871bD5B4d510d26fA',
    zetapAddress: '0x52a6080033AC5E0804C798928c47eC1278Cf4B39',

    providerList: ['https://zetachain-athens-evm.blockpi.network/v1/rpc/public'],
  },
};

const config = gameConfig.main;
const randomId = Math.ceil(Math.random() * config.providerList.length) % config.providerList.length;
const rpcUrl = config.providerList[randomId];

const serverUrl = 'https://backend.benzifi.io:4000';
const gasPrice = 6000000000;

const WalletConnectProjectId = '10b10a5847565da6433dfead48226b7a';

export default {
  ...config,
  rpcUrl,
  serverUrl,
  projectId: WalletConnectProjectId,
  gasPrice,
};
