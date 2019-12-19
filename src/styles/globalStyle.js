import { createGlobalStyle } from "styled-components";
import { fonts, colors } from "./constants";

const GlobalStyle = createGlobalStyle`
body {
	background-color: ${colors.dark};
	margin: 0;
	padding: 0;
	${fonts.wendyOne};
	-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`;

export default GlobalStyle;
