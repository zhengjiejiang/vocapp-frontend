import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import "./Register.css";

export default class Register extends PureComponent {
  // Register
  onFinish = (values) => {
    const account = localStorage.getItem("word-account")
      ? JSON.parse(localStorage.getItem("word-account"))
      : [];
    const key = account.find((item) => item.username === values.username);
    if (key) {
      message.error("Username is exist , please try another one");
    } else {
      message.success("Register successfully ~");
      account.push(values);
      localStorage.setItem("word-account", JSON.stringify(account));
      window.location.href = "/Login";
    }
  };

  render() {
    return (
      <div className="register">
        <Form
          name="normal_register"
          className="register-form"
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
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Register
            </Button>
            Already have an account ? <Link to="/Login">Go login!</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
