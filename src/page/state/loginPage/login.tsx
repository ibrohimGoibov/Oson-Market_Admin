import { useAtom } from 'jotai';
import { loginAtom } from '../../../atom/state/loginApi/loginApi';
import { useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [, login] = useAtom(loginAtom);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!userName || !password) {
      messageApi.warning('Заполните все поля');
      return;
    }

    const result = await login({ userName, password });

    if (result.success) {
      messageApi.success('Успешный вход');
      navigate('/home');
    } else {
      messageApi.error(result.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {contextHolder}
      <div className="flex flex-col gap-[20px]">
        <input
          className="px-[20px] py-[10px] border border-gray-300 text-[18px]"
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          className="px-[20px] py-[10px] border border-gray-300 text-[18px]"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-amber-400 py-[10px] text-[18px] font-[600]"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
