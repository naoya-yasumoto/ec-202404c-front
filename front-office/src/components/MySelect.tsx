import React from 'react';

interface MySelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string, value: string }[];
}

const MySelect: React.FC<MySelectProps> = ({ value, onChange, options }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default MySelect;
