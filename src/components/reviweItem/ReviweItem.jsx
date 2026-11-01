import React from 'react'
import {Typography, Rating, Box, Card, CardContent, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function ReviweItem({review, index}) {
  const { t } = useTranslation();
    return (
        <>
            <Container maxWidth='md' key={index}>
                <Card key={index} sx={{ mb: 4, py: 2 }}
                    data-aos="zoom-out-up" data-aos-duration="1000">
                    <CardContent sx={{ p: 3 }}>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5" gutterBottom sx={{ color: "primary.main" }}>{review.userName}</Typography>
                            <Rating
                                value={review.rating}
                                precision={0.5}
                                readOnly
                                sx={{ color: "primary.main" }}
                            />
                        </Box>

                        <Typography gutterBottom variant="h6">{review.comment}</Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '14px', mt: 2 }}>
                            {t('Pasted on')} {new Date (review.createdAt).toLocaleDateString()}
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}
