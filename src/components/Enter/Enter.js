import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { useStyles, CustomAppBar, CustomTab, CustomTabs } from './index.styles';
import TabPanel from './TabPanel';
import PotEnter from './PotEnter';

import './enter.css';
import './potAI.css';

const Enter = (props) => {
  const { pathname } = useLocation();
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const allyProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  };

  const renderTabContent = () => {
    if (pathname.includes('jackpot')) return <PotEnter value={value} {...props} />;

    return <PotEnter {...props} />;
  };

  return (
    <Box className={classes.root}>
      <CustomAppBar position='static' color='default'>
        <CustomTabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          aria-label='full width tabs example'
        >
          <CustomTab label='Wallet Connect' {...allyProps(0)} />
          <CustomTab label='Manual Transaction' {...allyProps(1)} />
        </CustomTabs>
        <Box className={classes.content}>{renderTabContent()}</Box>
      </CustomAppBar>
    </Box>
  );
};

export default Enter;
