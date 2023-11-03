import React from 'react';
import SingleTokenWhitelist from '../../components/singleTokenWhitelist2';
import { useStyles } from './index.styles';
// import './tokenSelection.css';
const TokenSelection = (props) => {
  const classes = useStyles();
  const { BNBPPrice, tokens, _tokens, setShowToken, setEnterState, showToken } = props;
  return (
    <div className={showToken ? classes.root : classes.none}>
      <div
        className={classes.header}
        onClick={() => {
          window.location.href = 'https://bnbpot.io/swap';
        }}
      >
        <div className={classes.tokenSelection_10P}>
          <div>{30 > BNBPPrice ? ((30 / BNBPPrice) * 100 - 100).toFixed(0) : '10'}%</div>
          <div>Premium</div>
        </div>

        <div className={classes.tokenSelection_10P_}>Is your token not supported? Swap to BNBP for a premium</div>
      </div>

      <div>
        {Object.keys(tokens)
          .map((token) => {
            return token;
          })
          .sort((token2, token1) => {
            return parseFloat(tokens[token1]) - parseFloat(tokens[token2]);
          })
          .map((token, index) => {
            return (
              <SingleTokenWhitelist
                setShowToken={setShowToken}
                tokens={_tokens}
                balance={tokens[token]}
                token={token}
                key={index}
                setEnterState={setEnterState}
              />
            );
          })}
      </div>
    </div>
  );
};
export default TokenSelection;
