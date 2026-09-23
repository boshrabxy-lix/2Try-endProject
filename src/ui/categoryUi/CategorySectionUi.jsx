import { Typography } from '@mui/material';
import { Card, CardMedia, CardContent, Box, Link } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import catPrimary from '../../assets/CategoryImg/catPrimary.webp';
import catSecondary from '../../assets/CategoryImg/catSecondary.webp';
import catTertiary from '../../assets/CategoryImg/catTertiary.webp';
import catNeutral from '../../assets/CategoryImg/catNeutral.webp';

export default function CategorySectionUi({ category, index }) {
    const cat_IMAGES = [catPrimary, catSecondary, catTertiary, catNeutral];
    const image = cat_IMAGES[index % cat_IMAGES.length];

    return (
        <>
            <Link component={RouterLink} to={`/Products/category/${category.id}`} underline="none" sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                color: 'text.primary',
                '&:hover .circle, &:focus-visible .circle': {
                    borderColor: 'primary.main',
                    transform: 'scale(1.06)',
                },
                '&:hover .circle-media, &:focus-visible .circle-media': {
                    transform: 'scale(1.08)',
                },
            }}>
                <Box className="circle"
                    sx={{
                        p: 4, width: { xs: 140, sm: 170, md: 192 }, height: { xs: 140, sm: 170, md: 192 }, borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center", overflow: 'hidden',
                        cursor: "pointer", transition: " border-color .5s ease, color .5s ease", border: '6px solid',
                        borderColor: 'transparent',
                        transition:
                            'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease',
                        willChange: 'transform',
                        '@media (prefers-reduced-motion: reduce)': {
                            transition: 'border-color 0.5s ease',
                        },
                    }}
                >
                    <Box
                        component="img"
                        className="circle"
                        src={image}
                        alt={category.name}
                        loading="lazy"
                        sx={{
                            display: 'block',
                            width: { xs: 140, sm: 170, md: 192 },
                            aspectRatio: '1 / 1',      // equal width and height gives a true circle
                            boxSizing: 'border-box',
                            borderRadius: '50%',
                            border: '6px solid',
                            borderColor: 'transparent',
                            objectFit: 'cover',        // crops the image to fill the circle without stretching
                            cursor: 'pointer',
                            willChange: 'transform',
                            transition:
                                'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease',
                            '@media (prefers-reduced-motion: reduce)': {
                                transition: 'border-color 0.5s ease',
                            },
                        }}
                    />
                </Box>
                    <Typography component={'h3'} sx={{ fontWeight: 500, fontSize: { xs: '1rem', md: '1.15rem' }, textAlign: 'center', color: 'initial' }} >{category.name}</Typography>
            </Link >

        </>
    )
}