'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTransaction } from '../lib/slices/transactionsSlice'
import { RootState } from '../lib/store'
import { v4 as uuidv4 } from 'uuid'

export default function TransactionForm() {
  const dispatch = useDispatch()
  const categories = useSelector((state: RootState) => state.categories) || []

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('expense')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(addTransaction({
      id: uuidv4(),
      description,
      amount: parseFloat(amount),
      date,
      category: categories.find(cat => cat.id === categoryId)?.name || '', 
      categoryId,
      type
    }))
    setDescription('')
    setAmount('')
    setDate('')
    setCategoryId('')
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block mb-2">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block mb-2">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block mb-2">Category</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            required
          >
            <option value="">Select a category</option>
            {categories && categories.map((category: { id: string, name: string }) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Type</label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="expense"
                checked={type === 'expense'}
                onChange={() => setType('expense')}
                className="form-radio"
              />
              <span className="ml-2">Expense</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="income"
                checked={type === 'income'}
                onChange={() => setType('income')}
                className="form-radio"
              />
              <span className="ml-2">Income</span>
            </label>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Transaction
        </button>
      </form>
    </div>
  )
}

