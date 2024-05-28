import React, { useEffect, useState } from "react";
import axios from "@/utils/axiosInstance";
import { User } from "@/types";
const DEFAULT_FORM = {
  messageType: "",
  content: "",
  userId: "",
};

interface FormProps {
  fetchLogs: () => Promise<void>;
}

const Form: React.FC<FormProps> = ({ fetchLogs }) => {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const { data } = await axios.get("/users");
        setUsers(data);
      } catch (err) {
        console.error(err, "error loading users");
      }
      setLoadingUsers(false);
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.content.trim() && form.userId && form.messageType) {
      try {
        await axios.post("/notifications/send", form);
        fetchLogs();
        setForm(DEFAULT_FORM);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      alert("You should select all the fields");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        {loadingUsers ? (
          <p>Loading users..</p>
        ) : (
          <>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userId"
            >
              User
            </label>
            <select
              id="userId"
              value={form.userId}
              name="userId"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <>
                <option value="" selected hidden disabled>
                  Please select a user...
                </option>
                {...users.map((user) => (
                  <option value={user.id} key={`user-${user.id}`}>
                    {user.name}
                  </option>
                ))}
              </>
            </select>
          </>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="messageType"
        >
          Category
        </label>
        <select
          id="messageType"
          value={form.messageType}
          name="messageType"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="" selected hidden disabled>
            Please select a category...
          </option>
          <option value="Sports">Sports</option>
          <option value="Finance">Finance</option>
          <option value="Movies">Movies</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="content"
        >
          Message
        </label>
        <textarea
          id="content"
          value={form.content}
          name="content"
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
