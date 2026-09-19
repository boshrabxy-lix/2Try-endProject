import React, { useState } from "react";
import { Button, TextField, Typography, Box, Link, Chip, Stack, Avatar, IconButton, InputAdornment, Divider, Container } from "@mui/material";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../../../validation/RegisterSchema";
import CircularProgress from "@mui/material/CircularProgress";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18next";


export default function Register() {
  const { t } = useTranslation()
  const theme = useTheme();
  const [ServerErrors, setServerErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(registerSchema)
  });

  const gradientBackground = `linear-gradient(90deg, ${theme.palette.secondary.main} 0%, #F1A9D6 100%)`;
  const fieldLabelArSx = { fontSize: 13, color: " text.secondary" };
  const fieldLabelSx = { fontSize: 14, fontWeight: 700, color: "primary.dark" };
  const pillInputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      bgcolor: "#E7F6FF",
      "& fieldset": { border: "none" },
      "&.Mui-focused fieldset": { border: "1px solid ", borderColor: "primary.main" },
    },
  };

  const registerForm = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BURL}/auth/Account/Register`, data,);
      console.log("responce", response);
    } catch (err) {
      console.log(err.response.data.errors);
      setServerErrors(err.response.data.errors);
    }
  };
  const changeLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: "flex", alignItems: "center", justifyContent: "center", p: { xs: 1.5, sm: 2 }, bgcolor: '#fff' }} >
      <Box sx={{ width: "90%", px: 2 }} >

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
                  <LanguageOutlinedIcon onClick={changeLanguage} sx={{ fontSize: 18, color: "secondary.dark" }} />
                  <Typography variant="caption" sx={{ color: "#1A1A1A", fontWeight: 500, whiteSpace: "nowrap" }} > العربية / English </Typography>
                </Box>
              </IconButton>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, borderRadius: "16px", boxShadow: ".5px 30px 70px -30px rgba(22, 11, 23, 0.58)", }}>
          <Box
            sx={{
              flex: { md: "0 0 42%" }, minHeight: { xs: 200, sm: 260, md: 600 }, position: "relative",
              background: `linear-gradient(135deg, rgba(41, 20, 30, 0.55) 0%, rgba(20, 10, 15, 0.13) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuByKzUxyjJUNSTzAleWQ6liRhm4yf5kLuPQl9wwJdHBnSerGH0vvC6HssA83uusnysm7GcpivRt5299n0LBYCOtVj7TyPoLMsQXYBGUveKn8js8bf_3DG8sLQeU9hn3G_9n1zS4wHrDF5wjh4jR3Cbp6KHHC9tmB3QuNYgh9F1L1yMbCRFKkkB2LGCUi1hPHocBXSSylyyux2_sAfGEBiGEqMnlIPhOoFT_QliAKAAGJ0IMuFV-m5E')`,
              backgroundSize: "cover", backgroundPosition: "center", borderRadius: { xs: "16px 16px 0 0", md: "16px 0 0 16px" },
              backgroundRepeat: "no-repeat", p: { xs: 3, md: 4 }, display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#fff",
            }}>

            <Chip
              label={t("LE CERCLE PRIVÉ · MAISON KASHOP")}
              size="small"
              sx={{
                alignSelf: "flex-start", bgcolor: "rgba(255,255,255,0.12)", color: "#fff", fontSize: 10,
                letterSpacing: 1, fontWeight: 600, backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.2)",
              }}
            />

            <Box sx={{ position: "relative" }}>
              <Typography sx={{ fontSize: 11, letterSpacing: 2, fontWeight: 700, color: "primary.main", mb: 1.5, mt: 1.5, textTransform: "uppercase" }}>
                {t("The Atelier Membership")}
              </Typography>

              <Typography sx={{ fontSize: { xs: 26, md: 30 }, lineHeight: 1.3, fontWeight: 400 }}>
                {t("Timeless elegance,")} <br />
                <Box component="span" sx={{ fontStyle: "italic", color: "primary.main" }}>
                  {t("bespoke sanctuary")}
                </Box>
              </Typography>

              <Typography variant="body2" sx={{ opacity: 0.85, mt: 2, mb: 3, pr: 2 }}>
                {t("Elevate the everyday into an ethereal experience of curated modern luxury and master craftsmanship.")}
              </Typography>

              <Typography variant="body2" dir="rtl" sx={{ opacity: 0.85, textAlign: "right", px: 3 }}>
                {t(" أناقة خالدة، وامتيازات حصرية تنقلك إلى أفق رفيع من الفخامة والسكينة في دار KASHOP.")}
              </Typography>
            </Box>

            <Box>
              <Divider sx={{ borderColor: "primary.main", opacity: 0.8, my: 3 }} />
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                  <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "primary.light" }} />
                  <Typography variant="caption" sx={{ fontSize: '10px', letterSpacing: 1, color: 'rgba(255,255,255,0.75)' }}>
                    {t("PRIVATE CONCIERGE ACCESS")}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ fontSize: '10px', letterSpacing: 1, color: 'rgba(255,255,255,0.75)' }}>
                  EST. 2024
                </Typography>
              </Box>
            </Box>
          </Box>

          <Container maxWidth="md" px={{ xs: 2, sm: 4, md: 6 }}>
            <Box sx={{ flex: 1, px: { xs: 2.5, sm: 4, md: 6 }, py: { xs: 3, md: 4 } }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "primary.dark", }}>{t("New Member")} </Typography>
                <Typography sx={{ fontSize: 16, fontWeight: 500, color: "secondary.dark" }}>
                  {t("Join the world of KASHOP")}
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit(registerForm)} >
                <Typography variant="h4" sx={{ fontSize: { xs: 26, md: 32 }, fontWeight: 500, lineHeight: 1.2 }} > {t("Create Your Account")} </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary", mt: 1, mb: 3, }}>
                  {t("Create your private credentials to unlock reserved acquisitions and personalized consultations.")}
                </Typography>

                {ServerErrors?.length > 0
                  ? ServerErrors.map((error, i) => (
                    <Typography key={i} color="error" sx={{ mb: 1 }}>
                      {error}
                    </Typography>
                  ))
                  : ""}

                <Stack spacing={2.5}>
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
                      <Typography sx={fieldLabelSx}>User Name</Typography>
                      <Typography sx={fieldLabelArSx}>اسم المستخدم</Typography>
                    </Box>
                    <TextField
                      {...register("userName")}
                      fullWidth
                      placeholder="alistair_v"
                      variant="outlined"
                      error={errors.userName}
                      helperText={errors.userName?.message}
                      sx={pillInputSx}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <PersonOutlinedIcon sx={{ color: "text.secondary" }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
                      <Typography sx={fieldLabelSx}>Full Name</Typography>
                      <Typography sx={fieldLabelArSx}>الاسم الكامل</Typography>
                    </Box>
                    <TextField
                      {...register("fullName")}
                      fullWidth
                      placeholder="Alistair Vance"
                      variant="outlined"
                      error={errors.fullName}
                      helperText={errors.fullName?.message}
                      sx={pillInputSx}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <BadgeOutlinedIcon sx={{ color: "text.secondary" }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
                      <Typography sx={fieldLabelSx}>Email Address</Typography>
                      <Typography sx={fieldLabelArSx}>البريد الإلكتروني</Typography>
                    </Box>
                    <TextField
                      {...register("email")}
                      fullWidth
                      placeholder="name@domain.com"
                      variant="outlined"
                      error={errors.email}
                      helperText={errors.email?.message}
                      sx={pillInputSx}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <EmailOutlinedIcon sx={{ color: "text.secondary" }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
                      <Typography sx={fieldLabelSx}>Create Password</Typography>
                      <Typography sx={fieldLabelArSx}>كلمة المرور</Typography>
                    </Box>
                    <TextField
                      {...register("password")}
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••"
                      variant="outlined"
                      error={errors.password}
                      helperText={errors.password?.message}
                      sx={pillInputSx}
                      slotProps={{
                        input: {
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

                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
                      <Typography sx={fieldLabelSx}>Phone Number</Typography>
                      <Typography sx={fieldLabelArSx}>رقم الهاتف</Typography>
                    </Box>
                    <TextField
                      {...register("phoneNumber")}
                      fullWidth
                      placeholder="05X XXX XXXX"
                      variant="outlined"
                      error={errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                      sx={pillInputSx}
                      slotProps={{
                        input: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <PhoneOutlinedIcon sx={{ color: "text.secondary" }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
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
                    {isSubmitting ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : t("Create Your Account")}
                  </Button>
                </Stack>
              </Box>

              <Divider sx={{ my: 3, "&::before, &::after": { borderColor: "background.default" } }}>
                <Typography variant="caption" color="text.secondary">
                  {t("OR INSTANT SIGN-UP")}
                </Typography>
              </Divider>

              <Typography sx={{ textAlign: "center", color: "text.secondary", mt: 3 }}>
                {t("Already have an account?")}
                <Link component={RouterLink} to="/auth" sx={{ color: "primary.dark", fontWeight: 600, textDecoration: "none" }} > {t("Sign in →")} </Link>
              </Typography>
            </Box>
          </Container>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ px: { xs: 2, md: 4 }, py: 2, mt: 2, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" } }}>
          <Typography variant="caption" > {t("Private Client Agreement · Provenance Integrity · Maison Ethics")} </Typography>
          <Typography variant="caption"> {t("© 2026 KASHOP HAUTE JOAILLERIE · GENÈVE · PARIS · RIYADH")} </Typography>
        </Stack>

      </Box>
    </Box>
  );
}