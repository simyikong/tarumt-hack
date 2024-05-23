"use client";
import React, { useState } from "react";
import UserTable from "../Tables/UserTable";
import EmployeeTable from "../Tables/EmployeeTable";
import TransactionTable from "../Tables/TransactionTable";

const Database: React.FC = () => {
  const [activeTable, setActiveTable] = useState("user");
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleTabChange = (tab: string) => {
    setActiveTable(tab);
    setSearchQuery(""); // Clear search query when switching tabs
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Database Overview</h1>
      <div style={{ marginBottom: "20px" }}>
        <button
          style={{ marginRight: "10px", backgroundColor: activeTable === "user" ? "lightblue" : "white", border: "1px solid #ccc", borderRadius: "5px", padding: "5px 10px", cursor: "pointer" }}
          onClick={() => handleTabChange("user")}
        >
          User
        </button>
        <button
          style={{ marginRight: "10px", backgroundColor: activeTable === "employee" ? "lightblue" : "white", border: "1px solid #ccc", borderRadius: "5px", padding: "5px 10px", cursor: "pointer" }}
          onClick={() => handleTabChange("employee")}
        >
          Employee
        </button>
        <button
          style={{ backgroundColor: activeTable === "transaction" ? "lightblue" : "white", border: "1px solid #ccc", borderRadius: "5px", padding: "5px 10px", cursor: "pointer" }}
          onClick={() => handleTabChange("transaction")}
        >
          Transaction
        </button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc", marginRight: "10px" }}
        />
        <button
          onClick={() => setSearchQuery("")}
          style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: "#f44336", color: "white", border: "none", cursor: "pointer" }}
        >
          Clear
        </button>
      </div>
      <div>
        {activeTable === "user" && <UserTable searchQuery={searchQuery} />}
        {activeTable === "employee" && <EmployeeTable searchQuery={searchQuery} />}
        {activeTable === "transaction" && <TransactionTable searchQuery={searchQuery} />}
      </div>
    </div>
  );
};

export default Database;



