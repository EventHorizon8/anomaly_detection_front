'use client';
import React, {useCallback} from 'react';
import classes from "./TopBar.module.scss";
import {useDispatch} from "react-redux";
import {accountCleanup} from "@/store/account/account-slice";
import {useAppSelector} from "@/hooks/store-hooks";
import {getAccountData} from "@/store/account/account-selectors";
import Link from "next/link";

const TopBar = () => {
  const accountData = useAppSelector(getAccountData);
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(accountCleanup());
  }, [dispatch]);

  return (
    <div className={classes.TopBar}>
      <div className={classes.TopBar__Menu}>
        <Link href="/dashboard">Главная</Link>
      </div>
      <div className={classes.TopBar__UserName}>
        {accountData.name}
      </div>
      <button
        onClick={logout}
        className={classes.TopBar__Exit}
      >
        выйти
      </button>
    </div>
  )
}

export default TopBar;
