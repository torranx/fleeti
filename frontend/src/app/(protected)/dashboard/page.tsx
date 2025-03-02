"use client"

import apiClient from "@/lib/apiClient";

const logout = async () => {
  try {
    await apiClient.post("/auth/logout", {}, { withCredentials: true });
    console.log("Logged out");
  } catch (err) {
    console.error("Failed to log out:", err);
  }
}

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={ logout }>Log out</button>
    </div>
  )
}
