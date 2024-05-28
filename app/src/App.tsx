import React, { useEffect, useMemo, useState } from "react";
import Form from "@/components/Form";
import LogHistory from "@/components/LogHistory";
import { Log } from "@/types";
import axios from "@/utils/axiosInstance";

const App: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const sortedLogs = useMemo(() => logs.sort(
    (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
  ), [logs])

  const fetchLogs = async () => {
    try {
      const { data } = await axios.get("/logs");
      const sortedlogs = (data as Log[]);
      setLogs(sortedlogs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Form fetchLogs={fetchLogs} />
        <LogHistory logs={sortedLogs} />
      </div>
    </div>
  );
};

export default App;
