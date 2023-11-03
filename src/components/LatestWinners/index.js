import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Skeleton from 'react-loading-skeleton';
import Typography from '@material-ui/core/Typography';
import walletAddressConvert from '../utility/walletAddressConvert';
import { getRouletteNumberColor, toFloat, toUSDFormat } from '../../helpers/utils';

import gameConfig from '../../config/game.config';
import { useNavigate } from 'react-router-dom';
import { TokenList } from '../../constants/powerball';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.css';
const LatestWinners = ({ winners }) => {
  const navigate = useNavigate();
  const { jackpot, roulette, powerball, fortune } = winners;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      checkEmptyObject(jackpot) &&
      checkEmptyObject(roulette) &&
      checkEmptyObject(powerball) &&
      checkEmptyObject(fortune)
    ) {
      setLoading(false);
    } else setLoading(true);
  }, [winners]);

  const checkEmptyObject = (obj) => {
    return Object.keys(obj).length !== 0;
  };
  const winnerList = useMemo(() => {
    return [
      {
        cassinoType: 'jackpot',
        mark: 0 + '%',
        earn: toFloat(jackpot.amountwon, 10),
        address: jackpot.winner,
        txHash: jackpot.txHash,
        url: '/jackpot',
        exist: true,
      },
    ];
  }, [jackpot]);

  const renderStyle = (type) => {
    let style;
    if (type === 'powerball') style = { background: TokenList[0].tokenColor };
    else if (type === 'fortune') {
      if (fortune.nonce === 0) style = { background: 'red', color: 'white' };
      else if (fortune.nonce === 2 || fortune.nonce === 5 || fortune.nonce === 10 || fortune.nonce === 25) {
        style = { background: 'white', color: 'black' };
      } else if (fortune.nonce === 50 || fortune.nonce === 100) {
        style = { background: 'black', color: 'white' };
      }
    }
    return style;
  };

  return (
    <Box className='latest-div'>
      <Box className='latest-winner-title'>
        <Typography variant='body2' style={{ color: 'lightgrey' }}>
          Latest winners
        </Typography>
        <div className='live-badge'>Live</div>
      </Box>

      {
        winnerList.map((item, index) => {
          return (
            <Grid
              key={index}
              className={`winner-item ${item.cassinoType + '-latest-winner'}`}
              onClick={() => item.url && navigate(item.url)}
            >
              <Grid item xs={4} style={{ textAlign: 'center' }} className='winner-game-container'>
                <img src={`assets/gfx-frontpage/${item.cassinoType}-small.png`} alt='cassino' width='30px' />
                <Typography
                  variant='h6'
                  style={{
                    textTransform: 'capitalize',
                    fontSize: '15px',
                    fontWeight: '700',
                    color: 'lightgrey',
                  }}
                >
                  {item.cassinoType}
                </Typography>
              </Grid>
              {loading ? (
                <Box style={{ width: '100%' }}>
                  <Skeleton
                    enableAnimation={true}
                    className='pulse'
                    style={{ marginLeft: '10px' }}
                    baseColor='#7c7d84'
                    highlightColor='#888a95'
                  />
                </Box>
              ) : (
                <>
                  {item.index && <Box className='latest-powerball-index'>#{item.index}</Box>}
                  {item.exist ? (
                    <>
                      {item.mark && (
                        <Grid
                          item
                          xs={3}
                          style={{
                            display: 'flex',
                            textAlign: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Box
                            className={`${item.cassinoType}-mark mark-div ${
                              item.cassinoType == 'roulette' && getRouletteNumberColor(item.mark)
                            }`}
                            style={renderStyle(item.cassinoType)}
                          >
                            {item.mark}
                          </Box>
                        </Grid>
                      )}
                      <Grid item xs={5} className='address-div'>
                        <Typography
                          variant='body2'
                          style={{
                            paddingBottom: '10px',
                            color: 'rgb(121 213 13)',
                            fontWeight: '700',
                            fontSize: '15px',
                          }}
                        >
                          ${toUSDFormat(item.earn, 2)}
                        </Typography>
                        <Box className='wallet-address-div'>
                          <Typography
                            variant='body2'
                            style={{
                              fontSize: '12px',
                              paddingRight: '2px',
                            }}
                          >
                            {walletAddressConvert(item.address || '')}{' '}
                          </Typography>
                          <a
                            href={`${gameConfig.explorerUrl}/tx/${item.txHash}`}
                            target='_blank'
                            onClick={(e) => e.stopPropagation()}
                            rel='noopener noreferrer'
                          >
                            <img src='/assets/bscscan.png' alt='bscscan' className='icon-size-20' />
                          </a>
                        </Box>
                      </Grid>
                    </>
                  ) : (
                    <Grid xs={9} item className='latest-winner-coming-soon-div'>
                      <Typography variant='h4' className='latest-winner-coming-soon'>
                        COMING SOON
                      </Typography>
                    </Grid>
                  )}
                </>
              )}
            </Grid>
          );
        })
        // )
      }
    </Box>
  );
};
export default LatestWinners;
