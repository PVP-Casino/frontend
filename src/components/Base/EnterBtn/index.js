import React from 'react';
import { makeStyles, Box } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: `20px`,
    width: `80%`,
    height: `40px`,
    margin: 'auto',
    textAlign: `center`,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    cursor: `pointer`,
    borderRadius: `10px`,
    position: `relative`,
    color: `#fff`,
    textTransform: `uppercase`,
    fontFamily: `sans-serif`,
    letterSpacing: `2px`,
    overflow: `hidden`,
    // boxShadow: `0 5px 5px rgb(63, 63, 63)`,
    boxShadow: `inset 2px 2px 2px #455687, 2px 2px 2px #080a10`,
    '&:after': {
      background: `linear-gradient(90deg,transparent,hsla(0,0%,100%,.4),transparent)`,
      content: `" "`,
      height: `100%`,
      left: `-100%`,
      position: `absolute`,
      top: 0,
      transition: `0.5s`,
      transitionDelay: `0.5s`,
      width: `100%`,
    },
    '&:hover:after': {
      left: `100%`,
    },
  },
  gray: {
    background: `rgba(255, 255, 255, 0.1)`,
  },
  green: {
    background: `linear-gradient(180deg, rgb(31 36 61), rgb(54 68 107))`,
    // background: `linear-gradient(180deg, rgb(4, 109, 56), rgb(82 117 4))`,
  },
}));

export const EnterBtn = (props) => {
  const { children, onClick, status } = props;
  const classes = useStyles();
  return (
    <Box className={status ? `${classes.root} ${classes.green}` : `${classes.root} ${classes.gray}`} onClick={onClick}>
      {children}
    </Box>
  );
};
