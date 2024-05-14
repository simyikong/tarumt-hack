import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ChartOne = () => {
  const [revenueData, setRevenueData] = useState([
    { id: 1, year: 2020, amount: 1000000 },
    { id: 2, year: 2019, amount: 800000 },
    { id: 3, year: 2018, amount: 600000 },
  ]);
  const [newYear, setNewYear] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const addRevenue = () => {
    if (newYear && newAmount) {
      const newRevenue = { id: Date.now(), year: parseInt(newYear), amount: parseInt(newAmount) };
      setRevenueData([...revenueData, newRevenue]);
      setNewYear('');
      setNewAmount('');
    }
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Revenue</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Sales</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white px-3 py-1 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div>


      </div>
      
      <div className="flex justify-center">
            <div className="bg-gray-200 p-4 rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Total Revenue</h2>
                <table className="w-full border rounded">
                    <thead className="bg-gray-300">
                        <tr>
                            <th className="py-2 border">Year</th>
                            <th className="py-2 border">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {revenueData.map((data) => (
                            <tr key={data.id} className="hover:bg-green-200">
                                <td className="py-2 border">{data.year}</td>
                                <td className="py-2 border">${data.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg ml-4 w-48">
                <h2 className="text-lg font-bold mb-2">Add Revenue</h2>
                <div className="flex flex-col space-y-2">
                    <input
                        type="number"
                        placeholder="Year"
                        value={newYear}
                        onChange={(e) => setNewYear(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={newAmount}
                        onChange={(e) => setNewAmount(e.target.value)}
                        className="p-2 border rounded"
                    />
                    <button onClick={addRevenue} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ChartOne;
