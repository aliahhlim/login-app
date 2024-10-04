//login-app/app/homepage/page.tsx
"use client";
import React from "react";
import { Breadcrumb, Layout, Menu, theme, Button, Spin, Skeleton } from "antd";
import CompanyTable from "../components/table";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  <Skeleton active />;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Get session data
  const { data: session, status } = useSession();
  //const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === "unauthenticated") signIn();
  }, [status]);

  if (status === "loading") {
    return (
      <div style={{ marginLeft: "700px", marginTop: "400px" }}>
        <Spin size="large" />
      </div>
    );
  }

  //Fallback user information if session is not available
  // interface User {
  //   email?: string;
  //   name?: string;
  // }

  // interface Session {
  //   user?: User;
  // }

  // const userEmail: string = session?.user?.email ?? "user@example.com";
  // const userName: string = session?.user?.name ?? "User's Name";
  const userEmail: string = session?.user?.email ?? "user@example.com";
  const userName: string = session?.user?.name ?? "User's Name";
  //const userId: string = session?.user?.id ?? "Unknown ID";

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: "white", marginRight: "20px" }}>
            {userEmail}
          </span>
          <Button
            type="primary"
            onClick={() => signOut()} // Sign out using next-auth
          >
            Log Out
          </Button>
        </div>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
        />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <h1
            style={{ fontSize: "30px", fontWeight: "bold", marginTop: "10px" }}
          >
            WELCOME, {userName}!
          </h1>
          <span style={{ color: "white", marginRight: "20px" }}>
            {userEmail}
          </span>

          <CompanyTable />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Home Page ©{new Date().getFullYear()} Created by 'Aliah'
      </Footer>
    </Layout>
  );
};

export default App;
