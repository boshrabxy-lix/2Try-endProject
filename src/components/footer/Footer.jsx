import React from 'react'
import { Box, Container, Grid, Typography, InputBase, Link, Divider, IconButton } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const StaticCategories = [t('The Brand'), t('Sustainability'), t('Bespoke Services')];
  const ContactList = [t('Shipping & Returns'), t('Contact Us'), t('Privacy Policy')];
  const SocialIcons = [PublicIcon, ShareOutlinedIcon, AlternateEmailIcon];

  return (
    <>
      <Box component="section" sx={{ backgroundColor: "background.default", pt: 15, pb: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} sx={{ mb: 5, pb: 5 }}>
            <Grid item size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.dark" }} gutterBottom>
                KASHOP
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2, lineHeight: 1.8, maxWidth: 280 }}>
                {t('Elevating the everyday into an ethereal experience of luxury and calm.')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, mt: 3 }}>
                {SocialIcons.map((Icon, i) => (
                  <IconButton key={i} sx={{ bgcolor: '#fff', color: '#2F3E46', width: 34, height: 34, '&:hover': { bgcolor: '#fff', color: '#005F73' } }}>
                    <Icon sx={{ fontSize: 18 }} />
                  </IconButton>
                ))}
              </Box>
            </Grid>

            <Grid item size={{ xs: 6, sm: 6, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 400, fontSize: '1.15rem', mb: 3 }}>{t('Collections')}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                {StaticCategories.map((item) => (
                  <Link key={item} href="#" underline="none" sx={{ color: 'text.secondary', fontSize: '0.8rem', '&:hover': { color: "primary.dark" } }}>
                    {item}
                  </Link>
                ))}
              </Box>
            </Grid>

            <Grid item size={{ xs: 6, sm: 6, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 400, fontSize: '1.15rem', mb: 3, }}>{t('Support')}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8 }}>
                {ContactList.map((item) => (
                  <Link key={item} href="#" underline="none" sx={{ color: 'text.secondary', fontSize: '0.8rem', '&:hover': { color: "primary.dark" } }}>
                    {item}
                  </Link>
                ))}
              </Box>
            </Grid>

            <Grid item size={{ xs: 12, sm: 5, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 400, fontSize: '1.15rem', mb: 3 }}>{t('Newsletter')}</Typography>
              <Typography component={"p"} variant="body2" sx={{ mb: 2.5, color: '#5C6B73', lineHeight: 1.8, fontSize: '0.8rem' }}>
                {t('Subscribe to receive seasonal updates and exclusive invitations.')}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: '#fff', borderRadius: 50, p: 0.75, pl: 1.5 }}>
                <InputBase placeholder={t('Your Email Address')} sx={{ px: 1, color: '#2F3E46', flex: 1, fontSize: '0.8rem' }} />
                <IconButton sx={{ bgcolor: "primary.dark", color: '#fff', width: 34, height: 34, '&:hover': { bgcolor: "primary.main" } }}>
                  <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ borderColor: 'rgba(0,0,0,0.06)', my: 3 }} />

          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: 0.5 }}>
            {t('© 2024 KASHOP Luxury Group. All Rights Reserved.')}
          </Typography>
        </Container>
      </Box>
    </>
  )
}