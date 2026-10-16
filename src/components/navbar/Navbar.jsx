import React, { useState } from 'react';
import { useLocation, Link as RouterLink } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Badge, Link, Drawer, List, ListItemButton, ListItemText, useTheme, } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from '@mui/icons-material/LightMode';
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useTranslation } from "react-i18next";
import i18n from "../../i18next";
import ProfileMenu from '../profileMenu/ProfileMenu';
import useThemeStore from '../../store/useThemeStore';
import useAuthStore from "../../store/useAuthStore";
import useCart from "../../hooks/useCart";

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const { mode, toggleTheme } = useThemeStore();
  const token = useAuthStore((state) => state.token);
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data } = useCart();
  const cartCount = data?.items?.length ?? 0;

  const navLinks = [
    { label: t('Home'), to: '/' },
    { label: t('Collections'), to: '/collections' },
    { label: t('New Arrivals'), to: '/products' },
    { label: t('Journal & About'), to: '/journal' },
    { label: t('Contact & Support'), to: '/contact' },
  ];

  const changeLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  return (
    <Box component="header">
      <AppBar elevation={0} position="static" sx={{ backgroundColor: "background.paper", borderBottom: `1px solid ${theme.palette.info.main}33`, }} >
        <Toolbar sx={{ gap: 2, minHeight: { xs: 56, md: 72 }, px: { xs: 2, md: 4 }, justifyContent: 'space-between', }} >
          <Box sx={{ display: "flex", gap: { xs: 1, md: 3, lg: 5 }, alignItems: "center", minWidth: 0 }}>
            <IconButton aria-label="open menu" onClick={() => setDrawerOpen(true)}
              sx={{ color: "text.primary", display: { xs: "flex", md: "none" } }} >
              <MenuIcon />
            </IconButton>

            <Typography variant="h5" component="div" sx={{ fontWeight: 800, letterSpacing: 0.5, color: "primary.dark", fontSize: { xs: '1.2rem', md: '1.5rem' }, whiteSpace: 'nowrap', }} > KASHOP </Typography>

            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to} to={link.to} component={RouterLink} underline="none"
                  sx={{
                    color: isActive ? "primary.dark" : "text.secondary", fontWeight: 500, fontSize: { md: '13px', lg: '14px' }, letterSpacing: 0.6, pb: "4px", whiteSpace: 'nowrap',
                    borderBottom: isActive
                      ? `2px solid ${theme.palette.primary.dark}`
                      : "2px solid transparent",
                    display: { xs: "none", md: "flex" },
                    transition: "color 0.2s ease, border-color 0.2s ease",
                    "&:hover": { color: "primary.dark" },
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </Box>

          <Box sx={{ display: 'flex', alignItems: "center", gap: { xs: 0.5, sm: 1.5 }, flexShrink: 0 }}>
            <IconButton onClick={changeLanguage} size="small" aria-label="change language" sx={{ color: "text.primary" }}>
              <LanguageIcon fontSize="small" />
            </IconButton>

            <IconButton onClick={toggleTheme} size="small" aria-label="toggle theme" sx={{ color: "text.primary" }}>
              {mode === 'dark'
                ? <DarkModeOutlinedIcon fontSize="small" />
                : <LightModeIcon fontSize="small" />}
            </IconButton>

            <IconButton component={RouterLink} to="/favorites" size="small" aria-label="favorites" sx={{ color: "text.primary" }}>
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>

            {token && (
              <IconButton component={RouterLink} to="/Cart" size="small" aria-label="cart" sx={{ color: "text.primary" }}>
                <Badge badgeContent={cartCount} color="secondary" invisible={cartCount === 0}>
                  <ShoppingBagOutlinedIcon fontSize="small" />
                </Badge>
              </IconButton>
            )}

            <ProfileMenu />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor={i18n.language === "ar" ? "right" : "left"} open={drawerOpen} onClose={() => setDrawerOpen(false)} sx={{ display: { xs: "block", md: "none" } }} >
        <Box sx={{ width: 260 }} role="presentation">
          <Typography variant="h6" sx={{ fontWeight: 800, color: "primary.dark", px: 2, py: 2 }} > KASHOP </Typography>
          <List>
            {navLinks.map((link) => (
              <ListItemButton
                key={link.to}
                component={RouterLink}
                to={link.to}
                selected={location.pathname === link.to}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}