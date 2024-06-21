

  interface MySelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    error?: string;
  }

  const MySelect = ({ value, onChange, options, error }: MySelectProps) => {
    return (
        <div>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))
        }
      </select>
      {error && <p>{error}</p>}
    </div>
    );
  }

  export default MySelect;