import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    boxShadow: `0 0 2px 0 #363636`,
    color: `#c5c5c5`,
    background: `#2d2e36!important`,
    borderRadius: `10px`,
    left: 0,
    margin: `auto`,
    maxHeight: `400px`,
    overflowY: `auto`,
    padding: `20px 30px`,
    right: 0,
    top: `10px`,
    width: `300px`,
    zIndex: 10,
    '&::-webkit-scrollbar': {
      width: `5px`,
    },

    /* Track */
    '&::-webkit-scrollbar-track': {
      boxShadow: `inset 0 0 5px grey`,
      borderRadius: `10px`,
    },

    /* Handle */
    '&::-webkit-scrollbar-thumb': {
      borderRadius: `10px`,
      background: `#c0c0c0`,
    },

    /* Handle on hover */
    '&::-webkit-scrollbar-thumb:hover': {
      background: `#f3ba2c`,
    },
  },
  none: {
    display: 'none',
  },
  header: {
    display: `flex`,
    textAlign: `center`,
    background: `#454753`,
    borderRadius: `10px`,
    padding: `15px`,
    marginBottom: `20px`,
  },
  tokenSelection_10P: {
    '& div:first-child': {
      color: `white`,
      fontSize: `20px`,
      fontWeight: `bold`,
    },
    '& div:last-child': {
      color: `#f3ba2c`,
    },
  },
  tokenSelection_10P_: {
    fontSize: `13px`,
    display: `flex`,
    alignItems: `center`,
  },
}));
