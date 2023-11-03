import PotAI from '../../components/potActivityInfo';

import React from 'react';
import { useStyles } from './index.styles';
export default function CurrentPot(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.entries}>
        <PotAI entries={props.entries} reverse={true} />
      </div>
      <span className={classes.started}>Round #{props.round} has started</span>
    </div>
  );
}
