import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: `flex`,
    textAlign: `center`,
    padding: `10px`,
    alignItems: `center`,
    borderTop: `1px solid rgb(64 65 73)`,
    boxShadow: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s linear',
    '&:first-child': {
      border: 'none',
    },
    '&:hover': {
      borderRadius: '10px',
      background: theme.palette.project.gray.light,
    },
  },
  img: {
    width: '30px',
  },
  token: {
    fontWeight: `bold`,
    minWidth: `60px`,
  },
  balance: {
    width: `200px`,
    textAlign: `right`,
    color: `grey`,
    fontSize: `13px`,
    paddingLeft: `30px`,
  },
}));
