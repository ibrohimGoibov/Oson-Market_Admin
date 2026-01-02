import { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Space } from "antd";
import { useRegisterStore } from "../../../atom/state/store/store";
import { Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { postAccountLogin } = useRegisterStore();

  const handleLogin = () => {
    if (userName == 'SuperAdmin' && password == 'SuperAdmin2024') {
      postAccountLogin({
        userName: userName,
        password,
      });
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center px-4 mt-[-40px]">
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-semibold mb-6">
        Log in
      </h1>

      <div className="relative mb-4">
        <UserOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Email or username"
          className="w-full bg-white border-[#2563EB] text-black rounded-md px-12 py-3
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="relative mb-2">
        <LockOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
        <input
          type={show ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full bg-white border-[#2563EB] text-black rounded-md px-12 py-3 pr-12
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {show ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771z"/>
              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823z"/>
              <path d="M13.646 14.354 1.646 2.354l.708-.708 12 12z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5"/>
            </svg>
          )}
        </button>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: "#2563eb",
              colorPrimaryHover: "#1d4ed8",
            },
          },
        }}
      >
        <Space direction="vertical" className="w-full">
          <button
            disabled={!userName || !password}
            onClick={handleLogin}
            className="h-12 text-lg font-semibold mt-[20px] rounded-md w-[450px] text-white border bg-[#2563EB]"
          >
            Log in
          </button>
        </Space>
      </ConfigProvider>
    </div>
  </div>
);

};

export default Login;
