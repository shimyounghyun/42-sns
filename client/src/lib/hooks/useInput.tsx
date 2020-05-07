import { useState, useCallback } from 'react';

export default function useInput(defaultValue: string) {
  const [input, setInput] = useState(defaultValue);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInput(e.target.value);
    },
    [],
  );
  const onReset = useCallback(() => setInput(''), []);
  const onInputValueChange = useCallback((newVal:string)=> setInput(newVal),[]);
  return [input, onChange, onReset, onInputValueChange] as [
    string,
    typeof onChange,
    typeof onReset,
    typeof onInputValueChange
  ];
}