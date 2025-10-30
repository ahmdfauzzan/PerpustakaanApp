import { useState, useEffect } from "react";
import { loanAPI } from "../services/api";
import type { Loan } from "../types";
import { RotateCcw, CheckCircle } from "lucide-react";

export default function Returns() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLoans();
  }, []);

  const loadLoans = async () => {
    try {
      const data = await loanAPI.getAll();
      setLoans(data.filter((loan) => !loan.is_returned));
    } catch (error) {
      console.error("Failed to load loans:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (loanId: number) => {
    if (confirm("Konfirmasi pengembalian buku ini?")) {
      try {
        const returnDate = new Date().toISOString().split("T")[0];
        await loanAPI.returnBook(loanId, returnDate);
        loadLoans();
      } catch (error) {
        console.error("Failed to return book:", error);
        alert("Gagal memproses pengembalian buku");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">Loading...</div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <RotateCcw className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">Pengembalian Buku</h1>
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
                Durasi
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loans.map((loan) => {
              const loanDate = new Date(loan.loan_date);
              const today = new Date();
              const diffTime = Math.abs(today.getTime() - loanDate.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

              return (
                <tr key={loan.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-900">
                    {loanDate.toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-gray-900 font-medium">
                        {loan.member?.name || "-"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {loan.member?.no_member || "-"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-gray-900 font-medium">
                        {loan.book?.title || "-"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {loan.book?.publisher || "-"}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        diffDays > 7
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {diffDays} hari
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleReturn(loan.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Kembalikan
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {loans.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Tidak ada buku yang sedang dipinjam
          </div>
        )}
      </div>
    </div>
  );
}
