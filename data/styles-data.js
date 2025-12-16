export const colors = {
  almostBlack: "#17252a",
  almostBlackTransparent: "rgba(23,37,42,0.8)",
  darkGrey: "#273940",
  darkGreen: "#00453B",
  lightGreen: "#3aafa9",
  greenTintedWhite: "#b8e8e4",
  lightblue: "#def2f1",
  almostWhite: "#feffff",
  almostWhiteMild: "rgba(254,255,255,0.9)",
  lightGreenFill: "rgba(58,175,169,0.8)",
  gray: "#A4B5BA",
  almostTransparentGray: "rgba(103,130,140,0.2)",
  almostTransparentWhite: "rgba(254,255,255,0.4)",
  wickedPink: "#C04ABC",
  almostTransparentPink: "rgba(192,74,188,0.1)",
  errorRed: "#FF6B6B",
  transparent: "transparent",
};

export const breakpts = {
  xxs: "320px",
  xs: "560px",
  sm: "768px",
  md: "992px",
  lg: "1200px",
  xl: "1600px",
  xxl: "2000px",
};

export const typescales = {
  t1: {
    mobile: {
      "font-size": "42px",
      "line-height": "48px",
    },
    desktop: {
      "font-size": "48px",
      "line-height": "58px",
    },
  },
  "t1.5": {
    mobile: {
      "font-size": "29px",
      "line-height": "34px",
    },
    desktop: {
      "font-size": "29px",
      "line-height": "34px",
    },
  },
  t2: {
    mobile: {
      "font-size": "24px",
      "line-height": "28px",
    },
    desktop: {
      "font-size": "24px",
      "line-height": "28px",
    },
  },
  "t2.5": {
    mobile: {
      "font-size": "22px",
      "line-height": "24px",
    },
    desktop: {
      "font-size": "22px",
      "line-height": "24px",
    },
  },
  t3: {
    mobile: {
      "font-size": "16px",
      "line-height": "18px",
    },
    desktop: {
      "font-size": "29px",
      "line-height": "34px",
    },
  },
  t4: {
    mobile: {
      "font-size": "19px",
      "line-height": "22px",
    },
    desktop: {
      "font-size": "21px",
      "line-height": "24px",
    },
  },

  t5: {
    mobile: {
      "font-size": "16px",
      "line-height": "18px",
    },
    desktop: {
      "font-size": "18px",
      "line-height": "21px",
    },
  },
  t6: {
    mobile: {
      "font-size": "16px",
      "line-height": "24px",
    },
    desktop: {
      "font-size": "18px",
      "line-height": "28px",
    },
  },
};

export const borderRadius = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
};

// Helper function for generating font styles.
export function generateStylesForSize(tVal, size = "mobile") {
  let styles = "";
  Object.entries(typescales[tVal][size]).forEach(([key, val]) => {
    styles += `${key}: `;
    styles += `${val};\n`;
  });
  return styles;
}

// Home page Specific styles for spacing
export const homePageSpacing = {
  leftMargin: 57,
  itmSpacing: 20,
};
