import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#86E1FF',
        dark: '#005F73',
        contrastText:'#fff',
      },
      secondary: {
        main: '#D0A9FE',
        dark: '#4A154B',
        contrastText: '#fff',
      },
      info: {
        main: '#86C1FC',
        dark: '#1D4ED8',
      },
      background: {
        default: mode === 'light' ?  '#121212': '#DCE7EE',
        paper: mode === 'light' ? '#EBF2F7' : '#0f0f0f',
      },
      text: {
        primary: mode === 'light' ? '#EBF2F7' : '#2F3E46',
        secondary: mode === 'light' ?'#94A3B8'  :'#5C6B73' ,
      },
      typography: {
        fontFamily: ['Tajawal', 'sans-serif'].join(','),
      },
    },
  });
};

export default getTheme;