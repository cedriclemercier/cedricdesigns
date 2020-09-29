const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "400px",
  // mobileL: "425px",
  tablet: "768px",
  // laptop: "1024px",
  laptop: "1200px",
  laptopL: "1440px",
  desktop: "2560px",
}

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
}

export const colors = {
  primary: `#FF1734`,
  accent: `#FF566B`,
  darkBackground: `#333231`,
  headline: `#5D5D5F`,
  text: `#B1B1B1`,
  grey80: `#333231`,
  grey60: `#CFDAF2`,
  grey50: `#E9EEF9`,
  grey20: `#F8F8F8`,
  black: `#000000`,
  purple: `#180246`,
  lightpurple: `#5C00CC`,
}
