import { useStats } from "../hooks/useStats";

const Stats = () => {
  const { stats, loading, error } = useStats();

  console.log("Stats in component:", stats); 

  if (loading) return <p className="p-6">Loading stats...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stats Dashboard</h1>
      <div className="flex gap-4">
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl">Total Users</h2>
          <p className="text-3xl">{stats.totalUsers}</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl">Total Chats</h2>
          <p className="text-3xl">{stats.totalChats}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
