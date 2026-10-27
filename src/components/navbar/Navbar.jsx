import React, { useState } from 'react';
import { useLocation, Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Box, Typography, IconButton, Badge, Link, Drawer, List, ListItemButton, ListItemText, Menu, MenuItem, useTheme, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import LanguageIcon from "@mui/icons-material/Language";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useTranslation } from "react-i18next";
import ProfileMenu from "../profileMenu/ProfileMenu";
import useThemeStore from "../../store/useThemeStore";
import useAuthStore from "../../store/useAuthStore";
import useCart from "../../hooks/useCart";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeStore();
  const token = useAuthStore((state) => state.token);
  const { data } = useCart();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [langAnchor, setLangAnchor] = useState(null);

  const cartCount = data?.items?.length ?? 0;
  const currentLang = i18n.language?.startsWith("ar") ? "ar" : "en";

  const languages = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
  ];

  const handleChangeLanguage = (code) => {
    i18n.changeLanguage(code);
    document.dir = code === "ar" ? "rtl" : "ltr";
    setLangAnchor(null);
  };

  const navLinks = [
    { label: t('Home'), to: '/' },
    { label: t('Collections'), to: '/collections' },
    { label: t('New Arrivals'), to: '/products' },
    { label: t('Journal & About'), to: '/journal' },
    { label: t('Contact & Support'), to: '/contact' },
  ];

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
                <Link key={link.to} to={link.to} component={RouterLink} underline="none"
                  sx={{
                    display: { xs: "none", md: "flex" }, color: isActive ? "primary.dark" : "text.secondary", pb: "4px",
                    fontWeight: 500, fontSize: { md: "13px", lg: "14px" }, letterSpacing: 0.6, transition: "color 0.2s ease, border-color 0.2s ease",
                    whiteSpace: "nowrap", borderBottom: `2px solid ${isActive ? theme.palette.primary.dark : "transparent"}`,
                    "&:hover": { color: "primary.dark" },
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </Box>

          <Box sx={{ display: 'flex', alignItems: "center", gap: { xs: 0.5, sm: 1.5 }, flexShrink: 0 }}>
            <IconButton aria-label="change language" aria-haspopup="true"
              aria-expanded={Boolean(langAnchor) || undefined} onClick={(e) => setLangAnchor(e.currentTarget)} sx={{ color: "text.primary" }} >
              <LanguageIcon />
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

      <Menu anchorEl={langAnchor} open={Boolean(langAnchor)} onClose={() => setLangAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }} transformOrigin={{ vertical: "top", horizontal: "center" }}
        MenuListProps={{ disablePadding: true }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: { mt: 1, minWidth: 140, borderRadius: 0, border: "1px solid", borderColor: "divider", backgroundColor: "background.paper", },
          },
        }}
      >
        {languages.map(({ code, label }) => (
          <MenuItem key={code}
            selected={currentLang === code}
            onClick={() => handleChangeLanguage(code)}
            sx={{
              justifyContent: "center", py: 1.25, fontSize: "15px",
              "&.Mui-selected, &.Mui-selected:hover": {
                bgcolor: "grey.700", color: "common.white",
              },
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} sx={{ display: { xs: "block", md: "none" } }} >
        <Box sx={{ width: 260 }} role="presentation">
          <Typography variant="h6" sx={{ fontWeight: 800, color: "primary.dark", px: 2, py: 2 }} > KASHOP </Typography>
          <List>
            {navLinks.map((link) => (
              <ListItemButton key={link.to} component={RouterLink} to={link.to}
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