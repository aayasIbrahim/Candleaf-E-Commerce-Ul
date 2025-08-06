function Dashboard() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10 px-5 md:px-16">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-8">
           EDUAID 
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Income</h2>
            <p className="text-2xl font-bold text-green-600">$50,000</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              Expense
            </h2>
            <p className="text-2xl font-bold text-red-500">$20,000</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h2 className="text-xl font-semibold text-gray-600 mb-2">Saving</h2>
            <p className="text-2xl font-bold text-blue-600">$30,000</p>
          </div>
        </div>

        {/* Forms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Add Income */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Add Income</h3>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Source"
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Amount"
                className="border p-2 rounded"
              />
              <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Add Income
              </button>
            </form>
          </div>

          {/* Add Expense */}
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Add Expense</h3>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Purpose"
                className="border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Amount"
                className="border p-2 rounded"
              />
              <button className="bg-red-500 text-white py-2 rounded hover:bg-red-600">
                Add Expense
              </button>
            </form>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-b">
                <th className="pb-2">Type</th>
                <th className="pb-2">Title</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 text-green-600">Income</td>
                <td>Student pay</td>
                <td>$5,000</td>
                <td>2025-08-05</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-red-500">Expense</td>
                <td>Teacher pay</td>
                <td>$200</td>
                <td>2025-08-03</td>
              </tr>
              {/* More rows can go here */}
            </tbody>
          </table>
        </div>

        
      </div>



      
    </>
  );
}

export default Dashboard;
