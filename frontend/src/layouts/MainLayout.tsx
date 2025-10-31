import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  RotateCcw,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { authAPI } from "../services/api";

interface MenuItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : {};
  const userName = user?.name || "User";
  const currentPath = location.pathname;

  const menuItems: MenuItem[] = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/members", icon: Users, label: "Data Anggota" },
    { path: "/books", icon: BookOpen, label: "Data Buku" },
    { path: "/loans", icon: FileText, label: "Peminjaman" },
    { path: "/returns", icon: RotateCcw, label: "Pengembalian" },
  ];

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
                Sistem Perpustakaan
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = currentPath === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-gray-800">
                  {userName}
                </div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Keluar</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = currentPath === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Keluar</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Halaman akan dirender di sini */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
