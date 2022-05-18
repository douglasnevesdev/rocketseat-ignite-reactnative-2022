import 'styled-components';
import theme from './theme';

declare module 'styled-components' {
  //Faz que o ThemeType tenha o mesmo tipo de theme
  type ThemeType = typeof theme
  //Agora retornamos o DefaultTheme de stylecomponents extendendo o ThemeType que criamos.
  export interface DefaultTheme extends ThemeType {}
}