import { useEffect, useState } from "react";
import api from "../services/api";
import type { Loan } from "../types/loan";

export default function Returns() {
  const [loans, setLoans] = useState<Loan[]>([]);

  const loadLoans = async () => {
    const res = await api.get("/loans");
    setLoans(res.data);
  };

  const handleReturn = async (id: number) => {
    if (confirm("Kembalikan buku ini?")) {
      await api.post(`/loans/${id}/return`);
      loadLoans();
    }
  };

  useEffect(() => {
    loadLoans();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🔁 Pengembalian Buku</h1>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2">Anggota</th>
            <th className="p-2">Buku</th>
            <th className="p-2">Tanggal Pinjam</th>
            <th className="p-2">Tanggal Kembali</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((l) => (
            <tr key={l.id} className="border-t">
              <td className="p-2">{l.member?.nama}</td>
              <td className="p-2">{l.book?.title}</td>
              <td className="p-2">{l.tanggal_pinjam}</td>
              <td className="p-2">{l.tanggal_kembali ?? "-"}</td>
              <td className="p-2">
                {!l.tanggal_kembali && (
                  <button
                    onClick={() => handleReturn(l.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Kembalikan
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
