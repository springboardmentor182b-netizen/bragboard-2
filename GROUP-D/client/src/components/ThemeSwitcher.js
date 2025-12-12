import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <select
      className="p-2 border rounded-lg"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="light">🌞 Light</option>
      <option value="dark">🌙 Dark</option>
      <option value="pink">🌸 Pink</option>
    </select>
  );
}
