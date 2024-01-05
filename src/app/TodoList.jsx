import React from "react";
import TaskForm from "../components/TaskForm";
import { Breadcrumb, Layout, Menu, theme, Typography } from "antd";

const { Header, Content, Footer } = Layout;

const TodoList = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const rightMenuItems = ["Login", "Sign Up"].map((item) => (
    <Menu.Item key={item}>{item}</Menu.Item>
  ));
  return (
    <Layout>
      <Header
        className="header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="logo" style={{ color: "#fff" }}>
          <h1>myTODO </h1>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          {rightMenuItems}
        </Menu>
      </Header>{" "}
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Typography.Title level={2}>Add your Task here!</Typography.Title>
          <TaskForm />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default TodoList;
