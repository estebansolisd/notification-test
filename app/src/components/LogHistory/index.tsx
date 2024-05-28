import React, { useEffect, useState } from "react";
import { Log } from "@/types";
import axios from "@/utils/axiosInstance";
import { v4 } from "uuid"

const LogHistory: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await axios.get("/logs");
        const sortedlogs = (data as Log[]).sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
        setLogs(sortedlogs)
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="container mx-auto px-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Log History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full my-6">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">
                User Id
              </th>
              <th className="w-1/2 py-3 px-4 uppercase font-semibold text-sm">
                User Name
              </th>
              <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">
                Message Type
              </th>
              <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">
                Notification Type
              </th>
              <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">
                Message Content
              </th>
              <th className="w-1/4 py-3 px-4 uppercase font-semibold text-sm">
                Sent At
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr
                key={v4()}
                className="bg-gray-100 border-b hover:bg-gray-200"
              >
                <td className="py-3 px-4">{log.userId}</td>
                <td className="py-3 px-4">{log.userName}</td>
                <td className="py-3 px-4">{log.messageType}</td>
                <td className="py-3 px-4">{log.notificationType}</td>
                <td className="py-3 px-4">{log.content}</td>
                <td className="py-3 px-4">{new Date(log.sentAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogHistory;
