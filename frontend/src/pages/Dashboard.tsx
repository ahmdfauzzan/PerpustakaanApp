import { useState, useEffect } from "react";
import { loanAPI, memberAPI, bookAPI } from "../services/api";
import type { Loan, Member, Book } from "../types";
import { BarChart3, Users, BookOpen, FileText, TrendingUp } from "lucide-react";

interface WeeklyData {
  week: string;
  count: number;
}

export default function Dashboard() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [loading, setLoading] = useState(true);

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
      processWeeklyData(loansData);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const processWeeklyData = (loansData: Loan[]) => {
    const weeks: { [key: string]: number } = {};
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i * 7);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const weekKey = weekStart.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
      });
      weeks[weekKey] = 0;
    }

    loansData.forEach((loan) => {
      const loanDate = new Date(loan.loan_date);
      const weekStart = new Date(loanDate);
      weekStart.setDate(loanDate.getDate() - loanDate.getDay());
      const weekKey = weekStart.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
      });

      if (weeks.hasOwnProperty(weekKey)) {
        weeks[weekKey]++;
      }
    });

    const data = Object.entries(weeks).map(([week, count]) => ({
      week,
      count,
    }));
    setWeeklyData(data);
  };

  const activeLoans = loans.filter((loan) => !loan.is_returned).length;
  const totalStock = books.reduce((sum, book) => sum + book.stock, 0);
  const maxWeeklyCount = Math.max(...weeklyData.map((d) => d.count), 1);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">Loading...</div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 opacity-80" />
            <TrendingUp className="w-5 h-5 opacity-60" />
          </div>
          <div className="text-3xl font-bold mb-1">{members.length}</div>
          <div className="text-blue-100">Total Anggota</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-8 h-8 opacity-80" />
            <TrendingUp className="w-5 h-5 opacity-60" />
          </div>
          <div className="text-3xl font-bold mb-1">{books.length}</div>
          <div className="text-green-100">Total Buku</div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8 opacity-80" />
            <TrendingUp className="w-5 h-5 opacity-60" />
          </div>
          <div className="text-3xl font-bold mb-1">{activeLoans}</div>
          <div className="text-yellow-100">Sedang Dipinjam</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="w-8 h-8 opacity-80" />
            <TrendingUp className="w-5 h-5 opacity-60" />
          </div>
          <div className="text-3xl font-bold mb-1">{totalStock}</div>
          <div className="text-purple-100">Total Stock Buku</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          Statistik Peminjaman per Minggu (7 Minggu Terakhir)
        </h2>

        <div className="space-y-4">
          {weeklyData.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-20 text-sm font-medium text-gray-600">
                {item.week}
              </div>
              <div className="flex-1 bg-gray-100 rounded-full h-10 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full flex items-center justify-end px-4 transition-all duration-500"
                  style={{ width: `${(item.count / maxWeeklyCount) * 100}%` }}
                >
                  {item.count > 0 && (
                    <span className="text-white font-semibold text-sm">
                      {item.count}
                    </span>
                  )}
                </div>
              </div>
              {item.count === 0 && (
                <span className="text-gray-400 text-sm font-medium w-8">0</span>
              )}
            </div>
          ))}
        </div>

        {weeklyData.every((d) => d.count === 0) && (
          <div className="text-center py-8 text-gray-500">
            Belum ada data peminjaman
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Buku Paling Banyak Dipinjam
          </h3>
          <div className="space-y-3">
            {books.slice(0, 5).map((book, index) => {
              const loanCount = loans.filter(
                (loan) => loan.book_id === book.id
              ).length;
              return (
                <div key={book.id} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {book.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {book.publisher}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-600">
                    {loanCount}x
                  </div>
                </div>
              );
            })}
            {books.length === 0 && (
              <div className="text-center py-4 text-gray-500 text-sm">
                Belum ada data
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Anggota Paling Aktif
          </h3>
          <div className="space-y-3">
            {members.slice(0, 5).map((member, index) => {
              const loanCount = loans.filter(
                (loan) => loan.member_id === member.id
              ).length;
              return (
                <div key={member.id} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {member.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {member.no_member}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-600">
                    {loanCount}x
                  </div>
                </div>
              );
            })}
            {members.length === 0 && (
              <div className="text-center py-4 text-gray-500 text-sm">
                Belum ada data
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
