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
    //setLoading(false);
  }

  //Fallback user information if session is not available
  const userEmail = session?.user?.email ?? "user@example.com";
  const userName = session?.user?.name ?? "User's Name";

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
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            WELCOME, {userName}!
          </h1>
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
