import { createGlobalStyle } from 'styled-components';
import { FONT_SIZES } from './tokens';

const GlobalStyles = createGlobalStyle`
    * {
        background: unset;
        border: unset;
        box-sizing: border-box;
        color: unset;
        font-size: inherit;
        font: unset;
        line-height: inherit;
        list-style-type: none;
        margin: 0;
        outline: unset;
        padding: 0;
        text-decoration: none;
    }
    :root {
        background-color: white;
        color: black;
        font-family: Roboto, sans-serif;
        font-size: ${FONT_SIZES.normal};
        line-height: 1.5rem;
        scroll-padding-top: 50px;
    }
    body {
        overscroll-behavior-y: none;
    }
`;

export default GlobalStyles;
