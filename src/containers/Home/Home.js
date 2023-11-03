import React, { useEffect, useRef, useState, useMemo } from 'react';

import { Box, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
// reducer
import { addEntries, addWinners, getPastJackpotActivities, getRoundStatus } from '../../reducers/jackpot.slice';
// constants
import { JACKPOT_EVENTS } from '../../enums';
import gameConfig from '../../config/game.config';
// component
import LoadingSpin from '../../components/Base/Loadingspin';
import UserCPI from '../../components/UserCPI/UserCPI';
import Wheel from '../../components/Wheel/Wheel';
import TokenIP from '../../components/tokeninpot';
import Enter from '../../components/Enter/Enter';
import PotActivityChatContainer from '../../components/PotActivityChatContainer';
// style
import { GameLayoutDiv } from '../../layouts';
import { useStyles } from './index.styles';
import { toFloat } from '../../helpers/utils';

var timeidle = 0,
  isHidden = false;
const REACT_APP_PLSP = process.env.REACT_APP_PLSP;
const spinFor = 16; //, readAfter = 5000 spinAfter = 2000,
const query_url = gameConfig.serverUrl;

export default function Home(props) {
  const dispatch = useDispatch();
  const { entries, winners, currentRound } = useSelector((state) => state.jackpot);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const classes = useStyles(theme);
  const hidden = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => {
      setLoading(true);
    };
  }, []);
  const PotInfo = useMemo(() => {
    const removeDuplicates = (arr) =>
      arr.filter(function (value, index, array) {
        return array.indexOf(value) == index;
      });

    const currentRoundEntries = entries.filter((entry) => entry.round == currentRound);
    const addresses = removeDuplicates(currentRoundEntries.map((entry) => entry.address.toLowerCase()));
    const usdValue = addresses.map((address) => {
      return currentRoundEntries
        .filter((entry) => entry.address.toLowerCase() == address)
        .reduce((total, entry) => {
          return total + toFloat(entry.usdvalue.toString());
        }, 0);
    });

    const getTokenUsdValue = (token) =>
      currentRoundEntries
        .filter((entry) => entry.token == token)
        .reduce((sum, entry) => sum + toFloat(entry.usdvalue.toString()), 0);
    const getTokenValue = (token) =>
      currentRoundEntries.filter((entry) => entry.token == token).reduce((sum, entry) => sum + Number(entry.value), 0);
    const tokenNames = removeDuplicates(currentRoundEntries.map((entry) => entry.token)).sort(
      (a, b) => getTokenUsdValue(b) - getTokenUsdValue(a)
    );
    const tokenValues = tokenNames.map((token) => getTokenValue(token));
    const tokenUsdValues = tokenNames.map((token) => getTokenUsdValue(token));

    const totalUSD = tokenUsdValues.reduce((sum, value) => sum + value, 0);

    return {
      participants: { addresses, usdValue },
      tokensInPot: {
        names: tokenNames,
        values: tokenValues,
        usdvalues: tokenUsdValues,
      },
      currentRoundTotalUsd: totalUSD,
      round: currentRound,
    };
  }, [entries, winners, currentRound]);

  // console.log({ PotInfo });
  const currentRoundRef = useRef(0);
  const PotInfoRef = useRef({});
  const [startTimer, setStartTimer] = useState(true);
  const [BNBPPrice, SetBNBPPrice] = useState(1);
  const [isSpinning, setSpinning] = useState(false);
  const winnerSeenRef = useRef(false);

  const spinWheel = (winningAngle) => {
    setSpinning(true);
    let wheel = document.getElementById('wheel');
    if (!wheel) {
      return;
    }
    let SpinningFor = 10 * 360 + parseFloat(winningAngle);
    wheel.style.WebkitTransitionDuration = spinFor + 's';
    wheel.style.easing = 'linear';

    wheel.style.transform = 'rotate(' + SpinningFor + 'deg)';
  };

  const getWinningAngle = (winner, addresses, usdValue, totalUsdValue) => {
    let winnerAngle = 0;
    const totalValue = Number(totalUsdValue);

    for (let index = 0; index < addresses.length; index++) {
      const value = Number(usdValue[index]);
      winnerAngle += (value * 360) / totalValue;
      if (winner.toLowerCase() == addresses[index].toLowerCase()) {
        const delta = Math.random() * (value - 1) + 0.1;

        winnerAngle -= (delta * 360) / totalValue;
        break;
      }
    }

    return winnerAngle * -1;
  };

  const storeWinners = (events) => {
    if (events.length == 0 || winnerSeenRef.current) {
      return;
    }

    let index = 0;
    let SpinAngle = getWinningAngle(
      events[index].returnValues.winner,
      PotInfoRef.current.participants.addresses,
      PotInfoRef.current.participants.usdValue,
      PotInfoRef.current.currentRoundTotalUsd
    );
    console.log({ events, SpinAngle }, winnerSeenRef.current, PotInfoRef.current);
    if (!isHidden && currentRoundRef.current == Number(events[index].returnValues.roundId)) {
      winnerSeenRef.current = true;
      spinWheel(SpinAngle);
      setTimeout(
        () => {
          if (winners.findIndex((winner) => winner.round == Number(events[index].returnValues.potRound)) == -1) {
            dispatch(addWinners(events));
            dispatch(getRoundStatus());
            setStartTimer(true);
            winnerSeenRef.current = false;
            setSpinning(false);
            const wheel = document.getElementById('wheel');
            if (wheel) {
              wheel.style.WebkitTransitionDuration = null;
              wheel.style.easing = null;
              wheel.style.transform = null;
            }
          }
        },
        isHidden ? 2000 : spinFor * 1000 + 2000
      );
    }
  };
  useEffect(() => {
    currentRoundRef.current = currentRound;
  }, [currentRound]);
  useEffect(() => {
    PotInfoRef.current = PotInfo;
  }, [PotInfo]);

  const getInfo = () => {
    dispatch(getPastJackpotActivities())
      .unwrap()
      .then(() => {
        setLoading(false);
      });
  };

  // SSE
  useEffect(() => {
    const eventSource = new EventSource(`${query_url}/events/jackpot`);
    eventSource.onmessage = (e) => {
      if (e.data.includes('welcome')) {
        getInfo();
      }
      if (e.data.includes('eventName')) {
        const res = JSON.parse(e.data);
        console.log('🚀 ~ file: Home.js ~ useEffect ~ event occurred', res);

        switch (res.eventName) {
          case JACKPOT_EVENTS.EnteredPot:
            dispatch(addEntries(res.entries));
            setTimeout(() => {
              dispatch(getRoundStatus());
            }, 1000);
            break;
          case JACKPOT_EVENTS.InsertWinner:
            storeWinners(res.winners);
            break;
          default:
            break;
        }
      }
    };
    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    const getPrice = async () => {
      try {
        let data;
        const response = await fetch(
          'https://api.dexscreener.com/latest/dex/tokens/0x4D9927a8Dc4432B93445dA94E4084D292438931F',
          {}
        );
        data = await response.json();
        if (data.pairs) SetBNBPPrice(data.pairs[0].priceUsd);
      } catch (error) {
        console.log('Failed to fetch: ', error);
      }
    };
    getPrice();

    try {
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          timeidle = Date.now();
          isHidden = true;
        } else {
          isHidden = false;
          if (Date.now() - timeidle > 60000) {
            getInfo();
          }
        }
      });
    } catch (error) {
      console.log('THERE WAS: ', error);
    }
  }, []);

  // kunkka

  useEffect(() => {
    dispatch(getRoundStatus());
  }, []);

  return loading ? (
    <LoadingSpin />
  ) : (
    <GameLayoutDiv>
      <Box className={classes.jackpot}>
        <Box>
          <UserCPI
            account={props.PULSEPOT.userInfo.account}
            potRound={PotInfo.round}
            userTotalusd={
              PotInfo.participants.usdValue.filter(
                (value, index) =>
                  index == PotInfo.participants.addresses.indexOf(props.PULSEPOT.userInfo.account.toLowerCase())
              )[0]
            }
            potTotalUsdValue={PotInfo.currentRoundTotalUsd}
          />
        </Box>
        <Box className={classes.wheelContainer}>
          <Wheel
            PotInfo={PotInfo}
            entries={entries}
            startTimer={startTimer}
            setStartTimer={setStartTimer}
            isSpinning={isSpinning}
            APP_PLSP={props.PULSEPOT[REACT_APP_PLSP]}
            duration={300}
            timeDiff={0}
            isDarkMode={props.isDarkMode}
          />
        </Box>
        <Box className={classes.tokensInPOT}>
          {PotInfo.tokensInPot.names.map((token, index) => {
            return (
              <TokenIP
                name={token}
                value={entries
                  .filter((entry) => entry.round == PotInfo.round)
                  .filter((entry) => entry.token == token)
                  .reduce((total, entry_) => {
                    return total + parseInt(entry_.value);
                  }, 0)}
                key={index}
                usdvalue={PotInfo.tokensInPot.usdvalues[index]}
                tokens={props.PULSEPOT.tokens}
              />
            );
          })}
        </Box>
      </Box>
      <Box className={classes.enterPotActivity}>
        {!hidden && (
          <Box>
            <Enter
              setShowToken={props.setShowToken}
              showToken={props.showToken}
              potAddress={props.potAddress}
              account={props.PULSEPOT.userInfo.account}
              connectWallet={props.connectWallet}
              tokens={props.PULSEPOT.tokens}
            />
          </Box>
        )}
        <PotActivityChatContainer
          PotInfo={PotInfo}
          entries={entries}
          winners={winners}
          PULSEPOT={props.PULSEPOT}
          BNBPPrice={BNBPPrice}
        />
      </Box>
    </GameLayoutDiv>
  );
}
