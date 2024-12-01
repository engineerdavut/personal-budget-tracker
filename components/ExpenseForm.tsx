"use client";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from '../redux/slices/expenseSlice';

export default function ExpenseForm() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addExpense({ description, amount, category, date }));
    setDescription('');
    setAmount(0);
    setCategory('');
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button type="submit">Add Expense</button>
    </form>
  );
}
