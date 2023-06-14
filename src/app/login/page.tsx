'use client';
import React, {useCallback, useState} from 'react';
import classes from './login.module.scss';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const onLogin = useCallback(() => {

  }, []);

  return (
    <div className={classes.LoginPage}>
      <div className={classes.LoginWindow}>
        <h1>Вход</h1>
        <form
          className={classes.LoginForm}
          onSubmit={onLogin}
        >
          {/*{(!!errorText) && (*/}
          {/*  <div className={styles.LoginForm__error}>{errorText}</div>*/}
          {/*)}*/}

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
