import { useEffect, useState } from "react";
import api from "../services/api";
import type { Book } from "../types/book";

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState({
    title: "",
    publisher: "",
    dimensions: "",
    stock: "",
  });

  const loadBooks = async () => {
    const res = await api.get("/books");
    setBooks(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/books", { ...form, stock: Number(form.stock) });
    setForm({ title: "", publisher: "", dimensions: "", stock: "" });
    loadBooks();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus buku ini?")) {
      await api.delete(`/books/${id}`);
      loadBooks();
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">📚 Data Buku</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-x-2">
        <input
          placeholder="Judul Buku"
          className="border p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Penerbit"
          className="border p-2 rounded"
          value={form.publisher}
          onChange={(e) => setForm({ ...form, publisher: e.target.value })}
        />
        <input
          placeholder="Dimensi"
          className="border p-2 rounded"
          value={form.dimensions}
          onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
        />
        <input
          placeholder="Stok"
          type="number"
          className="border p-2 rounded"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Tambah
        </button>
      </form>

      <table className="min-w-full bg-white shadow-md rounded">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2">Judul</th>
            <th className="p-2">Penerbit</th>
            <th className="p-2">Dimensi</th>
            <th className="p-2">Stok</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id} className="border-t">
              <td className="p-2">{b.title}</td>
              <td className="p-2">{b.publisher}</td>
              <td className="p-2">{b.dimensions}</td>
              <td className="p-2">{b.stock}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(b.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
