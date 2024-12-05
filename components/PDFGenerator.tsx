declare var jsPDF: any;

interface Transaction {
  date: string
  description: string
  amount: number
  category: string
  type: 'income' | 'expense'
}

interface Category {
  id: string
  name: string
  budgetLimit: number
}

export const generatePDF = (transactions: Transaction[], categories: Category[]) => {
  const doc = new jsPDF()

  doc.setFontSize(20)
  doc.text('Financial Report', 105, 15, { align: 'center' })

  categories.forEach((category, index) => {
    const yPos = 25 + index * 10
    const categoryExpenses = transactions
      .filter(t => t.category === category.name && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    doc.setFontSize(12)
    doc.text(`${category.name}: $${categoryExpenses.toFixed(2)}`, 20, yPos)
  })

  const tableData = transactions.map(t => [
    t.date,
    t.description,
    t.category,
    t.type,
    `$${t.amount.toFixed(2)}`
  ])

  doc.autoTable({
    startY: 25 + categories.length * 10 + 10,
    head: [['Date', 'Description', 'Category', 'Type', 'Amount']],
    body: tableData,
  })

  doc.save('financial_report.pdf')
}

