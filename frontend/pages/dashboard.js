import { useEffect, useMemo, useState } from "react";
import { BarChart, Bar, CartesianGrid, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getUserStats, loginUser, registerUser } from "../services/api";

export default function DashboardPage() {
  const [token, setToken] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const [authForm, setAuthForm] = useState({
    name: "EV Driver",
    email: "driver@example.com",
    password: "password123",
  });

  const chartData = useMemo(() => {
    if (!stats) return [];
    return stats.usage.map((usageValue, index) => ({
      day: `D${index + 1}`,
      usage: usageValue,
      cost: stats.cost[index],
    }));
  }, [stats]);

  const fetchStats = async (authToken) => {
    try {
      const { data } = await getUserStats(authToken);
      setStats(data);
      setError("");
    } catch (err) {
      setError("Unable to fetch dashboard stats.");
    }
  };

  const handleAuth = async (event) => {
    event.preventDefault();
    try {
      await registerUser(authForm);
    } catch (err) {
      // Ignore if user already exists and proceed to login.
    }

    try {
      const loginResponse = await loginUser({
        email: authForm.email,
        password: authForm.password,
      });
      const authToken = loginResponse.data.token;
      setToken(authToken);
      await fetchStats(authToken);
    } catch (err) {
      setError("Authentication failed. Please check sample credentials.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchStats(token);
    }
  }, [token]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="mb-8 text-3xl font-bold">User Dashboard</h2>

      {!token && (
        <form onSubmit={handleAuth} className="mb-8 grid gap-3 rounded-xl border border-gray-700 bg-card p-6 md:grid-cols-3">
          <input
            className="rounded-md border border-gray-600 bg-gray-900 p-3"
            value={authForm.name}
            onChange={(event) => setAuthForm((prev) => ({ ...prev, name: event.target.value }))}
            placeholder="Name"
            required
          />
          <input
            type="email"
            className="rounded-md border border-gray-600 bg-gray-900 p-3"
            value={authForm.email}
            onChange={(event) => setAuthForm((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="rounded-md border border-gray-600 bg-gray-900 p-3"
            value={authForm.password}
            onChange={(event) => setAuthForm((prev) => ({ ...prev, password: event.target.value }))}
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="rounded-md bg-accent px-5 py-2 font-semibold text-gray-900 hover:bg-cyan-300 md:col-span-3"
          >
            Login & Load Stats
          </button>
        </form>
      )}

      {error && <p className="mb-6 text-red-400">{error}</p>}

      {stats && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-700 bg-card p-6">
              <p className="text-gray-300">Total Sessions</p>
              <p className="text-4xl font-bold text-accent">{stats.totalSessions}</p>
            </div>
            <div className="rounded-xl border border-gray-700 bg-card p-6">
              <p className="text-gray-300">Total Cost</p>
              <p className="text-4xl font-bold text-accent">${stats.totalCost}</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-80 rounded-xl border border-gray-700 bg-card p-4">
              <h3 className="mb-4 font-semibold">Usage Trend</h3>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Line type="monotone" dataKey="usage" stroke="#22d3ee" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="h-80 rounded-xl border border-gray-700 bg-card p-4">
              <h3 className="mb-4 font-semibold">Cost Trend</h3>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Bar dataKey="cost" fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
