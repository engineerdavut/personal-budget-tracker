"use client";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addIncome } from '../redux/slices/incomeSlice';

export default function IncomeForm() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addIncome({ description, amount, date }));
    setDescription('');
    setAmount(0);
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
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button type="submit">Add Income</button>
    </form>
  );
}
