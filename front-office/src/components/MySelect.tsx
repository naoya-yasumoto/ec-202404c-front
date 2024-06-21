

  interface MySelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    error?: string;
  }

  

  const MySelect = ({ value, onChange, options }: MySelectProps) => {
    // const [selected,setSelected] = useState('');

    // useEffect(() => {
    //   setSelected('---');
    // },[]);

    console.log("value:" + value);
    console.log("onChange:" + onChange);
    
    

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
     
    </div>
    );
  }

  export default MySelect;