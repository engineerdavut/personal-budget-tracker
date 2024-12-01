"use client";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setCategoryLimit } from '../../redux/slices/budgetSlice';

export default function Settings() {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.budget.categories);

  const updateLimit = (category: string, limit: number) => {
    dispatch(setCategoryLimit({ category, limit }));
  };

  return (
    <div>
      <h2>Budget Settings</h2>
      {categories.map((category) => (
        <div key={category.name}>
          <label>{category.name} Limit:</label>
          <input
            type="number"
            value={category.limit}
            onChange={(e) => updateLimit(category.name, parseInt(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
}
