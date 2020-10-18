import {
  AlignRightOutlined,
  CommentOutlined,
  FileOutlined,
  HomeOutlined,
  MenuOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Menu } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
const NavigationList = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const location = useLocation();
  const [selected, setSelected] = useState("home");


  
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelected("home");
        break;
      case "/news":
        setSelected("news");
        break;
      case "/opinion":
        setSelected("opinion");
        break;
      case "/blog":
        setSelected("blog");
        break;
      case "/trending":
        setSelected("trending");
        break;
      default:
        setSelected("");
        break;
    }
  }, [location.pathname]);
  return (
    <div className="flex sm:w-full justify-end">
      <nav className="hidden sm:flex w-full justify-center">
        <Menu
          onClick={(e) => setSelected(e.key)}
          selectedKeys={[selected]}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Menu.Item
            key="home"
            icon={<HomeOutlined style={{ fontSize: "20px" }} />}
            style={{ margin: "0 8px" }}
          >
            <Link to="/">गृह पृष्ठ</Link>
          </Menu.Item>
          <Menu.Item
            key="news"
            icon={<AlignRightOutlined style={{ fontSize: "20px" }} />}
            style={{ margin: "0 8px" }}
          >
            <Link to="/">समाचार</Link>
          </Menu.Item>
          <Menu.Item
            key="opinion"
            icon={<CommentOutlined style={{ fontSize: "20px" }} />}
            style={{ margin: "0 8px" }}
          >
            <Link to="/">बिचार</Link>
          </Menu.Item>
          <Menu.Item
            key="blog"
            icon={<FileOutlined style={{ fontSize: "20px" }} />}
          >
            <Link to="/">ब्लग</Link>
          </Menu.Item>
          <Menu.Item
            key="trending"
            icon={<RiseOutlined style={{ fontSize: "20px" }} />}
            style={{ margin: "0 8px" }}
          >
            <Link to="/">ट्रेंडिंग</Link>
          </Menu.Item>
        </Menu>
      </nav>
      <Drawer
        title="सत्य सन्देश"
        placement="right"
        closable={true}
        onClose={() => setShowDrawer(false)}
        visible={showDrawer}
      >
        <Menu
          mode="vertical"
          onClick={(e) => setSelected(e.key)}
          selectedKeys={[selected]}
        >
          <Menu.Item
            key="home"
            icon={<HomeOutlined style={{ fontSize: "20px" }} />}
            style={{ margin: "0 8px" }}
          >
            <Link to="/">गृह पृष्ठ</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            key="news"
            icon={<AlignRightOutlined style={{ fontSize: "20px" }} />}
            style={{ margin: "0 8px" }}
          >
            <Link to="/">समाचार</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            key="opinion"
            icon={<CommentOutlined style={{ fontSize: "20px" }} />}
            style={{ margin: "0 8px" }}
          >
            <Link to="/">दृष्टिकोण</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            key="blog"
            icon={<FileOutlined style={{ fontSize: "20px" }} />}
          >
            <Link to="/">ब्लग</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            key="trending"
            icon={<RiseOutlined style={{ fontSize: "20px" }} />}
            style={{ margin: "0 8px" }}
          >
            <Link to="/">ट्रेंडिंग</Link>
          </Menu.Item>
        </Menu>
      </Drawer>
      <div className="flex sm:hidden mx-4">
        <Button
          icon={<MenuOutlined />}
          size={"large"}
          onClick={() => setShowDrawer(!showDrawer)}
        />
      </div>
    </div>
  );
};

export default NavigationList;
