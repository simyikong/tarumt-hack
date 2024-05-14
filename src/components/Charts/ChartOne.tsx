import { useState } from "react";

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

      <br />
      {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg"> */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Year
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {revenueData.map((data) => (
              <tr key={data.id} className="hover:bg-green-200">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">{data.year}</td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">${data.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bg-white rounded shadow-md p-6 mb-6 flex-1">
          <h2 className="text-lg font-bold mb-2">Add Revenue</h2>
          <div className="flex  mb-2">
            <input
              type="number"
              placeholder="Year"
              value={newYear}
              onChange={(e) => setNewYear(e.target.value)}
              className="shadow-md rounded-md px-3 py-2 w-full mr-2"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="shadow-md rounded-md px-3 py-2 w-full mr-2"
            />
            <button onClick={addRevenue} className="bg-green-500 text-white px-4 py-2 rounded">
              Add
            </button>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default ChartOne;

