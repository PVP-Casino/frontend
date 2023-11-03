import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    gridTemplateColumns: `2fr 4fr 2fr 3fr 1fr`,
    display: `grid`,
    fontSize: `13px`,
    borderBottom: `1px solid #454753`,
    color: `#acacac`,
    padding: `5px 0px`,
    width: `100%`,
    minWidth: `100%`,
    alignItems: `end`,
    '& span': {
      textAlign: `left`,
    },
    '& img': {
      width: '15px',
      height: '15px',
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: `2fr 4fr 2fr 4fr 1fr`,
    },
  },
  price: {
    color: `#7d7d7d`,
    textAlign: `left`,
  },
  amount: {
    textAlign: `left`,
    float: `right`,
  },
  tokenimage: {
    textAlign: `left`,
    float: `right`,
  },
}));
