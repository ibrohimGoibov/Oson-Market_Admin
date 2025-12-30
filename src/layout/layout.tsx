import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom } from '../atom/state/loginApi/loginApi';
import '../App.css';

const Layout = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <div>
      <header className="flex items-center justify-evenly">
        <ul className="flex items-center justify-center gap-[20px] p-[10px] text-[18px]">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/category">Category</Link></li>
          <li><Link to="/subCategories">SubCategories</Link></li>
          <li><Link to={'/product'}>Product</Link></li>
        </ul>

        <div className="relative group cursor-pointer">
          <div className="flex items-center gap-[8px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0a2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1s1-4 6-4s6 3 6 4" />
            </svg>

            {!auth.token && (
              <Link to="/login">Вход</Link>
            )}
          </div>

          {auth.token && (
            <div className="absolute right-0 top-[30px] w-[200px] bg-white shadow-lg rounded-[10px] p-[12px] opacity-0 group-hover:opacity-100 transition-all">
              <p className="font-[600]">
                {auth.user?.userName}
              </p>

              <button
                className="mt-[10px] text-red-500 text-[14px]"
                onClick={handleLogout}
              >
                Выйти
              </button>
            </div>
          )}
        </div>
      </header>

      <Outlet />
    </div>
  );
};

export default Layout;
