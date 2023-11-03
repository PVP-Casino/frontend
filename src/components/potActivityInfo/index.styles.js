import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    overflow: `auto`,
  },
  reverse: {
    display: `flex`,
    flexDirection: `column-reverse`,
  },
  waiting: {
    background: `#1f243e`,
    display: `flex`,
    alignItems: `center`,
    width: `200px`,
    margin: `auto`,
    padding: `5px`,
    borderRadius: `5px`,
    color: `white`,
    marginTop: `20px`,
    paddingLeft: `25px`,
  },
}));
