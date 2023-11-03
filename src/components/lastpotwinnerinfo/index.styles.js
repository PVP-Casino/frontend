import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      width: '95%',
      margin: 'auto',
    },
  },
  info: {
    display: `grid`,
    textAlign: `center`,
    margin: `16px 0px`,
    padding: `5px 0px`,
    borderRadius: `5px`,
    border: `1px solid #1e233d !important`,
    background: `#1e233d !important`,
  },
  crown: {
    display: `grid`,
    gridTemplateColumns: `4fr 1fr 4fr`,
    justifyContent: `space-around`,
    fontSize: `12px`,
    fontWeight: `bold`,
    '& img': {
      width: `25px`,
      margin: `5px`,
      marginBottom: `0px`,
    },
    '& span': {
      textAlign: 'left',
    },
  },
  congrat: {
    fontWeight: `700`,
    fontSize: `13px`,
    color: `#7e879f`,
    '& span': {
      color: `#bcbcbc`,
    },
  },
  won: {
    fontSize: `13px`,
    color: `#979797`,
  },
  txlink: {
    position: `relative`,
    zIndex: 3,
    '& a': {
      color: `#7e879f`,
      fontSize: `13px`,
    },
  },
  fee: {
    position: `relative`,
    top: -`15px`,
    width: `100%`,
    display: `flex`,
    flexDirection: `row-reverse`,

    '&> div': {
      position: 'relative',
      zIndex: 3,
    },

    '& img': {
      marginRight: '5px',
    },
  },
  tooltipText: {},
}));
