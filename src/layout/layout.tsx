import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom } from '../atom/state/loginApi/loginApi';
import { ThemeContext } from '../page/state/context/context';
import { useContext } from 'react';
import { Switch } from 'antd';
import '../App.css';

const Layout = () => {
  const [, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  let user = null;
  try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) user = JSON.parse(storedUser);
  } catch (e) {
    localStorage.removeItem('user');
  }

  const themeContext = useContext(ThemeContext);
  if (!themeContext) return null;

  const { theme, toggleTheme } = themeContext;

  const handleLogout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem('auth');
    navigate('/');
  };

  const linkClass =
    'block px-4 py-3 rounded-lg font-medium transition-all hover:translate-x-1 ' +
    (theme === 'dark'
      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
      : 'text-gray-700 hover:bg-blue-600 hover:text-white');

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <header className="h-[64px] flex items-center justify-between px-6 shadow">
        <div className="flex items-center gap-3 font-bold text-xl">
          <span className="text-2xl">🛒</span>
          fasteart
        </div>

        <div className="flex-1 mx-10">
          <div className="relative max-w-[420px] mx-auto">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-blue-500
                         outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        <div className="relative group">
          <div className="flex items-center gap-2 cursor-pointer px-2 py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0a2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1s1-4 6-4s6 3 6 4" />
            </svg>

            {!token && <Link to="/">Вход</Link>}
          </div>

          {token && (
            <div
              className="absolute right-0 top-full mt-2 bg-white text-black
                         shadow-lg rounded-[10px] p-[10px] w-[200px]
                         opacity-0 invisible
                         group-hover:opacity-100 group-hover:visible
                         transition-all duration-200 z-50"
            >
              <p className="font-semibold">
                {user?.userName || user?.name || 'Пользователь'}
              </p>
              <p className="text-gray-500 text-sm">
                {user?.email || ''}
              </p>
              <button
                className="mt-2 text-red-500 text-sm"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  window.location.reload();
                }}
              >
                Выйти
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="flex">
        <aside
          className={`w-[280px] p-6 shadow-xl ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-10 text-center">
            Dashboard
          </h2>

          <nav className="space-y-2">
            <Link to="/home" className={linkClass}>Home</Link>
            <Link to="/category" className={linkClass}>Category</Link>
            <Link to="/subCategories" className={linkClass}>SubCategories</Link>
            <Link to="/product" className={linkClass}>Product</Link>
            <Link to="/color" className={linkClass}>Color</Link>
          </nav>

          <button
            onClick={handleLogout}
            className="mt-10 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-semibold"
          >
            Logout
          </button>

          <div className="mt-6 flex justify-center">
            <Switch
              checked={theme === 'dark'}
              onChange={toggleTheme}
              checkedChildren="🌙"
              unCheckedChildren="☀️"
            />
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div
            className={`rounded-2xl shadow-md p-6 min-h-[90vh] ${
              theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
            }`}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
