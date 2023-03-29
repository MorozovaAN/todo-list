import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../../../common/hooks/useTypedSelector";
import { login } from "../authSlice/authThunk";
import { authActions, isLoggedInSelector } from "../index";
import { useAction } from "../../../common/hooks/useActions";
import "./Login.css";

type FormikErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export const Login = () => {
  const { login } = useAction(authActions);
  const isLoggedIn = useTypedSelector(isLoggedInSelector);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {};

      if (!values.email) {
        errors.email = "Обязательное поле";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Не корректный адрес почты";
      }

      if (!values.password) {
        errors.password = "Обязательное поле";
      } else if (values.password.length < 6) {
        errors.password = "Пароль должен содержать не менее 6 символов";
      }

      return errors;
    },
    onSubmit: (values) => {
      login(values);
    },
  });

  if (isLoggedIn) {
    return <Navigate to="/todo-lists-app" />;
  }

  const useDemoAccountHandler = () => {
    login({
      email: "MorozovaAnastasiyaN@yandex.ru",
      password: "c539491b44",
      rememberMe: true,
    });
  };

  return (
    <Grid container justifyContent="center" rowGap="30px">
      <FormControl>
        <h2 className="login__form-title">Вход в приложение Todo lists</h2>

        <form onSubmit={formik.handleSubmit} className="login__form">
          <FormGroup classes={{ root: "login__form-container" }}>
            <TextField
              label={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : "Почта"
              }
              margin="normal"
              error={!!(formik.touched.email && formik.errors.email)}
              {...formik.getFieldProps("email")}
            />

            <TextField
              type="password"
              label={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : "Пароль"
              }
              error={!!(formik.touched.password && formik.errors.password)}
              margin="normal"
              {...formik.getFieldProps("password")}
            />

            <FormControlLabel
              label="Запомнить меня"
              control={
                <Checkbox
                  {...formik.getFieldProps("rememberMe")}
                  checked={formik.values.rememberMe}
                />
              }
            />

            <div className="login__form__buttons">
              <Button type="submit" variant="contained" color="primary">
                Войти
              </Button>
              <Button variant="outlined" onClick={useDemoAccountHandler}>
                Демо-аккаунт
              </Button>
            </div>

            <a
              className="login__sign-up"
              href="https://social-network.samuraijs.com/"
              target="_blank"
            >
              Зарегистрироваться
            </a>
          </FormGroup>
        </form>
      </FormControl>
    </Grid>
  );
};
