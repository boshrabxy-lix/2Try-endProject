import React from 'react';
import { useLocation } from "react-router-dom";
import { AppBar, IconButton, Toolbar, Badge, Link, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18next";
import ProfileMenu from '../profileMenu/ProfileMenu';
import useThemeStore from '../../store/useThemeStore';
import useAuthStore from "../../store/useAuthStore";
import LanguageIcon from '@mui/icons-material/Language';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const { mode, toggleTheme } = useThemeStore();
  const token = useAuthStore((state) => state.token);
  const theme = useTheme();

  const navLinks = [    
    { label: t('Home'), to: '/' },
    { label: t('Collections'), to: '/collections' },
    { label: t('New Arrivals'), to: '/products' },
    { label: t('Journal & About'), to: '/journal' },
    { label: t('Contact & Support'), to: '/ontact' },
  ];

  const changeLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  return (
    <Box component="section">
      <AppBar elevation={0} sx={{ position: "static", backgroundColor: "background.paper", borderBottom: `1px solid ${theme.palette.info.main}33`, }} >
        <Toolbar sx={{ gap: 2, py: 2, px: { xs: 2, sm: 4 }, justifyContent: 'space-between', display: 'flex', }} >
          <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}>
            <IconButton sx={{ color: "text.primary", display: { xs: "flex", sm: "none" } }} >
              <MenuIcon />
            </IconButton>

            <Typography variant="h5" component="div" sx={{ fontWeight: 800, letterSpacing: 0.5, color: "primary.dark", }} > KASHOP </Typography>

            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  component={RouterLink}
                  underline="none"
                  sx={{
                    color: isActive ? "primary.dark" : "text.secondary",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    letterSpacing: 0.6,
                    pb: "4px",
                    borderBottom: isActive
                      ? `2px solid ${theme.palette.primary.dark}`
                      : "2px solid transparent",
                    display: { xs: "none", sm: "flex" },
                    transition: "color 0.2s ease, border-color 0.2s ease",
                    "&:hover": { color: "primary.dark" },
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </Box>

          <Box sx={{ display: 'flex', alignItems: "center", gap: 1.5 }}>
            <IconButton onClick={changeLanguage} size="small" sx={{ color: "text.primary" }}>
              <LanguageIcon fontSize="small" />
            </IconButton>

            <IconButton onClick={toggleTheme} size="small" sx={{ color: "text.primary" }}>
              {mode === 'dark'
                ? <DarkModeOutlinedIcon fontSize="small" />
                : <LightModeIcon fontSize="small" />}
            </IconButton>

            <IconButton component={RouterLink} to="/favorites" size="small" sx={{ color: "text.primary" }}>
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>

            {token && (
              <IconButton component={RouterLink} to="/Carts" size="small" sx={{ color: "text.primary" }}>
                <Badge variant="dot" color="secondary" invisible={cartCount === 0}>
                  <ShoppingBagOutlinedIcon fontSize="small" />
                </Badge>
              </IconButton>
            )}

            <ProfileMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}