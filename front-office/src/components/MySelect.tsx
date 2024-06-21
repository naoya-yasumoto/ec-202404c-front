

  interface MySelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    error?: string;
  }

<<<<<<< HEAD:front-office/src/components/MySelect.tsx
  const MySelect = ({ value, onChange, options, error }: MySelectProps) => {
    return (
        <div>
=======
  

  const MySelect = ({ value, onChange, options }: MySelectProps) => {
    // const [selected,setSelected] = useState('');

    // useEffect(() => {
    //   setSelected('---');
    // },[]);

    return (      
      <div>
>>>>>>> develop:front-office/src/component/MySelect.tsx
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