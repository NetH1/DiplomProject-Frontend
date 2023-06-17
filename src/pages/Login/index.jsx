import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthLogin } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  // const name = useSelector(state => state.name);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: 'bop@bk.ru',
      password: 'Jspoki12'
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
   const data = await dispatch(fetchAuthLogin(values));
    if(!data.payload) return alert('Не удалось авторизоваться!');
    if('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
      navigate('/');
    }
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: "Укажите почту" })}
          fullWidth
        />
        <TextField className={styles.field} label="Пароль" error={Boolean(errors.password?.message)} helperText={errors.password?.message} {...register('password', { required: "Укажите пароль" })} fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
