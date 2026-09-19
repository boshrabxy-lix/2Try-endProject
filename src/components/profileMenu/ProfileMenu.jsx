import { React, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import useAuthStore from '../../store/useAuthStore';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import { useTranslation } from 'react-i18next';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoginIcon from '@mui/icons-material/Login';
import Swal from 'sweetalert2';


export default function ProfileMenu() {
    const navigate = useNavigate();
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        logout();
        Swal.fire({
            icon: 'success',
            title: 'You have been successfully logged out.',
            text: 'You have been successfully logged out.',
            confirmButtonText: 'Okay'
        })
        navigate("/login");
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}             
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open}
                    >
                        <PersonOutlineOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose} sx={{ "&:hover": { color: "primary.dark" } }} >
                    <Avatar sx={{ mx: 2,  backgroundColor: "primary.dark" }} />
                    <Link to={"/profile"} underline="none" 
                        component={RouterLink} sx={{ mx: 1,color: "primary.dark" ,}}>{t('Profile')}</Link>
                </MenuItem>

                <Divider />

                {token ? (
                    <>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <ExitToAppIcon fontSize="small" />
                            </ListItemIcon>
                            <Link
                                component={"button"}
                                onClick={handleLogout}
                                underline="none"
                                sx={{
                                       color: "primary.dark" ,
                                    display: { xs: "none", sm: "flex" },
                                    fontWeight: 500,
                                    fontSize: "0.9rem",
                                    "&:hover": { color: "primary.main" },
                                }}
                            >
                                {t('Logout')}
                            </Link>
                        </MenuItem>
                    </>
                ) : (
                    <>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <LoginIcon fontSize="small" />
                            </ListItemIcon>
                            <Link
                                to={"/auth"}
                                component={RouterLink}
                                underline="none"
                                sx={{
                                       color: "primary.dark" ,
                                    display: { xs: "none", sm: "flex" },
                                    fontWeight: 500,
                                    fontSize: "0.9rem",
                                    "&:hover": { color: "primary.main" },
                                }}
                            >
                                {t('Login')}

                            </Link>
                        </MenuItem>

                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <HowToRegIcon fontSize="small" />
                            </ListItemIcon>
                            <Link
                                to={"auth/register"}
                                component={RouterLink}
                                underline="none"
                                sx={{
                                       color: "primary.dark" ,
                                    display: { xs: "none", sm: "flex" },
                                    fontWeight: 500,
                                    fontSize: "0.9rem",
                                    "&:hover": { color: "primary.main" },
                                }}
                            >
                                {t('Register')}
                            </Link>
                        </MenuItem>

                    </>
                )}


                <MenuItem onClick={handleClose} >
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    <Link
                        to={"auth/"}
                        component={RouterLink}
                        underline="none"
                        sx={{
                            color: "primary.dark" ,
                            display: { xs: "none", sm: "flex" },
                            fontWeight: 500,
                            fontSize: "0.9rem",
                            "&:hover": { color: "primary.main" },
                        }}
                    >
                        {t('Add another account')}
                    </Link>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    <Link
                        to={"profile"}
                        component={RouterLink}
                        underline="none"
                        sx={{
                               color: "primary.dark" ,
                            display: { xs: "none", sm: "flex" },
                            fontWeight: 500,
                            fontSize: "0.9rem",
                            "&:hover": { color: "primary.main" },
                        }}
                    >
                        {t('Settings')}
                    </Link>
                </MenuItem>
            </Menu>
        </>
    );
}