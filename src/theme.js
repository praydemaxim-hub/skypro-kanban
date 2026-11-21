const common = {
  breakpoints: {
    xl: '1200px',
    lg: '660px',
    md: '495px',
    sm: '375px',
  },
};

export const lightTheme = {
  ...common,
  isDark: false,
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    bgLight: '#EAEEF6',
    grayText: '#94A6BE',
    primary: '#565EEF',
    primaryHover: '#33399B',
    border: 'rgba(148, 166, 190, 0.4)',
    skeletonFrom: '#C1CDDC',
    skeletonTo: '#E9EEF7',
  },
  topicColors: {
    'Web Design': {
      bg: '#FFE4C2',
      text: '#FF6D00',
      background: '#FFE4C2',
      color: '#FF6D00',
    },
    Research: {
      bg: '#B4FDD1',
      text: '#06B16E',
      background: '#B4FDD1',
      color: '#06B16E',
    },
    Copywriting: {
      bg: '#E9D4FF',
      text: '#9A48F1',
      background: '#E9D4FF',
      color: '#9A48F1',
    },
    default: {
      bg: '#94A6BE',
      text: '#FFFFFF',
      background: '#94A6BE',
      color: '#FFFFFF',
    },
  },
};

export const darkTheme = {
  ...common,
  isDark: true,
  colors: {
    white: '#20202C',
    black: '#FFFFFF',
    bgLight: '#151419',
    grayText: '#94A6BE',
    primary: '#565EEF',
    primaryHover: '#33399B',
    border: '#4E5566',
    skeletonFrom: '#20202C',
    skeletonTo: '#38384A',
  },
  topicColors: {
    'Web Design': {
      bg: '#FF6D00',
      text: '#FFE4C2',
      background: '#FF6D00',
      color: '#FFE4C2',
    },
    Research: {
      bg: '#06B16E',
      text: '#B4FDD1',
      background: '#06B16E',
      color: '#B4FDD1',
    },
    Copywriting: {
      bg: '#9A48F1',
      text: '#E9D4FF',
      background: '#9A48F1',
      color: '#E9D4FF',
    },
    default: {
      bg: '#94A6BE',
      text: '#FFFFFF',
      background: '#94A6BE',
      color: '#FFFFFF',
    },
  },
};