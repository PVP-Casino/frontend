import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    // background: theme.palette.project.gray.light,
    // boxShadow: '0 0 2px 0 #363636',
    color: theme.palette.project.font,
    width: '500px',
    background: '#232c46',
    boxShadow: 'inset -3px -3px 3px #1e233c, inset 3px 3px 3px #232c46',
    borderRadius: '10px',
    border: '2px solid #1e233c',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '95vw',
    },
  },
  header: {
    display: `grid`,
    gridTemplateColumns: `1fr 1fr`,
    justifyItems: `center`,
    lineHeight: `45px`,
    fontWeight: 600,
    cursor: `pointer`,
    '& div:first-child': {
      width: `100%`,
      textAlign: `center`,
    },

    '& div:nth-child(2)': {
      /* border-left: 1.5px solid #c9c9c9, */
      width: `calc(100% - 2px)`,
      textAlign: `center`,
    },
  },
  list: {
    height: `600px`,
    minHeight: `600px`,
    overflowY: `auto`,
    padding: '10px',
    '&::-webkit-scrollbar': {
      width: '5px',
    },

    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px grey',
      borderRadius: '10px',
    },

    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      background: '#c0c0c0',
    },

    '&::-webkit-scrollbar-thumb:hover': {
      background: '#f3ba2c',
    },
  },
  selected: {
    borderBottom: `1px solid #1015226b`,
  },
  notSelected: {
    // background: `#2d2e36b2`,
    // border: '1px solid #2d2e36',
    background: '#1e233c',
    boxShadow: 'inset 4px -2px 4px #09112b',
  },
}));
