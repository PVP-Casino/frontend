import { withStyles, Popover } from '@material-ui/core';

export const CustomPopover = withStyles((theme) => ({
  root: {},
  paper: {
    background: 'transparent',
    width: '85%',
    boxShadow: 'none',
  },
}))(Popover);
