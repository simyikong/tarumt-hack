import React from "react";

const UserTable: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  // Fake user data
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  ];

  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    
      <div className="relative overflow-x-auto sm:rounded-lg bg-white">
        <h2 className="text-lg font-bold mb-2 px-6 py-3">User Table</h2>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-green-200">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  {user.id}
                </td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  {user.name}
                </td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  );
};

export default UserTable;
