'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../lib/store'
import { addCategory, updateCategory, deleteCategory } from '../lib/slices/categoriesSlice'

export default function CategoryManager() {
  const dispatch = useDispatch()
  const categories = useSelector((state: RootState) => state.categories)
  const [newCategory, setNewCategory] = useState('')
  const [newBudgetLimit, setNewBudgetLimit] = useState('')
  const [newCategoryType, setNewCategoryType] = useState<'income' | 'expense'>('expense')
  const [editingCategory, setEditingCategory] = useState<string | null>(null)

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(addCategory({ name: newCategory, budgetLimit: parseFloat(newBudgetLimit), type: newCategoryType }))
    setNewCategory('')
    setNewBudgetLimit('')
    setNewCategoryType('expense')
  }

  const handleUpdateCategory = (id: string, name: string, budgetLimit: number, type: 'income' | 'expense') => {
    dispatch(updateCategory({ id, name, budgetLimit, type }))
    setEditingCategory(null)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Category Manager</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <form onSubmit={handleAddCategory} className="mb-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="p-2 border rounded dark:bg-gray-600 dark:text-white"
              required
            />
            <input
              type="number"
              placeholder="Budget Limit"
              value={newBudgetLimit}
              onChange={(e) => setNewBudgetLimit(e.target.value)}
              className="p-2 border rounded dark:bg-gray-600 dark:text-white"
              required
            />
            <select
              value={newCategoryType}
              onChange={(e) => setNewCategoryType(e.target.value as 'income' | 'expense')}
              className="p-2 border rounded dark:bg-gray-600 dark:text-white"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Add Category
            </button>
          </div>
        </form>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Budget Limit</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b dark:border-gray-600">
                  <td className="px-4 py-2">
                    {editingCategory === category.id ? (
                      <input
                        type="text"
                        value={category.name}
                        onChange={(e) => dispatch(updateCategory({ ...category, name: e.target.value }))}
                        className="p-1 border rounded w-full dark:bg-gray-600 dark:text-white"
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingCategory === category.id ? (
                      <input
                        type="number"
                        value={category.budgetLimit}
                        onChange={(e) => dispatch(updateCategory({ ...category, budgetLimit: parseFloat(e.target.value) }))}
                        className="p-1 border rounded w-full dark:bg-gray-600 dark:text-white"
                      />
                    ) : (
                      category.budgetLimit
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingCategory === category.id ? (
                      <select
                        value={category.type}
                        onChange={(e) => dispatch(updateCategory({ ...category, type: e.target.value as 'income' | 'expense' }))}
                        className="p-1 border rounded w-full dark:bg-gray-600 dark:text-white"
                      >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>
                    ) : (
                      category.type
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingCategory === category.id ? (
                      <button
                        onClick={() => handleUpdateCategory(category.id, category.name, category.budgetLimit, category.type)}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingCategory(category.id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => dispatch(deleteCategory(category.id))}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

