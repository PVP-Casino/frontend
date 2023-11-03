import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: `450px`,
    margin: `auto`,
    marginTop: `10px`,
    [theme.breakpoints.down('sm')]: {
      maxWidth: `100%`,
      margin: `auto`,
    },
    [theme.breakpoints.between('md', 'md')]: {
      width: `370px`,
    },
  },
  entries: {
    marginBottom: `20px`,
    minHeight: `50px`,
    textAlign: `center`,
    marginTop: `30px`,
  },
  started: {
    color: `#acacac`,
    marginTop: `10px`,
    textAlign: `center`,
    fontSize: `12px`,
  },
}));
