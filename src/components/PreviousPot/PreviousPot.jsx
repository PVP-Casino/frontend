import React from 'react';
import { makeStyles } from '@material-ui/core';
import LastPWI from '../../components/lastpotwinnerinfo/LastPWI';
import PotAI from '../../components/potActivityInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    width: `450px`,
    margin: `auto`,
    [theme.breakpoints.down('sm')]: {
      maxWidth: `95%`,
      margin: `auto`,
    },
    [theme.breakpoints.between('lg', 'md')]: {
      width: `370px`,
    },
  },
  potEntries: {
    marginBottom: `20px`,
  },
  postStarted: {
    color: `#acacac`,
    marginTop: `10px`,
    textAlign: `center`,
    fontSize: `12px`,
  },
}));

export default function PreviousPot(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <LastPWI winner={props.winner} BNBPPrice={props.BNBPPrice} />
      <div className={classes.potEntries}>
        <PotAI entries={props.entries} reverse={true} />
      </div>
      <span className={classes.postStarted}>Round #{props.winner.round} has ended</span>
    </div>
  );
}
