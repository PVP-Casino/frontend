import { makeStyles, withStyles, Tabs, AppBar, Tab } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(8),
  },
  content: {
    height: '170px',
  },
}));

export const CustomTabs = withStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.project.background}`,
    borderRadius: '10px 10px 0px 0px',
  },
  indicator: {
    display: 'none',
  },
}))(Tabs);
export const CustomAppBar = withStyles((theme) => ({
  root: {
    background: `linear-gradient(90deg,#1d2239,#323d71)`,
    // background: theme.palette.project.gray.light,
    borderRadius: '10px',
    boxShadow: '0 0 2px 0 #363636',
  },
}))(AppBar);
export const CustomTab = withStyles((theme) => ({
  root: {
    color: `${theme.palette.project.font} !important`,
    border: 'none !important',
    // background: theme.palette.project.gray.light,
    boxShadow: 'inset 2px -2px 10px #080e1a',
    background: 'linear-gradient(45deg, #1e233b, transparent)',
  },
  selected: {
    color: theme.palette.project.font,
    background: `transparent`,
    textTransform: 'inherit',
    fontSize: '1rem',
    boxShadow: 'none',
  },
}))(Tab);
