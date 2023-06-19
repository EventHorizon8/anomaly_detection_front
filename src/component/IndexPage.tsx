'use client';
import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";
import {useAppSelector} from "@/hooks/store-hooks";
import {getAccessToken} from "@/store/account/account-selectors";

const IndexPage = () => {
  const router = useRouter();
  const accessToken = useAppSelector(getAccessToken);

  useEffect(() => {
    if (accessToken) {
      router.push('/dashboard');
    } else {
      router.push('/login')
    }
  }, [accessToken, router]);
  return (
    <>
    </>
  )
};

export default IndexPage;
