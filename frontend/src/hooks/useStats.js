import { useState, useEffect } from "react";

export const useStats = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalChats: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        console.log("Token:", token); 

        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Response status:", res.status); 

        if (!res.ok) throw new Error("Failed to fetch stats");

        const json = await res.json();
        console.log("Raw JSON from backend:", json); 

        if (json.success) {
          setStats(json.data); 
        } else {
          throw new Error(json.message || "Unknown error");
        }
      } catch (err) {
        console.error("Error fetching stats:", err); 
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
