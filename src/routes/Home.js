import React, { PureComponent } from "react";
import {
  Form,
  Input,
  Button,
  message,
  Table,
  Layout,
  Card,
  Divider,
  Modal,
} from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import logo from "../assets/logo.png";
import music from "../assets/music.mp3";
import "./Home.css";

const { Header, Content, Footer } = Layout;
const FormItem = Form.Item;
const { TextArea } = Input;

export default class Home extends PureComponent {
  formRef = React.createRef();
  state = {
    visible: false,
    data: null,
    tableData: [],
    word: "",
  };

  componentDidMount() {
    this.getTableList();
    this.audioValue.src = music;
    this.audioValue.play();
  }

  // research
  onSearch = (values) => {
    this.setState({ word: values.word }, () => {
      this.getTableList();
    });
  };

  // List
  getTableList = () => {
    const { word } = this.state;
    const list = localStorage.getItem("word-list")
      ? JSON.parse(localStorage.getItem("word-list"))
      : [];
    const newList = [];
    if (word) {
      list.forEach((item) => {
        if (item.word.indexOf(word) > -1) {
          newList.push(item);
        }
      });
      this.setState({ tableData: newList });
    } else {
      this.setState({ tableData: list });
    }
  };

  // Modify
  handleSubmit = (values) => {
    const { data } = this.state;
    const list = localStorage.getItem("word-list")
      ? JSON.parse(localStorage.getItem("word-list"))
      : [];
    const existingWord = list.find((item) => item.word === values.word);
    const isHaveWord =
      existingWord && ((data && data.id !== existingWord.id) || !data);
    const newList = [];
    if (isHaveWord) {
      message.error("Word已存在");
    } else {
      if (data) {
        list.forEach((item) => {
          if (item.id === data.id) {
            newList.push({ ...values, id: data.id });
          } else {
            newList.push(item);
          }
        });
        localStorage.setItem("word-list", JSON.stringify(newList));
        this.setState(
          {
            visible: false,
          },
          () => {
            this.getTableList();
          }
        );
      } else {
        list.push({ ...values, id: new Date().getTime() });
        localStorage.setItem("word-list", JSON.stringify(list));
        this.setState(
          {
            visible: false,
          },
          () => {
            this.getTableList();
          }
        );
      }
    }
  };

  // Delete
  handleDel = (id) => {
    const list = localStorage.getItem("word-list")
      ? JSON.parse(localStorage.getItem("word-list"))
      : [];
    const afterDelList = [];
    list.forEach((item) => {
      if (item.id !== id) {
        afterDelList.push(item);
      }
    });
    localStorage.setItem("word-list", JSON.stringify(afterDelList));
    setTimeout(() => {
      this.getTableList();
    }, 100);
  };

  // Logout
  handleLogout = () => {
    window.location.href = "/login";
  };

  render() {
    const { visible, data, tableData } = this.state;

    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 16,
      },
    };

    const columns = [
      {
        title: "Word",
        dataIndex: "word",
      },
      {
        title: "Description",
        dataIndex: "description",
      },
      {
        title: "Operat",
        render: (text, item) => (
          <>
            <Button
              onClick={() => {
                this.setState({ visible: true, data: item });
              }}
              type="link"
            >
              Edit
            </Button>
            <Divider type="vertical" />
            <Button onClick={() => this.handleDel(item.id)} type="link">
              Delete
            </Button>
          </>
        ),
      },
    ];
    return (
      <Layout>
        <Header className="flex">
          <img src={logo} className="logo" alt="" />
          <div className="flex-all">
            <audio
              ref={(audio) => {
                this.audioValue = audio;
              }}
              controls
              preload="none"
              loop
              controlsList="nodownload"
            >
              <track kind="captions" />

            </audio>
          </div>
          <div onClick={this.handleLogout} className="logout">
            Logout
          </div>
        </Header>
        <Content style={{ padding: "0 50px", marginTop: 24 }}>
          <Card>
            <div className="flex">
              <Form
                ref={this.formRef}
                name="table"
                layout="inline"
                onFinish={this.onSearch}
              >
                <FormItem name="word">
                  <Input placeholder="word" />
                </FormItem>
                <FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                  />
                  <Button
                    className="ml-16"
                    onClick={() => {
                      this.formRef.current.resetFields();
                    }}
                    type="link"
                  >
                    Reset
                  </Button>
                </FormItem>
              </Form>
              <div className="flex-all" />
              <Button
                onClick={() => this.setState({ visible: true })}
                type="primary"
                icon={<PlusOutlined />}
              />
            </div>
            <Table rowKey="id" dataSource={tableData} columns={columns} />
            <Modal
              visible={visible}
              title={data ? "Edit" : "Create"}
              onCancel={() => {
                this.setState({ visible: false, data: null });
              }}
              destroyOnClose
              onOk={() => this.formRef.current.submit()}
            >
              <Form
                ref={this.formRef}
                name="form_in_modal"
                onFinish={this.handleSubmit}
                {...formItemLayout}
                initialValues={{ ...data }}
              >
                <Form.Item
                  name="word"
                  label="Word"
                  rules={[
                    {
                      required: true,
                      message: "Please input the word!",
                    },
                  ]}
                >
                  <Input placeholder="please input" />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "Please input the description",
                    },
                  ]}
                >
                  <TextArea rows={3} placeholder="Please input" />
                </Form.Item>
              </Form>
            </Modal>
          </Card>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          copyright ©2020 Created by me
        </Footer>
      </Layout>
    );
  }
}
