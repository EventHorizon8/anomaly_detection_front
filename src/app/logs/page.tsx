import React from 'react';
import TopBar from "@/component/layout/TopBar/TopBar";
import AuthRequired from "@/component/layout/AuthRequired/AuthRequired";
import Logs from "@/component/Logs/Logs";

const LogsPage: React.FC = () => {
  return (
    <AuthRequired>
      <TopBar />
      <Logs />
    </AuthRequired>
  )
};

export default LogsPage;
