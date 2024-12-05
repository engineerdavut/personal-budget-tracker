'use client'

import { useSelector } from 'react-redux'
import { RootState } from '../lib/store'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useState, useEffect } from 'react'
import { generatePDF } from './PDFGenerator'
import { scaleLinear } from 'd3-scale'

export default function Reports() {
  const transactions = useSelector((state: RootState) => state.transactions)
  const categories = useSelector((state: RootState) => state.categories)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const expenseColorScale = scaleLinear<string>()
    .domain([0, 1])
    .range(['#FFA500', '#FF0000'])

  const incomeColorScale = scaleLinear<string>()
    .domain([0, 1])
    .range(['#98FB98', '#006400'])

  const expenseCategoryData = categories
    .filter(category => category.type === 'expense')
    .map((category) => {
      const total = transactions
        .filter((t) => t.category === category.name && t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
      return { name: category.name, value: total }
    })
    .sort((a, b) => b.value - a.value)

  const incomeCategoryData = categories
    .filter(category => category.type === 'income')
    .map((category) => {
      const total = transactions
        .filter((t) => t.category === category.name && t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)
      return { name: category.name, value: total }
    })
    .sort((a, b) => b.value - a.value)

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

  const maxIncome = Math.max(...monthlyData.map(d => d.income))
  const maxExpense = Math.max(...monthlyData.map(d => d.expense))

  const CustomizedLegend = (props: any) => {
    const { payload } = props;
    return (
      <ul className="flex justify-center space-x-4">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center">
            <span
              className="inline-block w-3 h-3 mr-2 rounded-full"
              style={{ backgroundColor: entry.color === '#82ca9d' ? '#006400' : '#FF0000' }}
            />
            <span>{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseCategoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {expenseCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={expenseColorScale(index / expenseCategoryData.length)} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-2">Income by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={incomeCategoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {incomeCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={incomeColorScale(index / incomeCategoryData.length)} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow col-span-1 md:col-span-2">
          <h3 className="text-xl font-bold mb-2">Monthly Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend content={<CustomizedLegend />} />
              <Bar dataKey="income" name="Income" fill="#82ca9d">
                {monthlyData.map((entry, index) => (
                  <Cell key={`income-${index}`} fill={incomeColorScale(entry.income / maxIncome)} />
                ))}
              </Bar>
              <Bar dataKey="expense" name="Expense" fill="#8884d8">
                {monthlyData.map((entry, index) => (
                  <Cell key={`expense-${index}`} fill={expenseColorScale(entry.expense / maxExpense)} />
                ))}
              </Bar>
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

