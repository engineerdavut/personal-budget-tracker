'use client'

import { useSelector } from 'react-redux'
import { RootState } from '../lib/store'

function TransactionList() {
  const transactions = useSelector((state: RootState) => state.transactions)

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 className="text-2xl font-bold mb-4">Transaction List</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b dark:border-gray-600">
                <td className="px-4 py-2">{transaction.date}</td>
                <td className="px-4 py-2">{transaction.description}</td>
                <td className="px-4 py-2">{transaction.category}</td>
                <td className="px-4 py-2">{transaction.type}</td>
                <td className="px-4 py-2 text-right">
                  <span className={transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionList

