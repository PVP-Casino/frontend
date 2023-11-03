import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  laptopRoot: {
    height: `fit-content`,
    // margin: `auto`,
    // width: `170px`,
    // width: '100%',
    // border: `0px`,
    // borderRadius: `10px`,
    display: 'grid',
    padding: `20px 0px 10px 0px`,
    position: `sticky`,
    top: '0px',
    // marginTop: `20px`,
    background: 'transparent',
    '& img': {
      width: '15px',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  content: { marginTop: '-20px' },
  logoDiv: {
    background: 'transparent',
    margin: 'auto',
    marginTop: 16,
  },
}));
