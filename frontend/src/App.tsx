import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { authAPI } from "./services/api";
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
import Members from "./pages/Member";
import Books from "./pages/Book";
import Loans from "./pages/Loan";
import Returns from "./pages/Returns";

type Page =
  | "login"
  | "register"
  | "dashboard"
  | "members"
  | "books"
  | "loans"
  | "returns";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsAuthenticated(true);
      setUserName(JSON.parse(user).name);
      setCurrentPage("dashboard");
    }
  }, []);

  const handleLogin = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserName(JSON.parse(user).name);
    }
    setIsAuthenticated(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserName("");
    setCurrentPage("login");
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  if (!isAuthenticated) {
    if (currentPage === "register") {
      return (
        <Register
          onRegister={handleLogin}
          onSwitchToLogin={() => setCurrentPage("login")}
        />
      );
    }
    return (
      <Login
        onLogin={handleLogin}
        onSwitchToRegister={() => setCurrentPage("register")}
      />
    );
  }

  const menuItems = [
    { id: "dashboard" as Page, icon: LayoutDashboard, label: "Dashboard" },
    { id: "members" as Page, icon: Users, label: "Data Anggota" },
    { id: "books" as Page, icon: BookOpen, label: "Data Buku" },
    { id: "loans" as Page, icon: FileText, label: "Peminjaman" },
    { id: "returns" as Page, icon: RotateCcw, label: "Pengembalian" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
                Sistem Perpustakaan
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                      currentPage === item.id
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

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      currentPage === item.id
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === "dashboard" && <Dashboard />}
        {currentPage === "members" && <Members />}
        {currentPage === "books" && <Books />}
        {currentPage === "loans" && <Loans />}
        {currentPage === "returns" && <Returns />}
      </main>
    </div>
  );
}

export default App;
