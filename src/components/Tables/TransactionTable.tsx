import React from "react";

const TransactionTable: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  // Fake transaction data
  const transactions = [
    { id: 1, date: "2024-05-01", amount: 100.50, description: "Purchase of groceries" },
    { id: 2, date: "2024-05-05", amount: 200.75, description: "Payment for utilities" },
    { id: 3, date: "2024-05-10", amount: 50.00, description: "Online shopping" },
  ];

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(transaction =>
    transaction.date.includes(searchQuery) ||
    transaction.amount.toString().includes(searchQuery) ||
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Transaction Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
