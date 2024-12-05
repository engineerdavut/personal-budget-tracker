'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../lib/store'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import CategoryManager from '../components/CategoryManager'
import BudgetAlerts from '../components/BudgetAlerts'
import Reports from '../components/Reports'
import SavingsSuggestions from '../components/SavingsSuggestions'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

export default function Home() {
  const [activeTab, setActiveTab] = useState('transactions')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Personal Budget Tracker</h1>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-6 w-6 text-yellow-500" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
        <div className="flex justify-center mb-8">
          <button
            className={`px-4 py-2 mr-2 ${activeTab === 'transactions' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
          <button
            className={`px-4 py-2 mr-2 ${activeTab === 'categories' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            onClick={() => setActiveTab('categories')}
          >
            Categories
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'reports' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
        </div>
        <BudgetAlerts />
        {activeTab === 'transactions' && (
          <>
            <TransactionForm />
            <TransactionList />
          </>
        )}
        {activeTab === 'categories' && <CategoryManager />}
        {activeTab === 'reports' && <Reports />}
        <SavingsSuggestions />
      </div>
    </div>
  )
}

