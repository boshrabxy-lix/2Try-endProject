import React from 'react'
import Box from '@mui/material/Box'
import style from './Loader.module.css';

export default function Loader() {
  return (
    <>
   <Box sx={{ height: '50vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', }} >
     <Box className={style.loader} sx={{ '--color-1': (theme) => theme.palette.primary.main, '--color-2': (theme) => theme.palette.secondary.main, }} />
    </Box>
    </>
    )
}
