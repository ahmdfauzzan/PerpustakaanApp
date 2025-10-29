import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="font-bold text-xl">📚 Perpustakaan</div>
      <div className="space-x-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/members">Anggota</Link>
        <Link to="/books">Buku</Link>
        <Link to="/loans">Peminjaman</Link>
        <Link to="/returns">Pengembalian</Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
