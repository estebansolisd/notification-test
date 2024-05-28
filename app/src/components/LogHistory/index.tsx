import React, { useEffect, useState } from "react";
import { Log } from "@/types";
import axios from "@/utils/axiosInstance";

const LogHistory: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("/logs");
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);
  
  return (
    <div className="p-4 bg-white shadow-md rounded mt-4">
      <h2 className="text-xl font-bold mb-4">Log History</h2>
      {logs.length === 0 ? (
        <p className="text-gray-500">No logs available.</p>
      ) : (
        <ul className="list-disc pl-5">
          {logs.map((log) => (
            <li key={log.id} className="mb-2">
              <div className="text-gray-700">
                <strong>{log.category}</strong> - {log.message}{" "}
                <span className="text-gray-500 text-sm">({log.timestamp})</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LogHistory;
