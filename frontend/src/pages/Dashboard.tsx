import { useEffect, useState } from "react";
import api from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ChartData } from "../types/chart";

const Dashboard = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    api
      .get("/loans")
      .then((res) => {
        const grouped = res.data.reduce(
          (acc: Record<string, number>, loan: any) => {
            const week = new Date(loan.created_at).toLocaleDateString("id-ID", {
              weekday: "short",
            });
            acc[week] = (acc[week] || 0) + 1;
            return acc;
          },
          {}
        );

        const formatted: ChartData[] = Object.entries(grouped).map(
          ([week, total]) => ({
            week,
            total: Number(total), // pastikan ini number
          })
        );

        setChartData(formatted);
      })
      .catch((err) => {
        console.error("Gagal memuat data grafik:", err);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Dashboard</h1>
      {chartData.length === 0 ? (
        <p>Memuat data grafik...</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Dashboard;
