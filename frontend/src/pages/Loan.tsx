import { useEffect, useState } from "react";
import api from "../services/api";
import type { Loan } from "../types/loan";
import type { Member } from "../types/member";
import type { Book } from "../types/book";

export default function Loans() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState({
    member_id: "",
    book_id: "",
    tanggal_pinjam: "",
  });

  const loadData = async () => {
    const [loanRes, memberRes, bookRes] = await Promise.all([
      api.get("/loans"),
      api.get("/members"),
      api.get("/books"),
    ]);
    setLoans(loanRes.data);
    setMembers(memberRes.data);
    setBooks(bookRes.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/loans", form);
    setForm({ member_id: "", book_id: "", tanggal_pinjam: "" });
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📅 Peminjaman Buku</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-x-2">
        <select
          className="border p-2 rounded"
          value={form.member_id}
          onChange={(e) => setForm({ ...form, member_id: e.target.value })}
        >
          <option value="">Pilih Anggota</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nama}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={form.book_id}
          onChange={(e) => setForm({ ...form, book_id: e.target.value })}
        >
          <option value="">Pilih Buku</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2 rounded"
          value={form.tanggal_pinjam}
          onChange={(e) => setForm({ ...form, tanggal_pinjam: e.target.value })}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Tambah
        </button>
      </form>

      <table className="min-w-full bg-white shadow-md rounded">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2">Anggota</th>
            <th className="p-2">Buku</th>
            <th className="p-2">Tanggal Pinjam</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((l) => (
            <tr key={l.id} className="border-t">
              <td className="p-2">{l.member?.nama}</td>
              <td className="p-2">{l.book?.title}</td>
              <td className="p-2">{l.tanggal_pinjam}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
