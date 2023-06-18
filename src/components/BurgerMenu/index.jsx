import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { LogOut } from '../../store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { Button } from '@mui/material';

const BurgerMenu = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const onClickLogout = () => {
        if (window.confirm("Вы действительно хотите выйти?")) {
            dispatch(LogOut());
            enqueueSnackbar({ message: "Вы успешно вышли!", variant: "success", autoHideDuration: 2000 });
            window.localStorage.removeItem('token');
            setAnchorEl(null);
            window.location.href('/');
        }
    };
    return (
        <React.Fragment>
            {
                user ? (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
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
                                    '&:before': {
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
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleClose}>
                                <Link style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#000' }} to={'/myprofile'}>
                                    {user.avatarUrl ? (
                                        <Avatar src={`http://localhost:5000${user.avatarUrl}`} />
                                    ) : (
                                        <Avatar src="/noavatar.png" />
                                    )} {user.fullName}
                                </Link>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleClose}>
                                <Link style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#000' }} to={'/add-post'}>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Написать статью
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={onClickLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Выйти
                            </MenuItem>
                        </Menu>
                    </>
                )
                    : (
                        <>
                            <Link style={{ marginRight: 20 }} to="/login">
                                <Button variant="outlined">Войти</Button>
                            </Link>
                            <Link to="/registration">
                                <Button variant="contained">Создать аккаунт</Button>
                            </Link>
                        </>
                    )
            }
        </React.Fragment>
    );
};


export default BurgerMenu;