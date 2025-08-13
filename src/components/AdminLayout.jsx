import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Button style helper
  const getButtonClasses = (path) => {
    const isActive = location.pathname === path;
    return `px-5 py-2 rounded-lg font-medium transition-colors duration-200
      ${
        isActive
          ? "bg-green-600 text-white shadow-md"
          : "bg-white text-green-600 border border-green-600 hover:bg-green-600 hover:text-white"
      }`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Top Navigation */}
      <div className="flex space-x-4 items-center mb-8">
        <button
          onClick={() => navigate("/admin")}
          className={getButtonClasses("/admin")}
        >
          Product
        </button>
        <button
          onClick={() => navigate("/admin/user")}
          className={getButtonClasses("/admin/user")}
        >
          Users
        </button>
        <button
          onClick={() => navigate("/admin/contractt")}
          className={getButtonClasses("/admin/contractt")}
        >
          Contract-List
        </button>
      </div>

      {/* Main content */}
      <main>
        <div className="bg-white rounded-lg shadow p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
