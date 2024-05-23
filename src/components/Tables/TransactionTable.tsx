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
    <div className="relative overflow-x-auto  sm:rouned-lg bg-white">
      <h2 className="text-lg font-bold mb-2 px-6 py-3">Transaction Table</h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-green-200">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                {transaction.id}
              </td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                {transaction.date}
              </td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                {transaction.amount}
              </td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                {transaction.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default TransactionTable;
