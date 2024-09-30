"use client";
import React from "react";
import { Breadcrumb, Layout, Menu, theme, Button } from "antd";
import CompanyTable from "../components/table";
//import { signOut, useSession } from "next-auth/react";
//import Email from "next-auth/providers/email";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const userEmail = "user@example.com";

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
            onClick={() => console.log("Sign Out Clicked")}
            href="/users"
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
            WELCOME, USER'S NAME!
          </h1>
          <CompanyTable />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Home Page ©{new Date().getFullYear()} Created by 'Aliah
      </Footer>
    </Layout>
  );
};

export default App;
