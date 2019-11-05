export const colors = {
  almostBlack: '#17252a',
  darkGreen: '#2b7a78',
  lightGreen: '#3aafa9',
  lightblue: '#def2f1',
  almostWhite: '#feffff',
  almostWhiteMild: 'rgba(254,255,255,0.9)',
};

export const breakpts = {
  xxs: '320px',
  xs: '560px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1600px',
};

export const typescales = {
  t1: {
    mobile: {
      'font-size': '42px',
      'line-height': '48px',
    },
    desktop: {
      'font-size': '48px',
      'line-height': '58px',
    },
  },
  t2: {
    mobile: {
      'font-size': '29px',
      'line-height': '34px',
    },
    desktop: {
      'font-size': '29px',
      'line-height': '34px',
    },
  },
  t3: {
    mobile: {
      'font-size': '16px',
      'line-height': '18px',
    },
    desktop: {
      'font-size': '29px',
      'line-height': '34px',
    },
  },
  t4: {
    mobile: {
      'font-size': '19px',
      'line-height': '22px',
    },
    desktop: {
      'font-size': '21px',
      'line-height': '24px',
    },
  },
};

// Helper function for generating font styles.
export function generateStylesForSize(tVal, size = 'mobile') {
  let styles = '';
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
