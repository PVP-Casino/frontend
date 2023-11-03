import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
}));
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
};

export default TabPanel;
