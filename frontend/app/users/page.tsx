"use client";

import { useEffect, useState } from "react";
import api from "../utils/api";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  created_at: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get<{ users: User[] }>("/users");
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else if (Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Users</h1>
      {users.length > 0 ? (
        <ul className="list-disc pl-5">
          {users.map((user) => (
            <li key={user._id} className="mb-2">
              <span className="font-medium">{user.name}</span> - {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No users found.</p>
      )}
    </div>
  );
}
