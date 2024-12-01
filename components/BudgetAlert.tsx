import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function BudgetAlert() {
  const { categories } = useSelector((state: RootState) => state.budget);

  return (
    <div>
      {categories.map((category) => {
        const usage = (category.spent / category.limit) * 100;
        if (usage >= 80) {
          return (
            <div key={category.name}>
              <p>
                <strong>Warning:</strong> You have used {Math.round(usage)}% of
                your {category.name} budget!
              </p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
