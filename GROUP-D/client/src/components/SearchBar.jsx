export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search employee..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-80 px-4 py-2 rounded-full border outline-none bg-white shadow-sm"
    />
  );
}
