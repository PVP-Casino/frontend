import './faqs.css';
import React, { useState } from 'react';
import arrow_down from '../../assets/images/down-arrow.png';
import arrow_left from '../../assets/images/left-arrow.png';
export default function Faqs() {
  const [faqs, setFaqs] = useState({
    1: {
      question: 'What is Decentralized PVP ?',
      answer:
        'Player Vs Player. This means that ZETAPlay is not a house that you  can play against. It’s a series of contracts where players can compete against each other in a decentralized and trustless manner,  at a very competitive  3% fee.  This removes counterparty risk and censorship.',
      opened: true,
    },

    2: {
      question: 'What tokens can be used with ZETAPlay?',
      answer:
        'ZETAPlay will whitelist a series of ZRC20 tokens that will have sufficient liquidity on Uniswap. We want to make sure that our users are able to swap their winnings for any token of their choice on Uniswap. We expect 30 to 100 tokens to be whitelisted on ZETAPlay at any given point of time. Certain bridged-in tokens will also be whitelisted on ZETAPlay.',
      opened: false,
    },
    // 3: {
    //   question: 'How is the winner decided?',
    //   answer:
    //     'The contract takes a series of data from the block height, the hash, the timestamp and the current price of BNB to generate randomness. For every $5 a user sends to the pot, the user gets allotted a number. The more numbers a user has, the higher is their chance to own the winning number.',
    //   opened: false,
    // },
    4: {
      question: 'What is ZTP staking ?',
      answer:
        'Only staked ZTP tokens are qualified for airdrops and lottery participation. All stakes are 100 days long. When a stake has served its 100 days, it can be unstaked at any time. A 100% matured stake, will stay staked and continue to earn rewards',
      opened: false,
    },
    // ZTP_MARKET_PRICE: {
    //   question: 'What is the ZETAPlay Faucet?',
    //   answer:
    //     'All users can claim 0.01 BNB per address, one time. Users simply need to enter their address and click the “Claim” button. A maximum of 1,000 addresses can free claim each day. ZETAPlay offers this faucet to help the users who own PRC20s but didn’t sacrifice for PulseChain.',
    //   opened: false,
    // },
    6: {
      question: 'What is the participation phase?',
      answer:
        'After Mainnet launch, all pots will have 1 ZTP added to the pot as a bonus. On top of that, 1 ZTP will be added to the pot for every 100 USD value added to the pot. The winner takes home these ZTP tokens as a bonus along with the tokens won from the pot. This will go on until 100,000 ZTP tokens have been given out in the form of bonuses. All ZTP earnings from the participation phase will be distributed at the end of the phase when all 100,000 tokens have been claimed.',
      opened: false,
    },
    7: {
      question: 'How does the $30 ZTP floor work ?',
      answer:
        'The ZETAPlay contract has a minimum value of $30 per ZTP hardcoded into the contract. ZTP is the only token with a minimum value in the pot. All other ZRC20s follow Uniswap market price every 3 minutes. If the market price of ZTP goes above $30, the ZETAPlay contract follows the price up.',
      opened: false,
    },
    8: {
      question: 'What is the 10% feedback loop ?',
      answer:
        'ZETAPlay updates the token prices every 3 minutes. When the price of ZTP is $30 or more, the contract adds 10% to the ZTP price in the pot. This helps holders of tax tokens to swap into ZTP without losing betting value.',
      opened: false,
    },
    9: {
      question: 'What is the buy and burn ?',
      answer:
        'Every 24 hours the contract will use 20% of the accumulated fees to market buy ZTP. All ZTP are then automatically sent to the burn address.',
      opened: false,
    },
    10: {
      question: 'How does the monthly lottery work ?',
      answer:
        '5% of accumulated fees are reserved for a weekly lottery for ZTP holders. Holding 1 ZTP grants users 1 ticket in the lottery. Holding ZTP works as a passive lottery subscription for the holders. Every 7 days the contract will pick a random lottery winner, and the accrued value will be airdropped in ZTP tokens to the winning wallet.',
      opened: false,
    },
    11: {
      question: 'When will I get airdrops from holding ZTP ?',
      answer:
        'Every 30 days, 75% of the total accumulated fees is airdropped to ZTP holders. The contract will buy ZTP on the market from tokens accrued, and airdrop it back  to ZTP holders.',
      opened: false,
    },
    12: {
      question: 'How does the ZTP reduced fee work ?',
      answer:
        'ZETAPlay charges the pot winner a service fee of 3% of the total pot value. However, holding ZTP tokens reduces this fee. For every 1 ZTP the winner holds in their wallet, 0.5% of the total fee is laid off. For instance, holding 50 ZTP reduces the fee by 25% i.e. Holding 100 ZTP reduces the fee to 1.5% lowest possible rate.',
      opened: false,
    },
    13: {
      question: 'How is ZTP token distribution?',
      answer:
        'Total supply 1,000,000 ZTP. ●	800, 000 ZTP  to early sacrificers ●	100, 000 ZTP   to Participation phase wallet ●	100, 000 ZTP   to Team wallet',
      opened: false,
    },
  });
  return (
    <div className='card Page Faqs '>
      <div className='page_title  underline-yellow'>FAQ</div>
      <div className='page_content scrollbar'>
        {Object.keys(faqs).map((key, index) => {
          return (
            <div key={index} className='Faqs_ques_ans'>
              <div className={faqs[key].opened ? 'Faqs_ques Faqs_ques_open' : 'Faqs_ques'}>
                <div
                  className='Faqs_ques_arrow'
                  onClick={(e) => {
                    setFaqs((prevState) => ({
                      ...prevState,
                      [key]: {
                        ...prevState[key],
                        opened: !prevState[key]['opened'],
                      },
                    }));
                  }}
                >
                  <img src={faqs[key].opened ? arrow_down : arrow_left} alt='arrow icon' />
                </div>
                <div
                  className='Faqs_question_open'
                  onClick={(e) => {
                    setFaqs((prevState) => ({
                      ...prevState,
                      [key]: {
                        ...prevState[key],
                        opened: !prevState[key]['opened'],
                      },
                    }));
                  }}
                >
                  {faqs[key].question}
                </div>
              </div>
              {faqs[key].opened ? <div className='Faqs_ans'>{faqs[key].answer}</div> : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
}
