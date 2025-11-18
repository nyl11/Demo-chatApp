import { useLocation, Link } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className="w-60 h-screen bg-gray-100 shadow-md p-4 flex flex-col gap-3">
      {/* Home */}
      <div className={`sidebar-item ${pathname === '/' ? 'bg-blue-100 rounded' : ''}`}>
        <Link 
          to="/" 
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold"
        >
          Home
        </Link>
      </div>

      {/* Stats */}
      <div className={`sidebar-item ${pathname === '/stats' ? 'bg-blue-100 rounded' : ''}`}>
        <Link 
          to="/stats" 
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold"
        >
          Stats
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
