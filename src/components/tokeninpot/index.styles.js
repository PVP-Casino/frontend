import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    background: `#393b47`,
    boxShadow: `0 0 2px 0 #363636`,
    color: `#c5c5c5`,
    margin: `15px`,
    display: `grid`,
    alignContent: `center`,
    justifyItems: `center`,
    padding: `12px 0px`,
    width: `180px`,
    borderRadius: `5px`,
    '& img': {
      width: '30px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '65px',
    },
  },
  name: {
    textTransform: `uppercase`,
    fontSize: `12px`,
    color: `#adadad`,
  },
  amount: {
    fontSize: `10px`,
    color: `#dedede`,
  },
  usd: {
    fontWeight: `700`,
    fontSize: `13px`,
    color: `#fff`,
  },
}));
