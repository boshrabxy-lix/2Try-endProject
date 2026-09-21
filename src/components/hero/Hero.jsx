import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Box, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTranslation } from "react-i18next";
import 'swiper/css';
import 'swiper/css/effect-fade';
import { useTheme } from "@mui/material/styles";

const defaultSlides = [
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ0ZPSUlZFAZQAs92emwzmn-Q9f4-YNoyUM_BVzUKgyPYGZQg05JMYe4p319GSPPtSueI_-_pUvWRsocyO81VxMq0DOy7Rj0nz9lYftORg9ygRPG99CwmAtmPI-P-4DQKMEMZlQwlW0JMja8qAP4IJukx6JOkNrF4bM57GnwcadMLTHZkxQsf4xOsNN5QtvK9msUB_qXFfbhFxhpIrEH8LmUQQnJs6V9EJOOz8yiZcXwGeYSMjAw1LPHDVqBZUONHKB3-DJ-lD7g',
    position: 'center 30%',
    eyebrow: 'SPRING-SUMMER 2026',
    title: 'Ethereal Elegance Refined',
    buttonText: 'Explore Collection',
    buttonLink: '/collections',
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYBS9Lxr3mgPQEX172PDDXhTuVoKi18mwU3m1wWX9hYKvHg-AnLnJRTK52e6da7ekykuNKZZnrgC6eh8mh31UUTkk0nAC9jOniEC7ZKryZDeeLvV6Py01PZHDPg4H-jK6jlX5U8YdRnTzxCplIGKIpzj_8oGfes-1uwXOY4XqdVheafX2istAsSw2jPh44iVtR0LNZzFiAF1rPHt-aPCgZORVN-2M-BzyTxKCaqCyMctKD8LvhTACUqdZwpRVTZyLVxsj1hOG25w',
    position: 'center 50%',
    eyebrow: 'NEW ARRIVALS',
    title: 'Modern Artisanship',
    buttonText: 'Shop New Arrivals',
    buttonLink: '/products',
  },
];

export default function Hero({ slides = defaultSlides, autoplayDelay = 5200 }) {
  const swiperRef = useRef(null);
  const theme = useTheme();
  const gradientBackground = `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, #F1A9D6 100%)`;
  const { t , i18n} = useTranslation();
 const dir = i18n.language === "ar" ? "rtl" : "ltr";
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', '& .swiper': { height: '100%' }, }} >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={2000}
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        dir={dir}
         key={dir}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ position: 'relative', width: '100%', height: '100vh', backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: slide.position || 'center top', backgroundRepeat: 'no-repeat' }} >
              <Box sx={{
                position: 'absolute', filter: 'contrast(1.18) saturate(1.35) brightness(1.02)', inset: 0, background:
                  dir === 'rtl'
                    ? 'linear-gradient(to left, rgba(220,231,238,0.92) 0%, rgba(220,231,238,0.35) 45%, transparent 70%)'
                    : 'linear-gradient(to right, rgba(220,231,238,0.92) 0%, rgba(220,231,238,0.35) 45%, transparent 70%)',
              }}
              />

              <Box sx={{
                position: 'absolute', top: '50%', transform: 'translateY(-50%)', maxWidth: 480, textAlign: dir === 'rtl' ? 'right' : 'left',
                [dir === 'rtl' ? 'right' : 'left']: { xs: '6%', md: '8%' },
              }} >

                <Typography variant='caption' sx={{ color: 'primary.dark', fontWeight: 700, letterSpacing: 2, fontSize: 13, mb: 1.5, textTransform: 'uppercase', }} > {t(slide.eyebrow)} </Typography>
                <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: 34, md: 48 }, lineHeight: 1.15, mb: 3, }} > {t(slide.title)} </Typography>

                <Button
                  href={slide.buttonLink}
                  sx={{
                    background: gradientBackground, color: '#fff', borderRadius: 999, px: 3.5, py: 1.5,
                    mt: 2, fontWeight: 700, textTransform: 'none', transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      background: gradientBackground,
                      transform: 'scale(1.05)',
                      boxShadow: '0 10px 24px rgba(160, 110, 200, 0.35)',
                    },
                    '&:active': { transform: 'scale(0.98)' },
                  }}
                >
                  {t(slide.buttonText)}
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <IconButton
        onClick={() => swiperRef.current?.slidePrev()}
        sx={{
          position: 'absolute', bottom: 35, width: 44, height: 44, border: '1px solid', borderColor: 'primary.dark',
          color: 'primary.dark',
          [dir === 'rtl' ? 'right' : 'left']: { xs: '6%', md: '8%' },
          zIndex: 2,
          '&:hover': { bgcolor: '#ffffff4a' },
        }}
      >
        {dir === 'rtl' ? <ArrowForwardIosIcon fontSize="small" /> : <ArrowBackIosNewIcon fontSize="small" coler="primary.dark" />}
      </IconButton>
      <IconButton
        onClick={() => swiperRef.current?.slideNext()}
        sx={{
          position: 'absolute', bottom: 35, width: 44, height: 44,
          border: '1px solid', borderColor: 'primary.dark', color: 'primary.dark',
          [dir === 'rtl' ? 'right' : 'left']: { xs: 'calc(6% + 52px)', md: 'calc(8% + 52px)' },
          zIndex: 2,

          '&:hover': { bgcolor: '#ffffff4a' },
        }}
      >
        {dir === 'rtl' ? <ArrowBackIosNewIcon fontSize="small" /> : <ArrowForwardIosIcon fontSize="small" />}
      </IconButton>
    </Box>
  );
}