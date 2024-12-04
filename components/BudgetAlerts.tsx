'use client'

import { useSelector } from 'react-redux'
import { RootState } from '../lib/store'
import { useEffect, useState } from 'react'

export default function BudgetAlerts() {
  const transactions = useSelector((state: RootState) => state.transactions)
  const categories = useSelector((state: RootState) => state.categories)
  const [alerts, setAlerts] = useState<string[]>([])

  useEffect(() => {
    const newAlerts: string[] = []

    categories.forEach((category) => {
      const categoryExpenses = transactions
        .filter((t) => t.category === category.name && t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)

      if (categoryExpenses >= category.budgetLimit * 0.8) {
        newAlerts.push(`Warning: You've reached 80% of your budget for ${category.name}`)
      }
    })

    setAlerts(newAlerts)
  }, [transactions, categories])

  if (alerts.length === 0) return null

  return (
    <div className="mb-8 p-4 bg-yellow-100 dark:bg-yellow-800 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Budget Alerts</h2>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index} className="text-sm">{alert}</li>
        ))}
      </ul>
    </div>
  )
}

