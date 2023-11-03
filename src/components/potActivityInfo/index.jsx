import React from 'react';
import SinglePE from '../singlepotentry';
import HourGlass from '../hourglass';

import './potAI.css';

import { useStyles } from './index.styles';
export default function PotAI(props) {
  const classes = useStyles();
  return props.entries.length > 0 ? (
    <div className={props.reverse ? classes.reverse : classes.root} animate={props.animate}>
      {props.entries.map((entry_, index) => {
        return <SinglePE entry={entry_} key={index} animate={props.animate} />;
      })}
    </div>
  ) : (
    <div className={classes.waiting}>
      Waiting for players
      <HourGlass />
    </div>
  );
}
