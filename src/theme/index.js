import { createTheme } from '@material-ui/core/styles';

import DefaultPalette from './palette';
import spacing from './spacing';
import breakpoints from './breakpoints';

export const theme = createTheme({
  breakpoints: breakpoints,
  palette: DefaultPalette,
  ...spacing,
});
