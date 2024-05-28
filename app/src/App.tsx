import React from "react";
import Form from "@/components/Form";
import LogHistory from "@/components/LogHistory";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <Form />
        <LogHistory />
      </div>
    </div>
  );
};

export default App;
