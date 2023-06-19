'use client';
import React, {useCallback, useEffect, useState} from 'react';
import classes from './login.module.scss';
import {useAppDispatch, useAppSelector} from "@/hooks/store-hooks";
import {getAccessToken, isAccountLoggedIn} from "@/store/account/account-selectors";
import {loadAccountData, login} from "@/store/account/account-thunks";
import {useRouter} from "next/navigation";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(isAccountLoggedIn);
  const accessToken = useAppSelector(getAccessToken);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [inProgress, setInProgress] = useState(false);

  // Если есть токен, но нет ID - загружаем данные аккаунта
  useEffect(() => {
    if (!isAuthenticated && accessToken) {
      dispatch(loadAccountData({}));
    }
  }, [isAuthenticated, dispatch, accessToken]);

  // Если аккаунт авторизован, автоматически уходим на домашнюю страницу
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const onLogin = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    setInProgress(true);
    setErrorText('');

    dispatch(login({ email, password })).then((result) => {
      if (typeof result.payload.errorCode !== 'undefined') {
        setInProgress(false);
        setErrorText('Неправильный логин или пароль');
        setPassword('');
      }
    });
  }, [email, password, dispatch]);

  return (
    <div className={classes.LoginPage}>
      <div className={classes.LoginWindow}>
        <h1>Вход</h1>
        <form
          className={classes.LoginForm}
          onSubmit={onLogin}
        >
          {(!!errorText) && (
            <div className={classes.LoginForm__error}>{errorText}</div>
          )}

          <div className={classes.LoginForm__Field}>
            <input
              value={email}
              onChange={(eventData) => setEmail(eventData.currentTarget.value)}
              type="text"
              id="loginEmail"
              placeholder="Email"
              required={true}
            />
          </div>

          <div className={classes.LoginForm__Field}>
            <input
              value={password}
              onChange={(eventData) => setPassword(eventData.currentTarget.value)}
              type="password"
              id="loginPassword"
              placeholder="Password"
              required={true}
            />
          </div>

          <div className={classes.LoginForm__Field}>
            <button
              type="submit"
              disabled={inProgress}
            >
              { inProgress ? 'Входим...' : 'Войти'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
};

export default LoginPage;
