import React from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut } from '../../store/authSlice';
import { enqueueSnackbar } from 'notistack';
import BurgerMenu from '../BurgerMenu';

export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const onClickLogout = () => {
    if(window.confirm("Вы действительно хотите выйти?")) {
      dispatch(LogOut());
    enqueueSnackbar({message:"Вы успешно вышли!", variant:"success", autoHideDuration:2000});
    window.localStorage.removeItem('token');
    window.location.href('/');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            MERN BLOG
          </Link>
          <div className={styles.burger_icon}>
            <BurgerMenu />
          </div>
          <div className={styles.buttons}>
            {user ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Link to="/myprofile">
                  <Button variant="contained">Профиль</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/registration">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
