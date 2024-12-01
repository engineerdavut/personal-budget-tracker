"use client";
import IncomeForm from '../components/IncomeForm';
import ExpenseForm from '../components/ExpenseForm';
import BudgetAlert from '../components/BudgetAlert';
import ChartDisplay from '../components/ChartDisplay';

export default function Dashboard() {
  return (
    <div>
      <h2>Welcome to Your Budget Tracker</h2>
      <IncomeForm />
      <ExpenseForm />
      <BudgetAlert />
      <ChartDisplay />
    </div>
  );
}
