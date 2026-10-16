import React from 'react';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, Chip, IconButton, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

export default function BestSellersSection() {
    const { t } = useTranslation();

    const products = [
        {
            id: 1, title: t('Chronos Lavender'), price: 1200, Layers: true,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7DYl5lk7GjUKtuusOfSmCRNOBu7vgyjCsUzVrUXhvJv1REYIHQrxVVYcEWYgcrLjBpV3Fus6hSrSLScGE8x06YQeTTdVKA-YBtBiMB42XWZlwrQ4VM_N6a5cTQTJPgQOcL_S7TFgcybHZL715NomdcTzMfLMoYhcL8v5cbLo1xuVWe6Vivu8DoThb0yVurN-C5hDcgyCFdeglHWgLx3VWzuigCr3RHZFc-9xFLXT1zMl4f1LU_ebbgfGERv1SIpq4jbIESkoV8Q",
        },
        {
            id: 2, title: t('Lumina Vision II'), price: 650, Layers: false,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmyUVNlu7RtUhcd6sWe6vo7OLt9Y7zOMYbYftxRBNSN5Yk5fqL4I2-aydNRnK1cQ6a-ayun-ljkAeDl9xF_IbazNO1RUEocUeGxkNZEAvseOk1ehOnzcZi6zrgchfOHVMhCBWdawf1glQFkCRYzGAa9VEbWmAlNvfQQdixAkrPJf8fuE9JAxahjIANyfA3i3NCR0i_bxRZ0Br-oVgjbdfqhcvanbovJKa2nglYuAix_kvHNHJcbVc3-_MZCs08Wq52XE2u2WuLqA",
        },
    ];
    return (
        <Box sx={{ py: { xs: 3, md: 6 }, mt: { xs: 3, md: 6 }, mb: { xs: 4, md: 8 }, backgroundColor: "background.default" }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 5 }}>
                    <Typography variant="h4" sx={{ fontWeight: 500 }}> {t('The Lumina Icons')} </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}> {t('Our most coveted pieces, chosen by the discerning.')}</Typography>
                </Box>

                <Grid container spacing={2} >
                    <Grid item size={{ xs: 12, md: 8 }}>
                        <Card
                            sx={{
                                borderRadius: '24px', boxShadow: 'none', position: 'relative', overflow: 'hidden',
                                width: '100%',
                                aspectRatio: { xs: '4 / 5', md: '453 / 357' },
                                '&:hover .product-image': {
                                    transform: 'scale(1.06)',
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                image="https://lh3.googleusercontent.com/aida-public/AB6AXuAUYyCUJyNTctq0IMX23yxpjl2syUW8T1NVjoI_ObSZ0vsdfEjEw7Tce95wQfpBLYJcDCjqT1vODPXwXkuTbdNRXNMWSzFs2GBnUBfU2PKznUp7Kz0ysKZbrWsiAOve8LwuaHNkUbPLKeR1gefUAmDFyS63ZZtzpimdL7j-d-dWF9n3NrLDHVWaUmOlRdZmCVJ659E54JbUypZvMUcIijndLH459n2Fsc2zUFmQMi6A9aCPd2XrwTqMsTl7nh8N66I-LT9Kv8x3TA"
                                alt={t('Aether Silk Trench')}
                                className="product-image"
                                sx={{
                                    position: 'absolute', top: -30, width: '100%',
                                    height: '100% ',
                                    objectFit: 'cover', objectPosition: 'center top', transition: 'transform 0.6s ease',
                                }}
                            />
                            <Box
                                sx={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(to top, rgba(235,242,247,0.95) 0%, rgba(235,242,247,0.6) 28%, rgba(235,242,247,0) 55%)',
                                }}
                            />

                            <CardContent sx={{ position: 'absolute', bottom: 0, insetInlineStart: 0, p: { xs: 3, md: 4 }, '&:last-child': { pb: { xs: 3, md: 4 } } }}>
                              <Chip label={t('Bestseller')} size="small" sx={{ mb: 1.5, height: 22, fontSize: 11, fontWeight: 600, letterSpacing: 0.5, color: 'primary.dark', backgroundColor: 'rgba(134, 225, 255, 0.45)', backdropFilter: 'blur(6px)', }} />
                                <Typography variant="h5" sx={{ fontWeight: 500, mb: 0.5, color: "text.secondary" }}> {t('Aether Silk Trench')} </Typography>
                                <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}> $2,450 </Typography>

                                <Button
                                    variant="contained" disableElevation
                                    sx={{
                                        borderRadius: '999px', textTransform: 'none', fontWeight: 600, fontSize: 12, px: 3, py: 1,
                                        backgroundColor: 'secondary.main', color: 'secondary.dark',
                                        '&:hover': { backgroundColor: '#c093fb' },
                                    }}
                                >
                                    {t('Add to Bag')}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item size={{ xs: 12, md: 4 }} sx={{ display: 'flex' }}>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, gap: 2, flex: 1, width: '100%', }}>
                            {products.map((product) =>
                                <Card
                                    key={product.id}
                                    sx={{
                                        borderRadius: '24px', boxShadow: 'none', position: 'relative', overflow: 'hidden', flex: 1, minWidth: 0, minHeight: 0,
                                        aspectRatio: { xs: '4 / 5', md: 'auto' },
                                        '&:hover .add-btn': {
                                            opacity: 1,
                                            transform: 'translate(-50%, -50%) scale(1)',
                                        },
                                    }}
                                >
                                    <CardMedia className="products-image" component="img" image={product.image} alt={product.title}
                                        sx={{
                                            position: 'absolute', inset: 0, width: '100%', height: '100%',
                                            objectFit: 'cover', transition: 'transform 0.6s ease',
                                        }}
                                    />

                                    {!product.Layers && (
                                        <Box
                                            sx={{
                                                position: 'absolute', inset: 0,
                                                background: 'linear-gradient(to top, rgba(235,242,247,0.95) 0%, rgba(235,242,247,0) 45%)',
                                            }}
                                        />
                                    )}

                                    <IconButton
                                        className="add-btn" aria-label="add to bag"
                                        sx={{
                                            position: 'absolute', top: '50%', left: '50%',
                                            width: 48, height: 48, backgroundColor: '#fff', color: 'primary.dark',
                                            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                                            opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)',
                                            transition: 'all 0.3s ease-in-out',
                                            '&:hover': { backgroundColor: '#fff' },
                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton>

                                    <CardContent
                                        sx={{
                                            position: 'absolute',
                                            bottom: product.Layers ? { xs: 8, md: 16 } : 0,
                                            insetInlineStart: product.Layers ? { xs: 8, md: 16 } : 0,
                                            px: product.Layers ? { xs: 1, md: 2 } : 3.5,
                                            py: product.Layers ? { xs: 0.5, md: 1.5 } : 3,
                                            borderRadius: product.Layers ? { xs: '10px', md: '14px' } : 0,
                                            '&:last-child': { pb: product.Layers ? { xs: 0.5, md: 1.5 } : 3 },
                                            ...(product.Layers && {
                                                backgroundColor: 'rgba(255,255,255,0.35)',
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(255,255,255,0.45)',
                                            }),
                                        }}
                                    >
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "primary.dark", letterSpacing: 0.4, fontSize: { xs: '0.7rem', md: '0.9rem' }, lineHeight: 1.3, }} > {product.title} </Typography>
                                        <Typography variant="caption" sx={{ color: "text.secondary", display: 'block', fontSize: { xs: '0.65rem', md: '0.75rem' } }} > ${product.price.toLocaleString('en-US')} </Typography>
                                    </CardContent>
                                </Card>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box >
    );
}