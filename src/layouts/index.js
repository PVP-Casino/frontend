import { styled, Box, Grid } from '@material-ui/core';

export const GameLayoutDiv = styled(Box)((props) => {
  // console.log(props.theme);
  return {
    display: `grid`,
    gridTemplateColumns: `64fr 30fr`,
    position: `relative`,
    paddingRight: '10px',
    border: '1px solid #1e233b',
    borderRadius: '15px',
    margin: '11px',
    boxShadow: 'inset 0px 0px 20px #1f243e',
    [props.theme.breakpoints.down('sm')]: {
      gridTemplateColumns: `1fr`,
      justifyItems: `center`,
      paddingRight: `0px`,
    },
  };
});

export const CardDiv = styled(Box)((props) => ({
  background: 'rgb(30 36 61)',
  boxShadow: 'inset 2px 2px 6px #0e101a, inset -2px -2px 2px #46506d',
  borderRadius: '10px',
  color: '#c5c5c5',
}));
