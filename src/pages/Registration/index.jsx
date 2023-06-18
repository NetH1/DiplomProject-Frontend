import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchAuthRegister } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

export const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const name = useSelector(state => state.name);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: '',
      email: 'bop@bk.ru',
      password: 'Jspoki12'
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuthRegister(values));
    if (!data.payload) return alert('Не удалось зарегистрироваться!');
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
      enqueueSnackbar({message:"Вы успешно зарегистрировались!", variant:"success", autoHideDuration:2000});
      navigate('/');
    }
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: "Укажите имя" })}
          className={styles.field}
          label="Полное имя"
          fullWidth />
        <TextField error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: "Укажите почту" })}
          className={styles.field}
          label="E-Mail"
          fullWidth />
        <TextField error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: "Укажите пароль" })}
          className={styles.field}
          label="Пароль"
          fullWidth />
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
