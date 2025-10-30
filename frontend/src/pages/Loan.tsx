import { useState, useEffect } from "react";
import { loanAPI, memberAPI, bookAPI } from "../services/api";
import { FileText, Plus, X } from "lucide-react";
import type { Book, Loan, Member } from "../types";

export default function Loans() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    member_id: "",
    book_id: "",
    loan_date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [loansData, membersData, booksData] = await Promise.all([
        loanAPI.getAll(),
        memberAPI.getAll(),
        bookAPI.getAll(),
      ]);
      setLoans(loansData);
      setMembers(membersData);
      setBooks(booksData);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loanAPI.create({
        member_id: parseInt(formData.member_id),
        book_id: parseInt(formData.book_id),
        loan_date: formData.loan_date,
      });
      loadData();
      closeModal();
    } catch (error) {
      console.error("Failed to create loan:", error);
      alert("Gagal membuat peminjaman. Pastikan buku masih tersedia.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      member_id: "",
      book_id: "",
      loan_date: new Date().toISOString().split("T")[0],
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">Loading...</div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Data Peminjaman</h1>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Tambah Peminjaman
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Tanggal Pinjam
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Anggota
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Buku
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Tanggal Kembali
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loans.map((loan) => (
              <tr key={loan.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-900">
                  {new Date(loan.loan_date).toLocaleDateString("id-ID")}
                </td>
                <td className="px-6 py-4 text-gray-900">
                  {loan.member?.name || "-"}
                </td>
                <td className="px-6 py-4 text-gray-900">
                  {loan.book?.title || "-"}
                </td>
                <td className="px-6 py-4 text-gray-900">
                  {loan.return_date
                    ? new Date(loan.return_date).toLocaleDateString("id-ID")
                    : "-"}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      loan.is_returned
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {loan.is_returned ? "Dikembalikan" : "Dipinjam"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {loans.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Belum ada data peminjaman
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Tambah Peminjaman
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anggota
                </label>
                <select
                  value={formData.member_id}
                  onChange={(e) =>
                    setFormData({ ...formData, member_id: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Pilih Anggota</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.no_member} - {member.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buku
                </label>
                <select
                  value={formData.book_id}
                  onChange={(e) =>
                    setFormData({ ...formData, book_id: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Pilih Buku</option>
                  {books
                    .filter((book) => book.stock > 0)
                    .map((book) => (
                      <option key={book.id} value={book.id}>
                        {book.title} (Stock: {book.stock})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Pinjam
                </label>
                <input
                  type="date"
                  value={formData.loan_date}
                  onChange={(e) =>
                    setFormData({ ...formData, loan_date: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
