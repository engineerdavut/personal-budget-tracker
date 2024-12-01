import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : '';
  }, [isDarkMode]);

  return (
    <button onClick={() => setIsDarkMode(!isDarkMode)}>
      Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
    </button>
  );
}
