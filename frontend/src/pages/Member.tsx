import { useEffect, useState } from "react";
import api from "../services/api";
import type { Member } from "../types/member";

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [form, setForm] = useState({
    no_anggota: "",
    nama: "",
    tanggal_lahir: "",
  });

  const loadMembers = async () => {
    const res = await api.get("/members");
    setMembers(res.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/members", form);
    setForm({ no_anggota: "", nama: "", tanggal_lahir: "" });
    loadMembers();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus anggota ini?")) {
      await api.delete(`/members/${id}`);
      loadMembers();
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">👥 Data Anggota</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-x-2">
        <input
          placeholder="No Anggota"
          className="border p-2 rounded"
          value={form.no_anggota}
          onChange={(e) => setForm({ ...form, no_anggota: e.target.value })}
        />
        <input
          placeholder="Nama"
          className="border p-2 rounded"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={form.tanggal_lahir}
          onChange={(e) => setForm({ ...form, tanggal_lahir: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Tambah
        </button>
      </form>

      <table className="min-w-full bg-white shadow-md rounded">
        <thead className="bg-blue-100">
          <tr>
            <th className="p-2">No Anggota</th>
            <th className="p-2">Nama</th>
            <th className="p-2">Tanggal Lahir</th>
            <th className="p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id} className="border-t">
              <td className="p-2">{m.no_anggota}</td>
              <td className="p-2">{m.nama}</td>
              <td className="p-2">{m.tanggal_lahir}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(m.id)}
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
