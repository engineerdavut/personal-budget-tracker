'use client'

import { useSelector } from 'react-redux'
import { RootState } from '../lib/store'
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useState, useEffect } from 'react'
import { generatePDF } from './PDFGenerator'

export default function Reports() {
  const transactions = useSelector((state: RootState) => state.transactions)
  const categories = useSelector((state: RootState) => state.categories)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const categoryData = categories.map((category) => {
    const total = transactions
      .filter((t) => t.category === category.name && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    return { name: category.name, value: total }
  })

  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(new Date().getFullYear(), i, 1).toLocaleString('default', { month: 'short' })
    const income = transactions
      .filter((t) => new Date(t.date).getMonth() === i && t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    const expense = transactions
      .filter((t) => new Date(t.date).getMonth() === i && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    return { month, income, expense }
  })

  const handleGeneratePDF = async () => {
    if (typeof window !== 'undefined') {
      const { generatePDF } = await import('./PDFGenerator')
      generatePDF(transactions, categories)
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">Monthly Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#82ca9d" />
              <Bar dataKey="expense" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {isClient && (
        <div className="mt-8">
          <button
            onClick={handleGeneratePDF}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Generate and Download PDF Report
          </button>
        </div>
      )}
    </div>
  )
}
