"use client";
import React, { useState } from "react";
import UserTable from "../Tables/UserTable";
import EmployeeTable from "../Tables/EmployeeTable";
import TransactionTable from "../Tables/TransactionTable";

const Database: React.FC = () => {
  const [activeTable, setActiveTable] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTable(tab);
    setSearchQuery(""); // Clear search query when switching tabs
    setIsAuthenticated(false); // Reset authentication
    setPasscode(""); // Clear passcode input
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handlePasscodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasscode(event.target.value);
  };

  const handlePasscodeSubmit = () => {
    if (passcode === "123") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect passcode. Please try again.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <div style={{ backgroundColor: "#fff", borderRadius: "10px", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <button
              style={{
                marginRight: "10px",
                backgroundColor: activeTable === "user" ? "#4CAF50" : "transparent",
                color: activeTable === "user" ? "white" : "black",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer"
              }}
              onClick={() => handleTabChange("user")}
            >
              User
            </button>
            <button
              style={{
                marginRight: "10px",
                backgroundColor: activeTable === "employee" ? "#4CAF50" : "transparent",
                color: activeTable === "employee" ? "white" : "black",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer"
              }}
              onClick={() => handleTabChange("employee")}
            >
              Employee
            </button>
            <button
              style={{
                backgroundColor: activeTable === "transaction" ? "#4CAF50" : "transparent",
                color: activeTable === "transaction" ? "white" : "black",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer"
              }}
              onClick={() => handleTabChange("transaction")}
            >
              Transaction
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              style={{
                padding: "10px",
                borderRadius: "5px",
                marginRight: "10px",
                width: "200px",
              }}
            />
          </div>
        </div>
        {activeTable && !isAuthenticated && (
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Enter passcode"
              value={passcode}
              onChange={handlePasscodeChange}
              style={{
                padding: "10px",
                borderRadius: "5px",
                marginRight: "10px",
                width: "200px",
              }}
            />
            <button
              onClick={handlePasscodeSubmit}
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Submit
            </button>
          </div>
        )}
        {isAuthenticated && (
          <div>
            {activeTable === "user" && <UserTable searchQuery={searchQuery} />}
            {activeTable === "employee" && <EmployeeTable searchQuery={searchQuery} />}
            {activeTable === "transaction" && <TransactionTable searchQuery={searchQuery} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Database;
