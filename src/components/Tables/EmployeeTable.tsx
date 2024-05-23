import React from "react";

const EmployeeTable: React.FC<{ searchQuery: string }> = ({ searchQuery }) => {
  // Fake employee data
  const employees = [
    { id: 1, name: "Alice Johnson", position: "Manager", department: "Sales", age: 35, email: "alice@example.com", address: "123 Main St, City" },
    { id: 2, name: "Bob Smith", position: "Developer", department: "IT", age: 28, email: "bob@example.com", address: "456 Elm St, Town" },
    { id: 3, name: "Charlie Brown", position: "Designer", department: "Marketing", age: 30, email: "charlie@example.com", address: "789 Oak St, Village" },
  ];

  // Filter employees based on search query
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative overflow-x-auto sm:rounded-lg bg-white">
      <h2 className="text-lg font-bold mb-2 px-6 py-3">Employee Table</h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Position</th>
            <th scope="col" className="px-6 py-3">Department</th>
            <th scope="col" className="px-6 py-3">Age</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Address</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id} className="hover:bg-green-200">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">{employee.id}</td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{employee.name}</td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{employee.position}</td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{employee.department}</td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{employee.age}</td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{employee.email}</td>
              <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{employee.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default EmployeeTable;
