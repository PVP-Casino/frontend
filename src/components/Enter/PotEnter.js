import React, { useEffect, useState } from 'react';

import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
// asset
import TokenImage from '../TokenImage';
import { Toast } from '../../reducers/utils';
import copy from '../../assets/images/copy.png';
import loading from '../../assets/images/loading.svg';
import qrcode from '../../assets/images/qrcode.png';

//
import TokenSymbol from '../TokenSymbol';
import TabPanel from './TabPanel';
import { EnterBtn } from '../Base/EnterBtn';
import { useStyles } from './potEnter.styles';
import { getBalance, enterJackPot } from '../../reducers/jackpot.slice';
import { ceilDecimal, toUSDFormat } from '../../helpers/utils';

const PotEnter = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { account } = props;
  const [loading, setLoading] = useState(false);
  const { balance } = useSelector((state) => state.jackpot);
  const [enterState, setEnterState] = useState({
    showWalletConnect: true,
    selectedToken: 'AZETA',
    amount: '',
    tokenAddress: '0x52a6080033AC5E0804C798928c47eC1278Cf4B39',
    userTokenBalance: {},
    tokenPrice: 0,
    showTokenSelection: false,
    'enterState.:': 1,
    awaitingApproval: false,
  });
  const { value } = props;

  const setTokenMax = () => {
    setEnterState((prev) => ({ ...prev, amount: ceilDecimal(balance, 4) }));
  };
  const validateEnter = () => {
    if (Number.parseFloat(enterState.amount) > 0) {
      if (Number.parseFloat(enterState.amount) > balance) return false;
      else return true;
    } else return false;
  };
  const enterPot = async () => {
    setLoading(true);
    const valid = validateEnter();
    if (!valid) {
      Toast.fire({ icon: 'warning', title: 'Inputed tokenAmount is exceeded your balance' });
      setLoading(true);
      return;
    }
    dispatch(enterJackPot({ amount: enterState.amount, token: enterState.selectedToken, account }))
      .unwrap()
      .then(() => {
        setLoading(false);
        Toast.fire({ icon: 'success', title: 'Successfully entered jackpot' });
      });
  };

  useEffect(() => {
    if (props.account) dispatch(getBalance(props.account));
  }, []);
  useEffect(() => {
    dispatch(getBalance(props.account));
  }, [props.account]);

  return (
    <>
      <TabPanel value={value} index={0}>
        <Box className={classes.line}>
          <input
            className={classes.input}
            type={'text'}
            placeholder='0.0'
            id={'tokenAmount'}
            value={enterState.amount}
            autoComplete='off'
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                setEnterState((prevState) => ({ ...prevState, amount: e.target.value }));
              }
            }}
          />
          <div className={classes.tokenSelDiv}>
            <span
              className={classes.maxSpan}
              onClick={(e) => {
                setTokenMax();
                e.target.style.background = '#f3ba2c';
                e.target.style.color = '#2d2e36';
                setTimeout(() => {
                  e.target.style.background = '#2d2e36';
                  e.target.style.color = '#f3ba2c';
                }, 1500);
              }}
            >
              max
            </span>
            <div
              className={classes.tokenBtn}
              onClick={(e) => {
                if (!window.__web3.utils.isAddress(props.account)) {
                  props.connectWallet();
                  return;
                }
                e.stopPropagation();
              }}
            >
              <TokenImage token={enterState.selectedToken} className={'Enter_transaction_select_token_img'} />
              <div>
                <TokenSymbol name={enterState.selectedToken} />
              </div>
            </div>
          </div>
        </Box>
        <Box className={classes.line}>
          <div className={classes.balance}>Balance: {toUSDFormat(balance, 4)}</div>
        </Box>
        <Box className={classes.line}>
          {props.account.length > 0 ? (
            <EnterBtn
              onClick={() => {
                enterPot();
              }}
              status={true}
            >
              {enterState.awaitingApproval ? (
                <div>
                  Awaiting approval...{' '}
                  <img className={'rotate'} src='/assets/roulette/spinning.png' alt='Spinning icon' width={20} />
                </div>
              ) : (
                <div>Send to Pot </div>
              )}
            </EnterBtn>
          ) : (
            <EnterBtn
              status={false}
              onClick={() => {
                props.connectWallet();
              }}
            >
              Connect Wallet
            </EnterBtn>
          )}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className={classes.potcontract}>
          <div className={classes.qrcode}>
            <img src={qrcode} alt='qrcode icon' />
          </div>
          <div className={classes.addressDiv}>
            <div>Send tokens to contract:</div>

            <div className={classes.copyImg}>
              <span className={classes.address}>{props.potAddress.toString()} </span>
              <div
                className='potcontract-addinfo_address--img'
                onClick={(e) => {
                  window.navigator.clipboard.writeText(props.potAddress.toString());
                  e.target.parentElement.style.background = '#edf8d8';
                  setTimeout(() => {
                    e.target.parentElement.style.background = '';
                  }, 200);
                }}
              >
                <img src={copy} alt='copy icon' />
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </TabPanel>
    </>
  );
};

export default PotEnter;
