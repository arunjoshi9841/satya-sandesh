import React, { useState } from "react";
import { Modal, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Spin } from "antd";
import {
  toggleDialog,
  setError,
  isDialogOpen,
  login,
  error,
} from "./loginSlice";
import { Alert } from "antd";
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const isOpen = useSelector(isDialogOpen);
  const loginError = useSelector(error);
  const closeDialog = () => {
    setEmail("");
    setPassword("");
    setError("");
    dispatch(toggleDialog());
  };
  const handleSubmit = () => {
    setLoading(true);
    dispatch(login(email, password));
    setLoading(false);
  };
  return (
    <Modal
      visible={isOpen}
      width={340}
      onOk={handleSubmit}
      onCancel={closeDialog}
    >
        <Spin size="large" spinning={isLoading}>
      <div
        className="w-full flex flex-col justify-center"
        onClick={() => dispatch(setError(""))}
      >
        <img src="/assets/logo.png" alt="logo" className="w-64 mb-12 transition duration-500 ease-in-out" />
        {loginError !== "" && (
          <div className="py-4">
            <Alert
              message="Error"
              description={loginError}
              type="error"
              showIcon
            />
          </div>
        )}
        <Input
          placeholder="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="pt-4">
          <Input.Password
            placeholder="password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <p className="text-xs text-center pt-4"> *only for official purposes</p>
      </Spin>
    </Modal>
  );
};

export default Login;
