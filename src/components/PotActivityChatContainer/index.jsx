import React from 'react';
import { useState } from 'react';
import CurrentPot from '../CurrentPot';
import PreviousPot from '../PreviousPot/PreviousPot';
import ChatBox from '../ChatBox';
import { useStyles } from './index.styles';

const PotActivityChatContainer = (props) => {
  const classes = useStyles();
  const { PotInfo, PULSEPOT, entries, winners } = props;
  const [activityTab, setActivityTab] = useState(true);
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div onClick={() => setActivityTab(true)} className={activityTab ? classes.selected : classes.notSelected}>
          Activity
        </div>
        <div onClick={() => setActivityTab(false)} className={!activityTab ? classes.selected : classes.notSelected}>
          Chat
        </div>
      </div>
      {activityTab ? (
        <div className={classes.list}>
          <CurrentPot round={PotInfo.round} entries={entries.filter((entry) => entry.round == PotInfo.round)} />
          {winners
            .slice()
            .sort((a, b) => {
              return parseInt(b.round) - parseInt(a.round);
            })
            .map((winner, index) => {
              return (
                <PreviousPot
                  winner={winner}
                  entries={entries.filter((entry) => entry.round == winner.round)}
                  key={index}
                  BNBPPrice={props.BNBPPrice}
                />
              );
            })}
        </div>
      ) : (
        <ChatBox PULSEPOT={PULSEPOT} />
      )}
    </div>
  );
};

export default PotActivityChatContainer;
