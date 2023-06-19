'use client';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/hooks/store-hooks";
import {getAccessToken, isAccountLoggedIn} from "@/store/account/account-selectors";
import {useRouter} from "next/navigation";
import {loadAccountData} from "@/store/account/account-thunks";

const AuthRequired = (
  { children }: { children: React.ReactNode }
) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(getAccessToken);
  const isAuthenticated = useAppSelector(isAccountLoggedIn);

  // Если данные пользователя не загружены, но есть токен - пытаемся их загрузить
  useEffect(() => {
    if (!isAuthenticated && accessToken) {
      dispatch(loadAccountData({}));
    }
  }, [accessToken, isAuthenticated, dispatch]);

  // Если даже токена нет - валим на страницу авторизации
  useEffect(() => {
    if (!accessToken) {
      router.push('/login')
    }
  }, [accessToken, router]);

  return <>
    { isAuthenticated ? children : ''}
  </>
};

export default AuthRequired;
