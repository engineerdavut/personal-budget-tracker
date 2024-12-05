'use client'

import { useSelector } from 'react-redux'
import { RootState } from '../lib/store'
import { useState, useEffect } from 'react'

export default function SavingsSuggestions() {
  const transactions = useSelector((state: RootState) => state.transactions)
  const categories = useSelector((state: RootState) => state.categories)
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    const generateSuggestions = () => {
      const newSuggestions: string[] = []

      // Toplam gelir ve gideri hesapla
      const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)
      const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)

      // Genel tasarruf oranı kontrolü
      const savingsRate = (totalIncome - totalExpense) / totalIncome
      if (savingsRate < 0.2) {
        newSuggestions.push("Genel tasarruf oranınız düşük. Gelirlerinizin en az %20'sini tasarruf etmeyi hedefleyin.")
      }

      // Kategori bazlı analiz
      categories.forEach(category => {
        const categoryExpenses = transactions
          .filter(t => t.category === category.name && t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0)

        if (categoryExpenses > category.budgetLimit) {
          const overspending = categoryExpenses - category.budgetLimit
          const percentage = ((overspending / category.budgetLimit) * 100).toFixed(1)
          newSuggestions.push(`${category.name} kategorisinde bütçenizi %${percentage} aştınız. Harcamalarınızı azaltmayı deneyin.`)
        }

        // En yüksek harcama kategorilerini bul
        if (categoryExpenses > totalExpense * 0.3) {
          newSuggestions.push(`${category.name} kategorisi toplam harcamalarınızın %30'undan fazlasını oluşturuyor. Bu alanda tasarruf fırsatları arayın.`)
        }
      })

      // Düzenli tasarruf önerisi
      if (!transactions.some(t => t.category === 'Tasarruf' && t.type === 'expense')) {
        newSuggestions.push("Düzenli tasarruf alışkanlığı edinmek için her ay sabit bir miktar para ayırmayı düşünün.")
      }

      // Eğer hiç öneri yoksa, olumlu bir mesaj ekle
      if (newSuggestions.length === 0) {
        newSuggestions.push("Harika iş çıkarıyorsunuz! Bütçenizi iyi yönetiyorsunuz. Bu alışkanlığı sürdürün.")
      }

      setSuggestions(newSuggestions)
    }

    generateSuggestions()
  }, [transactions, categories])

  return (
    <div className="mt-8 p-4 bg-green-100 dark:bg-green-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-100">Tasarruf Önerileri</h2>
      <ul className="list-disc pl-5 space-y-2">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="text-green-700 dark:text-green-200">{suggestion}</li>
        ))}
      </ul>
    </div>
  )
}

