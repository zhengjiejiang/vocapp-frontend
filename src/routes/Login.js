import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.css";

export default class Login extends PureComponent {
  // Login
  onFinish = (values) => {
    const account = localStorage.getItem("word-account")
      ? JSON.parse(localStorage.getItem("word-account"))
      : [];
    const isHaveAccount = account.find(
      (item) => item.username === values.username
    );
    if (isHaveAccount) {
      if (isHaveAccount.password === values.password) {
        message.success("Login successfully~");
        window.location.href = "/home";
      } else {
        message.error("Password error , please try again");
      }
    } else {
      message.info("Username error , pleaser try again or create a new one ");
    }
  };

  render() {
    return (
      <div className="login">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            New user ? <Link to="/reg">Register now!</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
