import { css } from "styled-components";

const sizes = {
  mobileLandscape: 480,
  tabletPortrait: 768,
  tabletLandscape: 992,
  laptops: 1200
};

export default Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
