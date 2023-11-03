import React from 'react';
import TokenImage from '../../components/TokenImage';
import { useStyles } from './index.styles';
// import './singleTokenWhitelist.css';
const SingleTokenWhitelist = (props) => {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      onClick={() => {
        props.setShowToken(false);
        props.setEnterState((preState) => ({
          ...preState,
          selectedToken: props.token,
          showTokenSelection: false,
          tokenAddress: props.tokens
            .filter((token) => {
              return token.name == props.token;
            })
            .map((token) => {
              return token.address;
            })[0],
          tokenPrice: props.tokens
            .filter((token) => {
              return token.name == props.token;
            })
            .map((token) => {
              return token.price;
            })[0],
        }));
      }}
    >
      <TokenImage token={props.token} width={30} className={classes.img} />
      <div className={classes.token}>
        {
          props.tokens
            .filter((token) => {
              return token.name == props.token;
            })
            .map((token) => {
              return token.symbol;
            })[0]
        }
      </div>
      <span className={classes.balance}>{parseFloat(parseFloat(props.balance).toFixed(5))}</span>
    </div>
  );
};

export default SingleTokenWhitelist;
