import { Button, Grid, TextField, Typography, Box, Link, Chip, Stack, Avatar, IconButton, InputAdornment, Divider, Container, Checkbox, FormControlLabel, } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import useAuthStore from "../../../store/useAuthStore";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import axios from "axios";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import { LoginSchema } from "../../../validation/LoginSchema";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";



export default function Login() {
  const { t , i18n} = useTranslation()
  const theme = useTheme();
  const [ServerErrors, setServerErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(LoginSchema), mode: 'onBlur'
  });
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const [rememberDevice, setRememberDevice] = useState(true);

  const gradientBackground = `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, #F1A9D6 100%)`;

  const fieldLabelArSx = { fontSize: 13, color: "text.secondary" };
  const fieldLabelSx = { fontSize: 14, fontWeight: 700, color: "primary.dark" };
  const pillInputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      bgcolor: "#E7F6FF",
      "& fieldset": { border: "none" },
      "&.Mui-focused fieldset": { border: "1px solid ", borderColor: "primary.main" },
    },
  };
  const AppleLogoIcon = (props) => (
    <svg viewBox="0 0 384 512" width="16" height="16" fill="currentColor" {...props}>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.3-41.7-84.7-44.6-35.2-2.8-73.7 20.5-87.7 20.5-14.9 0-48.9-19.5-75.7-19.5C63.6 141.1 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.3 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.6-90-61.6-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 25.7-2 49.4-14.7 69.5-34.3z" />
    </svg>
  );

  const GoogleLogoIcon = (props) => (
    <svg viewBox="0 0 48 48" width="16" height="16" {...props}>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.9 32.6 29.4 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.8-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l6-6C34.6 5.1 29.6 3 24 3 16.3 3 9.7 7.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 45c5.5 0 10.5-2.1 14.3-5.5l-6.6-5.6C29.7 35.7 27 36.7 24 36.7c-5.3 0-9.8-3.4-11.4-8.1l-6.6 5.1C9.6 40.7 16.2 45 24 45z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 3.1-3.1 5.6-6 7.2l6.6 5.6C39.7 37.9 45 32 45 24c0-1.4-.1-2.8-.4-3.5z" />
    </svg>
  );
  const socialButtonSx = {
    bgcolor: "#E7F6FF",
    color: "primary.dark",
    fontWeight: 600,
    borderRadius: "12px",
    py: 1.2,
    textTransform: "none",
    boxShadow: "none",
    "&:hover": { bgcolor: "#DAF0FF", boxShadow: "none" },
  };
  const cardSx = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.75,
    py: 1.75,
    px: 1,
    textAlign: "center",
    borderRadius: "16px",
    bgcolor: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(4px)",
  };
  const loginForm = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BURL}/auth/Account/login`, data);
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.accessToken);
        setToken(response.data.accessToken);
        Swal.fire({
          icon: 'success',
          title:t("You have successfully logged in"),
          text: t("You have successfully logged in"),
          confirmButtonText: t('Okay')
        })
        navigate('/');
      }
      console.log("responce", response);
    } catch (err) {
      console.log(err.response.data.message);
      setServerErrors(err.response.data.message);
    }
  };
  const changeLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };


  return (
    <Box sx={{ minHeight: '100vh', display: "flex", alignItems: "center", justifyContent: "center", py: { xs: 1.5, sm: 2 }, px: { xs: 0, sm: 2 }, bgcolor: '#fff' }} >
      <Box sx={{ width: { xs: "95% ", md: "90%" }, px: 3 }} >
        <Box alignItems="center" justifyContent="space-between" flexWrap="wrap" sx={{ px: { xs: 2, md: 2 }, py: 2, }} >

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, justifyContent: "space-between", mb: 1.5 }} >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, }} >
              <Avatar sx={{ bgcolor: '#0060732d', width: 35, height: 35, fontSize: 13, boxShadow: "0 0 0 1px rgba(208,169,254,0.35), 0 30px 70px -30px rgba(74,21,75,0.35)", fontWeight: 700, color: "primary.dark", }} > KA </Avatar>
              <Typography sx={{ fontWeight: 700, letterSpacing: 2, }}>
                KASHOP
              </Typography>

              <Chip
                label={t("HAUTE JOAILLERIE & MAISON")}
                size="small"
                sx={{ fontSize: 10, bgcolor: '#0060732d', color: "primary.dark", letterSpacing: 0.5, display: { xs: "none", sm: "flex" }, }} />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, }} >
              <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: .5, }} >
                <VerifiedUserOutlinedIcon sx={{ fontSize: 16, color: 'green' }} />
                <Typography variant="caption" sx={{ color: "#000" }} > {t('256-Bit Encrypted Portal')} </Typography>
              </Box>

              <IconButton size="small" onClick={changeLanguage} >
                <Box sx={{
                  display: "flex", alignItems: "center", gap: 0.75, px: 2, py: 0.75, borderRadius: "999px", backgroundColor: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", cursor: "pointer",
                  "&:hover": {
                    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                  },
                }}
                >
                  <LanguageOutlinedIcon sx={{ fontSize: 18, color: "secondary.dark" }} />
                  <Typography variant="caption" sx={{ color: "#1A1A1A", fontWeight: 500, whiteSpace: "nowrap" }} > العربية / English </Typography>
                </Box>
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, borderRadius: "16px", boxShadow: ".5px 30px 70px -30px rgba(22, 11, 23, 0.58)", }}>
          <Box
            sx={{
              flex: { md: "0 0 42%" }, minHeight: { xs: 250, sm: 280, md: 650 }, position: "relative",
              background: `linear-gradient(135deg, rgba(41, 20, 30, 0.55) 0%, rgba(20, 10, 15, 0.13) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBC5G4uoELTbRuFq2GZ6TtmhHQxf7zHWjawtWvDU0l9U8dmjWjBltcAI1fQWx1pF0-KZoZmC67HvARQDH90zRKSFUHJ7ug0qoI8buGZWUUBJiM2eiyUjZR0oKrtDuTi-KEd2szMxjvCFuuKGiz6insdBYuLtK2Pjzb09S1cemqe4wDHnYujJ9r5JUV_Et1gsAt3zykvd4Jc62cI972iE59kAHiLFf4DcJ-RJnYHFcgOLUnEvY72B8k')`,
              backgroundSize: "cover", backgroundPosition: "center", borderRadius: { xs: "16px 16px 0 0", md: "16px 0 0 16px" },
              backgroundRepeat: "no-repeat", p: { xs: 3, md: 4 }, display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#fff",
            }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: 11, letterSpacing: 3, fontWeight: 700, opacity: 0.85, textTransform: "uppercase" }}>
                {t("Maison Privée")}
              </Typography>
              <IconButton
                size="small"
                sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.2)" } }}
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box>
              <Box sx={{ width: 45, height: 2, bgcolor: "primary.main", mb: 1.5 }} />

              <Typography sx={{ fontSize: { sx: 16, md: 20 }, lineHeight: 1.5, fontWeight: 300, fontStyle: "italic" }}>
                {t("\u201CElevate the everyday into an ethereal experience of luxury and calm.\u201D")}
              </Typography>
              <Typography variant="caption" sx={{ display: "block", opacity: 0.7, letterSpacing: 0.5, mt: 2, mb: { xs: 1, md: 2 } }}>
                {t("— Curated for Lumina Patrons Worldwide")}
              </Typography>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.3)", mt: { xs: 1, md: 3 }, mb: 2 }} />

              <Grid container spacing={1.5} sx={{ mb: { xs: 1, md: 3 } }} >
                <Grid item size={{ xs: 4 }} sx={cardSx}>
                  <Box sx={{ color: "primary.main", display: "flex" }}>
                    <RemoveRedEyeOutlinedIcon sx={{ fontSize: 22 }} />
                  </Box>
                  <Typography variant="caption" sx={{ color: "#fff", fontWeight: 600, fontSize: 12.5 }}>
                    {t("Private Previews")}
                  </Typography>
                </Grid>

                <Grid item size={{ xs: 4 }} sx={cardSx}>
                  <Box sx={{ color: "secondary.main", display: "flex" }}>
                    <SpaOutlinedIcon sx={{ fontSize: 22 }} />
                  </Box>
                  <Typography variant="caption" sx={{ color: "#fff", fontWeight: 600, fontSize: 12.5 }}>
                    {t("Bespoke Salon")}
                  </Typography>
                </Grid>

                <Grid item size={{ xs: 4 }} sx={cardSx}>
                  <Box sx={{ color: "#fff", display: "flex" }}>
                    <LockOutlinedIcon sx={{ fontSize: 22 }} />
                  </Box>
                  <Typography variant="caption" sx={{ color: "#fff", fontWeight: 600, fontSize: 12.5 }}>
                    {t("Vault Access")}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Container maxWidth="md" px={{ xs: 2, sm: 4, md: 6 }}>
            <Box sx={{ flex: 1, px: { xs: 2.5, sm: 4, md: 6 }, py: { xs: 3, md: 4 } }}>
              <Chip
                label={t("Member Portal")}
                size="small"
                icon={<Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "secondary.dark", ml: "10px !important" }} />}
                sx={{ bgcolor: "secondary.main", color: "secondary.dark", fontWeight: 600, fontSize: 12, mb: 2, opacity: '50%' }}
              />

              <Box component="form" onSubmit={handleSubmit(loginForm)} >
                <Typography variant="h4" sx={{ fontSize: { xs: 26, md: 32 }, fontWeight: 500, lineHeight: 1.2 }} > {t("Welcome Back to KASHOP")} </Typography>
                <Typography dir="rtl" sx={{ color: "primary.dark", fontSize: 14, mt: 0.5, fontWeight: 600 }}>
                  {t("مرحباً بعودتك إلى لومينا الخاصة")}
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", mt: 1, mb: 3, }}>
                  {t("Enter your private credentials to access reserved acquisitions and personalized consultations.")}
                </Typography>

                {ServerErrors && (
                  <Typography color="error" sx={{ mb: 1 }}>
                    {ServerErrors}
                  </Typography>
                )}


                <Stack spacing={2.5}>
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
                      <Typography sx={{ ...fieldLabelSx, mb: 0.75 }}>Client ID or Email Address</Typography>
                      <Typography sx={fieldLabelArSx}>المعرّف أو البريد الإلكتروني</Typography>
                    </Box>
                    <TextField
                      {...register("email")}
                      fullWidth
                      placeholder="name@domain.com"
                      variant="outlined"
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                      sx={pillInputSx}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <AlternateEmailOutlinedIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 0.75 }}>
                      <Typography sx={fieldLabelSx}>{t("Passphrase Key")}</Typography>
                      <Typography sx={fieldLabelArSx}>كلمة المرور</Typography>
                    </Box>
                    <TextField
                      {...register("password")}
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••"
                      variant="outlined"
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
                      sx={pillInputSx}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <VpnKeyOutlinedIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword((v) => !v)} edge="end" size="small">
                                {showPassword ? (
                                  <VisibilityOffOutlinedIcon sx={{ color: "text.secondary" }} />
                                ) : (
                                  <VisibilityOutlinedIcon sx={{ color: "text.secondary" }} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Box>
                  <Box> <Link component="button" type="button" sx={{ fontSize: 13, color: "secondary.dark", fontWeight: 600, textDecoration: "none" }}>
                    {t("Forgot PassWord?")}
                  </Link></Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={rememberDevice}
                          onChange={(e) => setRememberDevice(e.target.checked)}
                          sx={{ color: "secondary.main", "&.Mui-checked": { color: "secondary.main" } }}
                        />
                      }
                      label={<Typography variant="body2" sx={{ color: "text.secondary" }}>{t("Remember device for 30 days")}</Typography>}
                    />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <LockOutlinedIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>{t("Strict TLS 1.3")}</Typography>
                    </Box>
                  </Box>

                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    endIcon={!isSubmitting && <ArrowForwardIcon />}
                    sx={{
                      background: gradientBackground,
                      color: "#fff",
                      fontWeight: 600,
                      borderRadius: "12px",
                      py: 1.4,
                      textTransform: "uppercase",
                      fontSize: 16,
                      boxShadow: "none",
                      "&:hover": { background: gradientBackground, opacity: 0.92, boxShadow: "none" },
                      "&.Mui-disabled": { color: "#fff", opacity: 0.7 },
                    }}
                  >
                    {isSubmitting ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : t("Sign In To Your Account")}
                  </Button>
                </Stack>
              </Box>

              <Divider sx={{ my: 4, "&::before, &::after": { borderColor: "background.default" } }}>
                <Typography variant="caption" color="text.secondary">
                  {t("OR INSTANT AUTHANTICATION")}
                </Typography>
              </Divider>

              <Stack spacing={1.5}>
                <Button fullWidth startIcon={<FingerprintIcon />} sx={socialButtonSx}>
                  {t("Authenticate with Passkey / Face ID")}
                </Button>
                <Stack direction="row" spacing={1.5}>
                  <Button fullWidth startIcon={<AppleLogoIcon />} sx={{ ...socialButtonSx, flex: 1 }}>
                    {t("Apple ID")}
                  </Button>
                  <Button fullWidth startIcon={<GoogleLogoIcon />} sx={{ ...socialButtonSx, flex: 1 }}>
                    {t("Google One-Tap")}
                  </Button>
                </Stack>
              </Stack>

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", m: 3, gap: 1 }}>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {t("New to the world of KASHOP?")}
                </Typography>
                <Link component={RouterLink} variant="caption" to="register" sx={{ color: "primary.dark", textDecoration: "none" }} >
                  {t("Apply for Private Membership →")}
                </Link>
              </Box>

            </Box>
          </Container>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ px: { xs: 2, md: 4 }, py: 2, mt: 2, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" } }}>
          <Typography variant="caption" sx={{ fontSize: { xs: "10px", md: "12px" }, }}> {t("Private Client Agreement · Provenance Integrity · Maison Ethics")}</Typography>
          <Typography variant="caption" sx={{ fontSize: { xs: "10px", md: "12px" }, }}> {t("© 2026 KASHOP HAUTE JOAILLERIE · GENÈVE · PARIS · RIYADH")} </Typography>
        </Stack>

      </Box>
    </Box>
  );
}