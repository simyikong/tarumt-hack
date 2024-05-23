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
    <div>
      <h2>Employee Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Age</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{employee.age}</td>
              <td>{employee.email}</td>
              <td>{employee.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
