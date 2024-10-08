"use client";
import React from "react";
import { Breadcrumb, Layout, Menu, theme, Button, Spin } from "antd";
import CompanyTable from "../components/table";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Get session data
  const { data: session, status } = useSession();

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

  const userEmail: string = session?.user?.email ?? "user@example.com";
  const userName: string = session?.user?.name ?? "User's Name";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {" "}
      {/* Ensure the Layout takes full height */}
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
            style={{
              color: "white",
              backgroundColor: "#E34234",
              fontWeight: "700",
            }}
            onClick={() => signOut()} // Sign out using next-auth
          >
            Log Out
          </Button>
        </div>
      </Header>
      <Content style={{ padding: "0 48px", flex: "1" }}>
        {" "}
        {/* Flex: 1 to expand */}
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
