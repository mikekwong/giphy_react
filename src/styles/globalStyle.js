import { createGlobalStyle } from "styled-components";
import { fonts } from "./constants";

const GlobalStyle = createGlobalStyle`
body {
	/* background-color: rgb(20, 20, 20); */
	margin: 0;
	padding: 0;
	${fonts.wendyOne};
	-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

`;

export default GlobalStyle;
