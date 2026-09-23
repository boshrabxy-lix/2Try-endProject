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
        default: mode === 'light' ? '#DCE7EE' : '#121212',
        paper: mode === 'light' ? '#EBF2F7' : '#0f0f0f',
      },
      text: {
        primary: mode === 'light' ? '#2F3E46' : '#EBF2F7',
        secondary: mode === 'light' ? '#5C6B73' : '#6f7782',
      },
     
      typography: {
        fontFamily: ['Tajawal', 'sans-serif'],
      },
    },
  });
};

export default getTheme;