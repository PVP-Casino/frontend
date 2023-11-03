import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  jackpot: {
    marginTop: `${theme.spacing(12)} !important`,

    [theme.breakpoints.down('md')]: {
      maxWidth: `90vw !important`,
    },
    [theme.breakpoints.down('xs')]: {
      width: `95%`,
      margin: 'auto',
    },
  },
  wheelContainer: {
    [theme.breakpoints.down('sm')]: {
      minWidth: `700px`,
      margin: `auto`,
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '0',
    },
  },
  tokensInPOT: {
    display: `grid`,
    gridTemplateColumns: `1fr 1fr 1fr`,
    justifyItems: `center`,
    width: `600px`,
    margin: `auto`,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: `1fr 1fr 1fr 1fr`,
      marginTop: `30px !important`,
      width: `100%`,
    },
  },
  enterPotActivity: {
    position: `relative`,
    top: `-75px`,
    margin: `auto`,
    marginTop: `35px`,
    [theme.breakpoints.down('sm')]: {
      marginTop: '150px',
      '& div, & span': { fontSize: '14px !important' },
    },
    [theme.breakpoints.down('xs')]: {
      '& div, & span': { fontSize: '11px !important' },
    },
  },
}));
