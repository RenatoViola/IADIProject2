import { useState } from 'react';

const useInput = (
  initialValue: string,
  placeholder: string
): [JSX.Element, string, React.Dispatch<React.SetStateAction<string>>] => {
  const [search, setSearch] = useState<string>(initialValue);

  const input = (
    <input
      type="text"
      placeholder={placeholder}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );

  return [input, search, setSearch];
};

export default useInput;
