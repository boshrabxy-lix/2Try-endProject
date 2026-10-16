import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import { useTranslation } from 'react-i18next';


export default function InnerCircleSection() {
    const { t } = useTranslation();
    const FEATURES = [
        { id: 1, icon: <AutoAwesomeIcon sx={{ fontSize: 20 }} />, text: 'Complimentary Bespoke Tailoring' },
        { id: 2, icon: <RoomServiceOutlinedIcon sx={{ fontSize: 20 }} />, text: '24/7 Dedicated Luxury Concierge' },
    ];

    return (
        <Box component="section" sx={{
            py: { xs: 6, md: 10 }, my: { xs: 6, md: 10 },
            background: (theme) =>
                theme.palette.mode === 'light'
                    ? `
                    radial-gradient(circle at 45% 8%,  rgba(134, 225, 255, 0.40) 0%, rgba(134, 225, 255, 0) 38%),
                    radial-gradient(circle at 55% 85%, rgba(200, 190, 255, 0.35) 0%, rgba(200, 190, 255, 0) 45%),
                    radial-gradient(circle at 8% 90%,  rgba(220, 235, 255, 0.70) 0%, rgba(220, 235, 255, 0) 40%),
                    linear-gradient(180deg, #F3F9FF 0%, #F8FAFF 55%, #FBFCFF 100%)
                  `
                    : `
                  'background.default'
                  `,
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Box sx={{
                            width: '100%', maxWidth: 500, aspectRatio: '1 / 1',
                            borderRadius: '32px', overflow: 'hidden', boxShadow: '0 24px 50px rgba(0, 95, 115, 0.15)',
                        }} >

                            <Box
                                component="img" alt={t('The Lumina Inner Circle')}
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7KxgnXh0rfInZquyWwwRf_ayBPSjSOBqdmDFzjMadlZOxxJ29RYzXKm3pR_2C5c3dKTtkBcXAGaR7-NgoA9aIoAgdGCk8w8Zwp_1HU9ns1OTr99-NTyQxxyJ19N_NFj_FxNEk5l6G4lPeUgluVhvil6fZYsLnfq_XCDMxSVDupLcTTVZGPpRmjWEM5ezwTC6Y5X7dJyMbB6Ay4WgNXDhh38hA15Va6HdsWLMpxPM6VFGZcATvB-d1KlZCYHDNMj42XZdwb4-M_g"
                                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                        </Box>
                    </Grid>

                    <Grid item size={{ xs: 12, md: 6 }}>
                        <Typography variant="caption"
                            sx={{ display: 'block', mb: 3, color: 'primary.dark', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase' }}
                        > {t('Membership Privilege')} </Typography>
                        <Typography component="h2" variant="h3"
                            sx={{ fontWeight: 700, fontSize: { xs: 30, md: 40 }, lineHeight: 1.2, mb: 3 }}
                        > {t('The Lumina Inner Circle')} </Typography>

                        <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 2, mb: 4, maxWidth: 520 }}>
                            {t('Join our exclusive loyalty program to unlock a world of bespoke services, early access to new collections, and private seasonal previews curated just for you.')}
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
                            {FEATURES.map((feature) => (
                                <Box key={feature.id} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                    <Box sx={{
                                        width: 40, height: 40, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        backgroundColor: 'rgba(134, 225, 255, 0.23)', color: 'primary.dark',
                                    }}>{feature.icon}

                                    </Box>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {t(feature.text)}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        <Button
                            variant="outlined"
                            sx={{
                                borderRadius: '999px', px: 4, py: 1.4, textTransform: 'none', color: 'primary.dark',
                                fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', borderColor: 'primary.dark', borderWidth: 1.5,
                                transition: 'all 0.3s ease',
                                '&:hover': { borderWidth: 1.5, borderColor: 'primary.dark', backgroundColor: 'primary.dark', color: '#fff' },
                            }}
                        >
                            {t('Discover Benefits')}
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}