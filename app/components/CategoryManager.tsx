'use client'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../lib/store'
import { addCategory, updateCategory, deleteCategory } from '../../lib/slices/categoriesSlice'

export default function CategoryManager() {
  const dispatch = useDispatch()
  const categories = useSelector((state: RootState) => state.categories)
  const [newCategory, setNewCategory] = useState('')
  const [newBudgetLimit, setNewBudgetLimit] = useState('')

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(addCategory({ name: newCategory, budgetLimit: parseFloat(newBudgetLimit) }))
    setNewCategory('')
    setNewBudgetLimit('')
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Category Manager</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <form onSubmit={handleAddCategory} className="mb-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b dark:border-gray-600">
                <td className="px-4 py-2">{category.name}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={category.budgetLimit}
                    onChange={(e) => dispatch(updateCategory({ id: category.id, budgetLimit: parseFloat(e.target.value) }))}
                    className="p-1 border rounded w-24 dark:bg-gray-600 dark:text-white"
                  />
                </td>
                <td className="px-4 py-2">
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

